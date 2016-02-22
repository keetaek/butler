import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { searchRequest, loadAll as loadGuests} from 'redux/modules/guests';
import FixedDataTable from 'fixed-data-table';
const {Table, Column, Cell} = FixedDataTable;
const Link = require('react-router').Link;
const { Button, Glyphicon } = require('react-bootstrap');
const AddGuestForm = require('./addGuestForm');
const FormModal = require('../FormModal/FormModal');
const moment = require('moment');

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

const CheckinCell = ({rowIndex, data, col, checkinHandler, ...props}) => (
  <Cell {...props}>
    <Link to={`/checkin/${data[rowIndex][col]}`} onClick={checkinHandler} >Checkin</Link>
  </Cell>
);

function select(state) {
  return {
    guests: state.guests.data,
    filteredGuests: state.guests.filteredData,
    error: state.guests.error,
    loading: state.guests.loading,
    loaded: state.guests.loaded,
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
    isCheckin: PropTypes.bool.isRequired,
    checkinHandler: PropTypes.func,
    postAddGuestHandler: PropTypes.func,
    dispatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    isCheckin: false,
  }
  constructor(props) {
    super(props);
    this._onFilterChange = this._onFilterChange.bind(this);
    require('fixed-data-table/dist/fixed-data-table.min.css');
    this.state = {
      showModal: false
    };
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

  openModal() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
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

  addGuestHandler() {
    console.log('Getting into addGuestHandler');
    this.closeModal();
    if (this.props.postAddGuestHandler) {
      this.props.postAddGuestHandler();
    }
  }

  render() {
    const { filteredGuests, loaded, isCheckin, checkinHandler } = this.props;
    const styles = require('./GuestList.scss');
    if (!loaded) {
      return (
        <p> Loading ... </p>
      );
    }
    if (isCheckin) {
      return (
        <div className={styles.guest_search_container}>
          <input
            onChange={this._onFilterChange}
            className={styles.search_input + ' form-control'}
            placeholder="Filter by first, last or nickname"
          />
        <Button bsStyle="primary" onClick={::this.openModal} className={styles.right_top_action_button}><Glyphicon glyph="plus" /> Add New Guest </Button>
          <Table
            rowHeight={50}
            headerHeight={50}
            rowsCount={filteredGuests.length}
            width={600}
            height={300}
            {...this.props}>
            <Column
              header={<Cell>First Name</Cell>}
              cell={<TextCell data={filteredGuests} col="first_name" />}
              fixed
              width={100}
            />
            <Column
              header={<Cell>Last Name</Cell>}
              cell={<TextCell data={filteredGuests} col="last_name" />}
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
              width={200}
            />
            <Column
              header={<Cell>Checkin</Cell>}
              cell={<CheckinCell data={filteredGuests} col="id" checkinHandler = {checkinHandler} />}
              width={100}
            />
          </Table>
          <FormModal showModal={this.state.showModal} onClose={::this.closeModal} title={'Add New Guest'}>
            <AddGuestForm postSubmitAction={::this.addGuestHandler} />
          </FormModal>
        </div>
      );
    }
    return (
      <div className={styles.guest_search_container}>
        <input
          onChange={this._onFilterChange}
          className={styles.search_input + ' form-control'}
          placeholder="Filter by first, last or nickname"
        />
      <Button bsStyle="primary" onClick={::this.openModal} className={styles.right_top_action_button}><Glyphicon glyph="plus" /> Add New Guest </Button>
        <Table
          rowHeight={50}
          headerHeight={50}
          rowsCount={filteredGuests.length}
          width={600}
          height={300}
          {...this.props}>
          <Column
            header={<Cell>First Name</Cell>}
            cell={<TextCell data={filteredGuests} col="first_name" />}
            fixed
            width={100}
          />
          <Column
            header={<Cell>Last Name</Cell>}
            cell={<TextCell data={filteredGuests} col="last_name" />}
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
            width={200}
          />
        </Table>
        <FormModal showModal={this.state.showModal} onClose={::this.closeModal} title={'Add New Guest'}>
          <AddGuestForm postSubmitAction={::this.addGuestHandler} />
        </FormModal>
      </div>
    );
  }
}
