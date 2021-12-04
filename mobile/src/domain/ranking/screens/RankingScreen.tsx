import React, { useState } from 'react';
import { ScreenContainer } from '../../../theme/components/ScreenContainer';
import { ScreenTitle } from '../../../theme/components/ScreenTitle';
import { ButtonSelector } from '../../../theme/components/ButtonSelector';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SchoolsRanking } from '../components/SchoolsRanking';
import { UsersRanking } from '../components/UsersRanking';

enum Mode {
  SCHOOLS = 'SCHOOLS',
  USERS = 'USERS',
}

export const RankingScreen = () => {
  const [mode, setMode] = useState<Mode>(Mode.SCHOOLS);
  return (
    <ScreenContainer>
      <ScreenTitle text="Ranking" />
      <View style={styles.tabs}>
        <ButtonSelector
          value={mode}
          onChange={v => setMode(v as Mode)}
          items={[
            { type: Mode.SCHOOLS, iconName: 'domain' },
            { type: Mode.USERS, iconName: 'account-multiple' },
          ]}
        />
      </View>

      <ScrollView>
        {mode === Mode.SCHOOLS && <SchoolsRanking />}
        {mode === Mode.USERS && <UsersRanking />}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  tabs: {
    marginVertical: 16,
  },
});
