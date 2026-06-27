import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto, LoginDto, RegisterDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UserRole } from 'src/generated/prisma/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { username: dto.username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === dto.email) {
        throw new ConflictException('Email sudah terdaftar');
      }
      throw new ConflictException('Username sudah terdaftar');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        password: passwordHash,
        fullname: dto.fullname,
        address: dto.address,
        phoneNumber: dto.phoneNumber,
        city: dto.city,
        nationality: dto.nationality,
        avatarUrl: dto.avatarUrl || null,
        role: UserRole.USER,
      },
      select: {
        id: true,
        email: true,
        username: true,
        fullname: true,
        role: true,
        avatarUrl: true,
        phoneNumber: true,
        city: true,
        nationality: true,
        createdAt: true,
      },
    });

    return {
      message: 'Berhasil registrasi akun',
      data: newUser,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: {
        id: true,
        email: true,
        username: true,
        fullname: true,
        role: true,
        password: true,
        avatarUrl: true,
        phoneNumber: true,
        city: true,
        nationality: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    if (!user.password) {
      throw new UnauthorizedException(
        'Akun ini menggunakan Google Login. Silakan login dengan Google.',
      );
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const tokens = await this.generateToken(user.id, user.email, user.role);
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    const { password: _password, ...safeUser } = user;

    return {
      message: 'Login berhasil',
      data: {
        user: safeUser,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    };
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        fullname: true,
        role: true,
        password: true,
        avatarUrl: true,
        phoneNumber: true,
        city: true,
        nationality: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    if (!user.password) {
      throw new UnauthorizedException(
        'Akun ini menggunakan Google Login. Silakan login dengan Google.',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const { password: _password, ...safeUser } = user;
    return safeUser;
  }

  async validateGoogleUser(googleProfile: any) {
    const googleId = googleProfile.googleId ?? googleProfile.id;
    const email = googleProfile.email ?? googleProfile.emails?.[0]?.value;
    const displayName =
      googleProfile.fullname ??
      googleProfile.displayName ??
      googleProfile.name?.fullName ??
      email?.split('@')[0] ??
      'User';
    const avatar =
      googleProfile.avatarUrl ?? googleProfile.photos?.[0]?.value ?? null;

    if (!googleId || !email) {
      throw new ConflictException('Profil Google tidak valid');
    }

    let user = await this.prisma.user.findUnique({
      where: { googleId },
    });

    if (user) {
      if (avatar && user.googleAvatar !== avatar) {
        user = await this.prisma.user.update({
          where: { googleId },
          data: {
            googleAvatar: avatar,
            avatarUrl: avatar,
            googleEmail: email,
          },
        });
      }
      return user;
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (!existingUser.googleId) {
        user = await this.prisma.user.update({
          where: { email },
          data: {
            googleId,
            googleEmail: email,
            googleAvatar: avatar,
            avatarUrl: avatar || existingUser.avatarUrl,
          },
        });
        return user;
      }

      throw new ConflictException(
        'Email sudah terhubung dengan akun Google lain',
      );
    }

    let username = email.split('@')[0];
    let usernameExists = await this.prisma.user.findUnique({
      where: { username },
    });

    let counter = 1;
    while (usernameExists) {
      username = `${email.split('@')[0]}${counter}`;
      usernameExists = await this.prisma.user.findUnique({
        where: { username },
      });
      counter += 1;
    }

    user = await this.prisma.user.create({
      data: {
        email,
        username,
        fullname: displayName,
        googleId,
        googleEmail: email,
        googleAvatar: avatar,
        avatarUrl: avatar,
        address: 'TBD',
        phoneNumber: 'TBD',
        city: 'TBD',
        nationality: 'TBD',
        password: null,
        role: UserRole.USER,
      },
    });

    return user;
  }

  async googleLogin(user: any) {
    const tokens = await this.generateToken(user.id, user.email, user.role);
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      message: 'Login Google berhasil',
      data: {
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    };
  }

  async generateToken(userId: string, email: string, role: UserRole) {
    const payload = {
      sub: userId,
      email,
      role,
    };

    const accessSecret =
      this.configService.get<string>('JWT_ACCESS_SECRET') ??
      'dev-access-secret';
    const refreshSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET') ??
      'dev-refresh-secret';
    const accessExpiresIn =
      this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '15m';
    const refreshExpiresIn =
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') ?? '7d';

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload as Record<string, unknown>, {
        secret: accessSecret,
        expiresIn: accessExpiresIn as any,
      }),
      this.jwtService.signAsync(payload as Record<string, unknown>, {
        secret: refreshSecret,
        expiresIn: refreshExpiresIn as any,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    const tokenHash = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    await this.prisma.refreshToken.deleteMany({
      where: {
        userId,
        revokedAt: null,
      },
    });

    await this.prisma.refreshToken.create({
      data: {
        tokenHash,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret:
          this.configService.get<string>('JWT_REFRESH_SECRET') ??
          'dev-refresh-secret',
      });

      const storedToken = await this.prisma.refreshToken.findFirst({
        where: {
          userId: payload.sub,
          expiresAt: { gt: new Date() },
          revokedAt: null,
        },
        orderBy: { createdAt: 'desc' },
      });

      if (!storedToken) {
        throw new UnauthorizedException('Refresh token tidak valid');
      }

      const tokenHash = crypto
        .createHash('sha256')
        .update(refreshToken)
        .digest('hex');
      if (storedToken.tokenHash !== tokenHash) {
        throw new UnauthorizedException('Refresh token tidak valid');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User tidak ditemukan');
      }

      await this.prisma.refreshToken
        .delete({ where: { id: storedToken.id } })
        .catch(() => undefined);

      const tokens = await this.generateToken(user.id, user.email, user.role);
      await this.saveRefreshToken(user.id, tokens.refreshToken);

      return {
        message: 'Refresh token berhasil',
        data: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Refresh token tidak valid');
    }
  }

  async logout(userId: string) {
    await this.prisma.refreshToken.deleteMany({ where: { userId } });

    return {
      message: 'Logout berhasil',
    };
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User tidak ditemukan');
    }

    return user;
  }

  async getUserFromGoogleId(googleId: string) {
    return this.prisma.user.findUnique({ where: { googleId } });
  }

  async linkGoogleAccount(userId: string, googleId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        googleId,
      },
    });
  }
}
