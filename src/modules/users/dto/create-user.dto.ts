import { Prop } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message:"tên không được để trống"})
    name:string;

    @IsNotEmpty({message:"email không được để trống"})
    @IsEmail({},{message:"email không đúng định dạng"})
    email:string;

    @IsNotEmpty({message:"password không được để trống"})
    password: string;

    @IsNotEmpty({message:"số điện thoại không được để trống"})
    phone:string;
    
    address:string;

    image:string;
}
