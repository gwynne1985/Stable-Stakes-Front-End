import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';
import { InputField } from '../../InputField';
import { PrimaryButton } from '../../PrimaryButton';
import { InfoBottomSheet } from '../../panels/InfoBottomSheet';

const CLUBS = [
  {
    name: 'Saunton Golf Club',
    address: ['Braunton', 'Devon', 'England', 'EX33 1LG'],
    county: 'Devon',
  },
  {
    name: 'Portmore Golf Club',
    address: ['Landkey Rd', 'Barnstaple', 'Devon', 'England', 'EX32 9LB'],
    county: 'Devon',
  },
  {
    name: 'Ilfracombe Golf Club',
    address: ['Hele Bay', 'Ilfracombe', 'Devon', 'England', 'EX34 9RT'],
    county: 'Devon',
  },
];

interface EditYourClubStepProps {
  onClose: () => void;
  onSave: (club: string) => void;
  initialClub: string;
  onUpdate?: () => void;
}

const EditYourClubStep: React.FC<EditYourClubStepProps> = ({
  onClose,
  onSave,
  initialClub,
  onUpdate
}) => {
  const [query, setQuery] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState<any>(null);
  const [infoVisible, setInfoVisible] = useState(false);

  // Find initial club from CLUBS array
  React.useEffect(() => {
    const club = CLUBS.find(c => c.name === initialClub);
    if (club) {
      setSelectedClub(club);
      setQuery(club.name);
    }
  }, [initialClub]);

  const filteredClubs = CLUBS.filter(club =>
    club.name.toLowerCase().includes(query.toLowerCase())
  );
  const showDropdown = dropdownOpen && query.length > 0 && !selectedClub && (filteredClubs.length === 0 || filteredClubs.length === 1);

  const handleSelect = (club: any) => {
    setSelectedClub(club);
    setQuery(club.name);
    setDropdownOpen(false);
    Keyboard.dismiss();
  };

  const handleFocus = () => {
    setInputFocused(true);
    setDropdownOpen(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
    setTimeout(() => setDropdownOpen(false), 150);
  };

  const hasClubChanged = () => {
    return selectedClub?.name !== initialClub;
  };

  const handleSave = () => {
    if (selectedClub) {
      onSave(selectedClub.name);
      onUpdate?.();
      setTimeout(() => {
        onClose();
      }, 50);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: scaleWidth(300), alignSelf: 'center' }}>
        <Text style={styles.header}>YOUR GOLF CLUB</Text>
        <View style={{ position: 'relative' }}>
          <InputField
            placeholder="Start typing"
            value={query}
            onChangeText={text => {
              setQuery(text);
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
          {showDropdown && (
            <View style={styles.dropdown} pointerEvents="box-none">
              {filteredClubs.length === 0 ? (
                <TouchableOpacity
                  style={styles.dropdownRow}
                  activeOpacity={1}
                  onPress={() => {}} // Do nothing, just keep open
                >
                  <Text style={styles.dropdownNoClub}>No Club Found</Text>
                </TouchableOpacity>
              ) : (
                filteredClubs.map((club, idx) => (
                  <TouchableOpacity
                    key={club.name}
                    style={styles.dropdownRow}
                    onPress={() => handleSelect(club)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.dropdownClubName}>{club.name}</Text>
                    <View style={styles.verticalBar} />
                    <Text style={styles.dropdownCounty}>{club.county}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}
        </View>
        <View style={styles.clubAddressBox}>
          <Text style={styles.clubName}>{selectedClub ? selectedClub.name : 'Ilfracombe Golf Club'}</Text>
          {selectedClub ? (
            selectedClub.address.map((line: string, idx: number) => (
              <Text style={styles.clubAddress} key={idx}>{line}</Text>
            ))
          ) : (
            <>
              <Text style={styles.clubAddress}>Hele Bay</Text>
              <Text style={styles.clubAddress}>Ilfracombe</Text>
              <Text style={styles.clubAddress}>Devon</Text>
              <Text style={styles.clubAddress}>England</Text>
              <Text style={styles.clubAddress}>EX34 9RT</Text>
            </>
          )}
        </View>
        <PrimaryButton
          title="Update"
          onPress={handleSave}
          isActive={!!selectedClub && hasClubChanged()}
          style={styles.updateButton}
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
    marginBottom: scaleHeight(23),
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
    marginTop: scaleHeight(50),
    marginBottom: scaleHeight(16),
  },
  clubName: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(22),
  },
  clubAddress: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: scaleHeight(22),
  },
  updateButton: {
    width: '100%',
    marginTop: scaleHeight(30),
  },
  cantFindContainer: {
    marginTop: scaleHeight(16),
    alignItems: 'center',
  },
  cantFindText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(12),
    fontStyle: 'normal',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default EditYourClubStep; 