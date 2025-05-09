import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions, Image } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { AccountPanel } from './AccountPanel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// --- Panel Components ---
const MainPanel: React.FC<{ onContactDetails: () => void }> = ({ onContactDetails }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <AccountPanel />
    <View style={styles.linksContainer}>
      <TouchableOpacity style={styles.link} onPress={onContactDetails}>
        <Text style={styles.linkText}>Contact Details</Text>
      </TouchableOpacity>
      {/* Add more links as needed */}
    </View>
  </ScrollView>
);

const ContactDetailsPanel: React.FC<{ onEditName: () => void; onEditEmail: () => void }> = ({ onEditName, onEditEmail }) => (
  <View style={styles.infoPanelContainer}>
    <View style={{ height: scaleHeight(24) }} />
    <View style={styles.infoRow}>
      <View style={styles.infoIcon} />
      <Text style={styles.infoText}>Stuart Russell</Text>
      <TouchableOpacity onPress={onEditName} style={styles.editIcon} />
    </View>
    <View style={styles.infoRow}>
      <View style={styles.infoIcon} />
      <Text style={styles.infoText}>joebloggs@myemail.co.uk</Text>
      <TouchableOpacity onPress={onEditEmail} style={styles.editIcon} />
    </View>
  </View>
);

const EditNamePanel: React.FC = () => (
  <View style={styles.infoPanelContainer}>
    {/* Add name editing fields here */}
  </View>
);

const EditEmailPanel: React.FC = () => (
  <View style={styles.infoPanelContainer}>
    {/* Add email editing fields here */}
  </View>
);

// --- Header Component ---
const PanelHeader: React.FC<{
  canGoBack: boolean;
  onBack: () => void;
  onClose: () => void;
}> = ({ canGoBack, onBack, onClose }) => (
  <View style={styles.headerContainer}>
    <View style={styles.dragHandle} />
    <Text style={styles.headerTitle}>ACCOUNT</Text>
    {canGoBack ? (
      <TouchableOpacity style={styles.headerBackBtn} onPress={onBack}>
        <Image source={require('../../../assets/icons/navigation/back.png')} style={styles.headerBackIcon} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={styles.headerCloseBtn} onPress={onClose}>
        <Text style={styles.headerCloseText}>X</Text>
      </TouchableOpacity>
    )}
  </View>
);

// --- Main AccountStep with Sliding Stack ---
export const AccountStep: React.FC = () => {
  // Stack of panel keys, e.g. ['main', 'contactDetails', 'editName']
  const [panelStack, setPanelStack] = useState(['main']);
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Slide to the right when pushing a new panel
  const pushPanel = (panel: string) => {
    Animated.timing(slideAnim, {
      toValue: -SCREEN_WIDTH * panelStack.length,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setPanelStack(prev => [...prev, panel]);
    });
  };

  // Slide to the left when popping a panel
  const popPanel = () => {
    Animated.timing(slideAnim, {
      toValue: -SCREEN_WIDTH * (panelStack.length - 2),
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setPanelStack(prev => prev.slice(0, -1));
    });
  };

  // Close handler (should be passed from parent or use navigation logic)
  const handleClose = () => {
    // TODO: Implement close logic (e.g., close modal or panel)
  };

  // Render panels in stack order
  const renderPanels = () => {
    return panelStack.map((panel, idx) => {
      let content = null;
      if (panel === 'main') {
        content = <MainPanel onContactDetails={() => pushPanel('contactDetails')} />;
      } else if (panel === 'contactDetails') {
        content = <ContactDetailsPanel onEditName={() => pushPanel('editName')} onEditEmail={() => pushPanel('editEmail')} />;
      } else if (panel === 'editName') {
        content = <EditNamePanel />;
      } else if (panel === 'editEmail') {
        content = <EditEmailPanel />;
      }
      return (
        <View key={panel + idx} style={{ width: SCREEN_WIDTH, flex: 1 }}>
          {content}
        </View>
      );
    });
  };

  const canGoBack = panelStack.length > 1;

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
      <PanelHeader canGoBack={canGoBack} onBack={popPanel} onClose={handleClose} />
      <Animated.View
        style={{
          flexDirection: 'row',
          width: SCREEN_WIDTH * panelStack.length,
          flex: 1,
          transform: [{ translateX: slideAnim }],
        }}
      >
        {renderPanels()}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: scaleHeight(64),
    backgroundColor: '#F3F3F3',
    position: 'relative',
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
    marginBottom: scaleHeight(8),
  },
  dragHandle: {
    position: 'absolute',
    top: scaleHeight(10),
    left: '50%',
    marginLeft: -scaleWidth(24),
    width: scaleWidth(48),
    height: scaleHeight(5),
    borderRadius: scaleHeight(3),
    backgroundColor: '#D9D9D9',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(22),
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#18302A',
    letterSpacing: -0.3,
  },
  headerCloseBtn: {
    position: 'absolute',
    right: scaleWidth(20),
    top: scaleHeight(20),
    width: scaleWidth(32),
    height: scaleWidth(32),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#18302A',
    borderRadius: scaleWidth(8),
  },
  headerCloseText: {
    color: '#18302A',
    fontSize: scaleWidth(18),
    fontWeight: '700',
  },
  headerBackBtn: {
    position: 'absolute',
    left: scaleWidth(20),
    top: scaleHeight(20),
    width: scaleWidth(32),
    height: scaleWidth(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBackIcon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    resizeMode: 'contain',
  },
  container: {
    alignItems: 'center',
    paddingTop: scaleHeight(32),
    paddingBottom: scaleHeight(32),
    backgroundColor: '#F3F3F3',
    minHeight: scaleHeight(600),
  },
  linksContainer: {
    width: scaleWidth(300),
    marginTop: scaleHeight(32),
  },
  link: {
    paddingVertical: scaleHeight(16),
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
  },
  linkText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  infoPanelContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: scaleHeight(32),
    backgroundColor: '#F3F3F3',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: scaleWidth(20),
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(20),
    marginBottom: scaleHeight(12),
    width: scaleWidth(300),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  infoIcon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    backgroundColor: '#4EDD69',
    borderRadius: scaleWidth(12),
    marginRight: scaleWidth(12),
  },
  infoText: {
    flex: 1,
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontWeight: '600',
  },
  editIcon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    backgroundColor: '#E3E3E3',
    borderRadius: scaleWidth(12),
    marginLeft: scaleWidth(12),
  },
}); 