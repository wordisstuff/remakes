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
import { modalReducer } from './modal/slice';

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'refreshToken'],
};
const songsPersistConfig = {
    key: 'songs',
    storage,
    whitelist: ['songs', 'cart'],
};

const persistedAuth = persistReducer(authPersistConfig, authReducer);
const persistedSongs = persistReducer(songsPersistConfig, songReducer);

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        auth: persistedAuth,
        song: persistedSongs,
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
