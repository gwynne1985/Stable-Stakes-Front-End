import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base dimensions from design spec
const baseWidth = 360;
const baseHeight = 778;

export const scaleWidth = (size: number) => (width / baseWidth) * size;
export const scaleHeight = (size: number) => (height / baseHeight) * size;

// For font scaling
export const scaleFontSize = (size: number) => Math.round(scaleWidth(size));

export const moderateScale = (size: number, factor = 0.5): number => {
  return size + (scaleWidth(size) - size) * factor;
}; 