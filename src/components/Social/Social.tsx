import React from 'react';

import TextInput from '@/ui/TextInput';
import {styles} from './Social.styles';

const Social = ({form, onChange}: any) => (
  <>
    <TextInput
      label={'Youtube Link'}
      style={styles.input}
      mode="outlined"
      value={form?.youtube_detail?.link}
      onChangeText={text => onChange('youtube_detail', text)}
    />
    <TextInput
      label={'Instagram Link'}
      style={styles.input}
      mode="outlined"
      value={form?.instagram_detail?.link}
      onChangeText={text => onChange('instagram_detail', text)}
    />
    <TextInput
      label={'Facebook Link'}
      style={styles.input}
      mode="outlined"
      value={form?.facebook_detail?.link}
      onChangeText={text => onChange('facebook_detail', text)}
    />
  </>
);

export default Social;
