import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../@types/MyContext";
import { verify } from "jsonwebtoken";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("Not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, "dkfdlfjd");
    context.payload = payload as any;
  } catch (error) {
    console.log("error", error);
    throw new Error("Not authenticated");
  }

  return next();
};
