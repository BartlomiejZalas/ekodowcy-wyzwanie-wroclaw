import { Podium } from './Podium';
import { RankingItem } from './RankingItem';
import React from 'react';
import { Divider } from '../../../theme/components/Divider';

const users = [
  { name: 'nick1', score: 123 },
  { name: 'nick2', score: 123 },
  { name: 'nick3', score: 123 },
  { name: 'nick3', score: 123 },
  { name: 'nick5', score: 123 },
  { name: 'nick6', score: 123 },
  { name: 'nick7', score: 123 },
  { name: 'nick8', score: 123 },
];

export const UsersRanking = () => {
  const [first, second, third, ...rest] = users;
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
