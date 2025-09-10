import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [currentForm, setCurrentForm] = useState("login");

  let text =
    currentForm === "register"
      ? "Have an account? Log in to your account"
      : "No account? Register an account";

  function handleCurrentForm() {
    setCurrentForm((prevForm) =>
      prevForm === "register" ? "login" : "register"
    );
  }

  return (
    <>
      {currentForm === "register" ? <Register /> : <Login />}
      <button onClick={handleCurrentForm}>{text}</button>
    </>
  );
}

export default App;
