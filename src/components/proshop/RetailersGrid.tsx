import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

type TabType = 'All' | 'Golf' | 'Holiday' | 'Other';

interface RetailerItem {
  id: string;
  name: string;
  image: any;
  category: 'Golf' | 'Holiday' | 'Other';
}

interface RetailersGridProps {
  onRetailerSelect: (retailer: { name: string; image: any }) => void;
}

const retailers: RetailerItem[] = [
  { id: '1', name: 'American Golf', image: require('../../../assets/images/retailers/americangolf.png'), category: 'Golf' },
  { id: '2', name: 'Golf Direct', image: require('../../../assets/images/retailers/golfdirect.png'), category: 'Golf' },
  { id: '3', name: 'Clubhouse Golf', image: require('../../../assets/images/retailers/clubhousegolf.png'), category: 'Golf' },
  { id: '4', name: 'Foremost Golf', image: require('../../../assets/images/retailers/foremostgolf.png'), category: 'Golf' },
  { id: '5', name: 'Golf Online', image: require('../../../assets/images/retailers/golfonline.png'), category: 'Golf' },
  { id: '6', name: 'Major Golf', image: require('../../../assets/images/retailers/majorgolf.png'), category: 'Golf' },
  { id: '7', name: 'Scottsdale', image: require('../../../assets/images/retailers/scottsdale.png'), category: 'Golf' },
  { id: '8', name: 'Golf Breaks', image: require('../../../assets/images/retailers/golfbreaks.png'), category: 'Holiday' },
  { id: '9', name: 'Golf Holidays Direct', image: require('../../../assets/images/retailers/golfholidaysdirect.png'), category: 'Holiday' },
  { id: '10', name: 'Golf Travel Group', image: require('../../../assets/images/retailers/golftravelgroup.png'), category: 'Holiday' },
  { id: '11', name: 'ASOS', image: require('../../../assets/images/retailers/asos.png'), category: 'Other' },
  { id: '12', name: 'Nike', image: require('../../../assets/images/retailers/nike.png'), category: 'Other' },
  { id: '13', name: 'Adidas', image: require('../../../assets/images/retailers/adidas.png'), category: 'Other' },
  { id: '14', name: 'Amazon', image: require('../../../assets/images/retailers/amazon.png'), category: 'Other' },
  { id: '15', name: 'Foot Asylum', image: require('../../../assets/images/retailers/footasylum.png'), category: 'Other' },
  { id: '16', name: 'H&M', image: require('../../../assets/images/retailers/handm.png'), category: 'Other' },
  { id: '17', name: 'JD', image: require('../../../assets/images/retailers/jd.png'), category: 'Other' },
  { id: '18', name: 'M&S', image: require('../../../assets/images/retailers/mands.png'), category: 'Other' },
  { id: '19', name: 'Sports Direct', image: require('../../../assets/images/retailers/sportsdirect.png'), category: 'Other' },
];

export const RetailersGrid: React.FC<RetailersGridProps> = ({ onRetailerSelect }) => {
  const [selectedTab, setSelectedTab] = useState<TabType>('All');
  const tabs: TabType[] = ['All', 'Golf', 'Holiday', 'Other'];

  const filteredRetailers = retailers.filter(retailer => 
    selectedTab === 'All' ? true : retailer.category === selectedTab
  );

  const handleRetailerPress = (retailer: RetailerItem) => {
    onRetailerSelect({
      name: retailer.name,
      image: retailer.image
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              { borderBottomColor: selectedTab === tab ? '#317143' : '#C6C6C6' }
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.gridContainer}>
        {filteredRetailers.map((item, index) => (
          <TouchableOpacity 
            key={item.id}
            style={[
              styles.retailerContainer,
              index === filteredRetailers.length - 1 && 
              filteredRetailers.length % 2 === 1 && 
              styles.lastOddItem
            ]}
            onPress={() => handleRetailerPress(item)}
            activeOpacity={0.7}
          >
            <Image 
              source={item.image}
              style={[
                styles.retailerLogo,
                item.name !== 'JD' && styles.smallerLogo
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    width: scaleWidth(299),
    marginBottom: scaleHeight(10),
    alignSelf: 'center',
  },
  tab: {
    width: scaleWidth(74.721),
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  tabText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'italic',
    fontWeight: '700',
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: scaleWidth(296),
    paddingHorizontal: scaleWidth(0),
    gap: 10,
  },
  retailerContainer: {
    width: scaleWidth(143),
    height: scaleHeight(76),
    padding: 12,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  retailerLogo: {
    width: '100%',
    height: '100%',
  },
  smallerLogo: {
    transform: [{ scale: 0.75 }],
  },
  lastOddItem: {
    marginRight: scaleWidth(153),
  },
}); 