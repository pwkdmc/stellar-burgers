import { getIngredientsInConstructorState } from '@/services/slices/ingredientsInConstructorSlice';
import {
    closeModal,
    fetchOrderBurger,
    getOrderModalData,
    getOrderRequest,
} from '@/services/slices/ordersSlice';
import { getIsAuth } from '@/services/slices/userSlice';
import { useDispatch, useSelector } from '@/services/store';
import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import type { TConstructorIngredient, TConstructorState, TOrder } from '@utils-types';

export const BurgerConstructor = (): React.JSX.Element | null => {
    const constructorItems: TConstructorState = useSelector(
        getIngredientsInConstructorState
    );
    const orderRequest = useSelector(getOrderRequest);
    const orderModalData: TOrder | null = useSelector(getOrderModalData);
    const isAuth = useSelector(getIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onOrderClick = (): void => {
        if (!isAuth) {
            navigate('/login', { replace: true });
            return;
        }
        if (!constructorItems.bun || orderRequest) return;
        const ingredients = [
            constructorItems.bun._id,
            ...constructorItems.ingredients.map((ing) => ing._id),
            constructorItems.bun._id,
        ];
        dispatch(fetchOrderBurger(ingredients));
    };

    const closeOrderModal = (): void => {
        dispatch(closeModal());
    };

    const price = useMemo(
        () =>
            (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
            constructorItems.ingredients.reduce(
                (s: number, v: TConstructorIngredient) => s + v.price,
                0
            ),
        [constructorItems]
    );

    return (
        <BurgerConstructorUI
            price={price}
            orderRequest={orderRequest}
            constructorItems={constructorItems}
            orderModalData={orderModalData}
            onOrderClick={onOrderClick}
            closeOrderModal={closeOrderModal}
        />
    );
};
