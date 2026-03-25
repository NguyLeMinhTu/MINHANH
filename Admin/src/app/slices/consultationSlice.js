import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axiosConfig'

const API_URL = '/admin/yeu-cau-tu-van'

export const fetchConsultations = createAsyncThunk('consultations/fetchAll', async ({ page = 0, size = 10, search = '', daXuLy = null }, { rejectWithValue }) => {
    try {
        let url = `${API_URL}?page=${page}&size=${size}`
        if (search) url += `&search=${encodeURIComponent(search)}`
        if (daXuLy !== null) url += `&daXuLy=${daXuLy}`
        const response = await axios.get(url)
        return response
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

export const updateConsultationStatus = createAsyncThunk('consultations/updateStatus', async ({ id, daXuLy, ghiChuNoiBo }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/${id}/status`, { daXuLy, ghiChuNoiBo })
        return response
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

export const deleteConsultation = createAsyncThunk('consultations/delete', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/${id}`)
        return id
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const consultationSlice = createSlice({
    name: 'consultations',
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
            .addCase(fetchConsultations.pending, (state) => { state.status = 'loading' })
            .addCase(fetchConsultations.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload?.content || []
                state.pagination = {
                    totalElements: action.payload?.totalElements || 0,
                    totalPages: action.payload?.totalPages || 0,
                    number: action.payload?.number || 0,
                    size: action.payload?.size || 10
                }
            })
            .addCase(fetchConsultations.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            .addCase(updateConsultationStatus.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.yeuCauId === action.payload.yeuCauId)
                if (index !== -1) {
                    state.items[index] = action.payload
                }
            })
            .addCase(deleteConsultation.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.yeuCauId !== action.payload)
            })
    }
})

export default consultationSlice.reducer
