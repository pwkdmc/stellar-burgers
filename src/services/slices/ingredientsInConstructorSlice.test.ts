import reducer, {
    addIngredient,
    clearIngredients,
    deleteIngredient,
    moveIngredientDown,
    moveIngredientUp,
} from './ingredientsInConstructorSlice';

describe('burger constructor reducer', () => {
    const testConstructor = {
        bun: {
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
            id: '1',
        },
        ingredients: [
            {
                _id: '2',
                name: 'main1',
                type: 'main',
                proteins: 1,
                fat: 1,
                carbohydrates: 1,
                calories: 1,
                price: 1,
                image: 'image',
                image_mobile: 'image_mobile',
                image_large: 'image_large',
                __v: 0,
                id: '2',
            },
            {
                _id: '3',
                name: 'main2',
                type: 'main',
                proteins: 1,
                fat: 1,
                carbohydrates: 1,
                calories: 1,
                price: 1,
                image: 'image',
                image_mobile: 'image_mobile',
                image_large: 'image_large',
                __v: 0,
                id: '3',
            },
        ],
    };

    const testIngredient = {
        _id: '4',
        name: 'main3',
        type: 'main',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'image',
        image_mobile: 'image_mobile',
        image_large: 'image_large',
        __v: 0,
        id: '4',
    };

    const testBun = {
        _id: '2',
        name: 'bun2',
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
        id: '5',
    };

    const testDeleteIngredients = {
        bun: {
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
            id: '1',
        },
        ingredients: [
            {
                _id: '2',
                name: 'main1',
                type: 'main',
                proteins: 1,
                fat: 1,
                carbohydrates: 1,
                calories: 1,
                price: 1,
                image: 'image',
                image_mobile: 'image_mobile',
                image_large: 'image_large',
                __v: 0,
                id: '2',
            },
        ],
    };

    const testMoveIngredient = {
        bun: {
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
            id: '1',
        },
        ingredients: [
            {
                _id: '3',
                name: 'main2',
                type: 'main',
                proteins: 1,
                fat: 1,
                carbohydrates: 1,
                calories: 1,
                price: 1,
                image: 'image',
                image_mobile: 'image_mobile',
                image_large: 'image_large',
                __v: 0,
                id: '3',
            },
            {
                _id: '2',
                name: 'main1',
                type: 'main',
                proteins: 1,
                fat: 1,
                carbohydrates: 1,
                calories: 1,
                price: 1,
                image: 'image',
                image_mobile: 'image_mobile',
                image_large: 'image_large',
                __v: 0,
                id: '2',
            },
        ],
    };

    test('add main ingredient', () => {
        const newState = reducer(testConstructor, addIngredient(testIngredient));
        expect(newState).toEqual({
            ...testConstructor,
            ingredients: [
                ...testConstructor.ingredients,
                {
                    ...testIngredient,
                    id: newState.ingredients[2].id,
                },
            ],
        });
    });

    test('generate unique id for identical products', () => {
        let newState = reducer(testConstructor, addIngredient(testIngredient));
        newState = reducer(newState, addIngredient(testIngredient));
        expect(newState.ingredients[2].id).not.toBe('');
        expect(newState.ingredients[3].id).not.toBe('');
        expect(newState.ingredients[2].id).not.toBe(newState.ingredients[3].id);
    });

    test('add bun ingredient', () => {
        const newState = reducer(testConstructor, addIngredient(testBun));
        expect(newState).toEqual({
            ...testConstructor,
            bun: {
                ...testBun,
                id: newState.bun?.id,
            },
        });
    });

    test('delete ingredient', () => {
        const newState = reducer(testConstructor, deleteIngredient(1));
        expect(newState).toEqual(testDeleteIngredients);
    });

    test('move ingredient down', () => {
        const newState = reducer(testConstructor, moveIngredientDown(0));
        expect(newState).toEqual(testMoveIngredient);
    });

    test('move ingredient up', () => {
        const newState = reducer(testConstructor, moveIngredientUp(1));
        expect(newState).toEqual(testMoveIngredient);
    });

    test('clear ingredients', () => {
        const newState = reducer(testConstructor, clearIngredients());
        expect(newState).toEqual({
            bun: null,
            ingredients: [],
        });
    });

    test('unknown action', () => {
        const state = reducer(undefined, { type: 'unknown' });
        expect(state).toEqual({
            bun: null,
            ingredients: [],
        });
    });
});
