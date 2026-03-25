import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';

export const fetchCategories = createAsyncThunk(
    'categories/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const data = await axiosInstance.get('/danh-muc-san-pham');
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createCategory = createAsyncThunk(
    'categories/create',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/danh-muc-san-pham', data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateCategory = createAsyncThunk(
    'categories/update',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/danh-muc-san-pham/${id}`, data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'categories/delete',
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/danh-muc-san-pham/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default categorySlice.reducer;
