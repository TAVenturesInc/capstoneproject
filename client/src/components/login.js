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
  const updateForm = (value) => setForm((prev) => ({ ...prev, ...value }));

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
    <div className="card">
      <div className="card-body">
        <form onSubmit={onSubmit} className="container form-group">
          <div className="row">
            <div className="col col-lg-4">
              <h3>User Login</h3>
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                id="username"
                onChange={(e) => updateForm({ username: e.target.value })}
                type="text"
                value={form.username}
              />
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                id="password"
                onChange={(e) => updateForm({ password: e.target.value })}
                type="password"
                value={form.password}
              />
              <br />
              <input
                className="btn btn-primary"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
