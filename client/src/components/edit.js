import React from "react";
import { useParams, useNavigate } from "react-router";
import serverURL from "../serverURL";

export default function Edit() {
  const [form, setForm] = React.useState({
    author: "",
    field: "",
    name: "",
    rating: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      // const response = await fetch(`http://localhost:5000/games/${params.id.toString()}`);
      const response = await fetch(
        `${serverURL()}/api/games/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      author: form.author,
      field: form.field,
      name: form.name,
      rating: form.rating,
    };

    // This will send a post request to update the data in the database.
    // await fetch(`http://localhost:5000/games/${params.id}`, {
    await fetch(`${serverURL}/api/games/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating: </label>
          <input
            type="text"
            className="form-control"
            id="rating"
            value={form.rating}
            onChange={(e) => updateForm({ rating: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="field">Field: </label>
          <input
            type="text"
            className="form-control"
            id="field"
            value={form.field}
            onChange={(e) => updateForm({ field: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={form.author}
            onChange={(e) => updateForm({ author: e.target.value })}
          />
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
