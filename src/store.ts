import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from './features/issues/issuesSlice';


const store = configureStore({ 
  reducer: {
    issues: issuesReducer,
  }
});

export default store;



