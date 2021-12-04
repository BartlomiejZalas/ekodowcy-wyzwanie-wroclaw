import { Tracking, TrackType } from '../tracking/Tracking.types';

export declare namespace Tracks {
  interface Track {
    id: number;
    path: Tracking.Location[];
    startTimestamp: number;
    stopTimestamp: number;
    score: number;
    type: TrackType;
    distance: number;
  }
}
