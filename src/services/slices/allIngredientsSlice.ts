import { getIngredientsApi } from "@/utils/burger-api";
import type { TIngredient } from "@/utils/types";
import { createAsyncThunk, createSlice, type SerializedError } from "@reduxjs/toolkit";

interface AllIngredientsState {
    data: TIngredient[];
    loading: boolean;
    error: SerializedError | null;
}

const initialState: AllIngredientsState = {
    data: [],
    loading: false,
    error: null
}

export const fetchAllIngredients = createAsyncThunk<TIngredient[]>(
    'allIngredients/fetchAllIngredients',
    async () => {
        return getIngredientsApi();
    }
)

const allIngredientsSlice = createSlice({
    name: 'allIngredients',
    initialState,
    reducers: {},
    selectors: {
        getIngredients: state => state.data,
        getIngredientsLoading: state => state.loading,
        getIngredientsError: state => state.error,
        getIngredientsState: state => state,
        getIngredientById: (state, id: string) => state.data.find(item => item._id === id)
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllIngredients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllIngredients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(fetchAllIngredients.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            });
    }
});

export const { getIngredients, getIngredientsLoading, getIngredientsError, getIngredientsState, getIngredientById } = allIngredientsSlice.selectors;

export default allIngredientsSlice.reducer;