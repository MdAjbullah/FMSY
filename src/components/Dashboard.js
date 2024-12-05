// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2"; // Import the Pie chart component from react-chartjs-2
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js"; // Import required components from Chart.js
import { fetchDashboardData, fetchLoans } from "../api/endpoint"; // Import the API functions
import "../styles/dashboard.css";

// Register the components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const Dashboard = () => {
  const [loans, setLoans] = useState([]);
  const [pieChartData, setPieChartData] = useState({
    transactions: {},
    savings: {},
  });
  const [error, setError] = useState(null); // For handling any errors

  useEffect(() => {
    // Fetch loan data from the backend
    const getLoans = async () => {
      try {
        const data = await fetchLoans(); // Use the fetchLoans function from api.js
        setLoans(data);
      } catch (error) {
        setError("Failed to fetch loan data.");
        console.error("Error fetching loan data", error);
      }
    };

    // Fetch pie chart data from the backend
    const getPieChartData = async () => {
      try {
        const data = await fetchDashboardData(); // Use the fetchDashboardData function from api.js
        setPieChartData(data); // Set pie chart data from the API
      } catch (error) {
        setError("Failed to fetch pie chart data.");
        console.error("Error fetching pie chart data", error);
      }
    };

    getLoans();
    getPieChartData();
  }, []);

  // Prepare data for Pie Chart
  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw;
          },
        },
      },
    },
  };

  const transactionsData = {
    labels: Object.keys(pieChartData.transactions),
    datasets: [
      {
        data: Object.values(pieChartData.transactions),
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"], // Add your own color palette
        hoverOffset: 4,
      },
    ],
  };

  const savingsData = {
    labels: Object.keys(pieChartData.savings),
    datasets: [
      {
        data: Object.values(pieChartData.savings),
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"], // Add your own color palette
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      {/* <h2>Loan Dashboard</h2> */}
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Display error message if any */}
      {/* Pie Chart for Transaction Types */}
      <div className="pie-chart-container">
        <h3 style={{ color: "white" }}>Transaction Types Distribution</h3>
        <Pie data={transactionsData} options={pieChartOptions} />
      </div>
      {/* Pie Chart for Savings Categories */}
      <div className="pie-chart-container">
        <h3 style={{ color: "white" }}>Savings Categories Distribution</h3>
        <Pie data={savingsData} options={pieChartOptions} />
      </div>
      {/* Table and other content */}
      <table className="loan-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Loan Due Date</th>
            <th>Reminder</th>
          </tr>
        </thead>
        <tbody>
          {loans.length > 0 ? (
            loans.map((loan) => (
              <>
                {/* Row for Loan Category */}
                <tr key={`loan-category-${loan.id}`}>
                  <td>Loan Category</td>
                  <td>{loan.loan_category}</td>
                  <td>{loan.next_due_date || loan.reminder_date}</td>
                  <td>
                    <i className="fas fa-bell"></i> {/* Bell icon */}
                  </td>
                </tr>

                {/* Row for Savings Category */}
                {loan.savings_category && (
                  <tr key={`savings-category-${loan.id}`}>
                    <td>Savings Category</td>
                    <td>{loan.savings_category}</td>
                    <td></td> {/* No due date for savings */}
                    <td>
                      <i className="fas fa-bell"></i> {/* Bell icon */}
                    </td>
                  </tr>
                )}

                {/* Row for Loan Amount */}
                <tr key={`loan-amount-${loan.id}`}>
                  <td>Loan Amount</td>
                  <td>{loan.loan_amount}</td>
                  <td></td> {/* No due date for loan amount */}
                  <td>
                    <i className="fas fa-bell"></i> {/* Bell icon */}
                  </td>
                </tr>

                {/* Row for Savings Amount */}
                {loan.savings_amount && (
                  <tr key={`savings-amount-${loan.id}`}>
                    <td>Savings Amount</td>
                    <td>{loan.savings_amount}</td>
                    <td></td> {/* No due date for savings amount */}
                    <td>
                      <i className="fas fa-bell"></i> {/* Bell icon */}
                    </td>
                  </tr>
                )}

                {/* Row for Policy Amount */}
                {loan.policy_amount && (
                  <tr key={`policy-amount-${loan.id}`}>
                    <td>Policy Amount</td>
                    <td>{loan.policy_amount}</td>
                    <td></td> {/* No due date for policy amount */}
                    <td>
                      <i className="fas fa-bell"></i> {/* Bell icon */}
                    </td>
                  </tr>
                )}
              </>
            ))
          ) : (
            <tr>
              <td colSpan="4">No loans available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
