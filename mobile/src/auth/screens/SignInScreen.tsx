import React from 'react';
import { AuthContext } from '../AuthContext';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../theme/Colors';
import { TextField } from '../../theme/components/TextField';
import { StyledButton } from '../../theme/components/Button';
import { Link } from '../../theme/components/Link';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { AllScreens } from '../../app/Navigation.types';
import { AsyncStatus } from '../../api/types';
import { Error } from '../../theme/components/Error';

export const SignInScreen = ({
  navigation,
}: NativeStackScreenProps<AllScreens, 'SignIn'>) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState<AsyncStatus>(AsyncStatus.LOADED);

  const { signIn } = React.useContext(AuthContext);

  const submit = async () => {
    try {
      setStatus(AsyncStatus.LOADING);
      await signIn({ username, password });
      setStatus(AsyncStatus.LOADED);
    } catch (e) {
      setStatus(AsyncStatus.ERROR);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EKOtrasa</Text>
      <Text style={styles.subtitle}>Bezpiecznie do szkoły</Text>
      {status === AsyncStatus.ERROR && (
        <Error text="Niepoprawny login lub hasło!" />
      )}
      <TextField label="Login" value={username} onChangeText={setUsername} />
      <TextField
        label="Hasło"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <StyledButton
          title="Zaloguj się"
          disabled={!username || !password}
          onPress={submit}
        />
      </View>
      <View style={styles.linksContainer}>
        <Link
          title="Zarejestruj się"
          description="Nie masz jeszcze konta?"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  linksContainer: {
    marginTop: 32,
  },
  title: {
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: 36,
    textAlign: 'center',
    marginTop: 50,
  },
  subtitle: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 50,
    marginBottom: 32,
  },
});
