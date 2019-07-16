import React, { Component, useState } from 'react';
import NumMemButton from './NumMemButton';
import NumMemTimer from './NumMemTimer';
import NumMemResults from './NumMemResults';
import './NumMem.css';

export  class NumMem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentStatus: '',
            currentVal: '',
            currentTestItem: null,
            currentTestItemIndex: -1,
            currentTestItemStartDate: new Date(),
            testItems: []
        }
        
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown, false);

        fetch('https://localhost:44300/api/testdata')
            .then(res => res.json())
            .then((data) => {
                this.setState({ testItems: data });
                this.showNewVal();
            })
            .catch(console.log)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    showNewVal() {

        const nextItemIndex = this.state.currentTestItemIndex + 1;
        const nextItem = this.state.testItems[nextItemIndex];
        const nextItemNum = nextItem == null ? '' : nextItem.num;

        nextItem.status = 'shown';

        this.setState({
            currentStatus: 'SHOW_TEST_ITEM',
            currentTestItemIndex: nextItemIndex,
            currentTestItem: nextItem,
            currentVal: nextItemNum
        });

        setTimeout(() => {
            if (this.state.currentStatus == 'FINISH') {
                return;
            }

            this.setState({
                currentVal: '',
                currentTestItemStartDate: new Date(),
                currentStatus: 'HIDE_TEST_ITEM'
            });
        }, 3000)
    }

    handleKeyDown = (event) => {
        event.preventDefault();
        this.keyDownLogic(this.state.currentVal, event.keyCode);
    }

    keyDownLogic = (currentVal, charCode) => {

        if (this.state.currentStatus == 'FINISH' || this.state.currentStatus == 'SHOW_TEST_ITEM') {
            return;
        }

        if (charCode >= 48 && charCode <= 57) {
            const res = String.fromCharCode(charCode)
            this.setState({
                currentVal: currentVal + res,
            });
        } else if (charCode == 8) {
            this.setState({
                currentVal: currentVal.slice(0, -1),
            });
        } else if (charCode == 13) {

            let currentVal = this.state.currentVal;

            if (currentVal == null || currentVal.length == 0) {
                return;
            }

            this.updateTestItem(currentVal);
            this.showNewVal();
        }
    }

    updateTestItem = (currentVal) => {

        const currentTestItem = this.state.currentTestItem;
        const currentTestItemStartDate = this.state.currentTestItemStartDate;

        const currentTestItemEndDate = new Date();
        const secondsDiff = currentTestItemEndDate.getTime() - currentTestItemStartDate.getTime();

        currentTestItem.time = secondsDiff;

        currentTestItem.input = currentVal;

        if (currentVal == currentTestItem.num) {
            currentTestItem.status = 'correct';
        } else {
            currentTestItem.status = 'incorrect';
        }
    }

    statusLogic = (currentStatus) => {
        this.setState({
            currentStatus: currentStatus,
        });
    }

    defaultLayout = (currentVal, currentStatus, maxTime) => {

        let numpadStyle = {};
        let labelStyle = {};

        if (currentStatus == 'SHOW_TEST_ITEM') {
            numpadStyle = { 'opacity': .5 };
            labelStyle = { 'background-color': '#4567ED', 'color': 'white' };
        }

        return (
            <div>
                <div className="input-container">
                    <label className="input" style={labelStyle}>{currentVal}</label>
                </div>
                <div className="numpad-container">

                    <div className="numpad-buttons" style={numpadStyle}>
                        <NumMemButton onClick={this.keyDownLogic} currentVal={currentVal} charCode={55} displayValue={7} />
                        <NumMemButton onClick={this.keyDownLogic} currentVal={currentVal} charCode={56} displayValue={8} />
                        <NumMemButton onClick={this.keyDownLogic} currentVal={currentVal} charCode={57} displayValue={9} />
                        <NumMemButton onClick={this.keyDownLogic} currentVal={currentVal} charCode={52} displayValue={4} />
                        <NumMemButton onClick={this.keyDownLogic} currentVal={currentVal} charCode={53} displayValue={5} />
                        <NumMemButton onClick={this.keyDownLogic} currentVal={currentVal} charCode={54} displayValue={6} />
                        <NumMemButton onClick={this.keyDownLogic} currentVal={currentVal} charCode={49} displayValue={1} />
                        <NumMemButton onClick={this.keyDownLogic} currentVal={currentVal} charCode={50} displayValue={2} />
                        <NumMemButton onClick={this.keyDownLogic} currentVal={currentVal} charCode={51} displayValue={3} />
                        <NumMemButton onClick={this.keyDownLogic} currentVal={currentVal} charCode={48} displayValue={0} />
                        <NumMemButton extraClassName="is-del" onClick={this.keyDownLogic} currentVal={currentVal} charCode={8} displayValue={'DEL'} />
                        <NumMemButton extraClassName="is-enter" onClick={this.keyDownLogic} currentVal={currentVal} charCode={13} displayValue={'ENTER'} />
                    </div>
                </div>
                <NumMemTimer updateStatus={this.statusLogic} maxTime={maxTime} />
            </div>
         );
    }

    resultLayout = () => {

        return (
            <NumMemResults testState={this.state} />
         );
    }

    render() {
        const { currentVal, currentStatus } = this.state;

        if (currentStatus !== 'FINISH') {
            return this.defaultLayout(currentVal, currentStatus, 60);
        } else {
            return this.resultLayout();
        }
    }
}