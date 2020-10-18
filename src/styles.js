import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
export const minUnit = width / 20;
export const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#89B4C4',
    flexDirection: 'row',
    height: minUnit * 3,
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
  },
  headerMenuButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 8,
  },
  headerSpacer: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 9,
    marginHorizontal: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: minUnit * 1.5,
    fontFamily: 'Montserrat-Light',
  },
  globalContainer: {flex: 1},
  subContainer: {
    // backgroundColor: 'red',
    flex: 1,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: minUnit,
    width: '100%',
    alignItems: 'center',

    justifyContent: 'space-evenly',
  },
  cardContainer: {
    backgroundColor: 'white',
    width: minUnit * 8.16,
    height: minUnit * 12.45,
    borderRadius: minUnit,
    alignItems: 'center',
  },
  cardHeader: {
    backgroundColor: '#548999',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: minUnit * 2.65,
    borderTopLeftRadius: minUnit,
    borderTopRightRadius: minUnit,
  },
  cardText: {
    color: 'white',
    fontSize: minUnit * 1.5,
    fontFamily: 'Montserrat-Light',
  },
  buttonStyle: {
    height: minUnit * 2.45,
    width: minUnit * 2.45,
    borderRadius: (minUnit * 2.45) / 2,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6EFF6',
  },
  scoreContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  scoreText: {fontSize: minUnit * 3, fontFamily: 'Montserrat-Light'},
  notificationBox: {
    position: 'absolute',
    backgroundColor: '#548999',
    left: 0,
    right: 0,
    bottom: minUnit * 2,
    borderRadius: 19,
    zIndex: 999,
    elevation: 5,
    marginHorizontal: minUnit * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  notificationTextHeader: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 8,
  },
  notificationText: {
    color: 'white',
    fontFamily: 'Montserrat-Light',
  },
});
