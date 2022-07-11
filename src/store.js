import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/userReducer'
import emailSlice from './reducers/emailReducer'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    version: 1,
    whitelist : ['login','user','user_id','currentEmailIndex','userCompletedEmails'],
    storage,
}

const persistedUserReducer = persistReducer(persistConfig, userSlice)
const persistedEmailReducer = persistReducer(persistConfig, emailSlice)


export const store = configureStore({
    reducer: {
        userReducer : persistedUserReducer,
        emailReducer : persistedEmailReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

//let persistor = persistStore(store)