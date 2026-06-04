import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Toggle form
  function handleClick() {
    setShowForm((prev) => !prev);
  }

  // GET all toys
  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then(res => res.json())
      .then(data => setToys(data));
  }, []);

  // POST - add toy
  function handleAddToy(newToy) {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...newToy,
        likes: 0
      })
    })
      .then(res => res.json())
      .then(createdToy => {
        setToys([...toys, createdToy]);
      });
  }

  // DELETE - remove toy
  function handleDelete(id) {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE"
    }).then(() => {
      setToys(toys.filter(toy => toy.id !== id));
    });
  }

  // PATCH - like toy
  function handleLike(toy) {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: toy.likes + 1
      })
    })
      .then(res => res.json())
      .then(updatedToy => {
        setToys(toys.map(t =>
          t.id === updatedToy.id ? updatedToy : t
        ));
      });
  }

  return (
    <div className="app">
      <Header />

      {/* Add Toy Form */}
      {showForm ? (
        <ToyForm onAddToy={handleAddToy} />
      ) : null}

      {/* Button to toggle form */}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      {/* Toy list */}
      <ToyContainer
        toys={toys}
        onDelete={handleDelete}
        onLike={handleLike}
      />
    </div>
  );
}

export default App;