import allIngredientsSlice from './slices/allIngredientsSlice';
import feedsSlice from './slices/feedsSlice';
import ingredientsInConstructorSlice from './slices/ingredientsInConstructorSlice';
import ordersSlice from './slices/ordersSlice';
import userSlice from './slices/userSlice';

export const rootReducer = {
    allIngredients: allIngredientsSlice,
    ingredientsInConstructor: ingredientsInConstructorSlice,
    user: userSlice,
    orders: ordersSlice,
    feeds: feedsSlice,
};
