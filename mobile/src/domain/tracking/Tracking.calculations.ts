import haversine from 'haversine';
import { Tracking } from './Tracking.types';

const calculateDistanceBetweenPoints = (
  oldLocation: Tracking.Location,
  newLocation: Tracking.Location,
) => {
  return haversine(oldLocation, newLocation) || 0;
};

export const calculateDistance = (path: Tracking.Location[]) => {
  const distances: number[] = [];
  for (let i = 0; i < path.length - 1; i++) {
    distances.push(calculateDistanceBetweenPoints(path[i], path[i + 1]));
  }
  return distances.reduce((prev, curr) => prev + curr, 0);
};

export const msToHMS = (ms: number) => {
  let seconds = ms / 1000;
  const hours = Math.round(seconds / 3600);
  seconds = seconds % 3600;
  const minutes = Math.round(seconds / 60);
  seconds = Math.round(seconds % 60);
  return `${hours}:${minutes}:${seconds}`;
};

export const calculateTime = (startTime: number | null) => {
  if (!startTime) {
    return 0;
  }
  return new Date().getTime() - startTime;
};

export const calculateSpeed = (distanceKm: number, timeMs: number) => {
  if (!distanceKm || !timeMs) {
    return 0;
  }
  const timeInHours = timeMs / 1000 / 3600;
  return distanceKm / timeInHours;
};
