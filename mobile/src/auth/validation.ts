export interface SignupValidationStatus {
  hasErrors: boolean;
  username?: string;
  email?: string;
  password?: string;
  passwordRepeat?: string;
  schoolId?: string;
}

export const validateSignupForm = ({
  username,
  email,
  password,
  passwordRepeat,
  schoolId,
}: {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  schoolId: number | null;
}) => {
  let result: SignupValidationStatus = { hasErrors: false };

  if (!username) {
    result = {
      ...result,
      hasErrors: true,
      username: 'Pole login jest wymagane!',
    };
  }

  if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    result = {
      ...result,
      hasErrors: true,
      email: 'Podaj poprawny adres email!',
    };
  }

  if (!password) {
    result = {
      ...result,
      hasErrors: true,
      password: 'Pole hasło jest wymagane!',
    };
  }

  if (password !== passwordRepeat) {
    result = {
      ...result,
      hasErrors: true,
      passwordRepeat: 'Hasła muszą być jednakowe!',
    };
  }

  if (!schoolId) {
    result = {
      ...result,
      hasErrors: true,
      schoolId: 'Wybierz szkołę!',
    };
  }
  return result;
};
