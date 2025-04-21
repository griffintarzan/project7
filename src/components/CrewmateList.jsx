import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";

function CrewmateList() {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase
        .from("Crewmate")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) console.error(error);
      else setCrewmates(data);
    };

    fetchCrewmates();
  }, []);

  return (
    <div>
      <div className="list-header">
        <h2>Your Crewmates</h2>
        <Link to="/new" className="button">+ Add New</Link>
      </div>
      <div className="crewmate-list">
        {crewmates.map((mate) => (
          <div key={mate.id} className="crewmate-card">
            <h3>{mate.name}</h3>
            <p>Role: {mate.role}</p>
            <p>Power Level: {mate.power_level}</p>
            <Link to={`/crewmate/${mate.id}`}>🔍 View</Link> | {" "}
            <Link to={`/edit/${mate.id}`}>✏️ Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CrewmateList;