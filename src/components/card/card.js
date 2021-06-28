import React, {Component} from 'react'
import {Box} from '@chakra-ui/react'
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    }}

   
  render() {
    return <>
    <Box w='200px' h='300px' bg={this.props.color} m='20px'>
      <h1>{this.props.titulo}</h1>
      <h1>{this.props.description}</h1>
     

    </Box>
    </>;
  }
}

export default Card