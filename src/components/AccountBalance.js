/*==================================================
src/components/AccountBalance.js

The AccountBalance component displays account balance. It is included in other page views.
==================================================*/
import React, { Component } from 'react';

class AccountBalance extends Component {
  // Display account balance
  render() {
    return (
      <div>
        Balance: {this.props.accountBalance.toFixed(2)} {/* Round account balance to 2 decimal places */}
      </div>
    );
  }
}

export default AccountBalance;