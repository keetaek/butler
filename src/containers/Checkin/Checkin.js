import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar } from 'components';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Checkin extends Component {

  state = {
    showKitten: false
  }

  handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});

  render() {
    const {showKitten} = this.state;
    const kitten = require('./kitten.jpg');
    return (
      <div className="container">
        <h1>Check in</h1>
        <Helmet title="Check-in"/>

          <Grid>
            <Row className="show-grid">
              <Col xs={12} md={8}><code>&lt;{'Col xs={12} md={8}'} /&gt;</code></Col>
              <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
            </Row>

            <Row className="show-grid">
              <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
              <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
              <Col xsHidden md={4}><code>&lt;{'Col xsHidden md={4}'} /&gt;</code></Col>
            </Row>

            <Row className="show-grid">
              <Col xs={6} xsOffset={6}><code>&lt;{'Col xs={6} xsOffset={6}'} /&gt;</code></Col>
            </Row>

            <Row className="show-grid">
              <Col md={6} mdPush={6}><code>&lt;{'Col md={6} mdPush={6}'} /&gt;</code></Col>
              <Col md={6} mdPull={6}><code>&lt;{'Col md={6} mdPull={6}'} /&gt;</code></Col>
            </Row>
          </Grid>

        <p>This project was originally created by Erik Rasmussen
          (<a href="https://twitter.com/erikras" target="_blank">@erikras</a>), but has since seen many contributions
          from the open source community. Thank you to <a
            href="https://github.com/erikras/react-redux-universal-hot-example/graphs/contributors"
            target="_blank">all the contributors</a>.
        </p>

        <h3>Mini Bar <span style={{color: '#aaa'}}>(not that kind)</span></h3>

        <p>Hey! You found the mini info bar! The following component is display-only. Note that it shows the same
          time as the info bar.</p>

        <MiniInfoBar/>

        <h3>Images</h3>

        <p>
          Psst! Would you like to see a kitten?

          <button className={'btn btn-' + (showKitten ? 'danger' : 'success')}
                  style={{marginLeft: 50}}
                  onClick={this.handleToggleKitten}>
            {showKitten ? 'No! Take it away!' : 'Yes! Please!'}</button>
        </p>

        {showKitten && <div><img src={kitten}/></div>}
      </div>
    );
  }
}
