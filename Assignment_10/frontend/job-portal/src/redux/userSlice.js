import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  userType: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      state.userType = action.payload.type;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.userType = null;
      localStorage.removeItem('user');
    },
    loadUser: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      state.userType = action.payload.type;
    }
  }
});

export const { login, logout, loadUser } = userSlice.actions;
export default userSlice.reducer;