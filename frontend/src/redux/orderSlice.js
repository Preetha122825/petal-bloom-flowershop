import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const createOrder  = createAsyncThunk('orders/create', async (data) => (await api.post('/orders', data)).data.order);
export const fetchMyOrders = createAsyncThunk('orders/my',   async () => (await api.get('/orders/my')).data.orders);
export const fetchAllOrders = createAsyncThunk('orders/all', async () => (await api.get('/orders')).data.orders);
export const updateStatus  = createAsyncThunk('orders/status', async ({ id, status }) => (await api.put(`/orders/${id}/status`, { status })).data.order);

const orderSlice = createSlice({
  name: 'orders',
  initialState: { myOrders: [], allOrders: [], loading: false, currentOrder: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(createOrder.fulfilled,   (state, a) => { state.currentOrder = a.payload; state.myOrders.unshift(a.payload); });
    b.addCase(fetchMyOrders.fulfilled, (state, a) => { state.myOrders  = a.payload; });
    b.addCase(fetchAllOrders.fulfilled,(state, a) => { state.allOrders = a.payload; });
    b.addCase(updateStatus.fulfilled,  (state, a) => { state.allOrders = state.allOrders.map(o => o._id === a.payload._id ? a.payload : o); });
  },
});

export default orderSlice.reducer;
