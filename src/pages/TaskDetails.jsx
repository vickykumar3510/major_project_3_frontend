import '../App.css'
import { Link, useParams } from "react-router-dom"
import { useContext } from "react"
import { toast } from "react-toastify";
import TaskContext from "../contexts/TaskContext"
import TeamContext from '../contexts/TeamContext'
import TagContext from '../contexts/TagContext'
import OwnerContext from '../contexts/OwnerContext'

const TaskDetails = () => {
    const { teams } = useContext(TeamContext)
    const { tags } = useContext(TagContext)
    const { owners: allOwners } = useContext(OwnerContext)

    const { taskId } = useParams()
    const { tasks, loading, updateTaskStatus } = useContext(TaskContext)

    const calculateDueDate = (timeToComplete) => {
        const today = new Date()
        const dueDate = new Date(today)
        dueDate.setDate(today.getDate() + Number(timeToComplete))
        return dueDate
    }

    const calculateRemainingDays = (dueDate) => {
        const today = new Date()
        const diffTime = dueDate - today
        return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0)
    }

    // Show loader while tasks (or context data) are loading
    if (loading || !tasks.length) {
        return (
            <div className="loader-container">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        )
    }

    const task = tasks.find(t => t._id === taskId)
    if (!task) return <p>Task not found.</p>

    const dueDate = calculateDueDate(task.timeToComplete)
    const remainingDays = calculateRemainingDays(dueDate)

    const markAsCompleted = () => {
        updateTaskStatus(taskId, "Completed")
        toast.success("Task marked as Completed");
    }

    return (
        <div className="task-details-bg">
            <main className='container'>
                <h1>Task: <span style={{"color" : "#0a58ca"}}>{task.name}</span></h1>

                <div className="flexBoxes">
                    <div className='sidebarCSS'>
                        <h3>Sidebar</h3>
                        <Link className='removeLine' to="/dashboard">Back to dashboard</Link>
                    </div>

                    <div>
                        <h3>Task Details</h3>

                        <p><strong>Name: </strong><span style={{"color" : "#0a58ca"}}>{task.name}</span></p>

                        <p><strong>
                            Team:</strong> {teams.length
                                ? typeof task.team === "object"
                                    ? task.team.name
                                    : teams.find(t => t._id === task.team)?.name
                                : "Loading..."}
                        </p>

                        <p><strong>
                            Owners:</strong> {Array.isArray(task.owners)
                                ? task.owners
                                    .map(o =>
                                        typeof o === "object"
                                            ? o.name
                                            : allOwners.find(owner => owner._id === o)?.name
                                    )
                                    .filter(Boolean)
                                    .join(", ")
                                : "—"}
                        </p>

                        <p><strong>
                            Tags:</strong> {Array.isArray(task.tags)
                                ? task.tags
                                    .map(tagId => tags.find(tag => tag._id === tagId)?.name)
                                    .filter(Boolean)
                                    .join(", ")
                                : "—"}
                        </p>

                        <p><strong>Due Date:</strong> {dueDate.toLocaleDateString()}</p>
                        <p><strong>Status:</strong> <span style={{ color: task.status === "Completed" ? "green" : "orange" }}>{task.status}</span></p>

                        <hr />

                        <p><strong>
                            Time Remaining:</strong> {remainingDays} day
                            {remainingDays !== 1 && "s"}
                        </p>

                        <button className='rest-btn' onClick={markAsCompleted}>
                            {task.status === "Completed"
                                ? "Completed"
                                : "Mark as Completed"}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default TaskDetails
