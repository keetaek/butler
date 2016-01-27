import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { searchRequest, loadAll as loadGuests} from 'redux/modules/guests';
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

function select(state) {
  return {
    guests: state.guests.data,
    filteredGuests: state.guests.filteredData,
    error: state.guests.error,
    loading: state.guests.loading,
    loaded: state.guests.loaded
  };
}

@connect(select)
export default class GuestList extends Component {
  static propTypes = {
    guests: PropTypes.array,
    filteredGuests: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
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
    const { filteredGuests, loaded } = this.props;
    const styles = require('./GuestList.scss');
    if (!loaded) {
      return (
        <p> Loading ... </p>
      );
    }
    return (
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
    );
  }
}
