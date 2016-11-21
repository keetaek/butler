const React = require('react');
const { Component, PropTypes } = require('react');
const { OverlayTrigger, Popover } = require('react-bootstrap');

export default class ButlerPopover extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    popoverContent: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired
  }

  static defaultProps = {
    showPopover: false
  }

  constructor(props) {
    super(props);
    this.state = { showPopover: false };
  }

  togglePopover() {
    this.refs.overlayContainer.toggle();
  }

  render() {
    const { children, popoverContent, id } = this.props;
    const content = (<Popover id={id}>{popoverContent}</Popover>);
    return (
      <span>
        <OverlayTrigger ref="overlayContainer" trigger="click" placement="bottom" overlay={content} rootClose>
          {children}
        </OverlayTrigger>
    </span>
    );
  }
}

module.exports = ButlerPopover;
