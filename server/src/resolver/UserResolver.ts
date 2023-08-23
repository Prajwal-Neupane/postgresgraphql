import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../entity/User";
import { RegisterInput } from "../@types/RegisterInput";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../@types/MyContext";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async helloWorld() {
    return "helloworld";
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  async bye(@Ctx() { payload }: MyContext) {
    console.log(payload);
    return `Your user id is ${payload!.userId}`;
  }

  @Query(() => [User])
  async user() {
    return User.find();
  }
  @Mutation(() => User)
  async register(
    @Arg("input") { firstName, lastName, email, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }
}
