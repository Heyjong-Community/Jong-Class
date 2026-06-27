import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  Profile,
  Strategy as GoogleStrategyBase,
  VerifyCallback,
} from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  GoogleStrategyBase,
  'google',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID') ?? '',
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') ?? '',
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') ?? '',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const user = await this.authService.validateGoogleUser({
      googleId: profile.id,
      email: profile.emails?.[0]?.value,
      fullname:
        profile.displayName ??
        `${profile.name?.givenName ?? ''} ${profile.name?.familyName ?? ''}`.trim(),
      avatarUrl: profile.photos?.[0]?.value,
    });

    done(null, user);
  }
}
