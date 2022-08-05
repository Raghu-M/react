import React, { Component } from "react";
import axios from "axios";

const url = "http://localhost:1050/updatebooking/";

class UpdateBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                bookingId: "",
                noOfTickets: ""
            },
            formErrorMessage: {
                bookingId: "",
                noOfTickets: ""
            },
            formValid: {
                bookingId: true,
                noOfTickets: false,
                buttonActive: true
            },
            successMessage: "",
            errorMessage: "",
            id: this.props.match.params.bookingId
        };
    }


    updateBooking = () => {
        /* 
          Make a axios PUT request to http://localhost:1050/updatebooking/ to update the number of tickets 
          for the selected bookingId and handle the success and error cases appropriately 
        */
       axios.put(url+this.state.id, this.state.form)
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
    }

    handleSubmit = (event) => {
        /* prevent page reload and invoke updateBooking() method */
        event.preventDefault();
        this.updateBooking();
        
    }

    handleChange = (event) => {
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
        }else if(fieldName === 'noOfTickets' && (value > 10 || value < 1)) {
          obj[fieldName] = fieldName+' should be between 1 and 10'
          objValid[fieldName] = false
        }
        else{
          obj[fieldName] = '' 
          objValid[fieldName] = true
        }
    
        if(objValid.bookingId && objValid.noOfTickets){
          objValid.buttonActive = false
        } else{
          objValid.buttonActive = true
        }
        this.setState({
          formErrorMessage: obj,
          formValid: objValid
        }) 
    }

    render() {
        console.log(this.state.id)
        return (
            <React.Fragment>
                <div className="UpdateBooking">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <br />
                            <div className="card">
                                <div className="card-header bg-custom">
                                    <h4>Update Flight Booking for id: {this.state.id}</h4>
                                </div>
                                <div className="card-body">
                                    {/* code appropriately to render the form as shown in QP */}
                                    {/* display the success and error messages appropriately */}
                                    <form onSubmit = {this.handleSubmit}>
                                    <label className="card-text">
                                        Booking Id
                                    </label><br/>
                                    <input 
                                    className="form-control"    
                                    name = 'bookingId'
                                    maxLength = "5"
                                    disabled = {true}
                                    value = {this.state.id}
                                    onChange = {this.handleChange}
                                    />
                                    <label>
                                        Number of tickets
                                    </label><br/>
                                    <input 
                                    className="form-control"
                                    placeholder = 'min-1 max-10'
                                    name = 'noOfTickets'
                                    type="number"
                                    value = {this.state.form.noOfTickets}
                                    onChange = {this.handleChange}
                                    />
                                    <span className="text-danger">{this.state.formErrorMessage.noOfTickets}</span><br/><br/>
                                    <button className="btn btn-primary" type='submit' disabled={this.state.formValid.buttonActive}>Update Booking</button><br/>
                                    <span className="text-danger">{this.state.errorMessage}</span>
                                    <span className="text-success">{this.state.successMessage}</span>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default UpdateBooking;