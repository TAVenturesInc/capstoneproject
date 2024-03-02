import React from "react";
import { useNavigate } from "react-router";
import serverURL from "../../serverURL";

import { Button } from "react-bootstrap";
import { useStyleContext } from "../../context/styleContext";

export default function Register() {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [passwordsMatch, setPasswordsMatch] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const navigate = useNavigate();
  const { theme } = useStyleContext();

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

    if (!passwordsMatch) {
      window.alert("Passwords do not match");
      setLoading(false);
      return;
    }

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
          setForm({
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
          });
          navigate("/login");
        }
      })
      .catch((error) => {
        window.alert(error);
        return;
      })
      .finally(() => setLoading(false));
  }

  // Check for password match
  React.useEffect(() => {
    setPasswordsMatch(form.password === form.confirmPassword);
  }, [form.password, form.confirmPassword]);

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={onSubmit} className="container form-group">
          <div className="row">
            <div className="col col-lg-4">
              <h3 id={theme} className="font_64" >Register</h3>
              <label id={theme} className="font2" htmlFor="username">Username</label>
              <input
                className="form-control"
                id="username"
                onChange={(e) => updateForm({ username: e.target.value })}
                type="text"
                value={form.username}
              />
              <label id={theme} className="font2" htmlFor="password">Password</label>
              <div className="input-group">
                <input
                  className="form-control"
                  id="password"
                  onChange={(e) => updateForm({ password: e.target.value })}
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                />
                <div className="input-group-append">
                  <button 
                    id={theme}
                    className="font2 btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <label id={theme} className="font2" htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-group">
                <input
                  className={`form-control ${
                    !passwordsMatch ? "is-invalid" : ""
                  }`}
                  id="confirmPassword"
                  onChange={(e) =>
                    updateForm({ confirmPassword: e.target.value })
                  }
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                />
                <div className="input-group-append">
                  <button                    id={theme}
                    className="font2 btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              {!passwordsMatch && (
                <div className="invalid-feedback">Passwords do not match</div>
              )}
              <label id ={ theme } className="font2" htmlFor="email">Email</label>
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
                {loading ? "Loading..." : "Register"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
