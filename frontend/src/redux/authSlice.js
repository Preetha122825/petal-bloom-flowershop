import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try { const res = await api.post('/auth/register', data); localStorage.setItem('token', res.data.token); return res.data; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Registration failed'); }
});

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try { const res = await api.post('/auth/login', data); localStorage.setItem('token', res.data.token); return res.data; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Login failed'); }
});

export const adminLogin = createAsyncThunk('auth/adminLogin', async (data, { rejectWithValue }) => {
  try { const res = await api.post('/auth/admin/login', data); localStorage.setItem('token', res.data.token); return res.data; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Admin login failed'); }
});

export const getMe = createAsyncThunk('auth/getMe', async (_, { rejectWithValue }) => {
  try { const res = await api.get('/auth/me'); return res.data; }
  catch (err) { return rejectWithValue(err.response?.data?.message); }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: localStorage.getItem('token'), loading: false, error: null },
  reducers: {
    logout: (state) => { state.user = null; state.token = null; localStorage.removeItem('token'); },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    [register, login, adminLogin, getMe].forEach((thunk) => {
      builder
        .addCase(thunk.pending,  (state) => { state.loading = true; state.error = null; })
        .addCase(thunk.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.user; if (action.payload.token) state.token = action.payload.token; })
        .addCase(thunk.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });
    });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
