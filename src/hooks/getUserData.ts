import {useSelector} from 'react-redux';

const useGetUser = () => {
  const {userData} = useSelector((store: any): any => store.login);

  return {userData};
};
export default useGetUser;
