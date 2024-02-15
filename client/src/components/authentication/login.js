import React from "react";
import { Button } from "react-bootstrap";

import { useUserContext } from "../../context";

export default function Login() {
  const { actions, loading } = useUserContext();

  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  const loginUser = (e) => {
    e.preventDefault();
    actions
      .loginUserAction(form)
      .finally(() => setForm({ username: "", password: "" }));
  };

  // These methods will update the state properties.
  const updateForm = (value) => setForm((prev) => ({ ...prev, ...value }));

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={loginUser} className="container form-group">
          <div className="row">
            <div className="col col-lg-4">
              <h3>User Login</h3>
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                disabled={loading}
                id="username"
                onChange={(e) => updateForm({ username: e.target.value })}
                type="text"
                value={form.username}
              />
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                disabled={loading}
                id="password"
                onChange={(e) => updateForm({ password: e.target.value })}
                type="password"
                value={form.password}
              />
              <br />
              <Button
                value="Login"
                variant="primary"
                type="submit"
                disabled={loading}
              >
                Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
