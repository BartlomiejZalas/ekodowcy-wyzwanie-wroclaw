import { ActivityIndicator, ScrollView, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { WarningsContext } from '../WarningsContext';
import { Colors } from '../../../theme/Colors';
import { ScreenTitle } from '../../../theme/components/ScreenTitle';
import { WarningItem } from '../components/WarningItem';
import { StyledButton } from '../../../theme/components/Button';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { AllScreens } from '../../../app/Navigation.types';
import { ScreenContainer } from '../../../theme/components/ScreenContainer';
import { AsyncStatus } from '../../../api/types';
import { Error } from '../../../theme/components/Error';

export const WarningsScreen = ({
  navigation,
}: NativeStackScreenProps<AllScreens, 'Warnings'>) => {
  const { warnings, getWarnings } = useContext(WarningsContext);

  const [status, setStatus] = useState(AsyncStatus.LOADING);

  useEffect(() => {
    const fetchWarnings = async () => {
      try {
        setStatus(AsyncStatus.LOADING);
        await getWarnings();
        setStatus(AsyncStatus.LOADED);
      } catch (e) {
        setStatus(AsyncStatus.ERROR);
      }
    };
    fetchWarnings();
  }, []);

  if (status === AsyncStatus.ERROR) {
    return <Error />;
  }

  if (status === AsyncStatus.LOADING) {
    return <ActivityIndicator size="large" />;
  }

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
