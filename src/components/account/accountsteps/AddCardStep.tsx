import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';
import { PrimaryButton } from '../../PrimaryButton';

interface AddCardStepProps {
  onClose: () => void;
  onSubmit: (cardData: CardFormData) => void;
}

interface CardFormData {
  cardNumber: string;
  nameOnCard: string;
  expiration: string;
  postcode: string;
  cvv: string;
  cardNickname: string;
  isDefault: boolean;
}

const AddCardStep: React.FC<AddCardStepProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<CardFormData>({
    cardNumber: '',
    nameOnCard: '',
    expiration: '',
    postcode: '',
    cvv: '',
    cardNickname: '',
    isDefault: false,
  });

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isValid, setIsValid] = useState<{ [key: string]: boolean }>({});

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'cardNumber':
        return /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(value);
      case 'nameOnCard':
        return value.trim().length > 0;
      case 'expiration':
        return /^\d{2}\/\d{2}$/.test(value);
      case 'postcode':
        return /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i.test(value);
      case 'cvv':
        return /^\d{3}$/.test(value);
      default:
        return true;
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setIsValid(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name: keyof CardFormData) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    setIsValid(prev => ({ ...prev, [name]: validateField(name, formData[name]) }));
  };

  const isFormValid = () => {
    return (
      isValid.cardNumber &&
      isValid.nameOnCard &&
      isValid.expiration &&
      isValid.postcode &&
      isValid.cvv
    );
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g) || [];
    return groups.join('-').substr(0, 19);
  };

  const formatExpiration = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={[
                styles.input,
                touched.cardNumber && {
                  borderColor: isValid.cardNumber ? '#4EDD69' : '#FF0000',
                },
              ]}
              placeholder="0000-0000-0000-0000"
              value={formData.cardNumber}
              onChangeText={(text) => handleChange('cardNumber', formatCardNumber(text))}
              onBlur={() => handleBlur('cardNumber')}
              keyboardType="numeric"
              maxLength={19}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Name on card</Text>
            <TextInput
              style={[
                styles.input,
                touched.nameOnCard && {
                  borderColor: isValid.nameOnCard ? '#4EDD69' : '#FF0000',
                },
              ]}
              placeholder=""
              value={formData.nameOnCard}
              onChangeText={(text) => handleChange('nameOnCard', text)}
              onBlur={() => handleBlur('nameOnCard')}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>Expiration</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.expiration && {
                    borderColor: isValid.expiration ? '#4EDD69' : '#FF0000',
                  },
                ]}
                placeholder="00/00"
                value={formData.expiration}
                onChangeText={(text) => handleChange('expiration', formatExpiration(text))}
                onBlur={() => handleBlur('expiration')}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>Postcode</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.postcode && {
                    borderColor: isValid.postcode ? '#4EDD69' : '#FF0000',
                  },
                ]}
                placeholder=""
                value={formData.postcode}
                onChangeText={(text) => handleChange('postcode', text.toUpperCase())}
                onBlur={() => handleBlur('postcode')}
                autoCapitalize="characters"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.cvv && {
                    borderColor: isValid.cvv ? '#4EDD69' : '#FF0000',
                  },
                ]}
                placeholder="000"
                value={formData.cvv}
                onChangeText={(text) => handleChange('cvv', text)}
                onBlur={() => handleBlur('cvv')}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>

            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>Card Nickname (Optional)</Text>
              <TextInput
                style={[styles.input]}
                placeholder=""
                value={formData.cardNickname}
                onChangeText={(text) => handleChange('cardNickname', text)}
              />
            </View>
          </View>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                formData.isDefault && styles.checkboxChecked,
              ]}
              onPress={() => setFormData(prev => ({ ...prev, isDefault: !prev.isDefault }))}
            >
              {formData.isDefault && (
                <View style={styles.checkmark} />
              )}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Set as Default</Text>
          </View>

          <View style={styles.paymentMethods}>
            <Image
              source={require('../../../../assets/images/wallet/visa.png')}
              style={styles.paymentMethodImage}
            />
            <Image
              source={require('../../../../assets/images/wallet/mastercard.png')}
              style={styles.paymentMethodImage}
            />
            <Image
              source={require('../../../../assets/images/wallet/applepay.png')}
              style={styles.paymentMethodImage}
            />
            <Image
              source={require('../../../../assets/images/wallet/googlepay.png')}
              style={styles.paymentMethodImage}
            />
          </View>

          <PrimaryButton
            title="Add Card"
            onPress={() => onSubmit(formData)}
            style={styles.addButton}
            isActive={isFormValid()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E3E3',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scaleWidth(24),
    paddingTop: scaleHeight(53),
    paddingBottom: scaleHeight(40),
    alignItems: 'center',
  },
  contentContainer: {
    width: scaleWidth(300),
    alignSelf: 'center',
  },
  formGroup: {
    marginBottom: scaleHeight(16),
    width: '100%',
  },
  label: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: undefined,
    marginBottom: scaleHeight(5),
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
  halfWidth: {
    width: '48%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(20),
    width: '100%',
  },
  checkbox: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: scaleWidth(4),
    backgroundColor: '#FFF',
    marginRight: scaleWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: '#4EDD69',
  },
  checkmark: {
    width: scaleWidth(12),
    height: scaleWidth(12),
    backgroundColor: '#4EDD69',
    borderRadius: scaleWidth(2),
  },
  checkboxLabel: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(10),
    fontStyle: 'normal',
    fontWeight: '500',
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: scaleHeight(20),
    gap: scaleWidth(5),
  },
  paymentMethodImage: {
    width: scaleWidth(42),
    height: scaleHeight(24),
    resizeMode: 'contain',
  },
  addButton: {
    width: '100%',
    marginTop: scaleHeight(30),
  },
});

export default AddCardStep; 