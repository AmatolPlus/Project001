import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Portal} from 'react-native-paper';
import {Modal} from '@/ui';
import PostPreview from '../PostPreview/PostPreview';
import {View} from 'react-native';

function PostView(
  {item, handleLike, isLikeLoading, likeEndDate}: any,
  ref: any,
) {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setVisible(true),
      close: () => setVisible(false),
    }),
    [],
  );

  return (
    <Portal>
      <Modal
        className="flex items-center justify-center"
        onDismiss={() => {
          setVisible(!visible);
        }}
        visible={visible}>
        <View className="flex items-center justify-center flex-1 w-full">
          <PostPreview
            close={ref?.current?.close}
            handleOnLike={handleLike}
            item={item}
            isLikeLoading={isLikeLoading}
            likeEndDate={likeEndDate}
          />
        </View>
      </Modal>
    </Portal>
  );
}

export default forwardRef(PostView);
