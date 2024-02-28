import React, { useState } from "react";
import { useLoginContext } from "../../context";
import { Button } from "react-bootstrap";

const EditProfile = () => {
  const { userName: initialUserName, email: initialEmail, actions } = useLoginContext();
  const [userName, setUserName] = useState(initialUserName);
  const [email, setEmail] = useState(initialEmail);

  const handleSave = () => {
    actions.updateUserProfileAction({ userName, email });
  };

  const handleCancel = () => {
    actions.cancelUpdateProfileAction();
  };

  return (
    <div className="card">
      <div className="card-body">
        <form className="container form-group">
          <div className="row">
            <div className="col col-lg-4">
              <h1>Edit Profile</h1>
              <div className="form-group">
                <label htmlFor="formUsername">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="formUsername"
                  placeholder={initialUserName}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="formEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="formEmail"
                  placeholder={initialEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <Button
                  value="Save"
                  variant="primary"
                  type="submit"
                  onClick={handleSave}
                >
                  Save
                </Button>

                <Button
                  value="Cancel"
                  variant="secondary"
                  type="submit"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default EditProfile;
