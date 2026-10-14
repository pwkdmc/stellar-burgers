import { fetchLoginUser, getUserError } from '@/services/slices/userSlice';
import { useDispatch, useSelector } from '@/services/store';
import { LoginUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';

export const Login = (): React.JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const error = useSelector(getUserError);
    const dispatch = useDispatch();

    const handleSubmit = (e: SyntheticEvent): void => {
        e.preventDefault();
        dispatch(fetchLoginUser({ email, password }));
    };

    return (
        <LoginUI
            errorText={error?.message}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
        />
    );
};
