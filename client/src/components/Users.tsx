import React from "react";
import { useUserQuery } from "../__generated__/graphql";
import { Link } from "react-router-dom";

const Users = () => {
  const { loading, data } = useUserQuery();
  loading && <h1>Loading</h1>;
  return (
    <div>
      {data?.user.map((people) => {
        return (
          <div key={people.id}>
            <h1>{people.name}</h1>
            <h1>{people.email}</h1>
            <p>{people.firstName}</p>
            <p>{people.lastName}</p>
            <p>{people.id}</p>
          </div>
        );
      })}
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default Users;
