import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    login: false,
    user:{},
    user_id:null
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        loginUser: (state,action) => {
            state.login = true
            state.user = action.payload.user
            state.user_id = action.payload.user_id
        },
        logoutUser: (state) => {
            state.login = false
            state.user = {}
            state.user_id = null
        },
        resetApplication: (state) => {
            localStorage.removeItem('persist:root')
        }
    },
})

// Action creators are generated for each case reducer function
export const { loginUser,logoutUser,resetApplication } = userSlice.actions

export default userSlice.reducer