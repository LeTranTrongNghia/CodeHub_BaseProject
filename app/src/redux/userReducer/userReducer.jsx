import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAdmin: false,
	isLoggedIn: false,
	username: '',
	email:''
};

const userReducer = createSlice({
	name: 'userReducer',
	initialState,
	reducers: {
		setAdminStatus: (state, action) => {
			state.isAdmin = action.payload;
		},
		setLoginStatus: (state, action) => {
			state.isLoggedIn = action.payload;
		},
		setUsername: (state, action) => {
			state.username = action.payload;
		},
		setEmail:(state,action)=>{
			state.email = action.payload
		}
	},
});

export const { setAdminStatus, setLoginStatus, setUsername, setEmail, } =
	userReducer.actions;

export default userReducer.reducer;
