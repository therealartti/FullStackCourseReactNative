import Text from './Text';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, StyleSheet } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import { useSignUp } from '../hooks/useSignup';

const styles = StyleSheet.create({
  submitBox: {
    color: "#ffffff",
    fontWeight: theme.fontWeights.bold,
    backgroundColor: theme.colors.primary,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 3,
    padding: 10,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    fontFamily: theme.fonts,
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, "Username must be at least 5 charqacter long.")
    .max(30, "Username must be maximum 30 characters long."),
  password: yup
    .string()
    .required('Password is required')
    .min(5, "Password must be at least 5 charqacter long.")
    .max(50, "Password must be maximum 50 characters long."),
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf(
      [yup.ref("password"), null],
      "Password confirmation doesn't match the password."),
});


const SignUp = () => {
  const [signUp] = useSignUp();

  const onSubmit = async (values) => {
    const { username, password, passwordConfirmation } = values;
  
    try {
      const data = await signUp({ username, password, passwordConfirmation });
      console.log('data at the other side:', data);
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View>
          <FormikTextInput name="username" placeholder="Username" style="inputBox"/>
          <FormikTextInput name="password" placeholder="Password" secureTextEntry />
          <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry />
          <Pressable onPress={handleSubmit}>
            <Text style={styles.submitBox}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};


export default SignUp;