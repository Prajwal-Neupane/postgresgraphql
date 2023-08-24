import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to={"/register"}>Register</Link> <br />
      <Link to={"/login"}>Login</Link> <br />
      <Link to={"/users"}>Users</Link>
      <Link to={"/bye"}>Bye</Link>
    </div>
  );
};

export default Home;
