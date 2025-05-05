import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function PasswordStrongTest() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />
      <TextInput
        placeholder="New Password"
        value={password}
        onChangeText={setPassword}
        textContentType="newPassword"
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />
      <Button title="Submit" onPress={() => {}} />
    </View>
  );
} 