import { SafeAreaView, ScrollView, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { WarningsContext } from '../WarningsContext';
import { Colors } from '../../../theme/Colors';
import { ScreenTitle } from '../../../theme/components/ScreenTitle';
import { WarningItem } from '../components/WarningItem';
import { StyledButton } from '../../../theme/components/Button';
import { Dialog } from '../../../theme/components/Dialog';
import { Selector } from '../../../theme/components/Selector';
import { warningCategories } from '../Warnings.model';
import { Textarea } from '../../../theme/components/Textarea';
import { Tracking } from '../../tracking/Tracking.types';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

const defaultRegion: Region = {
  latitude: 51.107883,
  longitude: 17.038538,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

export const WarningsScreen = () => {
  const { warnings, addWarning } = useContext(WarningsContext);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [category, setCategory] = useState(warningCategories[0]);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<Tracking.Location>({
    latitude: defaultRegion.latitude,
    longitude: defaultRegion.longitude,
  });

  const save = () => {
    addWarning({
      category,
      description,
      timestamp: new Date().getTime(),
      ...location,
    });
    setAddModalOpen(false);
    setDescription('');
    setCategory(warningCategories[0]);
  };

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, padding: 20, backgroundColor: Colors.white }}>
        <ScreenTitle text="Twoje zgłoszenia" />
        <ScrollView>
          {warnings.map(w => (
            <WarningItem warning={w} key={w.id} />
          ))}
        </ScrollView>
        <View style={{ padding: 8 }}>
          <StyledButton
            title="Zgłoś"
            color={Colors.additional}
            onPress={() => setAddModalOpen(true)}
          />
        </View>
      </SafeAreaView>
      <Dialog
        title="Dodaj zgłoszenie"
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}>
        <Selector
          label="Kategoria"
          items={warningCategories.map(v => ({ value: v, label: v }))}
          value={category}
          placeholder=""
          onChange={setCategory}
        />
        <Textarea value={description} onChangeText={setDescription} />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 2 }}
          onRegionChange={region => setLocation(region)}
          initialRegion={{ ...defaultRegion, ...location }}>
          <Marker coordinate={location} draggable />
        </MapView>
        <View style={{ paddingVertical: 16 }}>
          <StyledButton title="Zapisz" onPress={save} />
        </View>
      </Dialog>
    </>
  );
};
