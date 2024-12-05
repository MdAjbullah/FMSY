import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPolicies } from "../api/endpoint";

const PolicyDetailsPage = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const policies = await getPolicies();
        setPolicies(policies);
      } catch (error) {
        console.error("Error fetching policies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div style={styles.loading}>Loading policies...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Policy Details</h2>
      {policies.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Policy No</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Start Date</th>
              <th style={styles.th}>Next Due Date</th>
              <th style={styles.th}>Method</th>
              <th style={styles.th}>Reminder Date</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.policy_no} style={styles.tr}>
                <td style={styles.td}>{policy.policy_no}</td>
                <td style={styles.td}>${policy.policy_amount}</td>
                <td style={styles.td}>{formatDate(policy.policy_start_date)}</td>
                <td style={styles.td}>{formatDate(policy.policy_due_date)}</td>
                <td style={styles.td}>{policy.policy_method}</td>
                <td style={styles.td}>{formatDate(policy.reminder_date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No policies available.</p>
      )}
      <button style={styles.backButton} onClick={() => navigate("/policy")}>
        Back to Add Policy
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "black",
    borderRadius: "8px",
    // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "white",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  th: {
    padding: "12px 15px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#4CAF50",
    color: "white",
  },
  td: {
    padding: "12px 15px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    color: "white",
  },
  tr: {
    // backgroundColor: "#f2f2f2",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "white",
  },
  backButton: {
    marginBottom: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default PolicyDetailsPage;