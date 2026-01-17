import '../App.css'
import { Link, useParams } from "react-router-dom"
import ProjectContext from "../contexts/ProjectContext"
import TaskContext from "../contexts/TaskContext"
import OwnerContext from '../contexts/OwnerContext'
import TagContext from '../contexts/TagContext'
import { useContext, useState } from "react"

const ProjectManagement = () => {
  const { projectId } = useParams()
  const { projects, loading } = useContext(ProjectContext)
  const { tasks } = useContext(TaskContext)
  const { owners } = useContext(OwnerContext)
  const { tags } = useContext(TagContext)

  // owner, tag, and sort state
  const [selectedOwner, setSelectedOwner] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [sortBy, setSortBy] = useState("") 

  const calculateDueDate = (timeToComplete) => {
    const today = new Date()
    const dueDate = new Date(today)
    dueDate.setDate(today.getDate() + Number(timeToComplete))
    return dueDate
  }

  const selectedProject = projects.find((p) => p._id === projectId)
  const projectTasks = tasks.filter((t) => t.project === projectId)

  // Owner dropdown list
  const ownerList = Array.from(
    new Set(
      projectTasks.flatMap(task => task.owners?.map(o => o.name) || [])
    )
  )

  // Tag dropdown list (map tag IDs to names)
  const tagsList = Array.from(
    new Set(
      projectTasks.flatMap(task =>
        task.tags?.map(tagId => tags.find(tag => tag._id === tagId)?.name).filter(Boolean) || []
      )
    )
  )

  // Filter tasks by owner and tag
  let filteredTasks = projectTasks.filter(task => {
    const ownerMatch = selectedOwner ? task.owners?.some(o => o.name === selectedOwner) : true
    const tagMatch = selectedTag
      ? task.tags?.some(tagId => tags.find(tag => tag._id === tagId)?.name === selectedTag)
      : true
    return ownerMatch && tagMatch
  })

  // Sort tasks
  if (sortBy === "dueDate") {
    filteredTasks.sort((a, b) => {
      const dueA = calculateDueDate(a.timeToComplete)
      const dueB = calculateDueDate(b.timeToComplete)
      return dueA - dueB
    })
  } else if (sortBy === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 }
    filteredTasks.sort((a, b) => (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99))
  }

  return (
    <div className="project-management-bg">
      <main className='container'>
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {!selectedProject ? (
              <p>Project not found.</p>
            ) : (
              <>
                <h1>Project: <span style={{"color" : "#9A2A2A"}}>{selectedProject.name}</span></h1>

                <div className="flexBoxes">
                  
                  <div className='sidebarCSS'>
                    <h3>Sidebar</h3>
                    <Link className='removeLine' to="/dashboard">Back to dashboard</Link>
                  </div>

                  <div>
                    <h3>Task List</h3>

                    {projectTasks.length === 0 ? (
                      <p>No task found for this project.</p>
                    ) : (
                      <ul>
                        {filteredTasks.map((t) => {
                          const dueDate = calculateDueDate(t.timeToComplete)

                          return (
                            <li key={t._id}>
                              <strong style={{"color" : "#0a58ca"}}>{t.name}</strong> — {t.status} —{" "}<span className='miniBox'>
                              {t.owners?.map(o => o.name).join(", ")}</span> —{" "}
                              {t.tags?.map(tagId => tags.find(tag => tag._id === tagId)?.name).filter(Boolean).join(", ")} —{" "}
                              <span><small style={{"color" : "green"}}>{dueDate.toLocaleDateString()}</small></span>
                              <div className='hrLine'></div>
                            </li>
                          )
                        })}
                      </ul>
                    )}

                    <Link to="/newtaskform">
                      <button className='form-Btn line-txt'>Add New Task</button>
                    </Link><br/><br/>

                    <h3>Filters:</h3>
                    <div className='simpleFilter'>

                    <label htmlFor="owner">By Owner:{" "}</label>
                    <select
                      id="owner"
                      value={selectedOwner}
                      onChange={(e) => setSelectedOwner(e.target.value)}
                    >
                      <option value="">All</option>
                      {ownerList.map((o, index) => (
                        <option value={o} key={index}>{o}</option>
                      ))}
                    </select><br/>
                    </div>

                    <div className='simpleFilter'>
                    <label htmlFor="tag">By Tag:{" "}</label>
                    <select
                      id="tag"
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                    >
                      <option value="">All</option>
                      {tagsList.map((t, index) => (
                        <option value={t} key={index}>{t}</option>
                      ))}
                    </select><br/><br/>
                    </div>

                    <h3>Sort by:{" "}</h3>
                    <button className='rest-btn' onClick={() => setSortBy("dueDate")}>Due Date</button>{" "}
                    <button className='rest-btn' onClick={() => setSortBy("priority")}>Priority</button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default ProjectManagement
