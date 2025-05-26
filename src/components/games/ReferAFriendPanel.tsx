import React from 'react';
import { View, Text, ImageBackground, Image, Pressable } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

interface ReferAFriendPanelProps {
  onPress?: () => void;
}

const ReferAFriendPanel: React.FC<ReferAFriendPanelProps> = ({ onPress }) => {
  const Container = onPress ? Pressable : View;
  return (
    <Container
      onPress={onPress}
      style={{
        width: scaleWidth(300),
        height: scaleHeight(96),
        borderRadius: scaleWidth(20),
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaleHeight(20),
      }}
    >
      <ImageBackground
        source={require('../../../assets/images/golf-course.jpg')}
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        imageStyle={{ borderRadius: scaleWidth(20) }}
      >
        {/* Left: £10 and for each friend */}
        <View style={{ width: scaleWidth(80), alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{
              color: '#FFF',
              textAlign: 'center',
              fontFamily: 'Poppins',
              fontSize: scaleWidth(50),
              fontStyle: 'italic',
              fontWeight: '800',
              lineHeight: scaleHeight(48),
              letterSpacing: scaleWidth(-3),
              textTransform: 'uppercase',
            }}
          >
            £10
          </Text>
          <Text
            style={{
              color: '#4EDD69',
              textAlign: 'center',
              fontFamily: 'Poppins',
              fontSize: scaleWidth(10),
              fontWeight: '600',
              letterSpacing: scaleWidth(-0.3),
              marginTop: scaleHeight(-4),
            }}
          >
            for each friend
          </Text>
        </View>
        {/* Center: Refer a friend */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{
              color: '#FFF',
              fontFamily: 'Poppins',
              fontSize: scaleWidth(16),
              fontStyle: 'italic',
              fontWeight: '600',
              letterSpacing: scaleWidth(-0.48),
            }}
          >
            Refer a friend
          </Text>
        </View>
        {/* Right: Chevron icon */}
        <View style={{ width: scaleWidth(32), alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Image
            source={require('../../../assets/icons/navigation/chevron-green.png')}
            style={{ width: scaleWidth(8.5), height: scaleHeight(17), resizeMode: 'contain' }}
          />
        </View>
      </ImageBackground>
    </Container>
  );
};

export default ReferAFriendPanel; 