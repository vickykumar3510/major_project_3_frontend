import '../App.css'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'

import ProjectContext from '../contexts/ProjectContext'
import TaskContext from '../contexts/TaskContext'

const AllProjects = () => {
  const { projects, loading } = useContext(ProjectContext)
  const { tasks } = useContext(TaskContext)

  const [selectedOwner, setSelectedOwner] = useState("")

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const owners = Array.from(
    new Map(
      tasks
        .flatMap(task => task.owners)
        .map(owner => [owner._id, owner])
    ).values()
  )

  const projectIdsForOwner = selectedOwner
    ? new Set(
        tasks
          .filter(task =>
            task.owners.some(owner => owner._id === selectedOwner)
          )
          .map(task => task.project)
      )
    : null

  const filteredProjects = selectedOwner
    ? projects.filter(project => projectIdsForOwner.has(project._id))
    : projects

  return (
    <div className='all-Projects-bg'>
      <h1 className='page-title'>List of all Projects</h1>
      <main className='container'>
        {loading && (
  <div className="loader-container">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
)}

        

        <div className='flexBoxes'>
          {/* Sidebar */}
          <div className='sidebarCSS'>
            <h3>Sidebar</h3>
            <Link className='removeLine' to='/dashboard'>
              Back to dashboard
            </Link>
          </div>

          {/* Projects Section */}
          <div>
            <h3>Projects</h3>

            {/* Project List */}
            <ul>
              {filteredProjects.length === 0 ? (
                <p>No Projects found.</p>
              ) : (
                filteredProjects.map(project => (
                  <li key={project._id}>
                    <strong className='project-name-noHover'>{project.name}</strong> — {project.description}
                    
                    <br />
                    <small style={{"color" : "green"}}>
                      Created on: {formatDate(project.createdAt)}
                    </small>
                    <div className='hrLine'></div>
                  </li>
                ))
              )}
            </ul>

            <button className='form-Btn'>
              <Link className='removeLine line-txt' to='/newprojectform'>
                Add a Project
              </Link>
            </button><br/><br/><br/>
                        {/* Owner Filter Dropdown */}
            <div className='simpleFilter'>
              <label className='ownerSelect'>
                Filter by Owner:{" "}
                <select id="ownerSelect"
                  value={selectedOwner}
                  onChange={(e) => setSelectedOwner(e.target.value)}
                >
                  <option value="">All Owners</option>
                  {owners.map(owner => (
                    <option key={owner._id} value={owner._id}>
                      {owner.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default AllProjects
