import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    url:{},
    genres:{},
    // value: 0,
  },
  reducers: {
    getApiConfiguration:(state,action)=>{
        state.url=action.payload

    },
    getGeneras:(state,action)=>{
        state.genres=action.payload

    }
  },
})

// Action creators are generated for each case reducer function
export const {getGeneras,getApiConfiguration } = homeSlice.actions

export default homeSlice.reducer