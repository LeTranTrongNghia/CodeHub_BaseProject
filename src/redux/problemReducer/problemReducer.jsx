import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	problemList: [],
	selectedProblem: null,
};

const problemReducer = createSlice({
	name: 'problemReducer',
	initialState,
	reducers: {
		// Action to handle user login
		setProblems: (state, action) => {
			state.problemList = action.payload;
		},
		setSelectedProblem: (state, action) => {
			state.selectedProblem = action.payload;
		},
	},
});

export const { setProblems, setSelectedProblem } = problemReducer.actions;

export default problemReducer.reducer;
