import React, { Component } from 'react'
import { Button, TextField } from 'material-ui';

export default class StatusBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: null,
            balance: 0
        }

    }



    render() {
        return (
            <div>
                Account balance is a {this.state.balance}
            </div>
        );
    }
}
