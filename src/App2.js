import React,{useState, useReducer} from 'react'
import { v4 as uuidv4 } from "uuid";
import { Button, Flex, Input, Text, Box, Spacer  } from "@chakra-ui/react"
import {AiFillDelete} from 'react-icons/ai'
import {MdModeEdit} from 'react-icons/md'
const App2 = () => {
  const reducer=(state, action)=>{
    switch (action.type){
      case 'PARSE_INPUT':
        return {...state, item:action.payload}
      case 'ADD_ITEM':
        return{...state, lista:[...state.lista, state.item ], item:{texto:'', id:''}}
      case 'DELETE_ITEM':
        return{...state, lista:action.payload}
      case 'EDIT_MODE':
        return {...state, editMode: {editState: action.payload.editState, tareaEditar: action.payload.tareaEditar}}
      default:
        return state
    }
  }
  let initialState={lista:[], item:{texto:'', id:null}, editMode:{editState:false, tareaEditar:''}}
  const [state, dispatch]=useReducer(reducer, initialState)
  

  

  const handleInput=(e)=>{
    dispatch({type:'PARSE_INPUT', payload:{texto:e.target.value, id:uuidv4()}})
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch({type:'ADD_ITEM'})

  }
  const handleDelete=(id)=>{
    const newList= state.lista.filter((item => item.id !== id ))
    dispatch({type:'DELETE_ITEM', payload:newList})
  }
  const handleEditMode=(item)=>{    
    dispatch({type:'EDIT_MODE', payload: {editState:!state.editMode.editState, tareaEditar: item.texto}})
  }
console.log(state)
  return (
    <>
    <Flex justifyContent='space-around' mt='30px' >
    <Box w='300px'>
    <Text textAlign='center'>Escribí algo :</Text>
      <form onSubmit={handleSubmit}>      
        <Input onChange={handleInput} value={state.editMode.editState ? state.editMode.tareaEditar :state.item.texto} type='text'/>
        <Button w='100%' mt='10px' color='white' bg='blue.800' type='submit'>
          {state.editMode ? 'Editar' : 'Agregar'}
        </Button>
      </form>
    </Box>
    <Box ml='20px'>
    <Text textAlign='center'>Lista</Text>
      { state.lista.length > 0 ?
        state.lista.map((item)=>{
          return <Flex 
                  justifyContent='center' 
                  alignItems='center'
                  w='600px' 
                  mb='20px' 
                  border="1px" 
                  borderColor="gray.200" 
                  borderRadius='5px'
                  p='5px'
                  key={item.id}
                  >
          
           <Text ml='5px'>{item.texto}</Text> 
           <Spacer/>
           <Button mx='5px' bg='red.400' onClick={()=> handleDelete(item.id)}> <AiFillDelete/> </Button>
           <Button mx='5px' bg='green.300' onClick={()=> handleEditMode(item)}> <MdModeEdit/> </Button>  
           </Flex>
        }) : <Text>No hay Tareas</Text>
      }
    </Box>
    </Flex>
    
    </>
  )
}

export default App2
