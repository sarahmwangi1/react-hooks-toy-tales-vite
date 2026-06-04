import { useState } from "react";

function ToyForm({ onAddToy }) {
  const [name, setName]   = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image, likes: 0 }), // likes start at 0
    })
      .then(r => r.json())
      .then(savedToy => {
        onAddToy(savedToy);
        setName("");
        setImage("");
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a toy's name..."
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter a toy's image URL..."
        value={image}
        onChange={e => setImage(e.target.value)}
      />
      <button type="submit">Create New Toy</button>
    </form>
  );
}

export default ToyForm;