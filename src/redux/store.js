import { configureStore } from '@reduxjs/toolkit';
import { songReducer } from './song/slice';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { authReducer } from './auth/slice';
import { globalReducer } from './global/slice';

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'refreshToken'],
};

const persistedAuth = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuth,
        song: songReducer,
        global: globalReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);
