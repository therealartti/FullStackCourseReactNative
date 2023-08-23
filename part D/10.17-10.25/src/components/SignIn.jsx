import Text from './Text';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, StyleSheet } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

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
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});


const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
  
    try {
      const data = await signIn({ username, password });
      console.log('data at the other side:', data);
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View>
          <FormikTextInput name="username" placeholder="Username" style="inputBox"/>
          <FormikTextInput name="password" placeholder="Password" secureTextEntry />
          <Pressable onPress={handleSubmit}>
            <Text style={styles.submitBox}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};


export default SignIn;