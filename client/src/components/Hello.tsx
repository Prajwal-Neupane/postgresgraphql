import React from "react";
import { useHelloQuery } from "../__generated__/graphql";
import { Link } from "react-router-dom";

const Hello: React.FC = () => {
  const { loading, data } = useHelloQuery();
  return (
    <div>
      <h1>{loading ? "Loading..." : data?.helloWorld}</h1>

      <h1>Hello Something</h1>
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default Hello;
