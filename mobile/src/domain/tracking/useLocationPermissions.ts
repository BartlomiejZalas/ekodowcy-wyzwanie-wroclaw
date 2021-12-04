import { PermissionsAndroid, Platform, ToastAndroid } from 'react-native';
import { useCallback, useState } from 'react';

export const useLocationPermissions = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  const requestPermissions = useCallback(async () => {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    console.log(status);

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      setPermissionsGranted(true);
      return;
    }
    setPermissionsGranted(false);

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }
  }, []);

  const hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    } else {
      await requestPermissions();
    }
  };

  return {
    requestPermissions,
    hasLocationPermission,
    permissionsGranted,
  };
};
