import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../navigation';

// BACKEND INTEGRATION NOTE:
// The following fields must be provided to this panel from the backend (from the user's upcoming games):
//   - game: string (the name of the upcoming game, e.g. 'Flushin\' It')
//   - date: string (the date of the upcoming game, e.g. '21st July')
//   - stake: string (the user's stake for this game, e.g. '£20')
//   - potentialReturn: string (the potential return for this game, e.g. '£100')
// These should be pulled from the user's next scheduled/active game and passed as props to NextGamePanel.

interface NextGamePanelProps {
  game: string;
  date: string;
  stake: string;
  potentialReturn: string;
  onViewAll?: () => void;
}

const NextGamePanel: React.FC<NextGamePanelProps> = ({
  game,
  date,
  stake,
  potentialReturn,
  onViewAll,
}) => {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  return (
    <View
      style={{
        width: scaleWidth(300),
        paddingBottom: scaleHeight(-1.165),
        borderRadius: scaleWidth(20),
        backgroundColor: '#4EDD69',
        alignItems: 'center',
        gap: scaleHeight(1),
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
      }}
    >
      <View
        style={{
          width: scaleWidth(300),
          height: scaleHeight(222),
          borderRadius: scaleWidth(20),
          borderTopWidth: scaleWidth(1.5),
          borderRightWidth: scaleWidth(1.5),
          borderLeftWidth: scaleWidth(1.5),
          borderColor: 'rgba(78, 221, 105, 0.50)',
          backgroundColor: '#152C26',
          alignItems: 'center',
          paddingTop: scaleHeight(9),
        }}
      >
        <Text
          style={{
            color: '#FFF',
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontSize: scaleWidth(15),
            fontWeight: '600',
            letterSpacing: scaleWidth(-0.45),
            marginBottom: scaleHeight(12),
          }}
        >
          Your next game
        </Text>
        <View style={{ flexDirection: 'row', gap: scaleWidth(0) }}>
          {/* Game */}
          <View
            style={{
              width: scaleWidth(130),
              borderRadius: scaleWidth(10),
              backgroundColor: 'rgba(78, 221, 105, 0.75)',
              paddingTop: scaleHeight(4.565),
              alignItems: 'center',
              marginRight: scaleWidth(10),
            }}
          >
            <Text
              style={{
                color: '#18302A',
                fontFamily: 'Poppins',
                fontSize: scaleWidth(10),
                fontWeight: '600',
                letterSpacing: scaleWidth(-0.3),
                textAlign: 'center',
              }}
            >
              Game
            </Text>
            <View
              style={{
                width: scaleWidth(130),
                height: scaleHeight(48),
                borderRadius: scaleWidth(10),
                borderWidth: scaleWidth(1.5),
                borderColor: 'rgba(78, 221, 105, 0.50)',
                backgroundColor: '#18302A',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: scaleHeight(4.435),
              }}
            >
              <Text
                style={{
                  color: '#FFF',
                  fontFamily: 'Poppins',
                  fontSize: scaleWidth(14),
                  fontStyle: 'italic',
                  fontWeight: '600',
                  letterSpacing: scaleWidth(-0.42),
                }}
              >
                {game}
              </Text>
            </View>
          </View>
          {/* Date */}
          <View
            style={{
              width: scaleWidth(130),
              borderRadius: scaleWidth(10),
              backgroundColor: 'rgba(78, 221, 105, 0.75)',
              paddingTop: scaleHeight(4.565),
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#18302A',
                fontFamily: 'Poppins',
                fontSize: scaleWidth(10),
                fontWeight: '600',
                letterSpacing: scaleWidth(-0.3),
                textAlign: 'center',
              }}
            >
              Date
            </Text>
            <View
              style={{
                width: scaleWidth(130),
                height: scaleHeight(48),
                borderRadius: scaleWidth(10),
                borderWidth: scaleWidth(1.5),
                borderColor: 'rgba(78, 221, 105, 0.50)',
                backgroundColor: '#18302A',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: scaleHeight(4.435),
              }}
            >
              <Text
                style={{
                  color: '#FFF',
                  fontFamily: 'Poppins',
                  fontSize: scaleWidth(18),
                  fontStyle: 'italic',
                  fontWeight: '600',
                  letterSpacing: scaleWidth(-0.54),
                }}
              >
                {date}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: scaleWidth(0), marginTop: scaleHeight(10) }}>
          {/* Stake */}
          <View
            style={{
              width: scaleWidth(130),
              borderRadius: scaleWidth(10),
              backgroundColor: 'rgba(78, 221, 105, 0.75)',
              paddingTop: scaleHeight(4.565),
              alignItems: 'center',
              marginRight: scaleWidth(10),
            }}
          >
            <Text
              style={{
                color: '#18302A',
                fontFamily: 'Poppins',
                fontSize: scaleWidth(10),
                fontWeight: '600',
                letterSpacing: scaleWidth(-0.3),
                textAlign: 'center',
              }}
            >
              Stake
            </Text>
            <View
              style={{
                width: scaleWidth(130),
                height: scaleHeight(48),
                borderRadius: scaleWidth(10),
                borderWidth: scaleWidth(1.5),
                borderColor: 'rgba(78, 221, 105, 0.50)',
                backgroundColor: '#18302A',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: scaleHeight(4.435),
              }}
            >
              <Text
                style={{
                  color: '#FFF',
                  fontFamily: 'Poppins',
                  fontSize: scaleWidth(29),
                  fontStyle: 'italic',
                  fontWeight: '800',
                  letterSpacing: scaleWidth(-0.87),
                }}
              >
                {stake}
              </Text>
            </View>
          </View>
          {/* Potential Return */}
          <View
            style={{
              width: scaleWidth(130),
              borderRadius: scaleWidth(10),
              backgroundColor: 'rgba(78, 221, 105, 0.75)',
              paddingTop: scaleHeight(4.565),
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#18302A',
                fontFamily: 'Poppins',
                fontSize: scaleWidth(10),
                fontWeight: '600',
                letterSpacing: scaleWidth(-0.3),
                textAlign: 'center',
              }}
            >
              Potential Return
            </Text>
            <View
              style={{
                width: scaleWidth(130),
                height: scaleHeight(48),
                borderRadius: scaleWidth(10),
                borderWidth: scaleWidth(1.5),
                borderColor: 'rgba(78, 221, 105, 0.50)',
                backgroundColor: '#18302A',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: scaleHeight(4.435),
              }}
            >
              <Text
                style={{
                  color: '#FFF',
                  fontFamily: 'Poppins',
                  fontSize: scaleWidth(29),
                  fontStyle: 'italic',
                  fontWeight: '800',
                  letterSpacing: scaleWidth(-0.87),
                }}
              >
                {potentialReturn}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Pressable
        onPress={() => {
          if (onViewAll) {
            onViewAll();
          } else {
            navigation.navigate('MyGamesScreen');
          }
        }}
        style={{
          width: scaleWidth(300),
          borderBottomLeftRadius: scaleWidth(20),
          borderBottomRightRadius: scaleWidth(20),
          backgroundColor: '#4EDD69',
          alignItems: 'center',
          paddingVertical: scaleHeight(12),
        }}
      >
        <Text
          style={{
            color: '#18302A',
            fontFamily: 'Poppins',
            fontSize: scaleWidth(12),
            fontWeight: '600',
            letterSpacing: scaleWidth(-0.36),
          }}
        >
          View all
        </Text>
      </Pressable>
    </View>
  );
};

export default NextGamePanel; 