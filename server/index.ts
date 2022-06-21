import express from "express";
import cors from "cors";
require("dotenv").config();
const port: string | number = process.env.PORT || 5000;
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";
import { connectDB } from "./config-db/db";

const app = express();

// connect tp DB
connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => console.log(`Server listening on port ${port}`));
