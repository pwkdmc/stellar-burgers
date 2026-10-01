import type { TConstructorState, TIngredient } from "@/utils/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

type IngredientsInConstructorState = TConstructorState;

const initialState: IngredientsInConstructorState = {
    bun: null,
    ingredients: []
}

const ingredientsInConstructorSlice = createSlice({
    name: 'allIngredients',
    initialState,
    reducers: {
        addIngredient: (state, action: PayloadAction<TIngredient>) => {
            if (action.payload.type === 'bun') {
                state.bun = {
                    ...action.payload,
                    id: nanoid()
                };
            } else {
                state.ingredients.push({
                    ...action.payload,
                    id: nanoid()
                });
            }
        },
        deleteIngredient: (state, action: PayloadAction<number>) => {
            state.ingredients.splice(action.payload, 1);
        },
        moveIngredientUp: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            [state.ingredients[index], state.ingredients[index - 1]] = [state.ingredients[index - 1], state.ingredients[index]];
        },
        moveIngredientDown: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            [state.ingredients[index], state.ingredients[index + 1]] = [state.ingredients[index + 1], state.ingredients[index]];
        },
        clearIngredients: state => {
            state.bun = null;
            state.ingredients = [];
        }
    }
});

export const { addIngredient, deleteIngredient, moveIngredientUp, moveIngredientDown, clearIngredients } = ingredientsInConstructorSlice.actions;
export default ingredientsInConstructorSlice.reducer;