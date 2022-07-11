import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentEmailIndex:0,
    emailArrayLength:0,
    userCompletedEmails:[]
}

export const emailSlice = createSlice({
    name: 'emailSlice',
    initialState,
    reducers: {
        updateStatus: (state,action) => {

            var status = {user_id:action.payload.user_id,email_id:action.payload.email_id,'status':action.payload.status}

            state.userCompletedEmails.push(status)
            if(state.currentEmailIndex == state.emailArrayLength - 1){
                state.currentEmailIndex = 0;
            }else{
                state.currentEmailIndex += 1;
           }
        } ,
        updateCurrentEmailIndex : (state) =>{
            if(state.currentEmailIndex == state.emailArrayLength -1){
                state.currentEmailIndex = 0;
            }else{
                state.currentEmailIndex += 1;
            }
        },
        updateEmailArrayLength : (state,action) =>{

            state.emailArrayLength = action.payload;
        }
    },
})


// Action creators are generated for each case reducer function
export const { updateStatus,updateCurrentEmailIndex,updateEmailArrayLength  } = emailSlice.actions

export default emailSlice.reducer