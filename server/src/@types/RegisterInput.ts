import { IsEmail, Length, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "../middleware/EmailValidation";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 255, { message: "Length should be 1-255" })
  firstName!: string;

  @Field()
  @Length(1, 255, { message: "Length should be 1-255" })
  lastName!: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email already exists" })
  email!: string;

  @Field()
  password!: string;
}
