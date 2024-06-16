import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAdmin: false,
};

const userReducer = createSlice({
	name: 'userReducer',
	initialState,
	reducers: {
		setAdminStatus: (state, action) => {
			state.isAdmin = action.payload;
		},
	},
});

export const { setAdminStatus } = userReducer.actions;

export default userReducer.reducer;
