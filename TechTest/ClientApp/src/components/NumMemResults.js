import React, { Component } from 'react';
import NumMemChart from './NumMemChart';

export default class NumMemResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: {}
        };
    }

    componentDidMount() {
        fetch('https://localhost:44300/api/testResult', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.testState.testItems)
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            this.setState({ result: result });
            },
              (error) => {
                    console.log(error);
              });
    }

    render() {

        const { result } = this.state;

        return (
            <div>
                <div className="result-container">
                    <h2>Results</h2>
                    <div>
                        <div className="result-text">
                            <span>Score: {result.score}</span><br />
                            <span>Correct Response: {result.correct}/{result.total}</span>
                        </div>
                       
                        <NumMemChart data={result.times}/>
                    </div> 
                </div>
            </div>
        );
    }
};