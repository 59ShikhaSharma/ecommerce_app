import { Module } from '@nestjs/common';
import { MailService } from '../service/mail.service';
import { MailController } from '../controller/mail.controller';

@Module({
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService], // Export MailService so it can be used in other modules
})
export class MailModule {}
