import React from "react";
import { useNavigate } from "react-router";
import serverURL from "../serverURL";

export default function Login() {
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
        return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database
    const userLogin = { ...form };

    // await fetch
    await fetch(`${serverURL()}/auth/login`, {
      method: "POST", 
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogin),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ username: "", password: "" });
    navigate("/");
  }

  return (
    <div>
      <h3>User Login</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={form.username}
            onChange={(e) => updateForm({ username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Register"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}