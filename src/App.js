import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
//import AccountBalance from './components/AccountBalance'; // Import AccountBalance component

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      },
    };
  }


  componentDidMount() {
    // Fetch credits data
    fetch('https://johnnylaicode.github.io/api/credits.json')
      .then((response) => response.json())
      .then((data) => {
        console.log('Credits API Response:', data);
        this.setState({ credits: data });
      })
      .catch((error) => console.error('Error fetching credits:', error));
  
    //Fetch debits data
    fetch('https://johnnylaicode.github.io/api/debits.json')
      .then((response) => response.json())
      .then((data) => {
        console.log('Debits API Response:', data);
        this.setState({ debits: data });
      })
      .catch((error) => console.error('Error fetching debits:', error));
  }
  

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };



  //-----------Adding credit and debit funcs---------------//
  addCredit = (description, amount) => {
    const newCredit = {
      description: description,
      amount: parseFloat(amount),
      date: new Date().toISOString().slice(0, 10),
    };
    this.setState((prevState) => ({
      creditList: [...prevState.creditList, newCredit],
      accountBalance: prevState.accountBalance + parseFloat(amount),
    }));
  };

  addDebit = (description, amount) => {
    const newDebit = {
      description: description,
      amount: parseFloat(amount),
      date: new Date().toISOString().slice(0, 10),
    };
    this.setState((prevState) => ({
      debitList: [...prevState.debitList, newDebit],
      accountBalance: prevState.accountBalance - parseFloat(amount),
    }));
  };
//-----------------------------------------------------------//





  render() {
    const HomeComponent = () => <Home accountBalance={this.state.accountBalance} />;
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const LogInComponent = () => <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />;
    const CreditsComponent = () => (
      <Credits
        credits={this.state.creditList}
        accountBalance={this.state.accountBalance}
        addCredit={this.addCredit}
      />
    );
    const DebitsComponent = () => (
      <Debits
        debits={this.state.debitList}
        accountBalance={this.state.accountBalance}
        addDebit={this.addDebit}
      />
    );

    return (
      <Router basename="/Assignment-3-Bank-of-React">
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
          {/* <AccountBalance accountBalance={this.state.accountBalance} /> Render AccountBalance component */}
        </div>
      </Router>
    );
  }
}

export default App;
