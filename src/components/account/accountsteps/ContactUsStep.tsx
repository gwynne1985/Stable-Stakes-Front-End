import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Keyboard } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';
import { PrimaryButton } from '../../PrimaryButton';
import { Modal } from 'react-native';

interface ContactUsStepProps {
  onClose: () => void;
}

const MESSAGE_TYPES = [
  'General Enquiry',
  'Game/Scorecard Issue',
  'Account Issue',
  'Technical Issue',
  'Spotted a Bug',
  'Share an Idea',
];

const ContactUsStep: React.FC<ContactUsStepProps> = ({ onClose }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setDropdownOpen(false);
    Keyboard.dismiss();
  };

  const handleSend = () => {
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setSelectedType(null);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.introText}>
        Select you message type, drop us a message, and we'll get back to you as soon as we can.
      </Text>

      <View style={styles.messageContainer}>
        <Text style={styles.messageTypeTitle}>Message type:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          activeOpacity={0.8}
          onPress={() => setDropdownOpen(!dropdownOpen)}
        >
          <Text style={styles.dropdownText}>
            {selectedType || 'Please select...'}
          </Text>
          <Image
            source={require('../../../../assets/icons/account/Chevron down.png')}
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
        {dropdownOpen && (
          <View style={styles.dropdownOptionsBox}>
            {MESSAGE_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.dropdownOption}
                onPress={() => handleSelectType(type)}
              >
                <Text style={styles.dropdownOptionText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <Text style={styles.messageHeader}>Message</Text>
        <TextInput
          style={styles.textBox}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message here..."
          placeholderTextColor="#A0A0A0"
          multiline
          numberOfLines={5}
        />
        <PrimaryButton
          title="Send"
          isActive={!!selectedType && message.trim().length > 0}
          style={styles.sendButton}
          onPress={handleSend}
        />
      </View>

      {/* Confirmation Popup */}
      <Modal
        visible={showConfirmation}
        transparent
        animationType="fade"
        onRequestClose={handleCloseConfirmation}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationPopup}>
            <View style={styles.confirmationIconCircle}>
              <Image source={require('../../../../assets/icons/account/email.png')} style={styles.confirmationIcon} />
            </View>
            <Text style={styles.confirmationHeader}>Thank you</Text>
            <Text style={styles.confirmationText}>We've received your message and will get back to you by email within 24-hours.</Text>
            <PrimaryButton
              title="Close"
              isActive={true}
              style={styles.confirmationButton}
              onPress={handleCloseConfirmation}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    paddingTop: scaleHeight(20),
  },
  introText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(19.236),
    width: scaleWidth(300),
    textAlign: 'center',
    marginBottom: scaleHeight(20),
  },
  messageContainer: {
    width: scaleWidth(300),
    height: scaleHeight(410),
    flexShrink: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: scaleWidth(8),
    padding: scaleWidth(16),
    alignItems: 'center',
  },
  messageTypeTitle: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(18.2),
    alignSelf: 'flex-start',
    marginBottom: scaleHeight(8),
  },
  dropdown: {
    width: scaleWidth(262),
    height: scaleHeight(40),
    borderRadius: scaleWidth(20),
    borderWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(16),
    marginBottom: scaleHeight(12),
  },
  dropdownText: {
    color: '#1E1E1E',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(18.2),
    flex: 1,
    textAlign: 'center',
  },
  chevronIcon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    marginLeft: scaleWidth(8),
  },
  dropdownOptionsBox: {
    position: 'absolute',
    top: scaleHeight(80),
    left: scaleWidth(16),
    width: scaleWidth(262),
    backgroundColor: '#FFF',
    borderRadius: scaleWidth(20),
    borderWidth: 1,
    borderColor: '#E3E3E3',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownOption: {
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(16),
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
  },
  dropdownOptionText: {
    color: '#1E1E1E',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(18.2),
  },
  messageHeader: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(18.2),
    alignSelf: 'flex-start',
    marginTop: scaleHeight(18),
    marginBottom: scaleHeight(8),
  },
  textBox: {
    width: scaleWidth(262),
    minHeight: scaleHeight(180),
    borderRadius: scaleWidth(8),
    borderWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: '#FFF',
    color: '#1E1E1E',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    padding: scaleWidth(12),
    marginBottom: scaleHeight(18),
    textAlignVertical: 'top',
  },
  sendButton: {
    width: scaleWidth(262),
    alignSelf: 'center',
    marginTop: scaleHeight(10),
  },
  confirmationPopup: {
    width: scaleWidth(300),
    backgroundColor: '#FFF',
    borderRadius: scaleWidth(20),
    alignItems: 'center',
    padding: scaleWidth(24),
    alignSelf: 'center',
  },
  confirmationIconCircle: {
    width: scaleWidth(70),
    height: scaleWidth(70),
    borderRadius: scaleWidth(35),
    backgroundColor: '#4EDD69',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(20),
  },
  confirmationIcon: {
    width: scaleWidth(32),
    height: scaleWidth(32),
    resizeMode: 'contain',
  },
  confirmationHeader: {
    fontSize: scaleWidth(22),
    fontWeight: '900',
    color: '#18302A',
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    textAlign: 'center',
    letterSpacing: -0.22,
    marginBottom: scaleHeight(10),
    marginTop: scaleHeight(5),
  },
  confirmationText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontWeight: '500',
    textAlign: 'center',
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(20),
    lineHeight: scaleHeight(20),
  },
  confirmationButton: {
    width: scaleWidth(200),
    alignSelf: 'center',
    marginTop: scaleHeight(10),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactUsStep; 