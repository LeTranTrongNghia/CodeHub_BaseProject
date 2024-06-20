import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAdmin: false,
	isLoggedIn: false,
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
	},
});

export const { setAdminStatus, setLoginStatus } = userReducer.actions;

export default userReducer.reducer;
