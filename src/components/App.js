import React, { Component } from 'react'
import PlayersList from './PlayersList'
import ControlBar from './ControlBar'
import BetsList from './BetsList'
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
// import StatusBar from './StatusBar'
// import PropTypes from "prop-types";
import EthereumDiceContract from '../../build/contracts/EthereumDice.json'


import getWeb3 from '../utils/getWeb3'

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
import './App.css'
import { AppBar } from 'material-ui';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  }
})

// AppBar.propTypes = {
//   children: PropTypes.isNotNull
// };

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      account: null,
      contractInstance: null,
      web3: null
    }
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
    
  }

  instantiateContract() {
      const contract = require('truffle-contract')
      const ethereumDice = contract(EthereumDiceContract)
      ethereumDice.setProvider(this.state.web3.currentProvider)
      ethereumDice.deployed().then((instance) => {
          this.setState({contractInstance: instance})
          console.log("Contract instance instantiated: " + instance)
      }).catch(error => {
        alert("Error: " + error)
      })
  }

  // onChangeBetList() {
    
  // }

  // onSelectAccount(account) {
  //   // Get accounts.
  //   this.state.web3.eth.getAccounts((error, accounts) => {
  //     if (!error) {
  //       if (accounts.length > 0) {
  //         this.setState({account: accounts[0]})
  //       } else {
  //         console.log("Create new account and join the Game!")
  //       }
  //     } else {
  //       console.log("Error, no accounts selected")
  //     }
  //   })
  // }

  render() {
    return (
      <div className="App">
          <AppBar 
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          >
            Title
          </AppBar>
          {/* <StatusBar 
            onAccountChange={account => { this.setState(account)}}
            account={this.state.account}
            /> */}
          <ControlBar 
            web3={this.state.web3}
            contractInstance={this.state.contractInstance}

            >
            
          </ControlBar>
          <BetsList>

          </BetsList>
          <PlayersList>

          </PlayersList>
      </div>
    );
  }
}

export default App
