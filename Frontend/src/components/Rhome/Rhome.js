import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import DeliveredOrder from '../DeliveredOrder/DeliveredOrder';
import PendingOrder from '../PendingOrder/PendingOrder';
import CancelledOrder from '../CancelledOrder/CancelledOrder';
import hostAddress from '../constants';

let orderType=null;

class Rhome extends Component {
    constructor(props){
            super(props);
            this.state = {  
                cart: []
            }


    }  
    //get the books data from backend  
    componentDidMount(){
        console.log(cookie.load("email"));
    }
    
    render(){
      
        //if not logged in go to login page
        let redirectVar = null;
        if(localStorage.getItem('role')!="restaurant"){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        if(localStorage.getItem('role')=="customer"){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        
        

        return(
            <div>
                {redirectVar}
                
                <div class="container" style={{backgroundColor:"white", width:"60%",opacity:"80%",borderRadius:"12px"}}>
                
                </div> 
               
            </div> 
        )
    }
}

export default Rhome;