import { createSlice } from '@reduxjs/toolkit';

// Khởi tạo state ban đầu
const initialState = {
  isAdmin: false,
  isLoggedIn: false,
  username: '',
  userId: '',
  enrolledCourses: [],
};

// Tạo slice với các reducers phù hợp
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
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
    },
    addEnrolledCourse: (state, action) => {
      // Chỉ thêm khóa học vào danh sách nếu nó chưa tồn tại
      if (!state.enrolledCourses.includes(action.payload)) {
        state.enrolledCourses.push(action.payload);
      }
    },
  },
});

// Xuất các action để sử dụng
export const {
  setAdminStatus,
  setLoginStatus,
  setUsername,
  setUserId,
  setEnrolledCourses,
  addEnrolledCourse,
} = userReducer.actions;

// Xuất reducer để sử dụng trong store
export default userReducer.reducer;
