import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

// Import reducers
import disciplineReducer from './slices/disciplineSlice';
import habitReducer from './slices/habitSlice';
import qualityReducer from './slices/qualitySlice';
import settingsReducer from './slices/settingsSlice';
import streakReducer from './slices/streakSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['habits', 'discipline', 'quality', 'streaks', 'settings'], // Only persist these reducers
};

const rootReducer = combineReducers({
  habits: habitReducer,
  discipline: disciplineReducer,
  quality: qualityReducer,
  streaks: streakReducer,
  settings: settingsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
