import "../App.css"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import ProjectContext from "../contexts/ProjectContext"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewProjectForm = () => {
  const navigate = useNavigate()
  const { addProject, loading } = useContext(ProjectContext)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    await addProject({ name, description })
    navigate('/allprojects')
    toast.success("New Project created.");

    setName("")
    setDescription("")
  }

  return (
    <div className="formPg-bg">
    <main className="container">
      {loading && (
  <div className="loader-container">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
)}
      <h1>New Project Form</h1>
      <div className="flexBoxes">
        <div className="sidebarCSS">
          <h3>Sidebar</h3>
          <Link className='removeLine' to="/dashboard">Back to dashboard</Link>
        </div>

        <div>
          <h3>Create a new project</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            </div>
            <br />

            <div className="form-row">

            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            </div>
            <button style={{"marginLeft" : "112px"}} className='submit-btn' type="submit" disabled={!name || !description}>
              Create Project
            </button>
          </form>
        </div>
      </div>
    </main>
    </div>
  )
}

export default NewProjectForm
