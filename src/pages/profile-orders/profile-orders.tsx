import { useSelector } from '@/services/store';
import { ProfileOrdersUI } from '@ui-pages';

import type { TOrder } from '@utils-types';

export const ProfileOrders = (): React.JSX.Element => {
  const orders: TOrder[] = useSelector(state => state.orders.orders);

  return <ProfileOrdersUI orders={orders} />;
};
