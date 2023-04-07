import {createSlice} from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      hobby: '',
      birthday: '',
      address_detail: {
        state: 'Karnataka',
        city: '',
        street: '',
        postal_code: '',
      },
      facebook_detail: {
        facebook_page: false,
        facebook_link: '',
        friends: 0,
      },
      instagram_detail: {
        instagram_page: false,
        instagram_link: '',
        friends: 0,
      },
      youtube_detail: {
        youtube_link: false,
        subscribers: 0,
      },
    },
  },
  reducers: {
    updateAddress: (state, action) => {
      return (state = {
        ...state,
        profile: {
          ...state.profile,
          address_detail: {
            ...state.profile.address_detail,
            ...action.payload,
          },
        },
      });
    },
    updateYoutube: (state, action) => {
      return (state = {
        ...state,
        profile: {
          ...state.profile,
          youtube_detail: {
            ...state.profile.youtube_detail,
            ...action.payload,
          },
        },
      });
    },
    updateInstagram: (state, action) => {
      return (state = {
        ...state,
        profile: {
          ...state.profile,
          instagram_detail: {
            ...state.profile.youtube_detail,
            ...action.payload,
          },
        },
      });
    },
    updateFacebook: (state, action) => {
      return (state = {
        ...state,
        profile: {
          ...state.profile,
          facebook_detail: {
            ...state.profile.youtube_detail,
            ...action.payload,
          },
        },
      });
    },
    updateUserBio: (state, action) => {
      return (state = {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      });
    },
  },
});

export const {
  updateUserBio,
  updateYoutube,
  updateInstagram,
  updateFacebook,
  updateAddress,
} = profileSlice.actions;
export default profileSlice.reducer;
