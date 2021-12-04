import React from 'react';
import { ScreenContainer } from '../../../theme/components/ScreenContainer';
import { ScreenTitle } from '../../../theme/components/ScreenTitle';
import { StyledButton } from '../../../theme/components/Button';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { AllScreens } from '../../../app/Navigation.types';
import { ScreenSubtitle } from '../../../theme/components/ScreenSubtitle';
import { Image, StyleSheet, View } from 'react-native';

export const TrackStartedScreen = ({
  navigation,
}: NativeStackScreenProps<AllScreens, 'TrackStarted'>) => {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <ScreenTitle text="Rozpoczęto trasę" />
        <ScreenSubtitle text="Schowaj telefon w bezpiecznym miejscu." />
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/smartphone.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.buttonContainer}>
          <StyledButton title="OK" onPress={navigation.goBack} />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: 200,
  },
});
