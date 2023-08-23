import * as Yup from 'yup';
import { Formik } from 'formik';
import Text from './Text';
import {  Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import useCreateReview from '../hooks/useCreateReview';

const validationSchema = Yup.object().shape({
  ownerName: Yup
    .string()
    .required('Repository username is required'),
  repositoryName: Yup
    .string()
    .required('Repository name is required'),
  rating: Yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  review: Yup
    .string(),
});

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


const AddReview = () => {
    const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, review } = values;
  
    try {
      const data = await createReview({ ownerName, repositoryName, rating: parseInt(rating, 10), text: review });
      console.log('data at the other side:', data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={{ ownerName: '', repositoryName: '', rating: '', review: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View>
          <FormikTextInput name="ownerName" placeholder="Owner's Username" style="inputBox"/>
          <FormikTextInput name="repositoryName" placeholder="Repository Name" style="inputBox"/>
          <FormikTextInput name="rating" placeholder="Rating (0-100)" style="inputBox"/>
          <FormikTextInput name="review" placeholder="Review" style="inputBox"/>
          <Pressable onPress={handleSubmit}>
            <Text style={styles.submitBox}>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default AddReview;