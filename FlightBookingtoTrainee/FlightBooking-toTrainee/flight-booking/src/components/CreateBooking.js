import React, { Component } from "react";
import axios from "axios";

const url = "http://localhost:1050/bookFlight/";
const url1 = "http://localhost:1050/getFlightIds/";

class CreateBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        customerId: "",
        flightId: "",
        noOfTickets: ""
      },
      formErrorMessage: {
        customerId: "",
        flightId: "",
        noOfTickets: ""
      },
      formValid: {
        customerId: false,
        flightId: false,
        noOfTickets: false,
        buttonActive: true
      },
      flightIds: [],
      errorMessage: "",
      successMessage: ""
    };
  }

  submitBooking = () => {
    /* 
      Make a POST request to http://localhost:1050/bookFlight/ with form data 
      and handle success and error cases 
    */
   axios.post(url, this.state.form)
   .then(response => {
    this.setState({
      successMessage: response.data.message,
      errorMessage: ''
    })
   }) 
   .catch(error => {  
     this.setState({
       errorMessage: error.response.data.message,
       successMessage: ''
     })
   })
    // alert(this.state.form.customerId+' '+this.state.form.flightId+' '+this.state.form.noOfTickets);
  }

  fetchFlightIds = () => {
    /* 
      Make a axios GET request to http://localhost:1050/getFlightIds/ to fetch the flightId's array 
      from the server and handle the success and error cases appropriately 
    */
    axios.get(url1)
    .then(response => {
      console.log(response.data)
      this.setState({ 
        flightIds: response.data  
      })
    }).catch(error => { 
      console.log(error)
    })
  }

  handleSubmit = event => {
    /* prevent page reload and invoke submitBooking() method */
    event.preventDefault();
    this.submitBooking();
    
   
  }

  handleChange = event => {
    /* 
      invoke whenever any change happens any of the input fields
      and update form state with the value. Also, Inoke validateField() method to validate the entered value
    */
   const obj = this.state.form
          obj[event.target.name] = event.target.value
      this.setState({
        form: obj,
      })
      this.validateField(event.target.name, event.target.value)
  }

  validateField = (fieldName, value) => {
    /* Perform Validations and assign error messages, Also, set the value of buttonActive after validation of the field */
    const obj = this.state.formErrorMessage
    const objValid = this.state.formValid
    if(!this.state.form[fieldName]){
      obj[fieldName] = fieldName+' cannot be empty'
      objValid[fieldName] = false
    }else if(fieldName === 'noOfTickets' && value > 10){
      obj[fieldName] = fieldName+' cannot be more than 10'
      objValid[fieldName] = false
    }
    else{
      obj[fieldName] = '' 
      objValid[fieldName] = true
    }

    if(objValid.customerId && objValid.flightId && objValid.noOfTickets){
      objValid.buttonActive = false
    } else{
      objValid.buttonActive = true
    }
    this.setState({
      formErrorMessage: obj,
      formValid: objValid
    }) 

  }

  componentDidMount() { 
    this.fetchFlightIds();
  }

  render() {
    return (
      <div className="CreateBooking ">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <br />
            <div className="card">
              <div className="card-header bg-custom">
                <h3 align="center">Flight Booking Form</h3>
              </div>
              <div className="card-body">
                {/* create form as per the view given in screenshots */}
                {/* Display success or error messages as given in QP */}
                <form onSubmit = {this.handleSubmit}>
                  <label className="card-text">
                    Customer Id
                  </label><br/>
                  <input 
                  className="form-control"
                  placeholder = 'e.g.- P1001'
                  name = 'customerId'
                  maxLength = "5"
                  value = {this.state.form.customerId}
                  onChange = {this.handleChange}
                  />
                  <span className="text-danger">{this.state.formErrorMessage.customerId}</span><br/>
                  <label>
                    Flight ID
                  </label><br/>
                  <select 
                  className="form-control"
                  name = 'flightId' 
                  value = {this.state.form.flightId}
                  onChange = {this.handleChange}
                  >
                    <option value =''>--Select Flight--</option>
                    {this.state.flightIds.map(fightId => <option key = {fightId} >{fightId}</option>)}
                  </select>
                  <span className="text-danger">{this.state.formErrorMessage.flightId}</span><br/>
                  <label>
                    Number of tickets
                  </label><br/>
                  <input 
                  className="form-control"
                  placeholder = 'min-1 max-10'
                  name = 'noOfTickets'
                  type="number"
                  maxLength = "2"
                  value = {this.state.form.noOfTickets}
                  onChange = {this.handleChange}
                  />
                  <span className="text-danger">{this.state.formErrorMessage.noOfTickets}</span><br/><br/>
                  <button className="btn btn-primary" type='submit' disabled={this.state.formValid.buttonActive}>Book Flight</button><br/>
                  <span className="text-danger">{this.state.errorMessage}</span>
                  <span className="text-success">{this.state.successMessage}</span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBooking;
