import { StyleSheet } from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    height: 64,
    justifyContent: 'space-between'
  },
  contentContainer: {
    flex: 1,
    paddingTop: 16
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
    width: 278,
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
  },
  rightColumnTop: {
    justifyContent: 'flex-start'
  },
  rightColumnContainer: {
    flex: 1,
    paddingTop: 15,
    height: 64,
    justifyContent: 'space-between'
  },
  headerRightFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  headerRightText: {
    fontWeight: 'bold',
    paddingTop: 15,
    fontSize: 17
  },
  removeButtonContainer: {
    marginRight: -7
  },
  filterCancelText: {
    justifyContent: 'center',
    fontSize: 17,
    paddingTop: 15,
    color: config.color.blue
  },
  filterDeleteText: {
    justifyContent: 'center',
    paddingTop: 15,
    fontSize: 17,
    color: config.color.grey
  }
});
export default styles;
