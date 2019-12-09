import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import SearchFood from '../SeachFood/SearchFood';
import hostAddress from '../constants';

class Chome extends Component {
    constructor(props){
        super(props);
       
    }      

    render(){
   
        return(
            <div>
          
                <div class="container" style={{borderRadius:"12px"}} >
                {/* <SearchFood/>      */}
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Chome;