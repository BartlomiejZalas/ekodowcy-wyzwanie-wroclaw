import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../theme/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  ranking: number;
  name: string;
  score: number;
}

export const RankingItem: React.FC<Props> = ({ name, score, ranking }) => {
  return (
    <View style={[styles.row, styles.container]}>
      <View style={styles.row}>
        <Text style={styles.ranking}>{ranking}</Text>
        <Icon
          name="account-circle"
          size={28}
          color={Colors.black}
          style={{ marginHorizontal: 16 }}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.score}>{score}</Text>
        <Icon name="tree" size={24} color={Colors.secondary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginHorizontal: 8,
    marginBottom: 16,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ranking: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    color: Colors.black,
  },
  score: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: 'bold',
  },
});
