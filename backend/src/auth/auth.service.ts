import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto, LoginDto, RegisterDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/generated/prisma/enums';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    // Check existing user
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { username: dto.username }],
      },
    });

    // if existing user registered
    if (existingUser) {
      if (existingUser.email === dto.email) {
        throw new ConflictException('Email sudah terdaftar');
      }
      throw new ConflictException('Username sudah terdaftar');
    }

    // has password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);

    // create new user
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

    // return response
    return {
      message: 'Berhasil registrasi akun',
      data: newUser,
    };
  }

  async login(dto: LoginDto) {
    // Check User
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
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

    // Validation Password
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email atau password salah');
    }

    // Generate Token

    // Set Refresh Token in http-only cookie

    // Save Refresh Token to database

    // Return user data + access token
    return {
      message: 'Login berhasil',
      data: {
        user,
        // accessToken: tokens,
      },
    };
  }

  async validateGoogleUser(googleProfile: any) {
    const { id, emails, displayName, photos } = googleProfile;
    const email = emails[0].value;
    const name = displayName || email.split('@')[0];
    const avatar = photos?.[0]?.value || null;

    // Find user
    let user = await this.prisma.user.findUnique({
      where: { googleId: id },
    });

    if (user) {
      // Update avatar jika berubah
      if (avatar && user.googleAvatar !== avatar) {
        user = await this.prisma.user.update({
          where: { googleId: id },
          data: {
            googleAvatar: avatar,
            avatarUrl: avatar,
            googleEmail: email,
          },
        });
      }
      return user;
    }

    // Find User By Email
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Link Google ke akun yang sudah ada
      if (!existingUser.googleId) {
        user = await this.prisma.user.update({
          where: { email },
          data: {
            googleId: id,
            googleEmail: email,
            googleAvatar: avatar,
            avatarUrl: avatar || existingUser.avatarUrl,
            // Pertahankan data yang sudah ada
          },
        });
        return user;
      } else {
        throw new ConflictException(
          'Email sudah terhubung dengan akun Google lain',
        );
      }
    }

    // Create New User Fron Google
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
      counter++;
    }

    user = await this.prisma.user.create({
      data: {
        email,
        username,
        fullname: name,
        googleId: id,
        googleEmail: email,
        googleAvatar: avatar,
        avatarUrl: avatar,
        // Required fields dengan default values
        address: 'TBD', // User harus update nanti
        phoneNumber: 'TBD',
        city: 'TBD',
        nationality: 'TBD',
        password: null, // Tidak ada password
        role: UserRole.USER,
      },
    });

    return user;
  }

  async googleLogin() {}

  async generateToken(userId: string, email: string, role: UserRole) {
    const payload = {
      sub: userId,
      email,
      role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN') || '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN') || '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    const tokenHash = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    // Hapus refresh token lama (jika ada)
    await this.prisma.refreshToken.deleteMany({
      where: {
        userId,
        revokedAt: null,
      },
    });

    // Simpan refresh token baru
    await this.prisma.refreshToken.create({
      data: {
        tokenHash,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });
  }

  async refreshToken(refreshToken: string) {}

  async logout(userId: string) {}

  private setRefreshTokenCookie() {}

  private clearRefreshTokenCookie() {}

  async validateUser(userId: string) {}

  async getUserFromGoogleId(googleId: string) {}

  async linkGoogleAccount(userId: string, googleId: string) {}

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
