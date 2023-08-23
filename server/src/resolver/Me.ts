// import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
// import { User } from "../entity/User";
// import { MyContext } from "../@types/MyContext";

// @Resolver()
// export class MeResolver {
//   @Query(() => User, { nullable: true })
//   async me(@Ctx() ctx: MyContext) {
//     if (!ctx.req.session!.userId) {
//       return null;
//     }

//     return await User.findOne({ where: { id: ctx.req.session!.userId} });
//   }
// }
