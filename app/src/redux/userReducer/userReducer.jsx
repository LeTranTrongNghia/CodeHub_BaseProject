import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAdmin: false,
	isLoggedIn: false,
	username: '',
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
	},
});

export const { setAdminStatus, setLoginStatus, setUsername } =
	userReducer.actions;

export default userReducer.reducer;
