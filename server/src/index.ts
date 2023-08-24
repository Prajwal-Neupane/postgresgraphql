import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express, { json } from "express";
import { buildSchema, ArgumentValidationError } from "type-graphql";
import { AppDataSource } from "./migration/data-source";
import { RegisterResolver } from "./resolver/UserResolver";
import { GraphQLError } from "graphql";
import bodyParser from "body-parser";

import cors from "cors";
import { LoginResolver } from "./resolver/LoginResolver";
import cookieParser from "cookie-parser";
import { sign, verify } from "jsonwebtoken";
import { User } from "./entity/User";

// import genFunc from "connect-pg-simple";
// import { MeResolver } from "./resolver/Me";

AppDataSource.initialize()
  .then(() => console.log("Data Source has been initialized"))
  .catch((err) =>
    console.error("Error during Data Source initialization", err)
  );

const main = async () => {
  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: [
        "http://localhost:3000",
        "https://studio.apollographql.com",
        "https://studio.apollographql.com/graphql",
        "http://localhost:3001/graphql",
        "http://localhost:3001",
      ],
    })
  );
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: "50mb" }));

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }
    let payload: any = null;
    try {
      payload = verify(token, "qweqrwetwe");
    } catch (error) {
      return res.send({ ok: false, accessToken: "" });
    }

    const user = await User.findOne({ where: { id: payload.userId } });
    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }
    return res.send({
      ok: true,
      accessToken: sign({ userId: user.id }, "dkfdlfjd", { expiresIn: "1h" }),
    });
  });
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RegisterResolver, LoginResolver],
      validate: false,
    }),
    // // formatError: (error: GraphQLError) => {
    // //   if (error.originalError instanceof ArgumentValidationError) {
    // //     return error;
    // //   }
    //   return {
    //     message: error.message,
    //     locations: error.locations,
    //     path: error.path,
    //     extensions: error.extensions,
    //   };
    // },
    context: ({ req, res }) => ({ req, res }),
  });
  // const PgSqlStore = genFunc(session);
  // const sessionStore = new PgSqlStore({
  //   conString: "postgres://postgres:postgres@127.0.0.1:5432/postgres_session",
  //   createTableIfMissing: true,
  // });
  // app.use(
  //   session({
  //     store: sessionStore,
  //     name: "myUniqueId",
  //     secret: "someodkfdjlfd",
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       maxAge: 1000 * 60 * 60 * 24 * 7,
  //       httpOnly: true,
  //     },
  //   } as any)
  // );

  // app.use((req, res, next) => {
  //   res.header(
  //     "Access-Control-Allow-Origin",
  //     "https://studio.apollographql.com"
  //   );
  //   res.header("Access-Control-Allow-Credentials", "true");
  //   next();
  // });

  app.use(json());

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(3001, () => {
    console.log(`Server started on port ${3001}/graphql`);
  });
};

main();
