import React,{useState, useReducer} from 'react'
import { v4 as uuidv4 } from "uuid";
import { Button, Flex, Input, Text, Box, Spacer  } from "@chakra-ui/react"
import {AiFillDelete} from 'react-icons/ai'
import {MdModeEdit} from 'react-icons/md'
const App2 = () => {
  const reducer =(state, action)=>{
    switch (action.type) {
      case 'HANDLE_CHANGE':
        if(state.modoEdicion){
          return {...state, tareaEditar:{...state.tareaEditar, texto: action.payload}}
        }else{
          return {...state, tareaInput: action.payload}

        }
      case 'ADD_TODO':
        return {...state, lista:[...state.lista, {texto:state.tareaInput, id:uuidv4()}], tareaInput:''}
      case 'DELETE_TODO':
        return {...state, lista: action.payload}
      case 'EDIT_MODE':
        return {...state, modoEdicion: !state.modoEdicion, tareaEditar:action.payload, tareaInput:''}
      case 'TODO_EDITED':
        const newTodoEdited= state.lista.map((valor)=>
         valor.id === state.tareaEditar.id ? state.tareaEditar : valor
        )
        return {...state, lista:newTodoEdited, tareaEditar:null, modoEdicion: !state.modoEdicion}
      default:
        return state
    }
  }
  const initialState={
    lista:[],
    tareaInput:'',
    modoEdicion:false,
    tareaEditar:null,
    errorState:''
  }
  const [state, dispatch]=useReducer(reducer, initialState)
  console.log(state)
  
  const handleOnChange=(e)=>{    

      dispatch({type:'HANDLE_CHANGE', payload: e.target.value})
    
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    if (state.modoEdicion){
      dispatch({type:'TODO_EDITED'})
    }else{

      dispatch({type:'ADD_TODO'})
    }
  }
  const handleDelete=(id)=>{
    const newTodo= state.lista.filter((item)=> item.id !== id)
    dispatch({type:'DELETE_TODO', payload: newTodo})
  }
  const handleEdit=(item)=>{
    dispatch({type:'EDIT_MODE', payload:item})
  }
 
  return (
    <>
    <Flex justifyContent='space-around' mt='30px' >
    <Box w='300px'>
    <Text textAlign='center'>Escribí algo :</Text>
      <form onSubmit={handleSubmit}>      
        <Input onChange={handleOnChange} value={state.modoEdicion ? state.tareaEditar.texto : state.tareaInput} type='text'/>
        <Button w='100%' mt='10px' color='white' bg='blue.800' type='submit'>
           {state.modoEdicion ? 'Editar' : 'Agregar'}
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
                  w={{base: '300px', sm:'300px', md:'500px', lg:'500px'}}
                  mb='20px' 
                  border="1px" 
                  borderColor="gray.200" 
                  borderRadius='5px'
                  p='5px'
                  key={item.id}
                  >
          
           <Text ml='5px'>{item.texto}</Text> 
           <Spacer/>
           <Button mx='5px' bg='red.400' onClick={()=> handleDelete(item.id)} > <AiFillDelete/> </Button>
           <Button mx='5px' bg='green.300' onClick={()=>handleEdit(item)}> <MdModeEdit/> </Button>  
           </Flex>
        }) : <Text>No hay Tareas</Text>
      }
    </Box>
    </Flex>
    
    </>
  )
}

export default App2
