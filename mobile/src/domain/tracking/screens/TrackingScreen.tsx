import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Geolocation, { GeoWatchOptions } from 'react-native-geolocation-service';

import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import { useLocationPermissions } from '../useLocationPermissions';
import { Tracking, TrackType } from '../Tracking.types';
import { calculateDistance } from '../Tracking.calculations';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import { useNavigation } from '@react-navigation/native';
import { TracksContext } from '../../tracks/TracksContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WarningsContext } from '../../warnings/WarningsContext';
import { Colors } from '../../../theme/Colors';
import { ButtonSelector } from '../../../theme/components/ButtonSelector';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { AllScreens } from '../../../app/Navigation.types';

const watchPositionOptions: GeoWatchOptions = {
  accuracy: {
    android: 'high',
    ios: 'best',
  },
  enableHighAccuracy: true,
  distanceFilter: 0,
  interval: 10000,
  fastestInterval: 2000,
};

const startForegroundService = async () => {
  if (Platform.Version >= 26) {
    await VIForegroundService.createNotificationChannel({
      id: 'gpsTrackingChannel',
      name: 'GPS Tracking Channel',
      description: 'Tracks activity of user',
      enableVibration: false,
    });
  }

  return VIForegroundService.startService({
    channelId: 'gpsTrackingChannel',
    id: 420,
    title: 'Bezpieczna Droga do Szkoły',
    text: 'Śledzenie trasy aktywne',
    icon: 'ic_launcher',
  });
};

const stopForegroundService = async () => VIForegroundService.stopService();

export const TrackingScreen = ({
  navigation,
}: NativeStackScreenProps<AllScreens, 'TrackStarted'>) => {
  const [path, setPath] = useState<Tracking.Location[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [type, setType] = useState<TrackType>(TrackType.BIKE);

  const watchId = useRef<number | null>(null);

  const { requestPermissions, hasLocationPermission, permissionsGranted } =
    useLocationPermissions();

  const { addTrack } = useContext(TracksContext);
  const { addWarning } = useContext(WarningsContext);

  const location = path.length > 0 ? path[path.length - 1] : null;
  const distance = calculateDistance(path);

  const defaultRegion: Region = {
    latitude: 51.107883,
    longitude: 17.038538,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const startTracking = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    if (Platform.OS === 'android') {
      await startForegroundService();
    }

    setIsTracking(true);
    setStartTime(new Date().getTime());

    watchId.current = Geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) => {
        const newLocation = { latitude, longitude };
        setPath(currentPath => [...currentPath, newLocation]);
      },
      e => console.log(e),
      watchPositionOptions,
    );

    navigation.navigate('TrackStarted');
  };

  const reportWarning = async () => {
    if (!location) {
      return;
    }
    await addWarning({
      timestamp: new Date().getTime(),
      description: null,
      category: 'Zgłoszenie w trakcie trasy',
      ...location,
    });
    ToastAndroid.show('Zagrożenie zgłoszone', ToastAndroid.SHORT);
  };

  const stopTracking = useCallback(async () => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setIsTracking(false);
      navigation.navigate('TrackStop');
      addTrack({
        id: Math.random(),
        stopTimestamp: new Date().getTime(),
        startTimestamp: startTime!,
        score: 1,
        type,
        path,
        distance,
      });
      setPath([]);
      setStartTime(null);
      await stopForegroundService();
    }
  }, [navigation, path]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={location ? { ...defaultRegion, ...location } : defaultRegion}>
          {location && (
            <Marker
              coordinate={location}
              image={require('../assets/point.png')}
            />
          )}
          <Polyline
            coordinates={path}
            strokeColor={Colors.primary}
            strokeWidth={10}
          />
        </MapView>
        {!isTracking && (
          <View style={styles.trackTypeSelectorContainer}>
            <ButtonSelector
              value={type}
              onChange={v => setType(v as TrackType)}
              items={[
                { type: TrackType.BIKE, iconName: 'bike' },
                { type: TrackType.SCOOTER, iconName: 'scooter' },
                { type: TrackType.WALK, iconName: 'walk' },
              ]}
            />
          </View>
        )}
        <View style={styles.menuContainer}>
          {!isTracking && (
            <TouchableOpacity
              style={[styles.button, styles.startButton]}
              disabled={!permissionsGranted}
              onPress={startTracking}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          )}
          {isTracking && (
            <TouchableOpacity
              style={[styles.button, styles.stopButton]}
              onPress={stopTracking}>
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          )}
          {isTracking && (
            <TouchableOpacity
              style={[styles.button, styles.warningIcon]}
              onPress={reportWarning}>
              <Icon name="warning" size={20} color="#FFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    padding: 16,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    bottom: 24,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  trackTypeSelectorContainer: {
    position: 'absolute',
    top: 24,
    right: 24,
    left: 24,
  },
  button: {
    borderRadius: 50,
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    backgroundColor: Colors.secondary,
  },
  stopButton: {
    backgroundColor: Colors.error,
  },
  warningIcon: {
    borderRadius: 37,
    width: 74,
    height: 74,
    backgroundColor: Colors.additional,
    position: 'absolute',
    right: 24,
    bottom: 12,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
