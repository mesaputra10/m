import { connect } from 'react-redux';
import { login } from './action';
import { SigninComponent } from './component';

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.isLoggedIn
});

const mapDispatchToProps = (dispatch) => ({
  login: (email: string, password: string) => dispatch(login(email, password))
});

export const SigninContainer = connect(
  mapStateToProps, mapDispatchToProps
)(SigninComponent);

export default SigninContainer;