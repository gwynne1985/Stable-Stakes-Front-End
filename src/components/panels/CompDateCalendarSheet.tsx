import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/scale';

const daysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const CompDateCalendarSheet = ({
  visible,
  onClose,
  onDateSelected,
  initialDate
}: {
  visible: boolean;
  onClose: () => void;
  onDateSelected: (date: Date) => void;
  initialDate?: Date;
}) => {
  const today = new Date();
  const [selected, setSelected] = useState<Date | null>(initialDate || null);
  const [month, setMonth] = useState<number>((initialDate || today).getMonth());
  const [year, setYear] = useState<number>((initialDate || today).getFullYear());

  useEffect(() => {
    if (visible) {
      setSelected(initialDate || null);
      setMonth((initialDate || today).getMonth());
      setYear((initialDate || today).getFullYear());
    }
  }, [visible, initialDate]);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const lastMonthDays = new Date(year, month, 0).getDate();

  // Build calendar grid
  const grid: { date: Date; inMonth: boolean; isPast: boolean }[] = [];
  let offset = firstDay; // getDay() returns 0 for Sunday
  for (let i = 0; i < offset; i++) {
    const d = new Date(year, month - 1, lastMonthDays - offset + i + 1);
    grid.push({ date: d, inMonth: false, isPast: true });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    const isPast = d < tomorrow && (d.getFullYear() < tomorrow.getFullYear() || d.getMonth() < tomorrow.getMonth() || d.getDate() < tomorrow.getDate());
    grid.push({ date: d, inMonth: true, isPast });
  }
  while (grid.length % 7 !== 0) {
    const d = new Date(year, month + 1, grid.length % 7);
    grid.push({ date: d, inMonth: false, isPast: true });
  }

  const handleSelect = (date: Date, inMonth: boolean, isPast: boolean) => {
    if (!inMonth || isPast) return;
    setSelected(date);
  };

  const handleDone = () => {
    if (selected) onDateSelected(selected);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.headerBar} />
        <Text style={styles.header}>SELECT COMP DATE</Text>
        <View style={styles.navRow}>
          <TouchableOpacity onPress={() => setMonth(m => (m === 0 ? 11 : m - 1))}>
            <Image source={require('../../../assets/icons/chevron-left.png')} style={styles.chevron} />
          </TouchableOpacity>
          <Text style={styles.month}>{months[month]}</Text>
          <TouchableOpacity onPress={() => setMonth(m => (m === 11 ? 0 : m + 1))}>
            <Image source={require('../../../assets/icons/chevron-right2.png')} style={styles.chevron} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setYear(y => y - 1)}>
            <Image source={require('../../../assets/icons/chevron-left.png')} style={styles.chevron} />
          </TouchableOpacity>
          <Text style={styles.year}>{year}</Text>
          <TouchableOpacity onPress={() => setYear(y => y + 1)}>
            <Image source={require('../../../assets/icons/chevron-right2.png')} style={styles.chevron} />
          </TouchableOpacity>
        </View>
        <View style={styles.gridHeader}>
          {daysShort.map((d, i) => (
            <Text key={d + i} style={styles.gridHeaderText}>{d}</Text>
          ))}
        </View>
        <ScrollView contentContainerStyle={styles.grid}>
          {grid.map((cell, i) => {
            const isSelected = selected && cell.inMonth && !cell.isPast && cell.date.toDateString() === selected.toDateString();
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.cell,
                  isSelected && styles.cellSelected,
                  (!cell.inMonth || cell.isPast) && styles.cellDisabled
                ]}
                onPress={() => handleSelect(cell.date, cell.inMonth, cell.isPast)}
                activeOpacity={cell.inMonth && !cell.isPast ? 0.85 : 1}
              >
                <Text style={[
                  styles.cellText,
                  isSelected && styles.cellTextSelected,
                  (!cell.inMonth || cell.isPast) && styles.cellTextDisabled
                ]}>
                  {cell.date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity style={styles.doneBtn} onPress={handleDone} disabled={!selected}>
          <Text style={styles.doneBtnText}>Done</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: scaleHeight(500),
    backgroundColor: '#F3F3F3',
    borderTopLeftRadius: scaleWidth(24),
    borderTopRightRadius: scaleWidth(24),
    alignItems: 'center',
    paddingTop: scaleHeight(12),
    paddingBottom: scaleHeight(24),
  },
  headerBar: {
    width: scaleWidth(36),
    height: scaleHeight(4),
    backgroundColor: '#C6C6C6',
    borderRadius: scaleWidth(2),
    alignSelf: 'center',
    marginBottom: scaleHeight(8),
  },
  header: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontStyle: 'italic',
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: scaleHeight(12),
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scaleHeight(8),
    gap: scaleWidth(8),
  },
  chevron: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    tintColor: '#18302A',
  },
  month: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontWeight: '600',
    marginHorizontal: scaleWidth(4),
  },
  year: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontWeight: '600',
    marginHorizontal: scaleWidth(4),
  },
  gridHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: scaleWidth(300),
    marginBottom: scaleHeight(4),
  },
  gridHeaderText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontWeight: '600',
    textAlign: 'center',
    width: scaleWidth(36),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: scaleWidth(300),
    marginBottom: scaleHeight(16),
  },
  cell: {
    width: scaleWidth(36),
    height: scaleWidth(36),
    borderRadius: scaleWidth(18),
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    margin: scaleWidth(2),
  },
  cellSelected: {
    backgroundColor: '#4EDD69',
  },
  cellDisabled: {
    backgroundColor: 'transparent',
  },
  cellText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(14),
    fontWeight: '600',
    textAlign: 'center',
  },
  cellTextSelected: {
    color: '#FFF',
  },
  cellTextDisabled: {
    color: '#C6C6C6',
  },
  doneBtn: {
    width: scaleWidth(300),
    height: scaleHeight(48),
    backgroundColor: '#4EDD69',
    borderRadius: scaleWidth(24),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: scaleHeight(8),
  },
  doneBtnText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontWeight: '600',
    textAlign: 'center',
  },
}); 