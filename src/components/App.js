import React, { Component } from 'react'
// import PlayersList from './PlayersList'
// import ControlBar from './ControlBar'
// import BetsList from './BetsList'
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue } from 'material-ui/colors'
// import StatusBar from './StatusBar'
// import PropTypes from "prop-types";
import EthereumDiceContract from '../../build/contracts/EthereumDice.json'


import getWeb3 from '../utils/getWeb3'

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
import './App.css'
import { AppBar, Button, Toolbar, Typography, TextField, Grid, Paper } from 'material-ui';


const contract = require('truffle-contract')
const ethereumDice = contract(EthereumDiceContract)
let gasPrice = 20000000000
let gasF = 78634

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: blue
  }
})

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nickname: 'Anonymous player',
      bet: null,
      web3: null
    }
  }

  componentDidMount() {
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
      ethereumDice.setProvider(this.state.web3.currentProvider)
      // Get instancce and save to local
      ethereumDice.deployed().then((instance) => {
          window.contractInstance  = instance
          console.log("Contract instance instantiated: " + instance)
      }).catch(error => {
        alert("Error: " + error)
      })

      // ethereumDice.web3.eth.getGasPrice((error, result) => {
      //   gasPrice = Number(result)
      //   console.log("Gas price received")
      //   ethereumDice.deployed().then((instance) => {
      //     return instance.joinGame.estimateGas(1)
      //   }).then((result) => {
      //     console.log("join Game gas = " + result)
      //     gasF = Number(result)
      //   }).catch(e => {
      //     console.log('Error gas estimation: ' + e)
      //   })
        
      // })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <AppBar>
            <Toolbar>
              <Typography variant="title" color="inherit">
                Title
              </Typography>
            </Toolbar>
          </AppBar>

          <Grid 
            className="main-content" 
            style={{ 'marginTop': '200px'}}
            container
            direction={'row'}
            alignItems={'center'}
            justify={'center'}
          >
            <Paper style={{'padding': '12px'}}>
              <Grid item xs={12}>
                  <TextField 
                    id="nickname-field"
                    label="Nickname"
                    value={this.state.nickname || ""}
                    placeholder="Enter your nickname"
                    onChange={this.handleChange('nickname') }
                  />
                  <Button
                    onClick={() => this.joinGame()}
                    variant="raised" 
                  >
                      Join game
                  </Button>
                </Grid>
                <Grid item>
                  <TextField 
                    id="bet-field"
                    value={this.state.bet || "" }
                    label="Bet"
                    placeholder="Enter your bet"
                    onChange={this.handleChange('bet') }
                  />

                  <Button
                    onClick={() => this.makeBet()}
                    variant="raised" 
                  >
                      Make bet
                  </Button>
                </Grid>
              </Paper>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }

  joinGame() {
    
    // Get accounts.
    ethereumDice.deployed().then((instance) => {
      console.log(this.state.web3.fromWei(this.state.web3.eth.getBalance(this.state.web3.eth.coinbase),'ether'))
      instance.joinGame(this.state.nickname, {from: this.state.web3.eth.coinbase, gas: 78634})
    }).catch(e => {
      console.log('Error game join: ' + e)
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  makeBet() {
    if (!window.contractInstance) {
      this.initiateContract()
    }

    ethereumDice.deployed().then((instance) => {
        return instance.bet.sendTransaction({from: this.state.web3.eth.coinbase, value: this.state.value, gas: 418150})
    }).then((result) => {
        console.log('Transaction bet successfull: ' + result)
    }).catch((error) => {
        alert(error)
    }) 
  }

}

export default App
