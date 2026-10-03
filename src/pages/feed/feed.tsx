import { fetchFeeds, getFeeds, getFeedsLoading } from '@/services/slices/feedsSlice';
import { useDispatch, useSelector } from '@/services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

import type { TOrder } from '@utils-types';
import { useEffect } from 'react';

export const Feed = (): React.JSX.Element => {
  const orders: TOrder[] = useSelector(getFeeds);
  const loading = useSelector(getFeedsLoading);
  const dispatch = useDispatch();

  const handleGetFeeds = (): void => {
    dispatch(fetchFeeds());
  };

  useEffect(() => {
    handleGetFeeds();
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
