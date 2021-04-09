import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState:{
        route: "main"
    },
    reducers: {
        changeRoute: (state, action) => {
            state.route = action.payload
        }
    }
})

export const selectRoute = state => state.route
export const { changeRoute } = appSlice.actions
export default appSlice.reducer