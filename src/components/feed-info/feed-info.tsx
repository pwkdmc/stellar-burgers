import { getFeedsState } from '@/services/slices/feedsSlice';
import { useSelector } from '@/services/store';
import { FeedInfoUI } from '@ui';

import type { TFeedState, TOrder } from '@utils-types';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo = (): React.JSX.Element => {
  const feed: TFeedState = useSelector(getFeedsState);
  const orders: TOrder[] = feed.orders;

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI readyOrders={readyOrders} pendingOrders={pendingOrders} feed={feed} />
  );
};
