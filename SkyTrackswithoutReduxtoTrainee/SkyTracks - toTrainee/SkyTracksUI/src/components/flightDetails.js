import React, { Component } from "react";
import CreateBooking from './CreateBooking';
import "../App.css";
import GetFlights from './GetFlights';

export default class FlightDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            flightData:this.props.flightData,
            availableFlights: this.props.availableFlights,
            bookingDetails:null,
            errorMessage:"",
            
        }
    }
    setBookingDetails = (flightId, flightTime, fare) =>{
        this.setState({
            bookingDetails: {
                origin: this.state.flightData.origin,
                destination: this.state.flightData.destination,
                departureDate: this.state.flightData.departureDate,
                noOfTickets: this.state.flightData.noOfTickets,
                flightId: flightId,
                timing: flightTime,
                charges: Number(fare) * Number(this.state.flightData.noOfTickets)
            }
        })
    }
    render(){

        if(this.state.availableFlights==null){
            // Display the GetFlights page by rendering the GetFlights component
            return <GetFlights></GetFlights>
        }
        else if(this.state.bookingDetails!=null){
            // Display the CreateBooking page by rendering the CreateBooking component and pass the bookingDetails as props
            return <CreateBooking bookingDetails={this.state.bookingDetails}></CreateBooking>
        } else{
            return(
                <React.Fragment>
                <div className="container mt-5">
                    <div className="row">
                        <div className="card custom-card bg-card text-light">
                            <div className="card-body">
                                <div className="row text-center">
                                    <div className="col-md-4">
                                        <h4>{this.state.flightData.departureDate}</h4>
                                        <div className="text-custom">Departure Date</div>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>{this.state.flightData.origin} - {this.state.flightData.destination}</h4>
                                        <div className="text-custom">Origin - Destination</div>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>{this.state.flightData.noOfTickets} Adult(s)</h4>
                                        <div className="text-custom">Passengers</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="float-right">
                            {/* Add proper event handlers to the back button */}
                            <button className="btn btn-primary"> Go Back</button>
                        </div>
                        <h2>Available Flights:</h2>
                        {/* iterate over the available flights and display them in cards here */}
                        {
                        this.state.availableFlights[0].prices.map((a,i) => 
                        <React.Fragment key= {i}><div className="row" >
                            <div className="card custom-card bg-card text-light">
                                <div className="card-body">
                                    <div className="row text-center">
                                        <div className="col-md-3">
                                            <h4>{this.state.availableFlights[0].flightTimings[i]}</h4>
                                            <div className="text-custom">Non Stop</div>
                                        </div>
                                        <div className="col-md-3">
                                            <h4>{this.state.availableFlights[0].flightIds[i]}</h4>
                                            <div className="text-custom">Flight Id</div>
                                        </div>
                                        <div className="col-md-3">
                                            <h4>{this.state.availableFlights[0].prices[i]}</h4>
                                            <div className="text-custom">Fare per seat</div>
                                        </div>
                                        <div className="col-md-3">
                                            <h4>Total Fare: Rs {this.state.availableFlights[0].prices[i]* this.state.flightData.noOfTickets}</h4>
                                            <div className="text-custom"><button className="btn btn-primary" onClick={() => this.setBookingDetails(
                                                this.state.availableFlights[0].flightIds[i],
                                                this.state.availableFlights[0].flightTimings[i],
                                                this.state.availableFlights[0].prices[i]* this.state.flightData.noOfTickets
                                            )}> Add Passenger Details</button></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><br/></React.Fragment>)
                        }
                    </div>
                </div>
            </React.Fragment>
            )
        }
    }

}