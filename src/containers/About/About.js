import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { Jumbotron } from 'react-bootstrap';
export default class About extends Component {

  render() {
    return (
      <div className="container">
        <Helmet title="About Us"/>

        <Jumbotron>
          <h1>Welcome to Butler!</h1>
          <p>Butler is an open source project to digitize any homeless shelter operations.
            The project was created to support volunteers and staffs of a homeless shelter to checkin their guests with the minimum hassle.

            This project was initially created by Keetaek Hong (<a href="https://www.linkedin.com/in/keetaek-hong-94115823" target="_blank">LinkedIn</a>)
          </p>
          <p>Currently, we are welcoming other contributors to solidify and improve its code base. <a
            href="https://github.com/keetaek/butler"
            target="_blank">GitHub</a>
          </p>
          <p>Please feel free to fork, adopt and deploy as you see fit </p>
        </Jumbotron>
      </div>
    );
  }
}
