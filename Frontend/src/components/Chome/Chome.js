import React, {Component} from 'react';
import '../../App.css';
import MenuCard from '../MenuCard/MenuCard';

class Chome extends Component {
    constructor(props){
        super(props);
       
    }      

    render(){
   
        return(
            <div>
          
                <div class="container" style={{borderRadius:"12px"}} >
                {/* <SearchFood/>      */}
                {/* <MenuCard/> */}
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Chome;