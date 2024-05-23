import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	problemList: [],
};

const problemReducer = createSlice({
	name: 'problemReducer',
	initialState,
	reducers: {
		// Action to handle user login
		setProblems: (state, action) => {
			state.problemList = action.payload;
		},
	},
});

export const { setProblems } = problemReducer.actions;

export default problemReducer.reducer;
