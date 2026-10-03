import { Preloader, OrderInfoUI } from '@ui';
import { useEffect, useMemo, useState } from 'react';

import type { TIngredient } from '@utils-types';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '@/services/store';
import { fetchOrder, getOrderSelected, getOrderSelectedRequest } from '@/services/slices/ordersSlice';
import { getIngredients } from '@/services/slices/allIngredientsSlice';

export const OrderInfo = (): React.JSX.Element => {
  const { number } = useParams<'number'>();
  const orderData = useSelector(getOrderSelected);
  const loading = useSelector(getOrderSelectedRequest);
  const dispatch = useDispatch();
  const [ isFetch, setIsFetch ] = useState<boolean>(false);

  const ingredients: TIngredient[] = useSelector(getIngredients);

  useEffect(() => {
    dispatch(fetchOrder(+number!));
    setIsFetch(true);
  }, [dispatch, fetchOrder, number])

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = Record<string, TIngredient & { count: number }>;

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1,
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total,
    };
  }, [orderData, ingredients]);

  if (loading || !isFetch) {
    return <Preloader />;
  }

  if (!orderData) {
    return <Navigate replace to='/*' />;
  }

  return <OrderInfoUI orderInfo={orderInfo!} />;
};
