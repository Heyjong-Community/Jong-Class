import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateAuthDto {}

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, {
    message: 'Password minimal 6 karakter dengan kombinasi huruf dan angka',
  })
  password: string;

  @IsNotEmpty()
  @MinLength(3)
  fullname: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{10,15}$/, {
    message: 'Nomor telepon harus 10-15 digit angka',
  })
  phoneNumber: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  nationality: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class GoogleLoginDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string; // Token dari frontend (Google One Tap)
}

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, {
    message: 'Password minimal 6 karakter dengan kombinasi huruf dan angka',
  })
  newPassword: string;
}
