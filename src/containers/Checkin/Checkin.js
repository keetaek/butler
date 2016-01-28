import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-bootstrap';
import { GuestList } from 'components';
const Modal = require('react-modal');
const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: 2
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    zIndex: 3,
    transform: 'translate(-50%, -50%)'
  }
};
export default class Checkin extends Component {

  static propTypes = { initialModalState: React.PropTypes.boolean };
  static defaultProps = {
    initialModalState: false
  }

  constructor(props) {
    super(props);
    this.state = { modalIsOpen: this.props.initialModalState };
  }

  checkinHandler(event) {
    event.preventDefault();
    // const dest = event.target.href;
    // const path = event.target.pathname;
    this.openModal();
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="container">
        <h1>Check in</h1>
        <Helmet title="Check-in"/>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles} >

            <h2>Hello</h2>
            <button onClick={this.closeModal}>close</button>
            <div>I am a modal</div>
            <form>
              <input />
              <button>tab navigation</button>
              <button>stays</button>
              <button>inside</button>
              <button>the modal</button>
            </form>
          </Modal>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <GuestList {...this.props} isCheckin checkinHandler={::this.checkinHandler} />
            </Col>
            <Col xs={6} md={4}>
              <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
