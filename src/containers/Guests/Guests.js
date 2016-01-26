import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import {isLoaded, searchRequest, loadAll as loadGuests} from 'redux/modules/guests';
import FixedDataTable from 'fixed-data-table';
const {Table, Column, Cell} = FixedDataTable;

const DateCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col].toLocaleString()}
  </Cell>
);

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col]}
  </Cell>
);

function fetchData(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadGuests());
  }
}

function select(state) {
  return {
    guests: state.guests.data,
    filteredGuests: state.guests.filteredData,
    error: state.guests.error,
    loading: state.guests.loading
  };
}

@connectData(fetchData)
@connect(select)
export default class Guests extends Component {
  static propTypes = {
    guests: PropTypes.array,
    filteredGuests: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this._onFilterChange = this._onFilterChange.bind(this);
    require('fixed-data-table/dist/fixed-data-table.min.css');
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

  render() {
    const { filteredGuests } = this.props;
    const styles = require('./Guests.scss');
    return (
      <div className="container">
        <h1>Guests</h1>
        <Helmet title="Guests"/>
        <div>
          <input
            onChange={this._onFilterChange}
            className={styles.search_input + ' form-control'}
            placeholder="Filter by first, last or nickname"
          />
          <Table
            rowHeight={50}
            headerHeight={50}
            rowsCount={filteredGuests.length}
            width={1000}
            height={500}
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
              header={<Cell>DOB</Cell>}
              cell={<DateCell data={filteredGuests} col="birthdate" />}
              width={200}
            />
          </Table>
        </div>
      </div>
    );
  }
}
