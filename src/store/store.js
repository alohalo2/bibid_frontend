import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storageSession from 'redux-persist/es/storage/session';
import memberSlice from "../slices/etc2_memberslice/memberSlice";
import specialAuctionSlice from "../slices/specialAuction/specialAuctionSlice";
import searchSlice from '../slices/search/searchSlice';


const reducers = combineReducers({
    memberSlice,
    specialAuctionSlice ,
    auction: searchSlice,
});

const persistConfig = {
    key: 'root',
    storage: storageSession
};

const persistreducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistreducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE, REGISTER]
            }
        })
});
