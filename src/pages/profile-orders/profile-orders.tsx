import { getOrders } from '@/services/slices/ordersSlice';
import { useSelector } from '@/services/store';
import { ProfileOrdersUI } from '@ui-pages';

import type { TOrder } from '@utils-types';

export const ProfileOrders = (): React.JSX.Element => {
  const orders: TOrder[] = useSelector(getOrders);

  return <ProfileOrdersUI orders={orders} />;
};
