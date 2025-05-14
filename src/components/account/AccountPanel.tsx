import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { scaleWidth, scaleHeight } from '../../utils/scale';

const AVATAR_SIZE = scaleWidth(118.26);
const CAMERA_SIZE = scaleWidth(25.487);

interface AccountPanelProps {
  onContactDetails: () => void;
  onManageCards: () => void;
  onTransactionHistory: () => void;
  onRefundDeposit: () => void;
  onCommunications: () => void;
  onFAQ: () => void;
  onContactUs: () => void;
  onPrivacyPolicy: () => void;
  onTermsUse: () => void;
  onRedemptionTerms: () => void;
  onLogout: () => void;
  onEdit: () => void;
  userName: string;
}

const AccountPanel: React.FC<AccountPanelProps> = ({
  onContactDetails,
  onManageCards,
  onTransactionHistory,
  onRefundDeposit,
  onCommunications,
  onFAQ,
  onContactUs,
  onPrivacyPolicy,
  onTermsUse,
  onRedemptionTerms,
  onLogout,
  onEdit,
  userName
}) => {
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  const handleCameraPress = async () => {
    try {
      // Request permission to access the photo library
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      // Launch the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setAvatarImage(result.assets[0].uri);
        // TODO: Here you would typically upload the image to your backend
        // and update the user's profile
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Error selecting image. Please try again.');
    }
  };

  return (
    <ScrollView 
      style={{ backgroundColor: '#E3E3E3', flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ width: '100%', padding: 0 }}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Image 
              source={avatarImage ? { uri: avatarImage } : require('../../../assets/icons/account/avatar.png')} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.cameraButton} onPress={onEdit}>
              <Image source={require('../../../assets/icons/account/camera.png')} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.email}>joebloggs@myemail.co.uk</Text>
        </View>
        <View style={styles.panel}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <TouchableOpacity style={styles.linkContainer} onPress={onContactDetails}>
            <Image source={require('../../../assets/icons/account/contact.png')} style={styles.linkIcon} />
            <Text style={styles.linkText}>Contact Details</Text>
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
          <Text style={[styles.sectionTitle, { marginTop: scaleHeight(8) }]}>PREFERENCES</Text>
          <TouchableOpacity style={styles.linkContainer} onPress={onCommunications}>
            <Image source={require('../../../assets/icons/account/communications.png')} style={styles.linkIcon} />
            <Text style={styles.linkText}>Communications</Text>
            <Image source={require('../../../assets/icons/account/arrow.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
          <Text style={[styles.sectionTitle, { marginTop: scaleHeight(8) }]}>SUPPORT</Text>
          <TouchableOpacity style={styles.linkContainer} onPress={onFAQ}>
            <Image source={require('../../../assets/icons/account/faqs.png')} style={styles.linkIcon} />
            <Text style={styles.linkText}>FAQs</Text>
            <Image source={require('../../../assets/icons/account/arrow.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkContainer} onPress={onContactUs}>
            <Image source={require('../../../assets/icons/account/contactus.png')} style={styles.linkIcon} />
            <Text style={styles.linkText}>Contact Us</Text>
            <Image source={require('../../../assets/icons/account/arrow.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
          <Text style={[styles.sectionTitle, { marginTop: scaleHeight(8) }]}>POLICIES</Text>
          <TouchableOpacity style={styles.linkContainer} onPress={onPrivacyPolicy}>
            <Image source={require('../../../assets/icons/account/privacypolicy.png')} style={styles.linkIcon} />
            <Text style={styles.linkText}>Privacy Policy</Text>
            <Image source={require('../../../assets/icons/account/arrow.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkContainer} onPress={onTermsUse}>
            <Image source={require('../../../assets/icons/account/termsuse.png')} style={styles.linkIcon} />
            <Text style={styles.linkText}>Terms of Use</Text>
            <Image source={require('../../../assets/icons/account/arrow.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkContainer} onPress={onRedemptionTerms}>
            <Image source={require('../../../assets/icons/account/redemption.png')} style={styles.linkIcon} />
            <Text style={styles.linkText}>Redemption Terms</Text>
            <Image source={require('../../../assets/icons/account/arrow.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.linkContainer, { marginTop: scaleHeight(40) }]} 
            onPress={onLogout}
          >
            <Image source={require('../../../assets/icons/account/logout.png')} style={styles.linkIcon} />
            <Text style={styles.linkText}>Logout</Text>
            <Image source={require('../../../assets/icons/account/arrow.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
          <View style={styles.footerText}>
            <Text style={styles.versionText}>Stable Stakes Version 1.0.0</Text>
            <Text style={styles.copyrightText}>©2025 Stable Stakes Limited</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    display: 'flex',
    width: scaleWidth(300),
    height: scaleHeight(219),
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
    marginBottom: scaleHeight(0),
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
    borderWidth: 2,
    borderColor: '#4EDD69',
  },
  cameraButton: {
    position: 'absolute',
    right: scaleWidth(0),
    bottom: scaleHeight(5),
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
    marginTop: scaleHeight(-2),
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
    marginTop: scaleHeight(-5),
  },
  panel: {
    width: '100%',
    paddingVertical: scaleHeight(20),
    paddingHorizontal: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: scaleHeight(10),
    borderWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: '#E3E3E3',
    alignSelf: 'stretch',
    marginTop: 0,
    paddingBottom: scaleHeight(40),
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
  footerText: {
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(50),
    alignItems: 'center',
  },
  versionText: {
    color: '#707070',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: scaleWidth(10),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: undefined,
    letterSpacing: -0.28,
    marginBottom: scaleHeight(4),
  },
  copyrightText: {
    color: '#707070',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: scaleWidth(10),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: undefined,
    letterSpacing: -0.28,
  },
});

export default AccountPanel; 