import { getFeedsApi } from "@/utils/burger-api";
import type { TOrder } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface FeedsState {
    orders: TOrder[];
    total: number;
    totalToday: number;
    loading: boolean;
}

const initialState: FeedsState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false
}

export const fetchFeeds = createAsyncThunk<Omit<FeedsState, 'loading'>>(
    'feeds/fetchFeeds',
    async () => {
        return getFeedsApi();
    }
)

const feedsSlice = createSlice({
    name: 'feeds',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeeds.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFeeds.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchFeeds.fulfilled, (state, action) => {
                state.orders = action.payload.orders;
                state.total = action.payload.total;
                state.totalToday = action.payload.totalToday;
                state.loading = false;
            });;
    }
});

export default feedsSlice.reducer;