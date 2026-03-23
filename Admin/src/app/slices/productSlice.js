import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';

export const fetchProducts = createAsyncThunk(
    'products/fetchPage',
    async (params, { rejectWithValue }) => {
        try {
            const data = await axiosInstance.get('/admin/san-pham', { params });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/update',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/admin/san-pham/${id}`, data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/admin/san-pham/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        data: {
            content: [],
            totalElements: 0,
            totalPages: 0,
            number: 0,
            size: 12
        },
        status: 'idle', 
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload; 
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default productSlice.reducer;
