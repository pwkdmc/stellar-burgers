import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';

import type { TConstructorIngredient, TConstructorState, TOrder } from '@utils-types';
import { useDispatch, useSelector } from '@/services/store';
import { closeModal, fetchOrderBurger } from '@/services/slices/ordersSlice';
import { clearIngredients } from '@/services/slices/ingredientsInConstructorSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor = (): React.JSX.Element | null => {
  /** TODO: Взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems: TConstructorState = useSelector((state) => state.ingredientsInConstructor);
  const orderRequest = useSelector((state) => state.orders.orderRequest);
  const orderModalData: TOrder | null = useSelector((state) => state.orders.orderModalData);
  const isAuth = useSelector(state => state.user.user !== null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = (): void => {
    if (!isAuth) {
      navigate('/login', { replace: true });
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    dispatch(fetchOrderBurger(constructorItems.ingredients.map(ing => ing._id)));
  };

  const closeOrderModal = (): void => {
    dispatch(closeModal());
    dispatch(clearIngredients());
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
