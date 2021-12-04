import { SafeAreaView, ScrollView, View } from 'react-native';
import React, { useContext } from 'react';
import { WarningsContext } from '../WarningsContext';
import { Colors } from '../../../theme/Colors';
import { ScreenTitle } from '../../../theme/components/ScreenTitle';
import { WarningItem } from '../components/WarningItem';
import { StyledButton } from '../../../theme/components/Button';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { AllScreens } from '../../../app/Navigation.types';
import { ScreenContainer } from '../../../theme/components/ScreenContainer';

export const WarningsScreen = ({
  navigation,
}: NativeStackScreenProps<AllScreens, 'Warnings'>) => {
  const { warnings } = useContext(WarningsContext);

  return (
    <ScreenContainer>
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
          onPress={() => navigation.navigate('AddWarning')}
        />
      </View>
    </ScreenContainer>
  );
};
