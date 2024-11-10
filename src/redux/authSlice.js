const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        empDetails: {},
        users : null,
    },

    reducers: {
        setEmpDetails: (state, action) => {
            state.empDetails = action.payload;
        },
        setUser : (state,action) => {
            state.users = action.payload;
        }
    }
});

export const { setEmpDetails,setUser } = authSlice.actions;
export default authSlice.reducer;
