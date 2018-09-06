import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewEvent } from '../store/actions/events';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { withRouter } from 'react-router-dom';


import 'react-datepicker/dist/react-datepicker.css';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      neighborhood: '',
      date: moment()
    }
  };

  handleNewEvent = e => {
    e.preventDefault();
    this.props.postNewEvent(this.state);
    this.setState({
      message: '',
      neighborhood: '',
      date: moment()
    });
    this.props.history.push('/events');

  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { title, neighborhood, date } = this.state;
    // const { history, removeError } = this.props;


    // if there is any change to route then we will call removeError
    // This will happen before anything is returned
    // history.listen(() => {
    //   removeError();
    // })

    return (

      <div>
        <h1>EVENT FORM!</h1>
        <form onSubmit={this.handleNewEvent}>
          {this.props.errors.message && (
            <div>
              {this.props.errors.message}
            </div>
          )}
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={this.handleChange}
          />
          <label htmlFor="neighborhood">Neighborhood</label>
          <input
            type="text"
            name="neighborhood"
            value={neighborhood}
            onChange={this.handleChange}
          />
          <DatePicker
            selected={date}
            onChange={date => this.setState({date: date})}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="LLL"
            timeCaption="time"
          />
          <button type="submit">
            Add New Event!
          </button>

        </form>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  }
}

export default withRouter(connect(mapStateToProps, { postNewEvent })(EventForm));
