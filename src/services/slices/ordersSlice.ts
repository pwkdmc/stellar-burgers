import {
    getOrderByNumberApi,
    getOrdersApi,
    orderBurgerApi,
    type TOrderBurger,
} from '@/utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type { TOrder } from '@/utils/types';

type OrdersState = {
    orders: TOrder[];
    orderRequest: boolean;
    orderModalData: TOrder | null;
    orderSelected: TOrder | null;
    orderSelectedRequest: boolean;
    loading: boolean;
};

const initialState: OrdersState = {
    orders: [],
    orderRequest: false,
    orderModalData: null,
    orderSelected: null,
    orderSelectedRequest: false,
    loading: false,
};

export const fetchOrders = createAsyncThunk<TOrder[]>('orders/fetchOrders', async () => {
    return getOrdersApi();
});

export const fetchOrderBurger = createAsyncThunk<TOrderBurger, string[]>(
    'orders/fetchOrderBurger',
    async (ingredients: string[]) => {
        return (await orderBurgerApi(ingredients)).order;
    }
);

export const fetchOrder = createAsyncThunk<TOrder | null, number>(
    'orders/fetchOrder',
    async (number: number, { getState }) => {
        const state = getState() as RootState;
        const orderUser = state.orders.orders.find((item) => item.number === number);
        if (orderUser) {
            return orderUser;
        }
        const orderFeeds = state.feeds.orders.find((item) => item.number === number);
        if (orderFeeds) {
            return orderFeeds;
        }
        const ordersFetch = (await getOrderByNumberApi(number)).orders;
        if (ordersFetch.length) {
            return ordersFetch[0];
        } else {
            return null;
        }
    }
);

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
        },
    },
    selectors: {
        getOrders: (state) => state.orders,
        getOrderRequest: (state) => state.orderRequest,
        getOrderModalData: (state) => state.orderModalData,
        getOrderSelected: (state) => state.orderSelected,
        getOrderSelectedRequest: (state) => state.orderSelectedRequest,
        getOrdersLoading: (state) => state.loading,
        getOrdersState: (state) => state,
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
                const order = action.payload;
                const orderData: TOrder = {
                    _id: order._id,
                    status: order.status,
                    name: order.name,
                    createdAt: order.createdAt,
                    updatedAt: order.updatedAt,
                    number: order.number,
                    ingredients: order.ingredients.map((item) => item._id),
                };
                state.orders.push(orderData);
                state.orderRequest = false;
                state.orderModalData = orderData;
            })

            .addCase(fetchOrder.pending, (state) => {
                state.orderSelectedRequest = true;
                state.orderSelected = null;
            })
            .addCase(fetchOrder.rejected, (state) => {
                state.orderSelectedRequest = false;
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.orderSelectedRequest = false;
                state.orderSelected = action.payload;
            });
    },
});

export const {
    getOrders,
    getOrderRequest,
    getOrderModalData,
    getOrderSelected,
    getOrderSelectedRequest,
    getOrdersLoading,
    getOrdersState,
} = ordersSlice.selectors;

export const { closeModal, clearOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
