import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { searchRequest, loadAll as loadGuests} from 'redux/modules/guests';
import FixedDataTable from 'fixed-data-table';
const {Table, Column, Cell} = FixedDataTable;
const Link = require('react-router').Link;
const { Button, Glyphicon } = require('react-bootstrap');
const GuestForm = require('components/GuestList/GuestForm');
const FormModal = require('components/FormModal/FormModal');
const moment = require('moment');
const { addNewGuest, updateGuest, startGuestForm, finishGuestForm } = require('redux/modules/guests');

const DateCell = ({rowIndex, data, col, ...props}) => {
  const dateField = data[rowIndex][col];
  const formattedDate = dateField ? moment(dateField).format('MM/DD/YYYY') : '';
  return (<Cell {...props}>
    {formattedDate}
  </Cell>);
};

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col]}
  </Cell>
);

const ActionCell = ({rowIndex, data, col, actionLabel, actionHandler, ...props}) => (
  <Cell {...props}>
    <Link to={`/${actionLabel}/${data[rowIndex][col]}`} onClick={actionHandler(data[rowIndex])}>{actionLabel}</Link>
  </Cell>
);

function select(state) {
  return {
    guests: state.guests.data,
    filteredGuests: state.guests.filteredData,
    error: state.guests.error,
    loading: state.guests.loading,
    loaded: state.guests.loaded,
    submitting: state.guests.submitting,
    showGuestModal: state.guests.showGuestModal,
    selectedGuest: state.guests.selectedGuest
  };
}

@connect(select)
export default class GuestList extends Component {
  static propTypes = {
    guests: PropTypes.array,
    filteredGuests: PropTypes.array,
    error: PropTypes.object,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    submitting: PropTypes.bool,
    actionLabel: PropTypes.string.isRequired,
    actionHandler: PropTypes.func,
    showGuestModal: PropTypes.bool,
    selectedGuest: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this._onFilterChange = this._onFilterChange.bind(this);
    require('fixed-data-table/dist/fixed-data-table.min.css');
  }
  /**
   * Loading the data if not loaded yet.
   * @return {[type]} [description]
   */
  componentWillMount() {
    if (!this.props.loaded) {
      return this.props.dispatch(loadGuests());
    }
  }

  getFormSubmitAction(data, guest) {
    let action;
    if (guest) {
      action = updateGuest(guest, data);
    } else {
      action = addNewGuest(data);
    }
    return action;
  }

  closeModal() {
    this.props.dispatch(finishGuestForm());
  }

  _onFilterChange(event) {
    let filterBy;
    if (!event || !event.target.value) {
      filterBy = '';
    } else {
      filterBy = event.target.value.toLowerCase();
    }
    this.props.dispatch(searchRequest(filterBy));
  }

  handleSubmit() {
    this.refs.guestForm.submit();  // will return a promise
  }

  addNewGuestHandler() {
    this.props.dispatch(startGuestForm());
  }
  render() {
    const { filteredGuests, loaded, actionLabel, actionHandler, showGuestModal, selectedGuest, submitting, dispatch } = this.props;
    const styles = require('./GuestList.scss');
    const formTitle = selectedGuest ? 'Update Guest' : 'Add New Guest';
    if (!loaded) {
      return (
        <p> Loading ... </p>
      );
    }

    return (
      <div className={styles.guest_search_container}>
        <input
          onChange={this._onFilterChange}
          className={styles.search_input + ' form-control'}
          placeholder="Filter by first, last or nickname"
        />
      <Button bsStyle="primary" onClick={::this.addNewGuestHandler} className={styles.right_top_action_button}><Glyphicon glyph="plus" /> Add New Guest </Button>
        <Table
          rowHeight={50}
          headerHeight={50}
          rowsCount={filteredGuests.length}
          width={600}
          height={500}
          {...this.props}>
          <Column
            header={<Cell>First Name</Cell>}
            cell={<TextCell data={filteredGuests} col="firstName" />}
            fixed
            width={100}
          />
          <Column
            header={<Cell>Last Name</Cell>}
            cell={<TextCell data={filteredGuests} col="lastName" />}
            fixed
            width={100}
          />
          <Column
            header={<Cell>Nickname</Cell>}
            cell={<TextCell data={filteredGuests} col="nickname" />}
            fixed
            width={100}
          />
          <Column
            header={<Cell>Birthdate</Cell>}
            cell={<DateCell data={filteredGuests} col="birthdate" />}
            width={150}
          />
          <Column
            header={<Cell>Action</Cell>}
            cell={<ActionCell data={filteredGuests} col="id" actionLabel={actionLabel} actionHandler={actionHandler} />}
            width={150}
          />
        </Table>
        <FormModal showModal={showGuestModal} onClose={::this.closeModal} cancelButtonLabel={'Cancel'} submitButtonLabel={'Submit'} submitting={submitting} cancelHandler={::this.closeModal} submitHandler={::this.handleSubmit} title={formTitle}>
          <GuestForm ref="guestForm" initialValues={selectedGuest} onSubmit={data => {
            dispatch(this.getFormSubmitAction(data, selectedGuest));
          }}/>
        </FormModal>
      </div>
    );
  }
}
