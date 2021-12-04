import { TrackType } from '../Tracking.types';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../theme/Colors';

interface Props {
  type: TrackType;
  onChange: (type: TrackType) => void;
}

export const TrackTypeSelector = ({ type: selectedType, onChange }: Props) => {
  const iconSize = 25;

  const ButtonContainer: React.FC<{ type: TrackType }> = ({
    type,
    children,
  }) => {
    const backgroundColor = selectedType === type ? Colors.primary : undefined;
    return (
      <TouchableOpacity
        onPress={() => onChange(type)}
        style={{ ...styles.button, backgroundColor }}>
        {children}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ButtonContainer type={TrackType.WALK}>
        <Image
          source={require('../assets/walking.png')}
          style={{ width: iconSize, height: iconSize }}
        />
      </ButtonContainer>
      <ButtonContainer type={TrackType.BIKE}>
        <Image
          source={require('../assets/bike.png')}
          style={{ width: iconSize, height: iconSize }}
        />
      </ButtonContainer>
      <ButtonContainer type={TrackType.SCOOTER}>
        <Image
          source={require('../assets/scooter.png')}
          style={{ width: iconSize, height: iconSize }}
        />
      </ButtonContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  button: {
    padding: 10,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
  },
});
