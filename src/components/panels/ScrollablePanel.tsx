import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  ScrollView,
  PanResponder,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const TOP_GAP = scaleHeight(50);
const SWIPE_THRESHOLD = 50;

interface Props {
  isVisible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const ScrollablePanel: React.FC<Props> = ({
  isVisible,
  title,
  onClose,
  children
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const panY = useRef(new Animated.Value(0)).current;
  const [isRendered, setIsRendered] = useState(false);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsRendered(false);
      onClose();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderGrant: () => {
        panY.extractOffset();
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        panY.flattenOffset();
        if (gestureState.dy > SWIPE_THRESHOLD) {
          handleClose();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 40,
            friction: 5,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (isVisible) {
      setIsRendered(true);
      slideAnim.setValue(SCREEN_HEIGHT);
      panY.setValue(0);
      
      Animated.spring(slideAnim, {
        toValue: TOP_GAP,
        useNativeDriver: true,
        damping: 20,
        stiffness: 90,
      }).start();
    }

    return () => {
      slideAnim.setValue(SCREEN_HEIGHT);
      panY.setValue(0);
    };
  }, [isVisible]);

  if (!isRendered && !isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={StyleSheet.absoluteFill}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={[StyleSheet.absoluteFill, styles.overlay]} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                { translateY: slideAnim },
                { translateY: panY },
              ],
            },
          ]}
        >
          <View {...panResponder.panHandlers} style={styles.swipeableArea}>
            <View style={styles.dragIndicator} />
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                <Image
                  source={require('../../../assets/icons/navigation/close.png')}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.scrollContainer}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={true}
              bounces={true}
            >
              {children}
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'transparent',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT - TOP_GAP,
    width: scaleWidth(360),
    alignSelf: 'center',
    backgroundColor: '#E3E3E3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  swipeableArea: {
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(20),
    paddingBottom: scaleHeight(40),
  },
  dragIndicator: {
    width: 36,
    height: 4,
    backgroundColor: '#18302A',
    borderRadius: 2,
    marginTop: 8,
    opacity: 0.3,
  },
  header: {
    width: '100%',
    height: scaleHeight(60),
    paddingTop: scaleHeight(20),
    paddingHorizontal: scaleWidth(20),
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: scaleHeight(20),
    left: scaleWidth(97),
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: scaleWidth(20),
    letterSpacing: -0.2,
    textTransform: 'uppercase',
  },
  closeButton: {
    position: 'absolute',
    top: scaleHeight(20),
    right: scaleWidth(25),
    width: scaleWidth(29),
    height: scaleWidth(29),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: scaleWidth(29),
    height: scaleWidth(29),
    resizeMode: 'contain',
  },
}); 