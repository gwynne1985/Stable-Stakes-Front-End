import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';
import { InputField } from '../InputField';
import { PrimaryButton } from '../PrimaryButton';
import { InfoBottomSheet } from '../panels/InfoBottomSheet';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { db } from '../../firebase';
import { useRegistrationStore } from '../../state/useRegistrationStore';
import { CLUBS } from '../../constants/firestore';

interface Club {
  id: string;
  club_name: string;
  club_name_short: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  county: string;
  country: string;
  postcode: string;
  course_rating: number;
  course_slope: number;
  pro_shop_available: boolean;
  retail_partner: string;
  flushin_it_target: number;
  up_and_down_target: number;
  throwing_darts_target: number;
}

export const GolfClubStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const registrationStore = useRegistrationStore();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        console.log('[CLUB FETCH] Starting club fetch...');
        setIsLoading(true);
        setError(null);

        // Verify Firestore instance
        const firestore = getFirestore();
        console.log('[CLUB FETCH] Firestore initialized:', !!firestore);
        
        // Try both "clubs" and "Clubs" collections
        const collectionsToTry = [CLUBS, 'Clubs'];
        let clubList: Club[] = [];
        
        for (const collectionName of collectionsToTry) {
          console.log(`[CLUB FETCH] Trying collection: ${collectionName}`);
          const clubsRef = collection(db, collectionName);
          try {
            const querySnapshot = await getDocs(clubsRef);
            console.log(`[CLUB FETCH] Collection ${collectionName} snapshot size:`, querySnapshot.size);
            
            if (querySnapshot.size > 0) {
              clubList = querySnapshot.docs.map(doc => {
                const data = doc.data();
                console.log('[CLUB DOC]', {
                  collection: collectionName,
                  id: doc.id,
                  club_name: data.club_name,
                  exists: doc.exists(),
                });
                return {
                  id: doc.id,
                  ...data
                } as Club;
              });
              console.log('[CLUB FETCH] Successfully loaded from collection:', collectionName);
              break;
            }
          } catch (collectionError) {
            console.error(`[CLUB FETCH] Error with collection ${collectionName}:`, collectionError);
          }
        }

        if (clubList.length === 0) {
          console.error('[CLUB FETCH] No clubs found in any collection');
          setError('No clubs found. Please try again later.');
        } else {
          console.log('[CLUB FETCH] Total clubs loaded:', clubList.length);
          setClubs(clubList);
        }
      } catch (error) {
        console.error('[CLUB FETCH] Error:', error);
        setError('Failed to load clubs. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchClubs();
  }, []);

  // Add logging to the filtering process
  const filteredClubs = clubs.filter(club => {
    const matches = club.club_name.toLowerCase().includes(searchQuery.toLowerCase());
    if (searchQuery.length > 0) {
      console.log('[CLUB FILTER]', {
        query: searchQuery,
        club_name: club.club_name,
        matches
      });
    }
    return matches;
  });

  const showDropdown = dropdownOpen && searchQuery.length > 0 && !selectedClub;

  const handleSelect = (club: Club) => {
    setSelectedClub(club);
    setSearchQuery(club.club_name);
    setDropdownOpen(false);
    Keyboard.dismiss();
    registrationStore.setClubId((club as any).club_id || club.id);
  };

  const getFullAddress = (club: Club): string[] => {
    const addressLines = [
      club.address_line_1,
      club.address_line_2,
      club.city,
      club.county,
      club.country,
      club.postcode
    ].filter((line): line is string => Boolean(line));
    return addressLines;
  };

  const handleFocus = () => {
    setInputFocused(true);
    setDropdownOpen(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
    setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <View style={styles.container}>
      <View style={{ width: scaleWidth(300), alignSelf: 'center' }}>
        <Text style={styles.header}>YOUR GOLF CLUB</Text>
        <Text style={styles.verificationText}>
          This helps manage scores and tailor your app experience.
        </Text>
        <View style={{ position: 'relative' }}>
          <InputField
            placeholder="Start typing"
            value={searchQuery}
            onChangeText={text => {
              setSearchQuery(text);
              setSelectedClub(null);
              if (text.length > 0) {
                setDropdownOpen(true);
              } else {
                setDropdownOpen(false);
              }
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={styles.input}
          />
          {isLoading ? (
            <View style={styles.dropdown}>
              <View style={styles.dropdownRow}>
                <ActivityIndicator size="small" color="#18302A" />
                <Text style={[styles.dropdownNoClub, { marginLeft: 10 }]}>Loading clubs...</Text>
              </View>
            </View>
          ) : error ? (
            <View style={styles.dropdown}>
              <View style={styles.dropdownRow}>
                <Text style={styles.dropdownNoClub}>{error}</Text>
              </View>
            </View>
          ) : showDropdown && (
            <View style={styles.dropdown} pointerEvents="box-none">
              {filteredClubs.length === 0 ? (
                <TouchableOpacity
                  style={styles.dropdownRow}
                  activeOpacity={1}
                  onPress={() => {}}
                >
                  <Text style={styles.dropdownNoClub}>No Club Found</Text>
                </TouchableOpacity>
              ) : (
                filteredClubs.map((club) => (
                  <TouchableOpacity
                    key={club.id}
                    style={styles.dropdownRow}
                    onPress={() => handleSelect(club)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.dropdownClubName}>{club.club_name}</Text>
                    <View style={styles.verticalBar} />
                    <Text style={styles.dropdownCounty}>{club.county}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}
        </View>
        
          {selectedClub && (
            <View style={styles.clubAddressBox}>
            <Text style={styles.clubName}>{selectedClub.club_name}</Text>
            {getFullAddress(selectedClub).map((line: string, idx: number) => (
                <Text style={styles.clubAddress} key={idx}>{line}</Text>
              ))}
            </View>
          )}
        <PrimaryButton
          title="Next"
          onPress={onNext}
          isActive={!!selectedClub}
          style={styles.nextButton}
        />
        <TouchableOpacity onPress={() => setInfoVisible(true)} activeOpacity={0.7} style={styles.cantFindContainer}>
          <Text style={styles.cantFindText}>Can't find your club?</Text>
        </TouchableOpacity>
        <InfoBottomSheet
          isVisible={infoVisible}
          onClose={() => setInfoVisible(false)}
          title="Club not listed?"
          content={"We're adding more clubs as we roll out the Stable Stakes app. If your club isn't listed yet, it will be soon!"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scaleWidth(24),
    paddingTop: scaleHeight(53),
  },
  header: {
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: scaleWidth(20),
    color: '#18302A',
    marginBottom: scaleHeight(8),
  },
  verificationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: scaleWidth(13),
    color: '#18302A',
    marginBottom: scaleHeight(24),
  },
  input: {
    height: scaleHeight(43),
    paddingTop: scaleHeight(11),
    paddingBottom: scaleHeight(10),
    paddingLeft: scaleWidth(16),
    borderRadius: scaleWidth(5),
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#FFF',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#18302A',
  },
  dropdown: {
    position: 'absolute',
    top: scaleHeight(43),
    left: 0,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: scaleWidth(5),
    borderWidth: 1,
    borderColor: '#CCC',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownClubName: {
    flex: 1,
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(22),
  },
  verticalBar: {
    width: scaleWidth(2),
    height: scaleHeight(22),
    backgroundColor: 'rgba(118, 118, 118, 0.46)',
    marginHorizontal: scaleWidth(10),
    borderRadius: scaleWidth(1),
  },
  dropdownCounty: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(22),
    textAlign: 'right',
    minWidth: scaleWidth(60),
  },
  dropdownNoClub: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(22),
    flex: 1,
    textAlign: 'center',
  },
  clubAddressBox: {
    marginTop: scaleHeight(16),
    marginBottom: scaleHeight(8),
  },
  clubName: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: scaleHeight(22.442), // 160.3% of 14px
  },
  clubAddress: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(22),
  },
  nextButton: {
    width: '100%',
    marginTop: scaleHeight(24),
  },
  clubAddressReserve: {
    minHeight: scaleHeight(160), // more space for address
    marginTop: scaleHeight(16),
    marginBottom: scaleHeight(24),
  },
  cantFindContainer: {
    alignItems: 'center',
    marginTop: scaleHeight(16),
  },
  cantFindText: {
    color: '#18302A',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(21),
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
}); 