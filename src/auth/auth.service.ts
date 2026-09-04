import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async register(registerDto: RegisterDto) {
        const user = await this.usersService.findOneByEmail(registerDto.email);

        if (user){
            throw new BadRequestException('El correo ya está registrado');
        }
        return await this.usersService.create({
            name: registerDto.name,
            email: registerDto.email,
            password: await bcryptjs.hash(registerDto.password, 10)
        });
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findOneByEmail(loginDto.email);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const isMatch = await bcryptjs.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Contraseña incorrecta');
        }

        const payload = { email: user.email };
        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            email: user.email,
        };
    }
}
