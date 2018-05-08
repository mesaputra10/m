import { StyleSheet } from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1
  },
  formContainer: {
    paddingHorizontal: 14
  },
  hargaMinMaxLabel: {
    width: 200,
    fontSize: 16,
    color: config.color.text,
    paddingBottom: 8
  },
  textInputStyle: {
    width: 270,
    height: 36,
    borderRadius: 8,
    backgroundColor: config.color.white,
    borderWidth: 1,
    borderColor: config.color.border,
    padding: 8
  },
  separateFormElement: {
    paddingVertical: 12
  },
  buttonBottomContainer: {
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 0,
    alignItems: 'flex-end',
    backgroundColor: config.color.backgroundGrey
  },
  buttonBottomStyle: {
    width: 275,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: config.color.blue,
    borderRadius: 5
  },
  buttonBottomText: {
    color: config.color.white,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10
  }
});
export default styles;
