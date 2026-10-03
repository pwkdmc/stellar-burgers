import { getIngredientById } from '@/services/slices/allIngredientsSlice';
import { useSelector } from '@/services/store';
import { IngredientDetailsUI } from '@ui';
import { Navigate, useParams } from 'react-router-dom';

export const IngredientDetails = (): React.JSX.Element => {
  const { id } = useParams<'id'>();
  const ingredientData = useSelector(state => getIngredientById(state, id!));

  if (!ingredientData) {
    return <Navigate replace to='*'/>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
