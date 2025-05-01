import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScrollablePanel } from './ScrollablePanel';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface RetailerTermsPanelProps {
  isVisible?: boolean;
  content: string;
  onClose: () => void;
}

export const RetailerTermsPanel: React.FC<RetailerTermsPanelProps> = ({
  isVisible = true,
  content,
  onClose,
}) => {
  return (
    <ScrollablePanel
      title="TERMS & CONDITIONS"
      onClose={onClose}
      isVisible={isVisible}
    >
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.content}>{content}</Text>
      </ScrollView>
    </ScrollablePanel>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scaleWidth(20),
  },
  content: {
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    color: '#18302A',
    lineHeight: scaleHeight(24),
    marginVertical: scaleHeight(20),
  },
}); 