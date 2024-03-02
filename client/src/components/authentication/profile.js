import React from "react";
import { useLoginContext } from "../../context";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStyleContext } from "../../context/styleContext";

const Profile = () => {
  const { userName, userId, email } = useLoginContext();
  const theme = useStyleContext();

  return (
    <div className="card">
      <div className="card-body">
        <form className="container form-group">
          <div className="row">
            <div className="col col-lg-4">
              <h1 id={theme.theme} className="font_64">User Profile</h1>
              <p id={theme.theme} className="font2">User ID: {userId}</p>
              <p id={theme.theme} className="font2">Username: {userName}</p>
              <p id={theme.theme} className="font2">Email: {email}</p>
              <Link to="/editProfile">
                <Button
                  variant="danger"
                  type="submit"
                  style={{ marginTop: "15px" }}
                >
                  Edit
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;