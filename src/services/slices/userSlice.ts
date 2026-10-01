import { getUserApi, loginUserApi, logoutApi, registerUserApi, updateUserApi, type TLoginData, type TRegisterData } from "@/utils/burger-api";
import { deleteCookie, setCookie } from "@/utils/cookie";
import type { TUser } from "@/utils/types";
import { createAsyncThunk, createSlice, type SerializedError } from "@reduxjs/toolkit";

interface UserState {
    loading: boolean,
    user: TUser | null,
    error: SerializedError | null
}

const initialState: UserState = {
    loading: false,
    user: null,
    error: null
};

export const fetchUser = createAsyncThunk<TUser>(
    'user/fetchUser',
    async () => {
        return (await getUserApi()).user;
    }
)

export const fetchLoginUser = createAsyncThunk<TUser, TLoginData>(
    'user/fetchLoginUser',
    async (loginData: TLoginData) => {
        const data = await loginUserApi(loginData);
        setCookie('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        return data.user;
    }
)

export const fetchRegisterUser = createAsyncThunk<TUser, TRegisterData>(
    'user/fetchRegisterUser',
    async (user: TRegisterData) => {
        const data = await registerUserApi(user);
        setCookie('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        return data.user;
    }
)

export const fetchLogoutUser = createAsyncThunk(
    'user/fetchLogoutUser',
    async () => {
        await logoutApi();
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
    }
)

export const fetchUpdateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
    'user/fetchUpdateUser',
    async (user: Partial<TRegisterData>) => {
        return (await updateUserApi(user)).user;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })

            .addCase(fetchLoginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(fetchLoginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(fetchLoginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })

            .addCase(fetchRegisterUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(fetchRegisterUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(fetchRegisterUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })

            .addCase(fetchLogoutUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(fetchLogoutUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchLogoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            })

            .addCase(fetchUpdateUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(fetchUpdateUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchUpdateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            });
    }
});

export default userSlice.reducer;