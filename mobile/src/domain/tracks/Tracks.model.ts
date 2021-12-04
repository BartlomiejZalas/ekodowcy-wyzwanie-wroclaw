import { Tracking } from '../tracking/Tracking.types';

export declare namespace Tracks {
  interface Track {
    id: number;
    path: Tracking.Location[];
    timestamp: number;
    distance: number;
  }
}
