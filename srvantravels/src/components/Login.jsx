import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [logUsername, setLogUsername] = useState("");
  const [logPassword, setLogPassword] = useState("");

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: logUsername,
        password: logPassword,
      },
      withCredentials: true,
      url: "http://localhost:5174/login",
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div id="login">
      <h1>WELCOME TO SR VAN TRAVELS!</h1>
      <hr />
      <h1>LOGIN TO YOUR ACCOUNT</h1>
      <form
        id="loginForm"
        method="post"
        noValidate
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="form-control">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={(e) => setLogUsername(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setLogPassword(e.target.value)}
          />
        </div>
        <button onClick={login}>Log In</button>
      </form>
    </div>
  );
}
