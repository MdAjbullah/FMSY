import React, { useState } from "react";
import { addSavings } from "../api/endpoint"; // Import the addSavings API function
import "../styles/Savings.css";
const SavingsForm = () => {
  const [savingsCategory, setSavingsCategory] = useState("");
  const [savingsAmount, setSavingsAmount] = useState("");
  const [date, setDate] = useState("");
  const [reminder, setReminder] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the backend
    const savingsData = {
      savings_category: savingsCategory,
      savings_amount: savingsAmount,
      date: date,
      reminder: reminder,
    };

    try {
      // Use the addSavings API function to send the data
      const response = await addSavings(savingsData);
      setModalMessage("Savings entry added successfully!");
      console.log(response); // You can handle the response as needed
    } catch (error) {
      setModalMessage("Error adding savings entry");
      console.error(error);
    }
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalMessage("");
  };

  return (
    <div className="add-savings-container">
      <h2 className="text-savings">Add Savings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="label-savings">Savings Category</label>
          <select
            value={savingsCategory}
            onChange={(e) => setSavingsCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="RD">RD (Recurring Deposit)</option>
            <option value="Jewel Advance">Jewel Advance</option>
            <option value="SIP">SIP (Systematic Investment Plan)</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="label-savings">Savings Amount</label>
          <input
            type="number"
            value={savingsAmount}
            onChange={(e) => setSavingsAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label-savings">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label-savings">
            <input
              style={{ color: "white" }}
              type="checkbox"
              checked={reminder}
              onChange={(e) => setReminder(e.target.checked)}
            />
            Set Reminder for Monthly Savings
          </label>
        </div>
        <button type="submit">Save Savings</button>
      </form>

      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingsForm;
