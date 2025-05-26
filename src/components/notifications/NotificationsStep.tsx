import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList, ActivityIndicator } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { TabHeader } from '../TabHeader';
import { PrimaryButton } from '../PrimaryButton';

interface NotificationsStepProps {
  onClose: () => void;
}

type TabType = 'Messages' | 'Notifications';

// Notification types and icons
const NOTIF_ICONS = {
  news: require('../../../assets/icons/notifications/news.png'),
  account: require('../../../assets/icons/notifications/account.png'),
  systems: require('../../../assets/icons/notifications/systems.png'),
  games: require('../../../assets/icons/notifications/games.png'),
  announcements: require('../../../assets/icons/notifications/announcements.png'),
};

const GROUPS = ['TODAY', 'YESTERDAY', 'THIS WEEK', 'LAST WEEK', 'OLDER'];

// Mock data
const mockMessages: NotificationData[] = [
  { id: 1, type: 'news', text: 'Welcome to Stable Stakes! Your account is ready to go.', time: '10 minutes ago', group: 'TODAY', unread: true },
  { id: 2, type: 'games', text: 'You have a new game invitation. Check it out now!', time: '3 hours ago', group: 'TODAY', unread: false },
  { id: 3, type: 'account', text: 'Your account details were updated successfully.', time: '1 day ago', group: 'YESTERDAY', unread: false },
  { id: 4, type: 'systems', text: 'System maintenance scheduled for this weekend.', time: '2 days ago', group: 'THIS WEEK', unread: true },
  { id: 5, type: 'announcements', text: 'Big announcement: New features coming soon!', time: '1 week ago', group: 'LAST WEEK', unread: false },
  { id: 6, type: 'news', text: 'Check out our latest blog post for tips and tricks.', time: '2 hours ago', group: 'TODAY', unread: true },
  { id: 7, type: 'games', text: 'You have been matched for a new game!', time: '4 hours ago', group: 'TODAY', unread: false },
  { id: 8, type: 'account', text: 'Your email address was changed.', time: '2 days ago', group: 'THIS WEEK', unread: false },
  { id: 9, type: 'systems', text: 'We fixed a bug affecting score submissions.', time: '3 days ago', group: 'THIS WEEK', unread: false },
  { id: 10, type: 'announcements', text: 'Refer a friend and earn rewards!', time: '2 weeks ago', group: 'OLDER', unread: true },
  { id: 11, type: 'news', text: 'Leaderboard updated: see where you rank!', time: '3 weeks ago', group: 'OLDER', unread: false },
  { id: 12, type: 'games', text: "Game reminder: Don't forget to submit your score.", time: '4 weeks ago', group: 'OLDER', unread: false },
];
const mockNotifications: NotificationData[] = [
  { id: 13, type: 'games', text: 'Game result: You scored 38 points!', time: '5 minutes ago', group: 'TODAY', unread: true },
  { id: 14, type: 'account', text: 'Password changed successfully.', time: '2 hours ago', group: 'TODAY', unread: false },
  { id: 15, type: 'systems', text: 'App update available. Download now for the best experience.', time: '3 days ago', group: 'THIS WEEK', unread: true },
  { id: 16, type: 'announcements', text: 'Stable Stakes is now available in more countries.', time: '2 weeks ago', group: 'OLDER', unread: false },
  { id: 17, type: 'news', text: 'You have a new message from support.', time: '1 hour ago', group: 'TODAY', unread: true },
  { id: 18, type: 'games', text: 'Game scheduled for this weekend.', time: '6 hours ago', group: 'TODAY', unread: false },
  { id: 19, type: 'account', text: 'Profile picture updated.', time: '2 days ago', group: 'THIS WEEK', unread: false },
  { id: 20, type: 'systems', text: 'Scheduled downtime on Sunday.', time: '4 days ago', group: 'THIS WEEK', unread: false },
  { id: 21, type: 'announcements', text: 'New competition announced!', time: '3 weeks ago', group: 'OLDER', unread: true },
  { id: 22, type: 'news', text: 'Security tips: Keep your account safe.', time: '1 month ago', group: 'OLDER', unread: false },
  { id: 23, type: 'games', text: 'You have a pending invitation.', time: '2 months ago', group: 'OLDER', unread: false },
];

type NotificationType = 'news' | 'account' | 'systems' | 'games' | 'announcements';
interface NotificationData {
  id: number;
  type: NotificationType;
  text: string;
  time: string;
  group: string;
  unread: boolean;
}

function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce((acc: Record<string, T[]>, item: T) => {
    const group = String(item[key]);
    (acc[group] = acc[group] || []).push(item);
    return acc;
  }, {});
}

interface NotificationItemProps {
  item: NotificationData;
  onPress: (item: NotificationData) => void;
}
const NotificationItem: React.FC<NotificationItemProps> = ({ item, onPress }) => (
  <TouchableOpacity style={notifStyles.itemContainer} onPress={() => onPress(item)}>
    <View style={notifStyles.leftCircle}>
      <Image
        source={NOTIF_ICONS[item.type]}
        style={
          item.type === 'announcements'
            ? [notifStyles.icon, notifStyles.announcementIcon]
            : notifStyles.icon
        }
        resizeMode="contain"
      />
    </View>
    <View style={notifStyles.textContainer}>
      <Text style={notifStyles.text} numberOfLines={2} ellipsizeMode="tail">
        {item.text.length > 90 ? item.text.slice(0, 90) + '…' : item.text}
      </Text>
      <Text style={notifStyles.timeAgo}>{item.time}</Text>
    </View>
    {item.unread && <View style={notifStyles.unreadDot} />}
  </TouchableOpacity>
);

