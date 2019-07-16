import React, { Component } from 'react';

export default class NumMemButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <button
                className={'numpad-button ' + this.props.extraClassName}
                onClick={(event) => { event.preventDefault(); this.props.onClick(this.props.currentVal, this.props.charCode) }}>{this.props.displayValue}</button>
        );
    }
};