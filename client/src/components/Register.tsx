import React, { useState } from "react";
import { useRegisterMutation } from "../__generated__/graphql";
import { Link, useNavigate } from "react-router-dom";

interface DataProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const Register: React.FC = () => {
  const [data, setData] = useState<DataProps>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [register, { loading, error }] = useRegisterMutation();
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
      const response = await register({
        variables: {
          input: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
          },
        },
      });
      console.log(response);

      navigate("/login");
    } catch (err) {
      alert(error?.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="First Name"
          name="firstName"
        />{" "}
        <br />
        <input
          type="text"
          onChange={handleChange}
          name="lastName"
          placeholder="Last Name"
        />{" "}
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
        <button type="submit">Register</button>
      </form>
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default Register;
