import { View } from 'react-native';
import { Selector } from '../../../theme/components/Selector';
import { warningCategories } from '../Warnings.model';
import { Textarea } from '../../../theme/components/Textarea';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { StyledButton } from '../../../theme/components/Button';
import React, { useContext, useState } from 'react';
import { Tracking } from '../../tracking/Tracking.types';
import { WarningsContext } from '../WarningsContext';
import { ScreenTitle } from '../../../theme/components/ScreenTitle';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { AllScreens } from '../../../app/Navigation.types';
import { ScreenContainer } from '../../../theme/components/ScreenContainer';
import { Link } from '../../../theme/components/Link';

const defaultRegion: Region = {
  latitude: 51.107883,
  longitude: 17.038538,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

export const AddWarningScreen = ({
  navigation,
}: NativeStackScreenProps<AllScreens, 'AddWarning'>) => {
  const { addWarning } = useContext(WarningsContext);

  const [category, setCategory] = useState(warningCategories[0]);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<Tracking.Location>({
    latitude: defaultRegion.latitude,
    longitude: defaultRegion.longitude,
  });

  const save = async () => {
    await addWarning({
      category,
      description,
      timestamp: new Date().getTime(),
      ...location,
    });
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <ScreenTitle text="Dodaj zgłoszenie" />
      <Selector
        label="Kategoria"
        items={warningCategories.map(v => ({ value: v, label: v }))}
        value={category}
        placeholder=""
        onChange={setCategory}
      />
      <Textarea
        value={description}
        onChangeText={setDescription}
        label="Opis"
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 3 }}
        onRegionChange={region => setLocation(region)}
        initialRegion={{ ...defaultRegion, ...location }}>
        <Marker coordinate={location} draggable />
      </MapView>
      <View
        style={{
          paddingTop: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Link title="Anuluj" onPress={() => navigation.goBack()} />
        <StyledButton title="Zapisz" onPress={save} />
      </View>
    </ScreenContainer>
  );
};
