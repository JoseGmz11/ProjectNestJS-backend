import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from 'node_modules/@nestjs/jwt/dist/jwt.module';
import { JWT_SECRET } from 'src/config/constants';

@Module({
  imports: [ 
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
   ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
