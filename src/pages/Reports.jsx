import '../App.css'
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import '../charts/ChartSetup'

const Reports = () => {
  const [workDoneLastWeek, setWorkDoneLastWeek] = useState(0);
  const [pendingWorkDays, setPendingWorkDays] = useState(0);
  const [tasksByTeam, setTasksByTeam] = useState([]);
  const [tasksByOwner, setTasksByOwner] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);

        const workDoneRes = await fetch(
          "https://major-project-3-backend.vercel.app/reports/work-done-last-week"
        );
        const pendingRes = await fetch(
          "https://major-project-3-backend.vercel.app/reports/pending-work-days"
        );
        const teamRes = await fetch(
          "https://major-project-3-backend.vercel.app/reports/tasks-closed-by-team"
        );
        const ownerRes = await fetch(
          "https://major-project-3-backend.vercel.app/reports/tasks-closed-by-owner"
        );

        const workDoneData = await workDoneRes.json();
        const pendingData = await pendingRes.json();
        const teamData = await teamRes.json();
        const ownerData = await ownerRes.json();

        setWorkDoneLastWeek(workDoneData.totalWorkDoneLastWeek);
        setPendingWorkDays(pendingData.pendingWorkDays);
        setTasksByTeam(teamData);
        setTasksByOwner(ownerData);
      } catch (error) {
        console.error("Failed to load reports", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const teamChartData = {
    labels: tasksByTeam.map(t => t.teamName),
    datasets: [
      {
        label: "Tasks Closed",
        data: tasksByTeam.map(t => t.closedTasks),
        backgroundColor: [
          "#4f46e5",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#06b6d4",
        ],
      },
    ],
  };

  const ownerChartData = {
    labels: tasksByOwner.map(o => o.ownerName),
    datasets: [
      {
        label: "Tasks Closed",
        data: tasksByOwner.map(o => o.closedTasks),
        backgroundColor: [
          "#6366f1",
          "#ec4899",
          "#10b981",
          "#f97316",
          "#3b82f6",
        ],
      },
    ],
  };

  const totalTeamClosed = tasksByTeam.reduce(
    (sum, t) => sum + t.closedTasks,
    0
  );

  const totalOwnerClosed = tasksByOwner.reduce(
    (sum, o) => sum + o.closedTasks,
    0
  );

  return (
    <main className="reports-bg">
      <h1 className='page-title'>Workasana Reports</h1>
      <div className="container">
                {loading && (
  <div className="loader-container">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
)}
        
        <div className="flexBoxes">
          {/* Sidebar */}
          <div className="sidebarCSS">
            <h3>Reports</h3>
            <Link className="removeLine" to="/dashboard">
              Back to Dashboard
            </Link>
          </div>

          {/* Content */}
          <div>
            <h3>Report Overview</h3>

            <p>
              <strong style={{ color: "#16a34a" }}>
                Total Work Done Last Week:
              </strong>{" "}
              {workDoneLastWeek}
            </p>

            <p>
              <strong style={{ color: "#dc2626" }}>
                Total Days of Work Pending:
              </strong>{" "}
              {pendingWorkDays}
            </p>

            <p>
              <strong style={{ color: "#4f46e5" }}>
                Tasks Closed by Team:
              </strong>{" "}
              {totalTeamClosed}
            </p>

            <div className='barChart' style={{marginBottom: "30px" }}>
              <Bar data={teamChartData} />
            </div>

            <p>
              <strong style={{ color: "#0ea5e9" }}>
                Tasks Closed by Owner:
              </strong>{" "}
              {totalOwnerClosed}
            </p>

            <div className='pieChart'>
              <Pie data={ownerChartData} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Reports;
