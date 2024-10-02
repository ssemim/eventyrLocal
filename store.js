/* eslint-disable no-unused-vars */
import { configureStore, createSlice } from '@reduxjs/toolkit'


let cart = createSlice({
    name : 'cart',
    initialState : [],
    reducers : {
      addCount(state, action){
        let result = state.find(function(x){
          return x.id == action.payload;});
          result.count++;
      },
      minusCount(state, action){
        let result = state.find(function(x){
          return x.id == action.payload;});
          if(result.count>1){ result.count--;}
          else{result.count}
        
      },

      addItem(state,action){

       let result = state.find(function(x){
        return x.id == action.payload.id;
       });
       if(result == undefined){state.push(action.payload)}else{
        result.count++;
       }
      },

      deleteItem(state, action) {
        state.splice(action.payload, 1)
      },

      deleteAllItem(state,action){
        state.splice(0, state.length)
      },
    }
  }) 


  
  
  export let {addCount,minusCount,addItem,deleteItem, deleteAllItem} = cart.actions;

     const store = configureStore({
        reducer: {
             // user(작명) : user.reducer
          cart : cart.reducer
        }
      }) 

      export default store;