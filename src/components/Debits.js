import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Debits = ({ addDebit, accountBalance }) => {
  const [newDebitDescription, setNewDebitDescription] = useState('');
  const [newDebitAmount, setNewDebitAmount] = useState('');
  const [debits, setDebits] = useState([]);

  useEffect(() => {
    fetch('https://johnnylaicode.github.io/api/debits.json')
      .then((response) => response.json())
      .then((data) => {
        setDebits(data);
      })
      .catch((error) => console.error('Error fetching debits:', error));
  }, []);

  const handleAddDebit = (event) => {
    event.preventDefault();

    if (!newDebitDescription || !newDebitAmount) {
      alert('Please enter both description and amount for the debit.');
      return;
    }
    addDebit(newDebitDescription, parseFloat(newDebitAmount));

    // Update state
    setDebits([
      ...debits,
      {
        description: newDebitDescription,
        amount: parseFloat(newDebitAmount),
        date: new Date().toISOString().slice(0, 10)
      }
    ]);

    setNewDebitDescription('');
    setNewDebitAmount('');
  };

  return (
    <div>
      <h1>Debits</h1>
      <form onSubmit={handleAddDebit}>
        <label>
          Description:
          <input
            type="text"
            value={newDebitDescription}
            onChange={(e) => setNewDebitDescription(e.target.value)}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={newDebitAmount}
            onChange={(e) => setNewDebitAmount(e.target.value)}
          />
        </label>
        <button type="submit">Add Debit</button>
      </form>
      <br />
      <h2>Debits List</h2>
      <ul>
        {debits.map((debit, index) => (
          <li key={index}>
            <strong>Description:</strong> {debit.description}, &nbsp;
            <strong>Amount:</strong> ${debit.amount.toFixed(2)}, &nbsp;
            <strong>Date:</strong> {debit.date}
          </li>
        ))}
      </ul>
      <div>
        <strong>Account Balance:</strong> ${accountBalance.toFixed(2)}
      </div>
      <div>
        <Link to="/">Return to Home</Link>
      </div>
    </div>
  );
};

export default Debits;
