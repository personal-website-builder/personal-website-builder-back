import { Module } from '@nestjs/common';
import { ProfilesController } from './infraestructure/profiles.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
