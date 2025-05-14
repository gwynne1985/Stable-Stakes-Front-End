import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';
import EditPanel from './EditPanel';
import BottomSheet from '../../BottomSheet';

interface ContactStepProps {
  onClose: () => void;
  initialName: string;
  onSaveName: (name: string) => void;
}

const ContactStep: React.FC<ContactStepProps> = ({ onClose, initialName, onSaveName }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingClub, setIsEditingClub] = useState(false);
  const [email, setEmail] = useState('joebloggs@myemail.co.uk');
  const [club, setClub] = useState('Your Club');
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [wasUpdated, setWasUpdated] = useState(false);

  const handleEditName = () => {
    setIsEditingName(true);
    setWasUpdated(false);
  };

  const handleEditEmail = () => {
    setIsEditingEmail(true);
    setWasUpdated(false);
  };

  const handleEditClub = () => {
    setIsEditingClub(true);
    setWasUpdated(false);
  };

  const handleCloseEdit = () => {
    // Let the panel slide down completely
    setTimeout(() => {
      setIsEditingName(false);
      setIsEditingEmail(false);
      setIsEditingClub(false);
      setWasUpdated(false);
    }, 500); // Match the panel slide duration
  };

  const handleUpdate = () => {
    setWasUpdated(true);
    // Show bottom sheet while panel is still sliding down
    setTimeout(() => {
      setShowBottomSheet(true);
    }, 200); // Show bottom sheet after 200ms, while panel is still sliding down
  };

  const handleSaveEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleSaveClub = (newClub: string) => {
    setClub(newClub);
  };

  const handleBottomSheetDismiss = () => {
    setShowBottomSheet(false);
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

      <EditPanel
        isVisible={isEditingName}
        onClose={handleCloseEdit}
        initialName={initialName}
        onSaveName={onSaveName}
        mode="name"
        onUpdate={handleUpdate}
      />

      <EditPanel
        isVisible={isEditingEmail}
        onClose={handleCloseEdit}
        initialEmail={email}
        onSaveEmail={handleSaveEmail}
        mode="email"
        onUpdate={handleUpdate}
      />

      <EditPanel
        isVisible={isEditingClub}
        onClose={handleCloseEdit}
        initialClub={club}
        onSaveClub={handleSaveClub}
        mode="club"
        onUpdate={handleUpdate}
      />

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