import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from '../redux.config';

export interface IContestBody {
  concept_name: string;
  smaple_image: string;
}

export const contestService = createApi({
  reducerPath: 'contests',
  baseQuery,
  tagTypes: ['Contests'],
  endpoints: build => ({
    contestList: build.query({
      query: () => ({
        method: 'GET',
        url: 'contest/',
      }),
    }),
    contestDetail: build.query({
      query: id => ({
        method: 'GET',
        url: `contest/${id}`,
      }),
    }),
    section: build.query({
      query: () => ({
        method: 'GET',
        url: 'contest/section/',
      }),
    }),
    joinContest: build.mutation<any, IContestBody>({
      query: body => ({
        method: 'POST',
        url: 'contest/join_contest/',
        body,
      }),
    }),
  }),
});

const {
  useContestDetailQuery,
  useContestListQuery,
  useSectionQuery,
  useJoinContestMutation,
} = contestService;

const contestMiddleWare = contestService.middleware;
const contestReducerPath = contestService.reducerPath;

export {
  useContestDetailQuery,
  useSectionQuery,
  useContestListQuery,
  useJoinContestMutation,
  contestMiddleWare,
  contestReducerPath,
};