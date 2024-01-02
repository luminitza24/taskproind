import { createSlice } from '@reduxjs/toolkit';

import {
  register,
  refreshUser,
  logOut,
  login,
  editUserProfile,
} from './operations.js';

const initialState = {
  user: {},
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  isError: false,
  errorMessage: null,
  isEditProfileModalOpen: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    openEditProfileModal: state => {
      state.isEditProfileModalOpen = true;
    },

    closeEditProfileModal: state => {
      state.isEditProfileModalOpen = false;
    },
    resetError: state => {
      state.isError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        const errorMessage = action.payload;
        if (errorMessage === 'Email in use') {
          state.errorMessage = errorMessage;
        } else {
          state.isError = true;
        }
        state.isLoading = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(logOut.pending, state => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action.payload;
        state.isLoading = false;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action.payload;
        state.isLoading = false;
      })
      .addCase(editUserProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user.name = user.name;
        state.user.email = user.email;
        state.user.image = user.image;
        state.isLoading = false;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action.payload;
        state.isLoading = false;
      });
  },
});

export const authReducer = authSlice.reducer;

export const {
  changeTheme,
  openEditProfileModal,
  closeEditProfileModal,
  resetError,
  setIsNotLoggedIn,
} = authSlice.actions;
