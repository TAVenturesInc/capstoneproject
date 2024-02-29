import React, { useState } from "react";
import { useLoginContext } from "../../context";
import { Button } from "react-bootstrap";

const EditProfile = () => {
  const { userId, userName: initialUserName, email: initialEmail, actions } = useLoginContext();
  const [userName, setUserName] = useState(initialUserName);
  const [email, setEmail] = useState(initialEmail);

  const handleSave = () => {
    actions.updateUserProfileAction({ userId, userName, email });
  };

  const handleCancel = () => {
    actions.cancelUpdateProfileAction();
  };

  React.useEffect(() => {
    if (Boolean(initialUserName && initialEmail)) {
      setUserName(initialUserName);
      setEmail(initialEmail);
    }
  }, [Boolean(initialUserName && initialEmail)]);

  return (
    <div className="card">
      <div className="card-body">
        <form className="container form-group">
          <div className="row">
            <div className="col col-lg-4">
              <h1>Edit Profile</h1>
              <p>User ID: {userId}</p>
              <div className="form-group">
                <label htmlFor="formUsername">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="formUsername"
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