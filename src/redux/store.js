const { configureStore } = require("@reduxjs/toolkit");
const authReducer = require('../redux/authSlice.js').default


const store = configureStore({
    reducer: {
        auth : authReducer
    }
})


export default store;