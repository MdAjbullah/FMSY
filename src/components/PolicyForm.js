import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPolicy, getPolicies } from "../api/endpoint";
import "../styles/PolicyForm.css";

const AddPolicyComponent = () => {
  const navigate = useNavigate();
  const [policyData, setPolicyData] = useState({
    policy_no: "",
    policy_amount: "",
    start_date: "",
    policy_due_date: "",
    policy_method: "monthly",
  });

  // Utility function to calculate the next due date
  const calculateDueDate = (startDate, method) => {
    if (!startDate) return "";
    const date = new Date(startDate);

    switch (method) {
      case "monthly":
        date.setMonth(date.getMonth() + 1);
        break;
      case "quarterly":
        date.setMonth(date.getMonth() + 3);
        break;
      case "half_yearly":
        date.setMonth(date.getMonth() + 6);
        break;
      case "annual":
        date.setFullYear(date.getFullYear() + 1);
        break;
      default:
        break;
    }

    return date.toISOString().split("T")[0];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPolicyData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === "start_date" || name === "policy_method") {
        updatedData.policy_due_date = calculateDueDate(
          updatedData.start_date,
          updatedData.policy_method
        );
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPolicy(policyData);
      alert("Policy added successfully!");
    } catch (error) {
      console.error("Error adding policy:", error);
      alert("Failed to add policy.");
    }
  };

  const handleShowPolicies = async () => {
    try {
      const policies = await getPolicies();
      navigate("/policy-details", { state: { policies } });
    } catch (error) {
      console.error("Error fetching policies:", error);
      alert("Failed to fetch policies.");
    }
  };

  return (
    <div className="add-policy-container">
      <h2 className="head">Add Policy</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="policyLabel">Policy No:</label>
          <input
            type="text"
            name="policy_no"
            value={policyData.policy_no}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="policyLabel">Amount:</label>
          <input
            type="number"
            name="policy_amount"
            value={policyData.policy_amount}
            onChange={handleInputChange}
            required
            min="0"
          />
        </div>
        <div>
          <label className="policyLabel">Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={policyData.start_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="policyLabel">Next Due Date:</label>
          <input
            type="date"
            name="policy_due_date"
            value={policyData.policy_due_date}
            readOnly
          />
        </div>
        <div>
          <label className="policyLabel">Method:</label>
          <select
            name="policy_method"
            value={policyData.policy_method}
            onChange={handleInputChange}
            required
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="half_yearly">Half Yearly</option>
            <option value="annual">Annual</option>
          </select>
        </div>
        <div className="button-container">
          <button className="add-btn" type="submit">
            Add Policy
          </button>
          <button
            type="button"
            className="add-btn"
            onClick={handleShowPolicies}
          >
            Show Policies
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPolicyComponent;