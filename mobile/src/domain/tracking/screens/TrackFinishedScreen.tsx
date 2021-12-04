import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { AllScreens } from '../../../app/Navigation.types';
import { StyleSheet, View, Text, Image } from 'react-native';
import React from 'react';
import { ScreenContainer } from '../../../theme/components/ScreenContainer';
import { ScreenTitle } from '../../../theme/components/ScreenTitle';
import { ScreenSubtitle } from '../../../theme/components/ScreenSubtitle';
import { StyledButton } from '../../../theme/components/Button';
import { Colors } from '../../../theme/Colors';

export const TrackFinishedScreen = ({
  navigation,
}: NativeStackScreenProps<AllScreens, 'TrackStarted'>) => {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <ScreenTitle text="Gratulacje" />
        <ScreenSubtitle text="Otrzymujesz 1 punkt." />
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/forest.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Czy wiesz, że...</Text>
          <Text style={styles.paragraph}>
            Jazda samochodem 15 kilometrów w tę i z powrotem to emisja 5
            kilogramów CO2.
          </Text>
          <Text style={styles.paragraph}>
            Sporych rozmiarów drzewo będzie pochłaniać taką ilość CO2 przez rok.
          </Text>
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
  subtitle: {
    fontSize: 20,
    color: Colors.secondary,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  paragraph: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '400',
    lineHeight: 22,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: 200,
  },
  textContainer: {
    marginBottom: 40,
  },
});
