import React, { Component } from 'react';
import moment from 'moment';

class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = this.setInitialDates();

    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setInitialDates() {
    // from URL OR
    let dates = this.getDatesFromURL();
    let start = moment().clone().subtract(1, 'days').format("YYYY-MM-DD");
    let end = moment().clone().format("YYYY-MM-DD");

    if (moment(dates.start, 'YYYY-MM-DD', true).format() != "Invalid date") {
        if (moment(dates.end, 'YYYY-MM-DD', true).format() != "Invalid date") {
            end = dates.end;
            start = dates.start;
        } else {
            start = dates.start;
        }
    }

    return {
      start: start,
      end: end
    }
  }

  getDatesFromURL() {
    return (location.href).split('?')[1].split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
  }

  writeDateToURL() {
    if (window.history && window.history.pushState) {
        var baseURL = location.href.split('?')[0];
        var newDate = this.jsonToQueryString(this.state);
        history.pushState(null, null, baseURL + newDate);
    }
  }

  jsonToQueryString(json) {
    return '?' +
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
  }

  setStartDate(event) {
    this.setState({ start: event.target.value });
    this.writeDateToURL(); // does old value
  }

  setEndDate(event) {
    this.setState({ end: event.target.value });
    this.writeDateToURL(); // does old value
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Date Range Start:
          <input type="date" value={this.state.start} onChange={this.setStartDate} required/>
        </label>
        <label>
          Date Range End:
          <input type="date" value={this.state.end} onChange={this.setEndDate} required/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default DateRangePicker;
