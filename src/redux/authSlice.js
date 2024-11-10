const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        empDetails: {}
    },

    reducers: {
        setEmpDetails: (state, action) => {
            state.empDetails = action.payload;
        }
    }
});

export const { setEmpDetails } = authSlice.actions;
export default authSlice.reducer;
