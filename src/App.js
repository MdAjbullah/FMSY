import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login"; // Correct path for login
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import PolicyDetails from "./components/PolicyForm";
import LoanDetails from "./components/LoanDetails";
import IncomeExpense from "./components/IncomeExpense";
import Savings from "./components/Savings";
import PolicyDetailsComponent from "./components/PolicyDetailsComponent";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* Layout is wrapping the Dashboard and other components */}
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/policy" element={<PolicyDetails />} />
            <Route path="/policy-details" element={<PolicyDetailsComponent />} />
            <Route path="/loan" element={<LoanDetails />} />
            <Route path="/incomeExpense" element={<IncomeExpense />} />
            <Route path="/savings" element={<Savings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
