import allIngredientsSlice from './slices/allIngredientsSlice'
import ingredientsInConstructorSlice from './slices/ingredientsInConstructorSlice'
import userSlice from './slices/userSlice'
import ordersSlice from './slices/ordersSlice'
import feedsSlice from './slices/feedsSlice'

export const rootReducer = {
  allIngredients: allIngredientsSlice,
  ingredientsInConstructor: ingredientsInConstructorSlice,
  user: userSlice,
  orders: ordersSlice,
  feeds: feedsSlice
};
