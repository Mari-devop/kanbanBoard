
import { createSlice } from '@reduxjs/toolkit';
import { Column } from '../../types'; 

interface ColumnsState {
  columns: Column[];
  loading: boolean;
  error: string | null;
}

const initialState: ColumnsState = {
  columns: [],
  loading: false,
  error: null,
};


const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    
  },
});

export default columnsSlice.reducer;
