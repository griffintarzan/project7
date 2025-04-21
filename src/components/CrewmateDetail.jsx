import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import supabase from "../supabaseClient";

function CrewmateDetail() {
  const { id } = useParams(); // get the id from the URL parameter passed by component
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from("Crewmate")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error(error);
      }
      else {
        setCrewmate(data);
      }
    };

    fetchCrewmate();
  }, [id]);

  if (!crewmate) return <p>Loading...</p>;

  return (
    <div>
      <h2>{crewmate.name}</h2>
      <p><strong>Role:</strong> {crewmate.role}</p>
      <p><strong>Power Level:</strong> {crewmate.power_level}</p>
      <p><strong>Created At:</strong> {new Date(crewmate.created_at).toLocaleString()}</p>
      <Link to={`/edit/${crewmate.id}`}>✏️ Edit Crewmate</Link>
    </div>
  );
}

export default CrewmateDetail;
