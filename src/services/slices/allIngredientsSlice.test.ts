import { configureStore } from '@reduxjs/toolkit';

import * as api from '../../utils/burger-api';
import reducer, { fetchAllIngredients } from './allIngredientsSlice';

jest.mock('../../utils/burger-api');

const mockedGetIngredientsApi = api.getIngredientsApi as jest.MockedFunction<
    typeof api.getIngredientsApi
>;

function makeStore() {
    return configureStore({
        reducer: {
            allIngredients: reducer,
        },
    });
}

describe('all ingredients reducer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const testIngredients = [
        {
            _id: '1',
            name: 'bun1',
            type: 'bun',
            proteins: 1,
            fat: 1,
            carbohydrates: 1,
            calories: 1,
            price: 1,
            image: 'image',
            image_mobile: 'image_mobile',
            image_large: 'image_large',
            __v: 0,
        },
    ];

    const initialState = {
        data: [],
        loading: false,
        error: null,
    };

    test('get ingredients fulfilled', async () => {
        mockedGetIngredientsApi.mockResolvedValue(testIngredients);

        const store = makeStore();
        await store.dispatch(fetchAllIngredients());

        expect(mockedGetIngredientsApi).toHaveBeenCalledWith();
        expect(store.getState().allIngredients).toEqual({
            data: testIngredients,
            error: null,
            loading: false,
        });
    });

    test('get ingredients fulfilled reducer', async () => {
        const newState = reducer(
            { ...initialState, loading: true },
            fetchAllIngredients.fulfilled(testIngredients, 'requestId', undefined)
        );

        expect(newState).toEqual({
            data: testIngredients,
            error: null,
            loading: false,
        });
    });

    test('get ingredients rejected', async () => {
        mockedGetIngredientsApi.mockRejectedValue(new Error('error'));

        const store = makeStore();
        await store.dispatch(fetchAllIngredients());

        expect(mockedGetIngredientsApi).toHaveBeenCalledWith();
        expect(store.getState().allIngredients.data).toEqual([]);
        expect(store.getState().allIngredients.loading).toBe(false);
        expect(store.getState().allIngredients.error?.message).toBe('error');
    });

    test('get ingredients rejected reducer', async () => {
        const newState = reducer(
            { ...initialState, loading: true },
            fetchAllIngredients.rejected(new Error('error'), 'requestId', undefined)
        );

        expect(newState.data).toEqual([]);
        expect(newState.loading).toBe(false);
        expect(newState.error?.message).toBe('error');
    });

    test('get ingredients pending', async () => {
        const state = reducer(
            { ...initialState, error: new Error('error') },
            { type: fetchAllIngredients.pending.type }
        );
        expect(state).toEqual({
            data: [],
            error: null,
            loading: true,
        });
    });

    test('unknown action', () => {
        const state = reducer(undefined, { type: 'unknown' });
        expect(state).toEqual({
            data: [],
            error: null,
            loading: false,
        });
    });
});
