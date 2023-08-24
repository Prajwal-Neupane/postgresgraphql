import React from "react";
import { useByeQuery } from "../__generated__/graphql";
import { setAccessToken } from "../AccessToken";
import { useNavigate } from "react-router-dom";

const Bye = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useByeQuery();
  const handleClick = () => {
    setAccessToken("");
    navigate("/");
  };

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    console.log(error);
  }
  if (!data) {
    return <h1>No data</h1>;
  }
  return (
    <div>
      {data.bye}

      <button onClick={handleClick}>LogOut</button>
    </div>
  );
};

export default Bye;
