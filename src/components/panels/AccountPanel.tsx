import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

export const AccountPanel: React.FC = () => {
  return (
    <View style={styles.panelContainer}>
      <View style={styles.profilePicWrapper}>
        <Image
          source={require('../../../assets/icons/account/avatar.png')}
          style={styles.profilePic}
        />
        <TouchableOpacity style={styles.cameraIconWrapper} activeOpacity={0.8}>
          <Image
            source={require('../../../assets/icons/account/camera.png')}
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.userName}>User Name</Text>
      <Text style={styles.userEmail}>user@email.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    width: scaleWidth(300),
    height: scaleHeight(179),
    paddingVertical: scaleHeight(20),
    paddingHorizontal: scaleWidth(24),
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: scaleHeight(10),
    borderRadius: scaleWidth(20),
    borderWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: '#FFF',
    position: 'relative',
  },
  profilePicWrapper: {
    position: 'relative',
    width: scaleWidth(73),
    height: scaleWidth(73),
    marginBottom: scaleHeight(8),
  },
  profilePic: {
    width: scaleWidth(73),
    height: scaleWidth(73),
    borderRadius: scaleWidth(36.5),
    backgroundColor: '#E3E3E3',
  },
  cameraIconWrapper: {
    position: 'absolute',
    right: scaleWidth(-8),
    bottom: scaleWidth(-8),
    width: scaleWidth(25.487),
    height: scaleWidth(25.487),
    borderRadius: scaleWidth(12.75),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  cameraIcon: {
    width: scaleWidth(25.487),
    height: scaleWidth(25.487),
    resizeMode: 'contain',
  },
  userName: {
    color: '#181818',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(20),
    fontStyle: 'italic',
    fontWeight: '800',
    letterSpacing: -0.28,
    marginTop: scaleHeight(8),
  },
  userEmail: {
    color: '#707070',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: -0.28,
    marginTop: scaleHeight(2),
  },
}); 