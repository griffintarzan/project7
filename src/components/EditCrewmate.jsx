import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../supabaseClient";

function EditCrewmate() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [role, setRole] = useState("imposter");
  const [powerLevel, setPowerLevel] = useState(50);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from("Crewmate")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error(error);
      else {
        setName(data.name);
        setRole(data.role);
        setPowerLevel(data.power_level);
      }
    };
    fetchCrewmate();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("Crewmate").update({
      name,
      role,
      power_level: powerLevel,
    }).eq("id", id);

    if (!error) {
        navigate("/");
    }
    else {
        alert("Failed to update crewmate.");
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("Crewmate").delete().eq("id", id);
    if (!error) {
        navigate("/");
    }
    else {
        alert("Failed to delete crewmate.");
    }
  };

  return (
    <div>
      <h2>Edit Crewmate</h2>
      <form onSubmit={handleUpdate} className="form">
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

        <button type="submit">Update</button>
      </form>
      <button className="delete-button" onClick={handleDelete}>
        🗑️ Delete Crewmate
      </button>
    </div>
  );
}

export default EditCrewmate;