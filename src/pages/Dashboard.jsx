import '../App.css'
import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate  } from 'react-router-dom'

import ProjectContext from '../contexts/ProjectContext'
import TaskContext from '../contexts/TaskContext'
import OwnerContext from '../contexts/OwnerContext'
import { toast } from "react-toastify";

const Dashboard = () => {
    const navigate = useNavigate()

    const { owners } = useContext(OwnerContext)
    const { projects, loading } = useContext(ProjectContext)

    const { tasks } = useContext(TaskContext)

    const [taskFilter, setTaskFilter] = useState("All")

    const filteredTasks = taskFilter === "All" ? tasks: tasks.filter(task => task.status === taskFilter)
    
    const logout = () => {
        localStorage.clear()
        navigate('/', { replace: true })
        toast.success("Logout successfully.");
    }

    return (
        <div className='dashboard-bg'>
            <main className='container'>
                {loading && (
  <div className="loader-container">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
)}
<h1>Dashboard</h1>

                <div className='flexBoxes'>
                    <div className='sidebarCSS'>
                        <h3>Sidebar</h3>
                        <Link className='removeLine' to="/dashboard">Dashboard</Link><br/>
                        <Link className='removeLine' to="/allprojects">Project</Link><br/>
                        <Link className='removeLine' to="/teammanagement">Team</Link><br/>
                        <Link className='removeLine' to="/reports">Report</Link><br/>
                        <Link className='removeLine' to="/settings">Setting</Link><br/><br/>
                        <button className='logOutBtn' onClick={logout}>Log Out</button><br/><br/>
                    </div>

                    <div>
                        <h3>Projects</h3>
                        <div>
                            <button className='form-Btn'><Link className='removeLine line-txt' to="/newprojectform">Add new Project</Link></button>
                            <ul>
                                {projects.map((project) => (
                                    <li key={project._id} className='rowBox'>
                                        <Link className='project-name removeLine' to={`/projectmanagement/${project._id}`}>{project.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <h3 style={{"marginTop": "50px"}}>My Tasks</h3>
                        <div>
                            <button className='form-Btn'><Link className='removeLine line-txt' to="/newtaskform">Add new Task</Link></button>
                            <ul>
                                {filteredTasks.map(task => (
                                    <li className='taskRowBox' key={task._id}>
                                        <Link className='task-name removeLine' to={`/taskdetails/${task._id}`}>{task.name}</Link> -{" "}<span className='miniBox'>
                                        {task.owners.map(o => o.name).join(", ")}</span> - <i>{task.status}</i>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <h3 style={{"marginTop": "50px"}}>Quick Filters</h3>
                        <button className='rest-btn' onClick={() => setTaskFilter("All")}>All Status</button>{" "}
                        <button className='rest-btn' onClick={() => setTaskFilter("In Progress")}>In Progress</button>{" "}
                        <button className='rest-btn' onClick={() => setTaskFilter("Completed")}>Completed</button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard
