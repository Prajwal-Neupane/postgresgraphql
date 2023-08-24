import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../__generated__/graphql";
import { setAccessToken } from "../AccessToken";
interface DataProps {
  email: string;
  password: string;
}

export const Login = () => {
  const [data, setData] = useState<DataProps>({
    email: "",
    password: "",
  });
  const [login, { loading, error }] = useLoginMutation();
  const navigate = useNavigate();

  loading && <h1>Loading</h1>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      if (response && response.data) {
        setAccessToken(response.data.login?.accessToken);
      }
      navigate("/");
    } catch (err) {
      alert(error?.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <input
          type="email"
          onChange={handleChange}
          name="email"
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="Password"
        />
        <br />
        <button type="submit">Login</button>
      </form>

      <Link to={"/"}>Home</Link>
    </div>
  );
};
