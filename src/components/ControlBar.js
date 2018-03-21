import React, { Component } from 'react'
import { Button, TextField } from 'material-ui';

export default class ControlBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: 0,
            web3: null,
            instance: null,
            account: null,
            nickname: "User"
        }
    }

    componentWillReceiveProps

    render() {
        return (
            <div>
                <TextField 
                    onChange={ event => this.onAccountChange( event.target.value) }
                />
                <TextField 
                    onChange={ event => this.onNicknameChange( event.target.value) }
                />
                <Button onClick={() => this.joinGame()}
                    variant="raised" 
                >
                    Join game
                </Button>

                <TextField onChange={ event =>  this.onBetChange( event.target.value) }
                />

                <Button 
                    onClick={() => this.makeBet()}
                    variant="raised" 
                >
                    Make bet
                </Button>
            </div>
        );
    }

    makeBet() {
        this.state.contractInstance.deployed().then((instance) => {
            return instance.bet.sendTransaction({from: this.this.account, value: this.state.value})
        }).then((result) => {
            console.log('Transaction bet successfull: ' + result)
        }).catch((error) => {
            alert(error)
        })

    }

    joinGame() {
        this.state.contract.deployed().then((instance) => {
            return instance.joinGame(this.state.nickname, {from: this.props.account})
        }).then((result) => {
            console.log('Transaction join successfull: ' + result)
        }).catch((error) => {
            alert(error)
        })
    }

    onBetChange(value) {
        this.setState({value})
    }

    onAccountChange(account) {
        this.setState({account})
    }

    onNicknameChange(nickname) {
        this.setState({nickname})
    }
}
