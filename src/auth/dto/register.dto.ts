import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class RegisterDto {
    @IsNotBlank({ message: 'El nombre no puede estar en blanco' })
    @IsString()
    @MinLength(3)
    name!: string;

    @IsEmail()
    email!: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password!: string;
}