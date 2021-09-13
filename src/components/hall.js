
import React, { Component } from 'react'

import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Table from 'react-bootstrap/Table';
import 'holderjs';

class Hall extends Component {
    constructor() {
        super();
        
        this.state = {
          name: "React",
          showBookingDetail: false,
          selectedMovie: null,
          selectedSeat : []
          
        };
        
        this.confirmBooking = this.confirmBooking.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }
    
    handleChange(e,val){
        console.log("val : ");
        console.log(val);
        if (this.state.selectedSeat.some(item => val === item)){
            console.log("value exist, remove")
            this.setState({selectedSeat: this.state.selectedSeat.filter(function(str) { 
                return str !== val 
            })});
        } else {
            this.setState({selectedSeat : this.state.selectedSeat.concat(val)});
        }
        console.log(this.state.selectedSeat);
       // e.target.className = "btn btn-error"
    }
    confirmBooking(mv ,mt,sSeat){
        this.props.handleConfirmBooking(mv ,mt,sSeat);
    }

    render() {
          var mv = this.props.selectedMovie;
          var mt = this.props.selectedMovieTime;
          var sSeat = this.state.selectedSeat;
          var soldSeat = this.state.soldSeat;
          //there seems some issue here, unable to get the ocupied seat...
          const layout = JSON.parse("["+mt.hall.layout+"]");
          
          
        return(<div>
            <ToggleButtonGroup id="row1" type="checkbox" variant="primary" >
            <Table striped bordered hover variant="dark">
    <tbody>
      
                
            {layout.map((items, index) => (
                <tr>
                
                {items.map((subItems, sIndex) => (
                    <td><ToggleButton id="tbg-check-{subItems}" value={subItems} 
                    variant={sSeat.some(item => subItems === item)?'warning':'primary'}
                    onClick={(e) => this.handleChange(e,subItems)} >
                    {subItems}
                </ToggleButton></td>
                ))}
                
                 </tr>
            ))}
           
           </tbody>
            </Table>
            </ToggleButtonGroup><div>
            <Button onClick={() => this.confirmBooking(mv,mt,sSeat)}>
              Confirm Booking
            </Button></div>
            </div>)
    };
}

export default Hall