import React, { Component } from 'react';

export default class NumMemTimer extends Component {

    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));

        if (this.state.seconds === this.props.maxTime) {
            this.props.updateStatus('FINISH');
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);    
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <br />
                Elapsed Time: {this.state.seconds} sec
            </div>
        );
    }
};