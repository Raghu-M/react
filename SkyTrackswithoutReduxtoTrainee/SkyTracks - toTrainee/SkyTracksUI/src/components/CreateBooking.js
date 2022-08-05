import React, { Component } from "react";
import axios from "axios";
import GetFlights from './GetFlights';
import BookingDetailsCard from './BookingDetailsCard';

const url = "http://localhost:1050/bookFlight/";

class CreateBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingDetails:this.props.bookingDetails,
      passengerData:[],
      form: {
        firstName: "",
        lastName:"",
        title: "",
        age:""
      },
      formErrorMessage: {
        firstNameError: "",
        lastNameError:"",
        ageError:""
      },
      formValid: {
        firstName: false,
        lastName:false,
        age:false,
        buttonActive:false
      },
      errorMessage: "",
      successMessage: "",
      goBack: false
    };
  }

  book = () => {
    let bookingData = this.state.bookingDetails;
    bookingData.passengerDetails = this.state.passengerData;

    // Make axios post request to post the bookingData to the given URL
    // populate the successMessage object or the errorMessage
    axios.post(url, bookingData).
    then(response => {
      console.log(response.data)
      this.setState({
        successMessage: response.data
      })
    }).
    catch(error => {
      this.setState({
        errorMessage: error.response.data.message
      })
    })
  };
1 
  handleChange = event => {
    // Get the names and values of the input fields
    // Update the formValue object in state
    // Call the validateField method by passing the name and value of the input field
    let obj = this.state.form
    obj[event.target.name] = event.target.value
    this.setState({
        form: obj
    })
  };

  validateField = (fieldName, value) => {
    // Validate the values entered in the input fields
    // Update the formErrorMessage and formValid objects in the state
  };
  setPassengerData = ()=>{
    // Update the passengerData array in state
    // reset the form and the formValid object in state
    let temp = this.state.passengerData
    temp.push(this.state.form)
    this.setState({
      passengerData: temp,
      form: {
        firstName: "",
        lastName:"",
        title: "",  
        age:""
      }
    })
  }
  getPassengerData = ()=>{
    if(this.state.passengerData.length<Number(this.state.bookingDetails.noOfTickets)){
      return(
        <React.Fragment>
          <div className="card bg-card text-light mb-4">
          <div className="card-body">
            <h6>Passenger {this.state.passengerData.length+1}</h6>
              <div className="row">

                {/* Add name, value, placeholder attributes to the below select dropdown, inputs and button */}
                {/* Also add appropriate event handlers */}

                <div className="col-md-8">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <select className="btn btn-light" name="title" onChange={this.handleChange} value={this.state.form.title} >
                        <option value="" >Title</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                      </select>
                    </div>
                    <input type="text" className="form-control" placeholder="First Name" name="firstName" value={this.state.form.firstName} onChange={this.handleChange}/>
                    <input type="text" className="form-control" placeholder="Last Name" name="lastName"value={this.state.form.lastName} onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <input type="number" className="form-control" placeholder="Age" name="age" value={this.state.form.age} onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="col-md-2 text-center">
                  <button className="btn btn-primary font-weight-bolder" onClick={this.setPassengerData}>Add</button>
                </div>
              </div>
              <div className="text-danger">

                {/* Display the formErrorMessages here */}

              </div>
          </div>
        </div>
        </React.Fragment>
      )
    }
  }
  displayBookingSuccess=()=>{
    return(
      <React.Fragment>
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="card bg-card custom-card text-light">
                <div className="card-body">

                  {/* Add the booking ID to the below heading, from the successMessage object */}
                  <h4 className="text-success">Booking successful with booking ID: {this.state.successMessage.bookingId}</h4>

                  {/* Display the booking details here by rendering the BookingDetailsCard component and passing successMessage as props*/}

                </div>
                <div className="card-footer">

                  {/* Add the Home button here */}
                  <button className="btn btn-warning btn-block" onClick = {() => this.setState({goBack: true})}>Home</button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
  render() {
    if(this.state.goBack){
      // Display the GetFlights page by rendering the GetFlights component
      return <GetFlights></GetFlights>
    }
    if(this.state.successMessage===""){ 
      return(
        <div className="container mt-5">
            <div className="row">
              <div className="col-lg-7">
                {
                  this.state.passengerData.length>0 ? (
                    this.state.passengerData.map((passenger,index)=>{
                      return(
                        <div className="card bg-card text-light mb-4" key={index}>
                          <div className="card-body">
                            <div className="text-custom">Passenger {index+1}</div>
                            <h4>{passenger.title} {passenger.firstName} {passenger.lastName}, {passenger.age}</h4>
                          </div>
                        </div>
                      )
                    })
                  ): null
                }
                {this.getPassengerData()}
              </div>
              <div className="col-lg-4 offset-lg-1">
                <div name="flightDetails" className="card bg-card text-light">
                  <div className="card-body">
                    
                    {/* Display the booking details here by rendering the BookingDetailsCard component and passing bookingDetails in state as props*/}
                    <BookingDetailsCard bookingDetails = {this.state.bookingDetails}></BookingDetailsCard>

                  </div>
                  <div className="card-footer">

                    {/* Add the book, home buttons here and display axios error messages here */}
                    <button className="btn btn-primary btn-block" onClick={this.book}>Book</button>
                    <button className="btn btn-warning btn-block" onClick = {() => this.setState({goBack: true})}>Home</button>

                  </div>
                </div>
              </div>
            </div>
        </div>
      )
    } else{
        return this.displayBookingSuccess();
    }
  }
}

export default CreateBooking;
