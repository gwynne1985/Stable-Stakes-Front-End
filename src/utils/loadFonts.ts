import * as Font from 'expo-font';

export const loadFonts = () => {
  return Font.loadAsync({
    'Poppins-LightItalic': require('../../assets/fonts/Poppins-LightItalic.ttf'),
    'Poppins-ExtraBoldItalic': require('../../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins': require('../../assets/fonts/Poppins-Regular.ttf'),
  });
}; 