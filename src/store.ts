import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from './features/issues/issuesSlice';
import columnsReducer from './features/columns/columnSlice';

const store = configureStore({ 
  reducer: {
    issues: issuesReducer,
    columns: columnsReducer,
  }
});

export default store;



