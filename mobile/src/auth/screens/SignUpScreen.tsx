import React, { useState } from 'react';
import { AuthContext } from '../AuthContext';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../theme/Colors';
import { TextField } from '../../theme/components/TextField';
import { StyledButton } from '../../theme/components/Button';
import { Link } from '../../theme/components/Link';
import { Selector } from '../../theme/components/Selector';
import { SignupValidationStatus, validateSignupForm } from '../validation';

export const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [schoolId, setSchoolId] = useState<number | null>(null);

  const [validationResult, setValidationResult] =
    useState<SignupValidationStatus>({ hasErrors: false });

  const { signUp } = React.useContext(AuthContext);

  const submit = () => {
    const data = {
      username,
      email,
      password,
      passwordRepeat,
      schoolId,
    };
    const validationResult = validateSignupForm(data);
    if (!validationResult.hasErrors) {
      signUp({ ...data, schoolId: schoolId! });
    } else {
      setValidationResult(validationResult);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.spacing}>
        <Text style={styles.title}>Miło Cię poznać!</Text>
        <TextField
          label="Login"
          value={username}
          onChangeText={setUsername}
          error={validationResult.username}
        />
        <TextField
          label="Adres e-mail"
          value={email}
          onChangeText={setEmail}
          error={validationResult.email}
        />
        <TextField
          label="Hasło"
          value={password}
          onChangeText={setPassword}
          error={validationResult.password}
          secureTextEntry
        />
        <TextField
          label="Powtórz hasło"
          value={passwordRepeat}
          onChangeText={setPasswordRepeat}
          error={validationResult.passwordRepeat}
          secureTextEntry
        />

        <Selector
          label="Szkoła"
          placeholder="Wybierz szkołę"
          value={schoolId ? String(schoolId) : null}
          onChange={v => setSchoolId(Number(v))}
          error={validationResult.schoolId}
          items={[
            { value: '1', label: 'Szkoła 1' },
            { value: '2', label: 'Szkoła 2' },
            { value: '3', label: 'Szkoła 3' },
            { value: '4', label: 'Szkoła 4' },
            { value: '5', label: 'Szkoła 5' },
            { value: '6', label: 'Szkoła 6' },
            { value: '7', label: 'Szkoła 11' },
            { value: '8', label: 'Szkoła 12' },
          ]}
        />

        <View style={styles.linksContainer}>
          <Link
            title="regulaminu."
            description="Rejestracja oznacza akceptację"
            onPress={() => null}
          />
        </View>
        <View style={styles.buttonContainer}>
          <StyledButton title="Zarejestruj się" onPress={submit} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  spacing: {
    marginBottom: 40,
  },
  buttonContainer: {
    marginVertical: 16,
  },
  linksContainer: {
    marginVertical: 16,
  },
  title: {
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
});
