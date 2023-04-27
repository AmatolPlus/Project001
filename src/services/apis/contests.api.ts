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
        url: `contest/${id}/`,
      }),
    }),
    section: build.query({
      query: () => ({
        method: 'GET',
        url: 'contest/section/',
      }),
    }),
    moreContests: build.query({
      query: id => ({
        method: 'GET',
        url: `contest/?contest_category=${id}`,
      }),
    }),
    joinContest: build.mutation<any, any>({
      query: body => ({
        method: 'POST',
        url: 'contest/join_contest/',
        body,
      }),
    }),
    confirmPayment: build.mutation<any, any>({
      query: body => ({
        method: 'POST',
        url: 'payment/confirm/',
        body,
      }),
    }),
    likeContest: build.mutation({
      query: body => ({
        method: 'POST',
        url: 'contest/like/',
        body,
      }),
    }),
    morePosts: build.query({
      query: () => ({
        method: 'GET',
        url: 'contest/joined_by_me/',
      }),
    }),
    uploadImage: build.mutation({
      query: (body: any) => {
        const formData: any = new FormData();
        formData.append('title', body?.title);
        formData.append('file', {
          uri: body?.file?.uri,
          type: body?.file?.type,
          name: body?.file?.fileName || 'image.jpg',
        });
        return {
          method: 'POST',
          url: 'storage/image/',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
    }),
  }),
});

export const {
  useConfirmPaymentMutation,
  useUploadImageMutation,
  useContestDetailQuery,
  useMorePostsQuery,
  useContestListQuery,
  useSectionQuery,
  useJoinContestMutation,
  useLikeContestMutation,
  useMoreContestsQuery,
} = contestService;

export const contestReducerPath = contestService.reducerPath;
