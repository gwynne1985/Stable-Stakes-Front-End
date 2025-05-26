import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Animated,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/scale';
import { SimpleSlidingPanel } from './panels/SimpleSlidingPanel';
import AccountPanel from './account/AccountPanel';
import AccountPanelStack from './account/AccountPanelStack';
import { NotificationsStep } from './notifications/NotificationsStep';

interface Props {
  title: string;
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  notificationCount?: number;
  hasUnreadNotifications?: boolean;
}

export const PageContainer: React.FC<Props> = ({
  title,
  children,
  variant = 'light',
  notificationCount = 0,
  hasUnreadNotifications = false,
}) => {
  const [isAccountPanelVisible, setIsAccountPanelVisible] = useState(false);
  const [isNotificationPanelVisible, setIsNotificationPanelVisible] = useState(false);
  const [isContactStepVisible, setIsContactStepVisible] = useState(false);
  const [accountPanelTitle, setAccountPanelTitle] = useState('Account');
  const [showAccountBack, setShowAccountBack] = useState(false);
  const accountPanelStackRef = useRef<{ goBack: () => void; canGoBack: () => boolean }>(null);

  const handleAccountBack = () => {
    if (accountPanelStackRef.current) {
      accountPanelStackRef.current.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/golf-course.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsAccountPanelVisible(true)}>
            <Image
              source={require('../../assets/icons/navigation/account.png')}
              style={styles.accountIcon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={() => setIsNotificationPanelVisible(true)}>
            <View style={styles.notificationContainer}>
              <Image
                source={require('../../assets/icons/navigation/notifications.png')}
                style={styles.notificationIcon}
              />
              {hasUnreadNotifications && (
                <View style={styles.notificationBadge} />
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.contentContainer,
            variant === 'dark' ? styles.darkContent : styles.lightContent,
          ]}
        >
          {children}
        </View>
      </ImageBackground>

      <SimpleSlidingPanel
        isVisible={isAccountPanelVisible}
        title={accountPanelTitle}
        onClose={() => setIsAccountPanelVisible(false)}
        headerRight={
          accountPanelStackRef.current && accountPanelStackRef.current.canGoBack() ? (
            <TouchableOpacity onPress={handleAccountBack} style={{ width: scaleWidth(29), height: scaleWidth(29), justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../../assets/icons/navigation/back.png')} style={{ width: scaleWidth(29), height: scaleWidth(29), resizeMode: 'contain' }} />
            </TouchableOpacity>
          ) : null
        }
      >
        <AccountPanelStack setTitle={setAccountPanelTitle} ref={accountPanelStackRef} />
      </SimpleSlidingPanel>

      <SimpleSlidingPanel
        isVisible={isNotificationPanelVisible}
        title="Inbox"
        onClose={() => setIsNotificationPanelVisible(false)}
      >
        <NotificationsStep onClose={() => setIsNotificationPanelVisible(false)} />
      </SimpleSlidingPanel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
  },
  header: {
    width: '100%',
    height: scaleHeight(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(24),
    marginTop: Platform.OS === 'ios' ? scaleHeight(29) : scaleHeight(19),
  },
  accountIcon: {
    width: scaleWidth(32),
    height: scaleWidth(32),
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(20),
    fontStyle: 'italic',
    fontWeight: '900',
    letterSpacing: -0.2,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  notificationContainer: {
    position: 'relative',
    width: scaleWidth(32),
    height: scaleWidth(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    width: scaleWidth(27),
    height: scaleWidth(30),
  },
  notificationBadge: {
    position: 'absolute',
    right: 0,
    top: 3,
    width: 16 * 0.7,
    height: 16 * 0.7,
    borderRadius: 8 * 0.7,
    backgroundColor: '#FE606E',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 1,
  },
  notificationText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '600',
    height: 12,
    lineHeight: 12,
    letterSpacing: -0.1,
    color: '#FFFFFF',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  contentContainer: {
    flex: 1,
    position: 'absolute',
    top: scaleHeight(100),
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
    overflow: 'hidden',
  },
  darkContent: {
    backgroundColor: '#18302A',
  },
  lightContent: {
    backgroundColor: '#FFFFFF',
  },
}); 