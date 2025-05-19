import React, { createContext, useContext, useState } from 'react';
import { ConfirmationPopup } from '../components/panels/ConfirmationPopup';
import { Portal } from '@gorhom/portal';
import { View, StyleSheet } from 'react-native';
import { Image } from 'react-native';

interface ConfirmationPopupContextType {
  showPopup: (config: {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
  }) => void;
  hidePopup: () => void;
}

const ConfirmationPopupContext = createContext<ConfirmationPopupContextType | undefined>(undefined);

export const ConfirmationPopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [config, setConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
  } | null>(null);

  const showPopup = (newConfig: {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
  }) => {
    console.log('Setting popup config:', newConfig);
    setConfig(newConfig);
    setIsVisible(true);
    console.log('Popup visibility set to true');
  };

  const hidePopup = () => {
    console.log('Hiding popup');
    setIsVisible(false);
    setConfig(null);
  };

  return (
    <ConfirmationPopupContext.Provider value={{ showPopup, hidePopup }}>
      {children}
      {config && (
        <Portal hostName="confirmation-popup">
          <View style={styles.portalContent} pointerEvents="box-none">
            <ConfirmationPopup
              isVisible={isVisible}
              title={config.title}
              message={config.message}
              onConfirm={() => {
                console.log('Popup confirmed');
                config.onConfirm();
                hidePopup();
              }}
              onCancel={() => {
                console.log('Popup cancelled');
                config.onCancel();
                hidePopup();
              }}
              confirmText={config.confirmText}
              cancelText={config.cancelText}
            />
          </View>
        </Portal>
      )}
    </ConfirmationPopupContext.Provider>
  );
};

const styles = StyleSheet.create({
  portalContent: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999999,
    elevation: 999999,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
});

export const useConfirmationPopup = () => {
  const context = useContext(ConfirmationPopupContext);
  if (!context) {
    throw new Error('useConfirmationPopup must be used within a ConfirmationPopupProvider');
  }
  return context;
}; 