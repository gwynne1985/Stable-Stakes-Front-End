import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';
import { EditEmailStep } from './EditEmailStep';
import { ValidationCodeStep } from './ValidationCodeStep';
import BottomSheet from '../../BottomSheet';
import { SimpleSlidingPanel, SimpleSlidingPanelRef } from '../../panels/SimpleSlidingPanel';
import { EditPasswordStep } from './EditPasswordStep';
import { useNavigation } from '@react-navigation/native';
import EditNameStep from './EditNameStep';
import EditYourClubStep from './EditYourClubStep';

interface ContactStepProps {
  onClose: () => void;
  initialName: string;
  onSaveName: (name: string) => void;
}

const ContactStep: React.FC<ContactStepProps> = ({ onClose, initialName, onSaveName }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingClub, setIsEditingClub] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [email, setEmail] = useState('joebloggs@myemail.co.uk');
  const [code, setCode] = useState('');
  const [club, setClub] = useState('Your Club');
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [wasUpdated, setWasUpdated] = useState(false);

  // Animation for code step
  const codeAnim = useRef(new Animated.Value(1)).current; // 1 = offscreen right, 0 = onscreen
  const panelRef = useRef<SimpleSlidingPanelRef>(null);
  const namePanelRef = useRef<SimpleSlidingPanelRef>(null);
  const clubPanelRef = useRef<SimpleSlidingPanelRef>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (showValidation) {
      codeAnim.setValue(1);
      Animated.timing(codeAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start();
    }
  }, [showValidation]);

  const handleEditName = () => {
    setIsEditingName(true);
    setWasUpdated(false);
  };

  const handleEditEmail = () => {
    setIsEditingEmail(true);
    setShowValidation(false);
    setWasUpdated(false);
    setCode('');
  };

  const handleEditPassword = () => {
    setIsEditingPassword(true);
    setWasUpdated(false);
  };

  const handleEditClub = () => {
    setIsEditingClub(true);
    setWasUpdated(false);
  };

  const handleCloseEdit = () => {
    setTimeout(() => {
      setIsEditingName(false);
      setIsEditingEmail(false);
      setIsEditingPassword(false);
      setIsEditingClub(false);
      setShowValidation(false);
      setWasUpdated(false);
      setCode('');
    }, 500);
  };

  const handleUpdate = () => {
    setShowValidation(true);
  };

  const handleCodeNext = () => {
    setEmail(email); // You may want to update this to actually save the new email
    setShowValidation(false);
    setWasUpdated(true);
    // Slide down the panel
    panelRef.current?.handleClose();
    setTimeout(() => {
      setShowBottomSheet(true);
    }, 500);
  };

  const handleSaveEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleBottomSheetDismiss = () => {
    setShowBottomSheet(false);
  };

  const handleClubUpdate = () => {
    setWasUpdated(true);
    clubPanelRef.current?.handleClose();
    setTimeout(() => {
      setShowBottomSheet(true);
    }, 500);
  };

  const handleSaveClub = (newClub: string) => {
    setClub(newClub);
  };

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <TouchableOpacity style={styles.detailContainer} onPress={handleEditName}>
          <Image 
            source={require('../../../../assets/icons/account/contact.png')} 
            style={styles.icon} 
          />
          <Text style={styles.text}>{initialName}</Text>
          <Image 
            source={require('../../../../assets/icons/edit.png')} 
            style={styles.editIcon} 
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.detailContainer} onPress={handleEditEmail}>
          <Image 
            source={require('../../../../assets/icons/account/email.png')} 
            style={styles.icon} 
          />
          <Text style={styles.text}>{email}</Text>
          <Image 
            source={require('../../../../assets/icons/edit.png')} 
            style={styles.editIcon} 
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.detailContainer} onPress={handleEditPassword}>
          <Image 
            source={require('../../../../assets/icons/account/privacypolicy.png')} 
            style={styles.icon} 
          />
          <Text style={styles.text}>Password</Text>
          <Image 
            source={require('../../../../assets/icons/edit.png')} 
            style={styles.editIcon} 
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.detailContainer} onPress={handleEditClub}>
          <Image 
            source={require('../../../../assets/icons/account/yourclub.png')} 
            style={styles.icon} 
          />
          <Text style={styles.text}>{club}</Text>
          <Image 
            source={require('../../../../assets/icons/edit.png')} 
            style={styles.editIcon} 
          />
        </TouchableOpacity>
      </View>

      <SimpleSlidingPanel
        ref={namePanelRef}
        isVisible={isEditingName}
        onClose={handleCloseEdit}
        title="Edit Name"
      >
        <EditNameStep
          onClose={handleCloseEdit}
          onSave={onSaveName}
          initialName={initialName}
          onUpdateStart={() => {}}
          onUpdate={() => {
            setWasUpdated(true);
            namePanelRef.current?.handleClose();
            setTimeout(() => {
              setShowBottomSheet(true);
            }, 500);
          }}
        />
      </SimpleSlidingPanel>

      {/* Email edit flow in a sliding panel */}
      <SimpleSlidingPanel
        ref={panelRef}
        isVisible={isEditingEmail}
        onClose={handleCloseEdit}
        title={showValidation ? 'Enter Code' : 'Edit Email'}
      >
        {!showValidation ? (
          <EditEmailStep
            email={email}
            onEmailChange={setEmail}
            onUpdate={handleUpdate}
          />
        ) : (
          <Animated.View
            style={{
              flex: 1,
              transform: [{ translateX: codeAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 500] }) }],
            }}
          >
            <ValidationCodeStep
              code={code}
              onCodeChange={setCode}
              onNext={handleCodeNext}
              buttonTitle="Confirm"
            />
          </Animated.View>
        )}
      </SimpleSlidingPanel>

      <SimpleSlidingPanel
        isVisible={isEditingPassword}
        onClose={handleCloseEdit}
        title="Edit Password"
      >
        <EditPasswordStep
          onClose={handleCloseEdit}
          onUpdate={() => {
            setWasUpdated(true);
            setTimeout(() => {
              setIsEditingPassword(false);
              setShowBottomSheet(true);
            }, 500);
          }}
        />
      </SimpleSlidingPanel>

      <SimpleSlidingPanel
        ref={clubPanelRef}
        isVisible={isEditingClub}
        onClose={handleCloseEdit}
        title="Edit Club"
      >
        <EditYourClubStep
          onClose={handleCloseEdit}
          onSave={handleSaveClub}
          initialClub={club}
          onUpdate={handleClubUpdate}
        />
      </SimpleSlidingPanel>

      {showBottomSheet && (
        <BottomSheet
          message="Update Complete"
          onDismiss={handleBottomSheetDismiss}
          duration={4000}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E3E3',
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
  },
  detailContainer: {
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
  icon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    marginRight: scaleWidth(10),
  },
  text: {
    flex: 1,
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: undefined,
  },
  editIcon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    marginLeft: scaleWidth(10),
  },
});

export default ContactStep; 