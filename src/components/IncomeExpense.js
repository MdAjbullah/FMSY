import React, { useState } from "react";
import { createTransaction } from "../api/endpoint";
import "../styles/IncomeExpense.css";

const CreateTransaction = () => {
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    description: "",
    transaction_type: "",
  });

  const [modalMessage, setModalMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateTransaction = async (e) => {
    e.preventDefault();
    if (formData.amount <= 0) {
      setModalMessage("Amount should be greater than 0.");
      setIsModalVisible(true);
      return;
    }

    try {
      await createTransaction(formData); // Call the API without sending a `user` field
      setModalMessage("Transaction created successfully!");
      setFormData({
        date: "",
        amount: "",
        description: "",
        transaction_type: "",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error creating transaction.";
      setModalMessage(errorMessage);
    }
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalMessage("");
  };

  return (
    <div className="form-transaction">
      <h1 className="text-transaction">Create Transaction</h1>
      <form onSubmit={handleCreateTransaction}>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
        <select
          value={formData.transaction_type}
          onChange={(e) =>
            setFormData({ ...formData, transaction_type: e.target.value })
          }
          required
        >
          <option value="">Select Transaction Type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
          <option value="Investment">Investment</option>
          <option value="Savings">Savings</option>
        </select>

        <button type="submit" className="submit-button">
          Add Transaction
        </button>
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

export default CreateTransaction;
