import { createListenerMiddleware } from '@reduxjs/toolkit';

import { clearIngredients } from './slices/ingredientsInConstructorSlice';
import { clearOrders, fetchOrderBurger, fetchOrders } from './slices/ordersSlice';
import {
    fetchLoginUser,
    fetchLogoutUser,
    fetchRegisterUser,
    fetchUser,
} from './slices/userSlice';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: fetchUser.fulfilled,
    effect: async (_, api) => {
        api.dispatch(fetchOrders());
    },
});

listenerMiddleware.startListening({
    actionCreator: fetchLoginUser.fulfilled,
    effect: async (_, api) => {
        api.dispatch(fetchOrders());
    },
});

listenerMiddleware.startListening({
    actionCreator: fetchRegisterUser.fulfilled,
    effect: async (_, api) => {
        api.dispatch(fetchOrders());
    },
});

listenerMiddleware.startListening({
    actionCreator: fetchLogoutUser.fulfilled,
    effect: async (_, api) => {
        api.dispatch(clearOrders());
    },
});

listenerMiddleware.startListening({
    actionCreator: fetchOrderBurger.fulfilled,
    effect: async (_, api) => {
        api.dispatch(clearIngredients());
    },
});
