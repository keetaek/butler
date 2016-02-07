const React = require('react');
const { Component, PropTypes } = require('react');
const { Button, Modal } = require('react-bootstrap');


export default class GuestList extends Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired
  }

  static defaultProps = {
    showModal: false
  }

  close() {
    this.props.onClose();
  }

  render() {
    const { showModal, title, children } = this.props;
    return (
      <span>
        <Modal show={showModal} onHide={::this.close}>
          <Modal.Header closeButton>
           <Modal.Title>{title}</Modal.Title>
         </Modal.Header>
          <Modal.Body>
            {children}
          </Modal.Body>
        </Modal>
    </span>
    );
  }
}
