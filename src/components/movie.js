
import { render } from '@testing-library/react';
import React, { Component } from 'react'
import BookingDetail from './bookingDetail';
import Hall from './hall';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import jwt_decode from "jwt-decode";

class Movie extends Component {
  constructor() {
    super();
    
    this.state = {
      name: "React",
      showBookingDetail: false,
      showHall: false,
      selectedMovie: null,
      selectedMovieTime: null,
      selectedSeat: null,
      jwt_token: null,
      booking: null,
      soldseat: null
    };
    this.bookTicket = this.bookTicket.bind(this);
    this.cancelTicket = this.cancelTicket.bind(this);
    this.purchaseTicket = this.purchaseTicket.bind(this);
    this.selectSeat = this.selectSeat.bind(this)
    this.confirmBooking = this.confirmBooking.bind(this);
  }
  

  bookTicket(mvid) {
    
    console.log(mvid);
    //validate input
    fetch('http://localhost:8080/movies?mvid='+mvid)
    .then(res => res.json())
    .then((data) => {
      console.log(data[0])
      this.setState({selectedMovie: data[0]}, () => this.ReserveSeat())
      console.log('set data done')
    })
    .catch(console.log)
    
   
  }
  selectSeat(movie,movieTime){
    this.setState({selectedMovie: movie});
    this.setState({selectedMovieTime: movieTime});
    const mvId = movieTime.id;
    const reqParams = {
      method: 'POST',
      body: mvId
    };
    fetch('http://localhost:8080/api/movie/v1/seatstatus',reqParams)
    .then((response) => {
      if(!response.ok) throw new Error(response.status);
      else {
        var jwt_token = response.headers.get('request-hash')
        this.setState({jwt_token: jwt_token})

        return response.JSON;
      }
    })
    .then((data) => {
      console.log("check seat")
      console.log(data)
      this.setState({soldseat:data});
      this.setState({showHall:true});
    })
    .catch((error) => {
      console.log('error: ' + error);
      this.setState({showHall:true});
      this.setState({soldseat: null});
      this.setState({selectedMovie: null});
      this.setState({selectedMovieTime: null});
      alert('Error, failed to get data');
    });

  }

  confirmBooking( mv ,mt, sSeat){
    this.setState({selectedSeat: sSeat});
    this.setState({selectedMovie: mv});
    this.setState({selectedMovieTime: mt});
    this.setState({showHall:false});
    var selectedSeats = [];
    sSeat.forEach(s => {
      selectedSeats.push({name: s});
    });

    var jwt_token = jwt_decode(this.state.jwt_token);
    var booking = {id: jwt_token.sub, movieTime: mt, bookingSeat: selectedSeats}
    
    //post to backend to reserve
    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                  'request-hash': this.state.jwt_token},  
      body: JSON.stringify(booking)
    };
    fetch('http://localhost:8080/api/booking/v1/reserve',reqParams)
    .then((response) => {
      if(!response.ok) throw new Error(response.status);
      else {
        var jwt_token_new = response.headers.get('request-hash')
        this.setState({jwt_token: jwt_token_new})
        return response;
      }})
    .then((data) => {
        console.log(mv);
        this.setState({showBookingDetail: true});      
    })  
    .catch((error) => {
      console.log('error: ' + error);
      this.setState({showBookingDetail: false});
      this.setState({selectedSeat: null});
      this.setState({selectedMovie: null});
      this.setState({selectedMovieTime: null});
      alert('Sorry, The seat(s) that you selected is taken by others');
    });
    
    //show popup for booking
    //show popup taken, refresh view
  }
  cancelTicket(e){
    //TODO clear blocked seat
    this.setState({selectedMovie: null})
    this.setState({showBookingDetail: false});
  }
  purchaseTicket(mv, mt,custName,custEmail){
    console.log("jwt token")
    console.log(this.state.jwt_token)
    var jwt_token = jwt_decode(this.state.jwt_token);
    var booking = {id: jwt_token.sub, movieTime: mt, name: custName, email : custEmail}
    
    //post to backend to reserve
    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                  'request-hash': this.state.jwt_token},  
      body: JSON.stringify(booking)
    };
    fetch('http://localhost:8080/api/booking/v1/purchase',reqParams)
    .then((response) => {
      if(!response.ok) throw new Error(response.status);
      })
    .catch((error) => {
      console.log('error: ' + error);
      alert('Sorry, Something wrong with the purchase, please try agains');
    });
    this.setState({jwt_token: null});
    this.setState({selectedMovie: null})
    this.setState({showBookingDetail: false});
    alert('Congraturation, your booking is completed');
  }
    //const Movie = ({ movies }) => {
    render() {
      const showBookingDetail=this.state.showBookingDetail;
      const showHall=this.state.showHall;
      const movies = this.props.movies;
      const selectedMovie = this.state.selectedMovie;
      const selectedMovieTime = this.state.selectedMovieTime;
      const soldSeat = this.state.soldSeat;
      
      return (
        <div>
          {showBookingDetail && <BookingDetail movie={this.state.selectedMovie}  movieTime={this.state.selectedMovieTime} 
          selectedSeat={this.state.selectedSeat}
          handleClose={this.cancelTicket} handlePurchase={this.purchaseTicket} />}
          <center><h1>Movie List</h1></center>
          <CardGroup>
          {movies.map((movie) => (
            <Card style={{ width: '18rem' }} key={movie.id}>
              
                <Card.Body>
                <Card.Title>{movie.name}</Card.Title>
                <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sodales volutpat sodales. 
                </Card.Text>
                
                {movie.movieTime != null && movie.movieTime.map((ms) => (
                   <Button variant="link" onClick={() => this.selectSeat(movie,ms)} movie={movie} movieTime={ms} key={ms.id}  >{ms.time}</Button>
                ))}
              </Card.Body>
              </Card>
          ))}
          </CardGroup>
          {showHall && <Hall handleConfirmBooking={this.confirmBooking} selectedMovie={selectedMovie} selectedMovieTime={selectedMovieTime} soldSeat={soldSeat} />}

        </div>
      )
    };
  }
export default Movie
