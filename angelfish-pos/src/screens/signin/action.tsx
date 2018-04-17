export const login = (email: string, password: string) => {
  console.log('masuk sini');
  console.log('email: ', email);
  console.log('password: ', password);
  return {
    type: "ACTION_LOGIN",
    loggedIn: true,
    status: "Sudah di aktifkan"
  };
};

export default {
  login,
};