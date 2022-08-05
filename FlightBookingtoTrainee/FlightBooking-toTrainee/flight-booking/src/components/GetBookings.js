import React, { Component } from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

const url = "http://localhost:1050/getAllBookings/";
const url1 = "http://localhost:1050/deleteBooking/";

class GetBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingData: [],
      bookingId: "",
      updateStatus: false,
      errorMessage: "",
      successMessage: ""
    }
  }


  updateBooking = (bid) => {
    /* update the updateStatus and bookingId state with appropriate values */
    this.setState({
      bookingId: bid,
      updateStatus: true
    })
  }

  fetchBooking = () => {
    /* 
      Send an AXIOS GET request to the url http://localhost:1050/getAllBookings/ to fetch all the bookings 
      and handle the success and error cases appropriately 
    */
    axios.get(url)
    .then(response => {
      console.log(response.data)
      this.setState({
        bookingData: response.data
      })
    })
    .catch(error =>{
      this.setState({
        errorMessage: 'could not fetch booking data'
      })
    })
  }

  deleteBooking = (id) => {
    /*
      Send an AXIOS DELETE request to the url http://localhost:1050/deleteBooking/ to delete the selected booking
      and handle the success and error cases appropriately 
    */
   axios.delete(url1+id)
   .then(response =>{
    console.log(response.data)
     const bookingData = this.state.bookingData.filter(booking => booking.bookingId !== id)
     this.setState({
        bookingData: bookingData
     })
   }).catch(error => {
     console.log(error.response.data)
   })
  }

  componentDidMount(){
    this.fetchBooking()
  }

  render() {
    const { bookingData } = this.state;

    if(this.state.updateStatus){
      return <Redirect to ={`/updatebooking/${this.state.bookingId}`}  />
    }

    return (
      <div className="GetBooking">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <br />
            <div className="card">
              <div className="card-header bg-custom">
                <h3 align="center">Booking Details</h3>
              </div>
              <div className="card-body">
                {/* code here to get the view as shown in QP for GetBooking component */}
                {/* Display booking data in tabular form */}
                {/* Display error message if the server is not running */}
                {/* code appropriately to redirect on click of update button */}
                {this.state.errorMessage ?
                   <div style = {{textAlign : 'center'}} className="text-danger" >{this.state.errorMessage}</div>
                :
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Customer Id</th>                    
                      <th>Booking Id</th>
                      <th>Total Tickets</th>
                      <th>Total Cost</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      bookingData.map(data => 
                        <tr key = {data._id} align="center">
                        <td>{data.customerId}</td>
                        <td>{data.bookingId}</td>
                        <td>{data.noOfTickets}</td>
                        <td>{data.bookingCost}</td>
                        <td>
                        <button className="btn btn-success" onClick = {() => this.updateBooking(data.bookingId)}>Update</button> <span/>
                        <button className="btn btn-danger" onClick = {() => this.deleteBooking(data.bookingId)}>Cancel</button></td>
                        </tr>)
                    }
                  </tbody>
                </table>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GetBooking;
