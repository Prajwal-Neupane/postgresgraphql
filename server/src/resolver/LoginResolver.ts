import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../entity/User";

import { sign } from "jsonwebtoken";
import { MyContext } from "../@types/MyContext";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res, payload }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Invalid Email");
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid Password");
    }

    res.cookie(
      "jid",
      sign({ userId: user.id }, "qweqrwetwe", { expiresIn: "1d" }),
      {
        httpOnly: true,
      }
    );

    return {
      accessToken: sign({ userId: user.id }, "dkfdlfjd", { expiresIn: "1h" }),
    };
  }
}
