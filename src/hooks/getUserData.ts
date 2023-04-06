import React from 'react';
import {useSelector} from 'react-redux';

const useGetUser = () => {
  const {userData} = useSelector(store => store.login);

  return {userData};
};
export default useGetUser;
