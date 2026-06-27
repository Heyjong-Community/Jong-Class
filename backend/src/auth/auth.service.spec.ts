import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
            },
            refreshToken: {
              deleteMany: jest.fn(),
              create: jest.fn(),
              findFirst: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('token'),
            verifyAsync: jest.fn().mockResolvedValue({ sub: 'user-id' }),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const values: Record<string, string> = {
                JWT_ACCESS_SECRET: 'access-secret',
                JWT_REFRESH_SECRET: 'refresh-secret',
                JWT_ACCESS_EXPIRES_IN: '15m',
                JWT_REFRESH_EXPIRES_IN: '7d',
              };
              return values[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a local user with correct credentials', async () => {
    const prisma = jest.requireMock('../prisma.service') as {
      user: { findUnique: jest.Mock };
    };
    prisma.user.findUnique.mockResolvedValue({
      id: 'user-1',
      email: 'john@example.com',
      password: '$2b$10$4Lx2exC0dQn4V6gY4FPX4e7s3ttWQ1tE66k1QdN1sKkG1A1L9JfK6',
      role: 'USER',
    });

    const result = await service.validateLocalUser(
      'john@example.com',
      'Password123',
    );

    expect(result.email).toBe('john@example.com');
  });
});
