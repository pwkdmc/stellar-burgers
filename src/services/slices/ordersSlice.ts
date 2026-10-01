import { getOrdersApi, orderBurgerApi } from "@/utils/burger-api";
import type { TOrder } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface OrdersState {
    orders: TOrder[];
    orderRequest: boolean;
    orderModalData: TOrder | null;
    orderSelected: TOrder | null;
    loading: boolean;
}

const initialState: OrdersState = {
    orders: [],
    orderRequest: false,
    orderModalData: null,
    orderSelected: null,
    loading: false
}

export const fetchOrders = createAsyncThunk<TOrder[]>(
    'orders/fetchOrders',
    async () => {
        return getOrdersApi();
    }
)

export const fetchOrderBurger = createAsyncThunk<TOrder, string[]>(
    'orders/fetchOrderBurger',
    async (ingredients: string[]) => {
        return (await orderBurgerApi(ingredients)).order;
    }
)

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        closeModal: (state) => {
            state.orderModalData = null;
        },
        clearOrders: (state) => {
            state.orders = [];
            state.orderRequest = false;
            state.orderModalData = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrders.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.loading = false;
            })


            .addCase(fetchOrderBurger.pending, (state) => {
                state.orderRequest = true;
            })
            .addCase(fetchOrderBurger.rejected, (state) => {
                state.orderRequest = false;
            })
            .addCase(fetchOrderBurger.fulfilled, (state, action) => {
                state.orders.push(action.payload);
                state.orderRequest = false;
                state.orderModalData = action.payload;
            });
    }
});

export const { closeModal, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;