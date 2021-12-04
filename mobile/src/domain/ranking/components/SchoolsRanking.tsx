import { Podium } from './Podium';
import React, { useEffect, useState } from 'react';
import { Divider } from '../../../theme/components/Divider';
import { SchoolsApi } from '../../../api/SchoolsApi';
import { AsyncStatus } from '../../../api/types';
import { Error } from '../../../theme/components/Error';
import { ActivityIndicator } from 'react-native';
import { RankingItem as RankinItemType } from '../Ranking.model';
import { RankingItem } from './RankingItem';

export const SchoolsRanking = () => {
  const [scores, setScores] = useState<RankinItemType[]>([]);
  const [status, setStatus] = useState(AsyncStatus.LOADING);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setStatus(AsyncStatus.LOADING);
        const scores = await SchoolsApi.getRanking();
        setScores(scores.map(s => ({ ...s, name: s.schoolName })));
        setStatus(AsyncStatus.LOADED);
      } catch (e) {
        console.log(e);
        setStatus(AsyncStatus.ERROR);
      }
    };
    fetchRanking();
  }, []);

  if (status === AsyncStatus.ERROR) {
    return <Error />;
  }

  if (status === AsyncStatus.LOADING) {
    return <ActivityIndicator size="large" />;
  }

  if (scores.length < 3) {
    return <Error text="Brak banych" />;
  }

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
