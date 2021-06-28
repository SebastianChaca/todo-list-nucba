import React, {Component} from 'react';
import {
  ChakraProvider, 
  Box,
  theme,
  Flex,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Card from './components/card/card';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red'
    }}
  setColor(color){
    this.setState({
      color
    })
  }
  render(){

    return (
      <ChakraProvider theme={theme}>
      <Flex>
        <Card titulo='titulo1' description='sasasasas' color={this.state.color}/>
        <Card titulo='titulo2' description='sasasas2asdasdasas'  color={this.state.color}/>        
      </Flex>
      <Flex>
        <Box bg='blue' borderRadius='100%'  w='50px' h='50px' m='20px' onClick={()=>this.setColor('blue')}/>
        <Box bg='red' borderRadius='100%'  w='50px' h='50px' m='20px' onClick={()=>this.setColor('red')}/>
        <Box bg='black' borderRadius='100%'  w='50px' h='50px' m='20px' onClick={()=>this.setColor('black')}/>

      </Flex>
      </ChakraProvider>
    );
  }
}

export default App;
