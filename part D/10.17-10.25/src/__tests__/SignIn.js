import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import SignIn from '../components/SignIn';
import useSignIn from '../hooks/useSignIn';

jest.mock('../hooks/useSignIn');

describe('SignIn', () => {
  it('calls signIn function with correct arguments when a valid form is submitted', async () => {
    const signInMock = jest.fn();
    useSignIn.mockReturnValue([signInMock]);

    render(<SignIn/>);

    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
    fireEvent.press(screen.getByText('Sign in'));

    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledTimes(1);
      expect(signInMock.mock.calls[0][0]).toEqual({
        username: 'kalle',
        password: 'password',
      });
    });
  });
});