import {configureStore, combineReducers} from '@reduxjs/toolkit';
import  userReducer  from './User/UserSlice';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({user : userReducer});

const persistConfig = {
    key : 'root',
    storage,
    version : 1
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer : persistedReducer,
    niddleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    })
});
export const persistor = persistStore(store)
