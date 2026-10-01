import { fetchFeeds } from '@/services/slices/feedsSlice';
import { useDispatch, useSelector } from '@/services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

import type { TOrder } from '@utils-types';

export const Feed = (): React.JSX.Element => {
  // TODO: Взять переменную из стора
  const orders: TOrder[] = useSelector(state => state.feeds.orders);
  const loading = useSelector(state => state.feeds.loading);
  const dispatch = useDispatch();

  const handleGetFeeds = (): void => {
    // TODO: Запросить ленту заказов
    dispatch(fetchFeeds());
  };

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
