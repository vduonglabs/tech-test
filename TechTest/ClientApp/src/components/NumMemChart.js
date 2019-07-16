import React, { Component } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class NumMemChart extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <BarChart width={600} height={300} data={this.props.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="key" label={{ value: 'Response', dy: 20 }} />
                    <YAxis label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft', offset: -10, dy: 20 }} />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </div>
        );
    }

};