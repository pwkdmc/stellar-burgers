import { fetchFeeds, getFeeds, getFeedsLoading } from '@/services/slices/feedsSlice';
import { useDispatch, useSelector } from '@/services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useEffect } from 'react';

import type { TOrder } from '@utils-types';

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
