import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import FlightDetails from './flightDetails';


const url = "http://localhost:1050/getFlights/";

export default class GetFlights extends Component {
    constructor(props){
        super(props);
        this.state = {
            availableFlights:null,
            form:{
                origin: "",
                destination: "",
                departureDate: "",
                noOfTickets: ''
            },
            formErrorMessage:{
                originError: "",
                destinationError: "",
                departureDateError: "",
                noOfTicketsError: ""
            },
            formValid:{
                originfield: false,
                destinationfield: false,
                departureDatefield: false,
                noOfTicketsfield: false,
                buttonActive:true,
            },
            errorMessage:"",
            
        }
    }
    submitBooking = () => {
        // Make an axios get request to get the flights in the specified route
        // populate the availableFlights or errorMessage appropriately
        axios.get(url+this.state.form.origin+'/'+this.state.form.destination)
        .then(response =>{
            console.log(response.data)
            this.setState({
                availableFlights: response.data
            })
            this.state.availableFlights
        })
        .catch(error => {
            this.setState({
                errorMessage: error.response.data.message
            })
        })
    };
    handleSubmit = event => {
        // Prevent the default behaviour of form submission
        // Call appropriate method to make the axios get request
        event.preventDefault()
        this.submitBooking()
        console.log(this.state.form)
    };
    handleChange = event => {
        // Get the names and values of the input fields
        // Update the formValue object in state
        // Call the validateField method by passing the name and value of the input field
        let change = this.state.form
        change[event.target.name] = event.target.value
        this.setState({
            form: change
        })
        this.validateField(event.target.name, event.target.value)
    };
    validateField = (fieldName, value) => {
        // Validate the values entered in the input fields
        // Update the formErrorMessage and formValid objects in the state
        let errorObj = this.state.formErrorMessage
        let errorFlag = this.state.formValid
        if(value === ''){
            errorObj[fieldName+'Error'] = 'field required'
            errorFlag[fieldName+'field'] = true
        } else{
            errorObj[fieldName+'Error'] = ''    
            errorFlag[fieldName+'field'] = false
        }

        this.setState({
            formErrorMessage: errorObj,
            formValid: errorFlag
        })
    };
    render(){
        if(this.state.availableFlights!=null){
            // Pass appropriate props to the FlightDetails component below
            return <FlightDetails availableFlights={this.state.availableFlights} flightData={this.state.form}></FlightDetails>
        } else{ 
            return(
                <React.Fragment>
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-lg-4 offset-lg-1">
                                <div className="card bg-card text-light ">
                                    <div className="card-body">
                                        {/* Create the form here */}
                                        <form onSubmit={this.handleSubmit}>
                                            <label>Origin</label><br/>
                                            <input className="form-control" placeholder='Origin' name='origin' value={this.state.form.origin} onChange={this.handleChange} />
                                            {this.state.formValid.originfield ? <span className="text-danger text-sm">{this.state.formErrorMessage.originError}<br/></span> : <br/>}
                                            <label>Destination</label><br/>
                                            <input className="form-control" placeholder='Destination' name='destination' value={this.state.form.destination} onChange={this.handleChange} />
                                            {this.state.formValid.destinationfield ? <span className="text-danger text-sm">{this.state.formErrorMessage.destinationError}<br/></span> : <br/>}
                                            <label>Departure Date</label><br/>
                                            <input className="form-control" type='date' placeholder='mm/dd/yyyy' name='departureDate' value={this.state.form.departureDate} onChange={this.handleChange} />
                                            {this.state.formValid.departureDatefield ? <span className="text-danger text-sm">{this.state.formErrorMessage.departureDateError}<br/></span> : <br/>}
                                            <label>No Of Tickets</label><br/>
                                            <input className="form-control" placeholder='0' type='number' name='noOfTickets' value={this.state.form.noOfTickets} onChange={this.handleChange} />
                                            {this.state.formValid.noOfTicketsfield ? <span className="text-danger text-sm">{this.state.formErrorMessage.noOfTicketsError}<br/></span> : <br/>}
                                            <button type='submit' className="btn btn-primary btn-block">View Flights</button>
                                            {this.state.errorMessage ? <span className="text-danger text-sm">{this.state.errorMessage}<br/></span> : ''}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }

}