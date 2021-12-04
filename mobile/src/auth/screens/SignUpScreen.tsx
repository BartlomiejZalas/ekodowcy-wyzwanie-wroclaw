import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../theme/Colors';
import { TextField } from '../../theme/components/TextField';
import { StyledButton } from '../../theme/components/Button';
import { Link } from '../../theme/components/Link';
import { Selector } from '../../theme/components/Selector';
import { SignupValidationStatus, validateSignupForm } from '../validation';
import { SchoolsApi } from '../../api/SchoolsApi';
import { AsyncStatus } from '../../api/types';
import { Error } from '../../theme/components/Error';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { AllScreens } from '../../app/Navigation.types';

export const SignUpScreen = ({
  navigation,
}: NativeStackScreenProps<AllScreens, 'SignUp'>) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [schoolId, setSchoolId] = useState<number | null>(null);
  const [items, setItems] = useState<Array<{ value: string; label: string }>>(
    [],
  );
  const [status, setStatus] = useState<AsyncStatus>(AsyncStatus.LOADING);

  const [validationResult, setValidationResult] =
    useState<SignupValidationStatus>({ hasErrors: false });

  const { signUp } = React.useContext(AuthContext);

  useEffect(() => {
    const getSchools = async () => {
      try {
        const schools = await SchoolsApi.getSchools();
        setItems(schools.map(s => ({ value: String(s.id), label: s.name })));
        setStatus(AsyncStatus.LOADED);
      } catch (e) {
        setStatus(AsyncStatus.ERROR);
      }
    };
    getSchools();
  }, []);

  const submit = async () => {
    const data = {
      username,
      email,
      password,
      passwordRepeat,
      schoolId,
    };
    const validationResult = validateSignupForm(data);
    if (!validationResult.hasErrors) {
      await signUp({ ...data, schoolId: schoolId! });
    } else {
      setValidationResult(validationResult);
    }
  };

  if (status === AsyncStatus.ERROR) {
    return <Error />;
  }

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
          placeholder={
            status === AsyncStatus.LOADING ? 'Wczytywanie...' : 'Wybierz szkołę'
          }
          value={schoolId ? String(schoolId) : null}
          onChange={v => setSchoolId(Number(v))}
          error={validationResult.schoolId}
          items={items}
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
