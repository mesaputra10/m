export const login = (email: string, password: string) => ({
  type: "ACTION_LOGIN",
  loggedIn: true
});

export default {
  login,
};