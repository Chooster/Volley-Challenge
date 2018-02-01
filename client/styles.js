import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
  },
  titleText: {
    fontSize: 22,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    paddingRight: '2%',
  },
  buttonGroup: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    width: '60%',
  },
  button: {
    backgroundColor: '#7986CB',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
  },
  inputContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    margin: '1%',
    paddingVertical: '2%',
    borderBottomColor: 'rgba(0, 0, 0, 1)',
    borderBottomWidth: 1,
  },
  pinContainer: {
    width: '60%',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
