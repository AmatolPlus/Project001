import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateFacebook,
  updateInstagram,
  updateYoutube,
} from '@/services/reducers/profile.slice';
import TextInput from '@/ui/TextInput';
import {styles} from './Social.styles';

const Social = () => {
  const dispatch = useDispatch();
  const {profile}: any = useSelector(state => state);

  const handleYoutube = useCallback(
    (link: string) => {
      dispatch(
        updateYoutube({
          youtube_link: link,
        }),
      );
    },
    [dispatch],
  );

  const handleFacebook = useCallback(
    (link: string) => {
      dispatch(
        updateFacebook({
          facebook_link: link,
        }),
      );
    },
    [dispatch],
  );

  const handleInstagram = useCallback(
    (link: string) => {
      dispatch(
        updateInstagram({
          instagram_link: link,
        }),
      );
    },
    [dispatch],
  );

  return (
    <>
      <TextInput
        label={'Youtube Link'}
        style={styles.input}
        value={profile.youtube_detail?.link}
        onChangeText={handleYoutube}
      />
      <TextInput
        label={'Instagram Link'}
        style={styles.input}
        value={profile.instagram_detail?.link}
        onChangeText={handleInstagram}
      />
      <TextInput
        label={'Facebook Link'}
        style={styles.input}
        value={profile.facebook_detail?.link}
        onChangeText={handleFacebook}
      />
    </>
  );
};

export default Social;
