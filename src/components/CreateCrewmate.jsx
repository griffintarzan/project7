import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

function CreateCrewmate() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("imposter");
  const [powerLevel, setPowerLevel] = useState(50);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("Crewmate").insert({
      name,
      role,
      power_level: powerLevel,
    });
    if (!error) {
        navigate("/");
    } else {
        alert("Error creating crewmate");
    }
  };

  return (
    <div>
      <h2>Create a New Crewmate</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="imposter">Imposter</option>
          <option value="crewmate">Crewmate</option>
        </select>

        <label>Power Level: {powerLevel}</label>
        <input
          type="range"
          min="0"
          max="100"
          value={powerLevel}
          onChange={(e) => setPowerLevel(parseInt(e.target.value))}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateCrewmate;
