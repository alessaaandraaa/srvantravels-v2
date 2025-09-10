import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regNumber, setRegNumber] = useState("");

  const register = () => {
    axios({
      method: "POST",
      data: {
        username: regUsername,
        password: regPassword,
        email: regEmail,
        contact: regNumber,
      },
      withCredentials: true,
      url: "http://localhost:5174/register",
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div id="register">
        <h1>WELCOME TO SR VAN TRAVELS!</h1>
        <hr />
        <h1>REGISTER AN ACCOUNT</h1>
        <form id="registerForm" method="post" noValidate>
          <div className="form-control">
            <label htmlFor="reg_username">Username:</label>
            <input
              type="text"
              name="username"
              id="reg_username"
              placeholder="Username"
              onChange={(e) => setRegUsername(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="reg_password">Password:</label>
            <input
              type="password"
              name="password"
              id="reg_password"
              placeholder="Password"
              onChange={(e) => setRegPassword(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setRegEmail(e.target.value)}
            />
            <small>Error message</small>
          </div>
          <div className="form-control">
            <label htmlFor="contact">Contact Number:</label>
            <input
              type="text"
              name="contact"
              id="contact"
              placeholder="09xxxxxxxxx"
              onChange={(e) => setRegNumber(e.target.value)}
            />
          </div>
          <button type="button" onClick={register} style={{ marginTop: "5px" }}>
            Register
          </button>
        </form>
      </div>
    </>
  );
}
