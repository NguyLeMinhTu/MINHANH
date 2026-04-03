import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axiosConfig'

const API_URL = '/admin/bai-viet'

export const fetchPosts = createAsyncThunk('posts/fetchAll', async ({ page = 0, size = 10, search = '', danhMucId = '', trangThai = '' }, { rejectWithValue }) => {
    try {
        let url = `${API_URL}?page=${page}&size=${size}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (danhMucId) url += `&danhMucId=${danhMucId}`;
        if (trangThai) url += `&trangThai=${trangThai}`;
        
        const response = await axios.get(url)
        return response
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

export const createPost = createAsyncThunk('posts/create', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, data)
        return response
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

export const updatePost = createAsyncThunk('posts/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data)
        return response
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

export const deletePost = createAsyncThunk('posts/delete', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/${id}`)
        return id
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [],
        pagination: {
            totalElements: 0,
            totalPages: 0,
            number: 0,
            size: 10
        },
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => { state.status = 'loading' })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload?.content || []
                state.pagination = {
                    totalElements: action.payload?.totalElements || 0,
                    totalPages: action.payload?.totalPages || 0,
                    number: action.payload?.number || 0,
                    size: action.payload?.size || 10
                }
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})

export default postSlice.reducer
