import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

const AVATAR_SIZE = scaleWidth(73);
const CAMERA_SIZE = scaleWidth(25.487);

export const AccountPanel: React.FC<{ 
  onContactDetails: () => void; 
  onYourClub: () => void;
  onManageCards: () => void;
  onTransactionHistory: () => void;
  onRefundDeposit: () => void;
  onCommunications: () => void;
  onFAQ: () => void;
}> = ({ 
  onContactDetails, 
  onYourClub,
  onManageCards,
  onTransactionHistory,
  onRefundDeposit,
  onCommunications,
  onFAQ
}) => {
  const handleCameraPress = () => {
    // TODO: Implement image picker logic
  };

  return (
    <View style={{ backgroundColor: '#D0E6FF', flex: 1, width: '100%', padding: 0 }}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image source={require('../../../assets/icons/account/avatar.png')} style={styles.avatar} />
          <TouchableOpacity style={styles.cameraButton} onPress={handleCameraPress}>
            <Image source={require('../../../assets/icons/account/camera.png')} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Stuart Russell</Text>
        <Text style={styles.email}>joebloggs@myemail.co.uk</Text>
      </View>
      <View style={styles.panel}>
        <Text style={styles.sectionTitle}>ACCOUNT</Text>
        <TouchableOpacity style={styles.linkContainer} onPress={onContactDetails}>
          <Image source={require('../../../assets/icons/account/contact.png')} style={styles.linkIcon} />
          <Text style={styles.linkText}>Contact Details</Text>
          <Image source={require('../../../assets/icons/account/arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkContainer} onPress={onYourClub}>
          <Image source={require('../../../assets/icons/account/yourclub.png')} style={styles.linkIcon} />
          <Text style={styles.linkText}>Your Club</Text>
          <Image source={require('../../../assets/icons/account/arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkContainer} onPress={onManageCards}>
          <Image source={require('../../../assets/icons/account/managecards.png')} style={styles.linkIcon} />
          <Text style={styles.linkText}>Manage Cards</Text>
          <Image source={require('../../../assets/icons/account/arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkContainer} onPress={onTransactionHistory}>
          <Image source={require('../../../assets/icons/account/transaction.png')} style={styles.linkIcon} />
          <Text style={styles.linkText}>Transaction History</Text>
          <Image source={require('../../../assets/icons/account/arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkContainer} onPress={onRefundDeposit}>
          <Image source={require('../../../assets/icons/account/refund.png')} style={styles.linkIcon} />
          <Text style={styles.linkText}>Refund Deposit</Text>
          <Image source={require('../../../assets/icons/account/arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkContainer} onPress={onCommunications}>
          <Image source={require('../../../assets/icons/account/communications.png')} style={styles.linkIcon} />
          <Text style={styles.linkText}>Communications</Text>
          <Image source={require('../../../assets/icons/account/arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkContainer} onPress={onFAQ}>
          <Image source={require('../../../assets/icons/account/faqs.png')} style={styles.linkIcon} />
          <Text style={styles.linkText}>FAQs</Text>
          <Image source={require('../../../assets/icons/account/arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    display: 'flex',
    width: scaleWidth(300),
    height: scaleHeight(179),
    paddingVertical: scaleHeight(20),
    paddingHorizontal: scaleWidth(24),
    flexDirection: 'column',
    alignItems: 'center',
    gap: scaleHeight(10),
    flexShrink: 0,
    borderRadius: scaleWidth(20),
    borderWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: '#FFF',
    alignSelf: 'center',
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(20),
  },
  avatarContainer: {
    position: 'relative',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    marginBottom: scaleHeight(10),
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#F0F0F0',
  },
  cameraButton: {
    position: 'absolute',
    right: -CAMERA_SIZE / 4,
    bottom: -CAMERA_SIZE / 4,
    width: CAMERA_SIZE,
    height: CAMERA_SIZE,
    borderRadius: CAMERA_SIZE / 2,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    elevation: 2,
  },
  cameraIcon: {
    width: CAMERA_SIZE * 0.85,
    height: CAMERA_SIZE * 0.85,
    resizeMode: 'contain',
  },
  name: {
    color: '#181818',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(20),
    fontStyle: 'italic',
    fontWeight: '800',
    lineHeight: scaleHeight(24),
    letterSpacing: -0.28,
    marginTop: scaleHeight(8),
    marginLeft: scaleWidth(4),
  },
  email: {
    color: '#707070',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: scaleHeight(12),
    letterSpacing: -0.28,
    marginLeft: scaleWidth(4),
    marginTop: scaleHeight(2),
  },
  panel: {
    width: '100%',
    height: scaleHeight(309),
    paddingVertical: scaleHeight(20),
    paddingHorizontal: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: scaleHeight(10),
    borderWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: '#E6F0FF',
    alignSelf: 'stretch',
    marginTop: 0,
  },
  linkContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: scaleWidth(300),
    padding: scaleWidth(12),
    gap: scaleWidth(10),
    backgroundColor: '#FFF',
    borderRadius: 98,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    marginBottom: scaleWidth(2),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  linkIcon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    marginRight: scaleWidth(10),
  },
  linkText: {
    color: '#2E2B2D',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: undefined,
    flex: 1,
  },
  arrowIcon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    marginLeft: scaleWidth(10),
  },
  sectionTitle: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontStyle: 'italic',
    fontWeight: '800',
    lineHeight: undefined,
    alignSelf: 'flex-start',
    marginLeft: scaleWidth(30),
    marginBottom: scaleHeight(10),
  },
});

export default AccountPanel; 