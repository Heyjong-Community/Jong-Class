import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { QuizModule } from './quiz/quiz.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { CertificateModule } from './certificate/certificate.module';
import { VoucherModule } from './voucher/voucher.module';

@Module({
  imports: [UserModule, AuthModule, CourseModule, LessonModule, QuizModule, EnrollmentModule, CertificateModule, VoucherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
