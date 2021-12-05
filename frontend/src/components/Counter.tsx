import React from 'react';

interface Props {
  count: number;
}

export const Counter: React.FC<Props> = ({count}) => (
  <div>Liczba zgłoszeń: {count}</div>
);