interface NotificationListProps {
  items: NotificationData[];
  onItemPress: (item: NotificationData) => void;
}
const NotificationList: React.FC<NotificationListProps> = ({ items, onItemPress }) => {
  const grouped = groupBy(items, 'group');
  return (
    <View>
      {GROUPS.map(group =>
        grouped[group] ? (
          <View key={group}>
            <Text style={notifStyles.groupHeader}>{group}</Text>
            {grouped[group].map((item: NotificationData) => (
              <NotificationItem key={item.id} item={item} onPress={onItemPress} />
            ))}
          </View>
        ) : null
      )}
    </View>
  );
};

export const NotificationsStep: React.FC<NotificationsStepProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('Messages');
  const [selectedItem, setSelectedItem] = useState<NotificationData | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const PAGE_SIZE = 10;
  const allItems: NotificationData[] = activeTab === 'Messages' ? mockMessages : mockNotifications;
  const displayed = allItems.slice(0, page * PAGE_SIZE);

  const loadMore = useCallback(() => {
    if (loading) return;
    if (displayed.length >= allItems.length) return;
    setLoading(true);
    setTimeout(() => {
      setPage(p => p + 1);
      setLoading(false);
    }, 500); // Simulate async fetch
  }, [loading, displayed.length, allItems.length]);

  return (
    <View style={styles.container}>
      <TabHeader
        activeTab={activeTab}
        onTabChange={tab => {
          setActiveTab(tab as TabType);
          setPage(1);
        }}
        tabLabels={['Messages', 'Notifications']}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          data={displayed}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <NotificationItem item={item} onPress={setSelectedItem} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={loading ? <ActivityIndicator style={{ marginVertical: scaleHeight(16) }} /> : null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: scaleHeight(40) }}
        />
      </View>
      <Modal visible={!!selectedItem} transparent animationType="fade" onRequestClose={() => setSelectedItem(null)}>
        <View style={notifStyles.detailOverlay}>
          <View style={notifStyles.detailPanel}>
            <View style={[
              notifStyles.leftCircle,
              {
                width: scaleWidth(57),
                height: scaleWidth(57),
                borderRadius: scaleWidth(28.5),
                marginBottom: scaleHeight(30),
              },
            ]}>
              <Image
                source={selectedItem ? NOTIF_ICONS[selectedItem.type] : undefined}
                style={
                  selectedItem?.type === 'announcements'
                    ? [notifStyles.icon, { width: scaleWidth(37.5), height: scaleWidth(37.5) }]
                    : { width: scaleWidth(22.5), height: scaleWidth(22.5) }
                }
                resizeMode="contain"
              />
            </View>
            <Text style={notifStyles.detailHeadline}>{selectedItem?.type === 'news' ? 'Message' : 'Notification'}</Text>
            <Text style={notifStyles.detailTimeNew}>{selectedItem?.time}</Text>
            <Text style={notifStyles.detailTextNew}>{selectedItem?.text}</Text>
            <PrimaryButton
              title="Close"
              onPress={() => setSelectedItem(null)}
              isActive={true}
              style={notifStyles.detailPrimaryButton}
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
    paddingHorizontal: scaleWidth(24),
    marginTop: scaleHeight(24),
  },
  header: {
    position: 'absolute',
    top: scaleHeight(53),
    left: scaleWidth(30),
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: scaleWidth(20),
    color: '#18302A',
  },
  description: {
    position: 'absolute',
    top: scaleHeight(90),
    left: scaleWidth(30),
    fontFamily: 'Poppins-Medium',
    fontSize: scaleWidth(13),
    color: '#18302A',
  },
});

const notifStyles = StyleSheet.create({
  groupHeader: {
    color: '#18302A',
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'italic',
    fontWeight: '800',
    lineHeight: scaleHeight(21.423),
    marginTop: scaleHeight(18),
    marginBottom: scaleHeight(6),
    marginLeft: scaleWidth(16),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scaleWidth(300),
    height: scaleHeight(70),
    paddingVertical: scaleHeight(14),
    paddingHorizontal: scaleWidth(16),
    borderBottomWidth: 1,
    borderBottomColor: '#9BA19C',
    backgroundColor: 'rgba(227, 227, 227, 0.00)',
  },
  leftCircle: {
    width: scaleWidth(38),
    height: scaleWidth(38),
    borderRadius: scaleWidth(19),
    backgroundColor: '#4EDD69',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleWidth(12),
  },
  icon: {
    width: scaleWidth(15),
    height: scaleWidth(15),
  },
  announcementIcon: {
    width: scaleWidth(25),
    height: scaleWidth(25),
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: scaleHeight(2),
  },
  text: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: undefined,
    maxWidth: scaleWidth(180),
  },
  timeAgo: {
    color: '#717171',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: undefined,
  },
  unreadDot: {
    width: scaleWidth(8),
    height: scaleWidth(8),
    borderRadius: scaleWidth(4),
    backgroundColor: '#4EDD69',
    marginLeft: scaleWidth(10),
  },
  detailOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailPanel: {
    width: scaleWidth(320),
    backgroundColor: '#E3E3E3',
    borderRadius: scaleWidth(20),
    padding: scaleWidth(24),
    alignItems: 'center',
  },
  detailHeadline: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(20),
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: scaleHeight(34.4),
    textTransform: 'uppercase',
    marginBottom: scaleHeight(4),
  },
  detailTimeNew: {
    color: '#717171',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: undefined,
    marginBottom: scaleHeight(8),
  },
  detailTextNew: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(20.839),
    marginBottom: scaleHeight(10),
  },
  detailPrimaryButton: {
    width: '100%',
    marginTop: scaleHeight(10),
  },
}); 