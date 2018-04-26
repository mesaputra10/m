import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  imageContainer: {
    paddingBottom: 24
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8
  },
  buttonContainer: {
    paddingTop: 24
  },
  buttonSectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 40,
    borderRadius: 5,
    backgroundColor: 'rgb(47, 120, 207)'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: 'rgb(255, 255, 255)'
  }
});
export default styles;
