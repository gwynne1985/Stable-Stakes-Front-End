import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface SupportYourClubProps {
  onInfoPress?: () => void;
  onVoucherPress?: () => void;
}

export const SupportYourClub: React.FC<SupportYourClubProps> = ({ onInfoPress, onVoucherPress }) => {
  return (
    <ImageBackground 
      source={require('../../../assets/images/golf-course.jpg')}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <TouchableOpacity onPress={onInfoPress} style={styles.infoIcon} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Image 
          source={require('../../../assets/icons/info.png')}
          style={{ width: 20, height: 20, tintColor: '#FFFFFF' }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>SUPPORT</Text>
        <Text style={styles.titleText}>YOUR</Text>
        <Text style={styles.titleText}>CLUB</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onVoucherPress}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>Get Pro Shop Vouchers</Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(300),
    height: scaleHeight(213),
    borderRadius: 20,
    overflow: 'hidden',
  },
  backgroundImage: {
    borderRadius: 20,
  },
  infoIcon: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: scaleHeight(25),
    right: scaleWidth(20),
    tintColor: '#FFFFFF',
    zIndex: 10,
  },
  textContainer: {
    position: 'absolute',
    top: scaleHeight(25),
    left: scaleWidth(27),
    paddingTop: 5,
    width: scaleWidth(240),
  },
  titleText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(32),
    fontStyle: 'italic',
    fontWeight: '800',
    lineHeight: scaleHeight(38),
    letterSpacing: -1,
    textTransform: 'uppercase',
    includeFontPadding: false,
  },
  button: {
    position: 'absolute',
    bottom: scaleHeight(20),
    alignSelf: 'center',
    width: scaleWidth(268),
    height: scaleHeight(41),
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: '#4EDD69',
    backgroundColor: '#4EDD69',
  },
  buttonTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'italic',
    fontWeight: '800',
    letterSpacing: -0.84,
    textTransform: 'none',
  },
}); 