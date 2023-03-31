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
    contestDetail: build.query<any, IContestBody>({
      query: ({id, body}: any) => ({
        method: 'GET',
        url: `contest/${id}`,
        body,
      }),
    }),
    category: build.query<any, IContestBody>({
      query: body => ({
        method: 'GET',
        url: 'contest/category/',
        body,
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

const useContestDetailQuery = contestService.endpoints.contestDetail.useQuery;
const useCategoryQuery = contestService.endpoints.category.useQuery;
const useContestListQuery = contestService.endpoints.contestList.useQuery;
const useJoinContestQuery = contestService.endpoints.joinContest.useMutation;

const contestMiddleWare = contestService.middleware;
const contestReducerPath = contestService.reducerPath;

export {
  useContestDetailQuery,
  useCategoryQuery,
  useContestListQuery,
  useJoinContestQuery,
  contestMiddleWare,
  contestReducerPath,
};
