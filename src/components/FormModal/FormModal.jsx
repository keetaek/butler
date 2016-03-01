const React = require('react');
const { Component, PropTypes } = require('react');
const { Modal, Button } = require('react-bootstrap');


export default class FormModal extends Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    cancelButtonLabel: PropTypes.string.isRequired,
    submitButtonLabel: PropTypes.string.isRequired,
    cancelHandler: PropTypes.func,
    submitHandler: PropTypes.func
  }

  static defaultProps = {
    showModal: false
  }

  close() {
    this.props.onClose();
  }


  render() {
    const { showModal, title, children, cancelButtonLabel, submitButtonLabel, cancelHandler, submitHandler } = this.props;
    return (
      <span>
        <Modal show={showModal} onHide={::this.close} bsSize="large">
          <Modal.Header closeButton>
           <Modal.Title>{title}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" onClick={cancelHandler}>{cancelButtonLabel}</Button>
          <Button bsStyle="primary" onClick={submitHandler}>{submitButtonLabel}</Button>
        </Modal.Footer>
      </Modal>
    </span>
    );
  }
}
