import React from "react";
import { useNavigate } from "react-router";
import serverURL from "../../serverURL";

import { Button } from "react-bootstrap";

export default function Register() {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    username: "",
    password: "",
    email: "",
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
    setLoading(true);
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database
    const newUser = { ...form };

    await fetch(`${serverURL()}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        // Check status code
        if (response.status === 409) {
          // Username or email exists
          return response.json().then((data) => {
            window.alert(data.message);
            // Redirect back to register page
            navigate("/register");
          });
        } else {
          setForm({ username: "", password: "", email: "" });
          navigate("/login");
        }
      })
      .catch((error) => {
        window.alert(error);
        return;
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={onSubmit} className="container form-group">
          <div className="row">
            <div className="col col-lg-4">
              <h3>Register</h3>
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
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                id="email"
                onChange={(e) => updateForm({ email: e.target.value })}
                type="email"
                value={form.email}
              />
              <br />
              <Button
                value="Login"
                variant="primary"
                type="submit"
                disabled={loading}
              >
                Register
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
