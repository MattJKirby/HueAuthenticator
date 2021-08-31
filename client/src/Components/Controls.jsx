import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Settings from './Settings';

class Controls extends Component {
    constructor() {
      super();
  
    }
  
 
  
    render() {
      return (<React.Fragment>
        
          <h3>Controls</h3>
         
       
        <Link to={`/settings`}>Back</Link>
     
           
        

      </React.Fragment>
        
      );
    }
  }
 
export default Controls;