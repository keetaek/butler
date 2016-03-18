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
    submitHandler: PropTypes.func,
    // submitting is to show different label in the submit button while the service call is made.
    submitting: PropTypes.bool
  }

  static defaultProps = {
    showModal: false
  }

  close() {
    this.props.onClose();
  }


  render() {
    const { showModal, title, children, cancelButtonLabel, submitButtonLabel, cancelHandler, submitHandler, submitting } = this.props;
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
          <Button bsStyle="primary" disabled={submitting} onClick={!submitting ? submitHandler : null}>{submitting ? 'In progress' : submitButtonLabel}</Button>
        </Modal.Footer>
      </Modal>
    </span>
    );
  }
}
