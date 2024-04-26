import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'mySecretKey',
      signOptions: { expiresIn: '1h' },
    }), 
    UserModule,
    AdminModule 
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
