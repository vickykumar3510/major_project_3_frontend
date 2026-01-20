import "../App.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import TeamContext from "../contexts/TeamContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewTeamForm = () => {
  const navigate = useNavigate()
  const { addTeam, loading } = useContext(TeamContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addTeam({ name, description });
    navigate('/teammanagement')
    toast.success("New Team created.");

    setName("");
    setDescription("");
  };

  return (
    <div className="formPg-bg">
      <main className="container">
        {loading && (
  <div className="loader-container">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
)}
        <h1>New Team Form</h1>
        
        <div className="flexBoxes">
          <div className="sidebarCSS">
            <h3>Sidebar</h3>
            <Link className='removeLine' to="/dashboard">Back to Dashboard</Link>
          </div>
          <div>
            <h3>Create a new team</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              </div>
              <br />
              <div className="form-row">
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <br />
              </div>
              <div>
                <button style={{"marginLeft" : "112px"}} className='submit-btn' type="submit" disabled={!name}>
                Submit
              </button>
              </div>
              
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewTeamForm;
