import { IsEmail, IsString, MinLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class LoginDto{

    @IsEmail()
    email!: string;

    @IsNotBlank()
    @IsString()
    @MinLength(6)
    password!: string;
}