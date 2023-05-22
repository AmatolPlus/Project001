import {Platform} from 'react-native';
import SpInAppUpdates, {
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';

const inAppUpdates = new SpInAppUpdates(false);

export function checkForUpdate() {
  inAppUpdates.checkNeedsUpdate().then(result => {
    if (result.shouldUpdate) {
      let updateOptions: StartUpdateOptions = {};
      if (Platform.OS === 'android') {
        updateOptions = {
          updateType: IAUUpdateKind.IMMEDIATE,
        };
      }
      inAppUpdates.startUpdate(updateOptions);
    }
  });
}
