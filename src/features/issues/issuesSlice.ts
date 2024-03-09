
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Issue } from '../../types';
import axios from 'axios';

interface IssuesState {
  issues: Issue[];
  loading: boolean;
  error: string | null;
}

const initialState: IssuesState = {
  issues: [],
  loading: false,
  error: null
};

const fetchIssues = createAsyncThunk('issues/fetchIssues', async (url: string) => {
  try {
    const response = await axios.get(url);

  
    return response.data.map((issue: Issue) => {
      return {
        id: issue.id, 
        number: issue.number,
        title: issue.title, 
        user: issue.user.login,
        comments: issue.comments,
        state: issue.state,
        columnId: issue.state === 'open' ? 'todo' : 'done',
      }
    });
  } catch (error) {
    console.error('Error fetching issues:', error);
    throw error;
  }
});

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.issues = [...state.issues, ...action.payload];
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        console.error('Error fetching issues:', action.error);
      });
  },
});

export {fetchIssues};
export default issuesSlice.reducer;
