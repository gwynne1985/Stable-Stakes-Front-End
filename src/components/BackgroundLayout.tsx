import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import { colors } from '../theme/colors';
import { scaleHeight, scaleWidth } from '../utils/scale';

/**
 * Props for the BackgroundLayout component
 * @interface BackgroundLayoutProps
 */
interface BackgroundLayoutProps {
  /** Content to be rendered inside the layout */
  children: React.ReactNode;
  
  /** Optional background image source. Defaults to golf course image.
   * @example
   * backgroundImage={require('../../assets/images/custom-bg.png')}
   */
  backgroundImage?: ImageSourcePropType;
  
  /** Whether the content should be scrollable. Defaults to true.
   * Set to false for static content that doesn't need scrolling.
   */
  isScrollable?: boolean;
  
  /** Optional styles for the content container.
   * Applied to the View that wraps the children.
   */
  contentContainerStyle?: ViewStyle;
  
  /** Optional styles for the background container.
   * Applied to the ImageBackground component.
   */
  style?: ViewStyle;
}

/**
 * A layout component that provides a background image and handles scrolling behavior.
 * Automatically handles safe areas and provides consistent padding based on the 360x778 design spec.
 *
 * @component
 * @example
 * // Basic usage with scrolling content
 * <BackgroundLayout>
 *   <YourContent />
 * </BackgroundLayout>
 *
 * @example
 * // Static content without scrolling
 * <BackgroundLayout isScrollable={false}>
 *   <YourStaticContent />
 * </BackgroundLayout>
 */
export const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({
  children,
  backgroundImage = require('../../assets/images/golf-course.jpg'),
  isScrollable = true,
  contentContainerStyle,
  style,
}) => {
  const Content = () => (
    <View style={[styles.contentContainer, contentContainerStyle]}>
      {children}
    </View>
  );

  return (
    <ImageBackground
      source={backgroundImage}
      style={[styles.background, style]}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        {isScrollable ? (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContentContainer}
            showsVerticalScrollIndicator={false}
          >
            <Content />
          </ScrollView>
        ) : (
          <Content />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(16),
    minHeight: scaleHeight(778), // Ensures content fills screen on smaller devices
  },
}); 