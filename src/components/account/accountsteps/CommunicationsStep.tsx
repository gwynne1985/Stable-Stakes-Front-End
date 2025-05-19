import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';

interface CommunicationsStepProps {
  onClose: () => void;
}

// Separate components for each toggle type
const ServicePushToggle = () => {
  const [value, setValue] = useState(true);
  return (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleLabel}>Push Notifications</Text>
      <View style={styles.switchContainer}>
        <Switch
          value={value}
          onValueChange={setValue}
          trackColor={{ false: '#E3E3E3', true: '#4EDD69' }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#E3E3E3"
        />
      </View>
    </View>
  );
};

const ServiceEmailToggle = () => {
  const [value, setValue] = useState(true);
  return (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleLabel}>Email</Text>
      <View style={styles.switchContainer}>
        <Switch
          value={value}
          onValueChange={setValue}
          trackColor={{ false: '#E3E3E3', true: '#4EDD69' }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#E3E3E3"
        />
      </View>
    </View>
  );
};

const MarketingPushToggle = () => {
  const [value, setValue] = useState(false);
  return (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleLabel}>Push Notifications</Text>
      <View style={styles.switchContainer}>
        <Switch
          value={value}
          onValueChange={setValue}
          trackColor={{ false: '#E3E3E3', true: '#4EDD69' }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#E3E3E3"
        />
      </View>
    </View>
  );
};

const MarketingEmailToggle = () => {
  const [value, setValue] = useState(false);
  return (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleLabel}>Email</Text>
      <View style={styles.switchContainer}>
        <Switch
          value={value}
          onValueChange={setValue}
          trackColor={{ false: '#E3E3E3', true: '#4EDD69' }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#E3E3E3"
        />
      </View>
    </View>
  );
};

const MarketingInAppToggle = () => {
  const [value, setValue] = useState(false);
  return (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleLabel}>In-App Notifications</Text>
      <View style={styles.switchContainer}>
        <Switch
          value={value}
          onValueChange={setValue}
          trackColor={{ false: '#E3E3E3', true: '#4EDD69' }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#E3E3E3"
        />
      </View>
    </View>
  );
};

const CommunicationsStep: React.FC<CommunicationsStepProps> = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.introText}>
        We keep our communications relevant and minimal. If there's anything you'd prefer not to receive, let us know here.
      </Text>

      <Text style={styles.sectionHeader}>SERVICE AND KEY UPDATES</Text>
      <Text style={styles.sectionText}>
        These messages will include account information, competition and prize results, as well as any other important information.
      </Text>

      <ServicePushToggle />
      <ServiceEmailToggle />

      <Text style={styles.sectionHeader}>MARKETING ANNOUNCEMENTS</Text>
      <Text style={styles.sectionText}>
        We will occasionally share Stable Stakes promotions and other marketing updates that we think will be of interest.
      </Text>

      <MarketingPushToggle />
      <MarketingEmailToggle />
      <MarketingInAppToggle />
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
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(20.839),
    width: scaleWidth(300),
    textAlign: 'left',
    marginBottom: scaleHeight(20),
  },
  sectionHeader: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontStyle: 'italic',
    fontWeight: '800',
    lineHeight: scaleHeight(20),
    width: scaleWidth(300),
    textAlign: 'left',
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(10),
  },
  sectionText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(20.839),
    width: scaleWidth(300),
    textAlign: 'left',
    marginBottom: scaleHeight(15),
  },
  toggleContainer: {
    display: 'flex',
    width: scaleWidth(310),
    height: scaleHeight(44),
    paddingVertical: scaleHeight(12),
    paddingLeft: scaleHeight(27),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: scaleWidth(98),
    borderWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: '#FFF',
    marginBottom: scaleHeight(10),
  },
  toggleLabel: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(20),
  },
  switchContainer: {
    width: scaleWidth(58),
    height: scaleHeight(27),
    marginRight: scaleWidth(12),
  },
});

export default CommunicationsStep; 