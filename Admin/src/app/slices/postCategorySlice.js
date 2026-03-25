import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axiosConfig'

const API_URL = '/danh-muc-bai-viet'

export const fetchPostCategories = createAsyncThunk('postCategories/fetch', async () => {
    const response = await axios.get(API_URL)
    return response
})

export const createPostCategory = createAsyncThunk('postCategories/create', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, data)
        return response
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message || 'Lỗi thêm mới danh mục bài viết')
    }
})

export const updatePostCategory = createAsyncThunk('postCategories/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data)
        return response
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message || 'Lỗi cập nhật danh mục bài viết')
    }
})

export const deletePostCategory = createAsyncThunk('postCategories/delete', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`)
        return response
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message || 'Lỗi xóa danh mục bài viết')
    }
})

const postCategorySlice = createSlice({
    name: 'postCategories',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostCategories.pending, (state) => { state.status = 'loading' })
            .addCase(fetchPostCategories.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload || []
            })
            .addCase(fetchPostCategories.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default postCategorySlice.reducer
