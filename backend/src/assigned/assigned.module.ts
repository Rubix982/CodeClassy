import { AssignedService } from 'src/assigned/assigned.service';
import { AssignedController } from './assigned.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { AssignedAssignment } from 'src/entities/assigned-assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssignedAssignment]), AuthModule],
  controllers: [AssignedController],
  providers: [AssignedService],
  exports: [AssignedService],
})
export class AssignedModule {}
