import { Module } from '@nestjs/common';
import { StashsService } from './stashs.service';
import { Stash } from './stashs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Stash])],
  providers: [StashsService],
  exports: [TypeOrmModule.forFeature([Stash]), StashsService]
})
export class StashsModule {}
