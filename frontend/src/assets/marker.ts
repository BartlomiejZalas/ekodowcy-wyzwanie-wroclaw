import { Icon, Point } from 'leaflet';
import markerImage from './marker.svg';

export const marker = new Icon({
  iconUrl: markerImage,
  iconRetinaUrl: markerImage,
  iconSize: new Point(40, 40),
});
