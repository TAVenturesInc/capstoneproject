import React from "react";
import { useLoginContext } from "../../context";
import { Button } from "react-bootstrap";

const Profile = () => {
  const { userName, userId, email, actions } = useLoginContext();

  // const handleEditProfile = () => {
  //   actions.changeProfileAction();
  // };

  return (
    <div className="card">
      <div className="card-body">
        <form className="container form-group">
          <div className="row">
            <div className="col col-lg-4">
              <h1>User Profile</h1>
              <p>User ID: {userId}</p>
              <p>Username: {userName}</p>
              <p>Email: {email}</p>
              <Button
                variant="danger"
                type="submit"
                style={{ marginTop: "15px" }}
              >
                Edit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
