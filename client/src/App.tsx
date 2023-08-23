import React from "react";
import { useHelloQuery } from "./__generated__/graphql";

function App() {
  const { loading, data } = useHelloQuery();
  return (
    <div>
      <h1>{loading ? "Loading..." : data?.helloWorld}</h1>
      <h1>Hello Something</h1>

      <h1>Hello Something</h1>
    </div>
  );
}

export default App;
