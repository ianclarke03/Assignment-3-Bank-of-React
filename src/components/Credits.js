import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Credits = ({ addCredit, accountBalance }) => {
  const [newCreditDescription, setNewCreditDescription] = useState('');
  const [newCreditAmount, setNewCreditAmount] = useState('');
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    fetch('https://johnnylaicode.github.io/api/credits.json')
      .then((response) => response.json())
      .then((data) => {
        setCredits(data);
      })
      .catch((error) => console.error('Error fetching credits:', error));
  }, []);

  const handleAddCredit = (event) => {
    event.preventDefault();

    if (!newCreditDescription || !newCreditAmount) {
      alert('Please enter both description and amount for the credit.');
      return;
    }
    addCredit(newCreditDescription, parseFloat(newCreditAmount));

    //update state
    setCredits([
      ...credits,
      {
        description: newCreditDescription,
        amount: parseFloat(newCreditAmount),
        date: new Date().toISOString().slice(0, 10)
      }
    ]);

    setNewCreditDescription('');
    setNewCreditAmount('');
  };

  return (
    <div>
      <h1>Credits</h1>
      <form onSubmit={handleAddCredit}>
        <label>
          Description:
          <input
            type="text"
            value={newCreditDescription}
            onChange={(e) => setNewCreditDescription(e.target.value)}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={newCreditAmount}
            onChange={(e) => setNewCreditAmount(e.target.value)}
          />
        </label>
        <button type="submit">Add Credit</button>
      </form>
      <br />
      <h2>Credits List</h2>
      <ul>
        {credits.map((credit, index) => (
          <li key={index}>
            <strong>Description:</strong> {credit.description}, &nbsp;
            <strong>Amount:</strong> ${credit.amount.toFixed(2)}, &nbsp;
            <strong>Date:</strong> {credit.date}
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

export default Credits;
