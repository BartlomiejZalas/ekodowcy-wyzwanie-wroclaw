import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../../theme/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RankingItem } from '../Ranking.model';

interface Props {
  first: RankingItem;
  second: RankingItem;
  third: RankingItem;
}

export const Podium: React.FC<Props> = ({ first, second, third }) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.podium__item}>
        <Text style={styles.podiumName}>{second.name}</Text>
        <View style={[styles.podiumRank, styles.podiumSecond]}>
          <Text style={[styles.place, styles.placeSecond]}>2</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>{second.score}</Text>
            <Icon name="tree" size={20} color={Colors.black} />
          </View>
        </View>
      </View>
      <View style={styles.podium__item}>
        <Text style={styles.podiumName}>{first.name}</Text>
        <View style={[styles.podiumRank, styles.podiumFirst]}>
          <Text style={styles.place}>1</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>{first.score}</Text>
            <Icon name="tree" size={20} color={Colors.black} />
          </View>
        </View>
      </View>
      <View style={styles.podium__item}>
        <Text style={styles.podiumName}>{third.name}</Text>
        <View style={[styles.podiumRank, styles.podiumThird]}>
          <Text style={[styles.place, styles.placeThird]}>3</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>{third.score}</Text>
            <Icon name="tree" size={20} color={Colors.black} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  podium__item: {
    width: '25%',
  },
  podiumRank: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  place: {
    fontSize: 40,
    color: Colors.black,
    fontWeight: 'bold',
  },
  placeSecond: {
    fontSize: 30,
  },
  placeThird: {
    fontSize: 20,
  },
  podiumName: {
    textAlign: 'center',
    padding: 10,
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.black,
  },
  podiumFirst: {
    minHeight: 100,
    backgroundColor: Colors.additional,
  },
  podiumSecond: {
    minHeight: 66,
    backgroundColor: Colors.primary,
  },
  podiumThird: {
    minHeight: 33,
    backgroundColor: Colors.secondary,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  score: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
