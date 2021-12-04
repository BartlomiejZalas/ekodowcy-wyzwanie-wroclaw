import { Podium } from './Podium';
import { View } from 'react-native';
import { RankingItem } from './RankingItem';
import React from 'react';
import { Divider } from '../../../theme/components/Divider';

const scores = [
  { name: 'School1', score: 123 },
  { name: 'School2', score: 123 },
  { name: 'School3', score: 123 },
  { name: 'School4', score: 123 },
  { name: 'School5', score: 123 },
  { name: 'School6', score: 123 },
  { name: 'School7', score: 123 },
  { name: 'School8', score: 123 },
];

export const SchoolsRanking = () => {
  const [first, second, third, ...rest] = scores;
  return (
    <>
      <Podium first={first} second={second} third={third} />

      <Divider />

      {rest.map((item, index) => (
        <RankingItem {...item} ranking={index + 4} key={item.name} />
      ))}
    </>
  );
};
