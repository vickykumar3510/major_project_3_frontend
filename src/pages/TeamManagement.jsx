import '../App.css'
import { useContext } from "react"
import TeamContext from "../contexts/TeamContext"
import { Link } from 'react-router-dom'

const TeamManagement = () => {
  const { loading, teams } = useContext(TeamContext)

  return (
    <div className="team-management-bg">
       <h1 className='page-title'>Teams Management</h1>
      <main className='container'>
        {loading && (
  <div className="loader-container">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
)}
       

        <div className="flexBoxes">
          <div className='sidebarCSS'>
            <h3>Sidebar</h3>
            <Link className="removeLine" to="/dashboard">
              Back to dashboard
            </Link>
          </div>

          <div>
            <h3>Team List</h3>

            {teams.length === 0 ? (
              <p>No teams found</p>
            ) : (
              <ul>
                {teams.map((t) => (
                  <li className="team-name rowBox" key={t._id}>
                    {t.name}
                  </li>
                ))}
              </ul>
            )}

            <Link to="/newteamform">
              <button className='form-Btn line-txt'>Add new team</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TeamManagement
