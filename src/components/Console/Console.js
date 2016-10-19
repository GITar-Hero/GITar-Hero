import React, {Component, PropTypes} from 'react';
import './Console.scss'

class Console extends Component {

  render() {
    return (<textarea rows="4" cols="50" className='console' defaultValue='git reset--soft HEAD~3'/>)
  }
};

export default Console;
