import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>

        <h3>Numerical Memory Assessment</h3>
        <ul>
          <li>The assessment will last for 60 seconds.</li>
          <li>The number to memorize will gradually get more difficult.</li>
          <li>You can enter the number using the keypad.</li>
          <li>10 points are awarded for each correct answer.</li>
        </ul>
            <p>To start the numerical memory assessment <Link to="/test">click here</Link>.</p>
      </div>
    );
  }
}
