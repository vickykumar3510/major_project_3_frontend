import { createContext, useEffect, useState } from "react";

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);

  // Fetch all teams
  const fetchTeams = async () => {
    try {
      const res = await fetch("https://major-project-3-backend.vercel.app/teams");
      if (!res.ok) throw new Error("Failed to fetch teams");

      const data = await res.json();
      setTeams(data);
    } catch (error) {
      console.log("Error while fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new team
  const addTeam = async (teamData) => {
    try {
      const res = await fetch("https://major-project-3-backend.vercel.app/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teamData),
      });

      if (!res.ok) throw new Error("Failed to add team");

      const result = await res.json();
      
      const newTeam = result.team || result;

      setTeams((prev) => [...prev, newTeam]);

      return newTeam;
    } catch (error) {
      console.log("Error while adding team:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <TeamContext.Provider value={{ loading, teams, addTeam, setTeams }}>
      {children}
    </TeamContext.Provider>
  );
};

export default TeamContext;
