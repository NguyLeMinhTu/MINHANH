import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './slices/categorySlice'
import productReducer from './slices/productSlice'
import postCategoryReducer from './slices/postCategorySlice'
import postReducer from './slices/postSlice'
import consultationReducer from './slices/consultationSlice'

export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        products: productReducer,
        postCategories: postCategoryReducer,
        posts: postReducer,
        consultations: consultationReducer
    },
})