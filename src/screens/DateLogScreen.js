import React, {useEffect, useReducer} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-date-picker';
import {HeaderBar} from '../components/HeaderBar';
import {PlusIcon} from '../components/PlusIcon';
import {Modalize} from 'react-native-modalize';
import R from '../assets/R';
import firestore from '@react-native-firebase/firestore';
import RemoveIcon from '../assets/icons/removeIcon';
import moment from 'moment/min/moment-with-locales';
const dateLogReducer = (state, action) => {
  switch (action.type) {
    case actions.TOGGLE_MODAL:
      if (!state.addModalVisible) {
        modalizeRef.current?.open();
      }
      return {...state, addModalVisible: !state.addModalVisible};
    case actions.HIDE_MODAL:
      return {...state, addModalVisible: false};
    case actions.SHOW_MODAL:
      modalizeRef.current?.open();
      return {...state, addModalVisible: true};
    case actions.SET_TEMP_DATE:
      console.log(action.payload);
      return {
        ...state,
        tempDate: {date: action.payload, dateTitle: state.tempDate.dateTitle},
      };
    case actions.SET_TEMP_TITLE:
      return {
        ...state,
        tempDate: {
          date: state.tempDate.date,
          dateTitle: action.payload,
        },
      };
    case actions.SET_DATES:
      return {...state, dates: action.payload || []};
    case actions.CREATE_DATE:
      firestore()
        .collection('dates')
        .add({date: state.tempDate.date, dateTitle: state.tempDate.dateTitle});
      modalizeRef.current?.close();
      return {
        ...state,
        addModalVisible: false,
        tempDate: {dateTitle: null, date: new Date()},
      };

    default:
      return state;
  }
};
const dateLogInitState = {
  addModalVisible: false,
  tempDate: {date: new Date(), dateTitle: null},
  dates: [],
};
const actions = {
  SET_TEMP_DATE: 'SET_TEMP_DATE',
  SET_TEMP_TITLE: 'SET_TEMP_TITLE',
  SET_DATES: 'SET_DATES',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  CREATE_DATE: 'CREATE_DATE',
};
const modalizeRef = React.createRef();
export default function DateLogScreen({navigation, route}) {
  const [state, dispatch] = useReducer(dateLogReducer, dateLogInitState);
  console.log('DateLogScreen -> state', JSON.stringify(state, null, 2));
  useEffect(() => {
    const subscriber = firestore()
      .collection('dates')
      .onSnapshot((incomingDates) => {
        let newDates = incomingDates.docs.map((item) => {
          return {
            id: item.id,
            dateTitle: item.data().dateTitle,
            date: new Date(item.data().date.seconds * 1000),
          };
        });
        if (!newDates.length) {
          newDates = [];
        }
        dispatch({type: actions.SET_DATES, payload: newDates});
      });
    return subscriber;
  }, []);
  return (
    <SafeAreaView style={styles.screenContainer}>
      <HeaderBar
        title={route.name}
        toggleDrawer={navigation.toggleDrawer}
        RightComponent={
          <PlusIcon toggleModal={() => dispatch({type: actions.SHOW_MODAL})} />
        }
      />
      <View style={styles.subContainer}>
        {state.dates.length ? (
          <FlatList
            data={state.dates}
            keyExtractor={(item) => item.id}
            renderItem={({index, item}) => <DateCell date={item} />}
          />
        ) : (
          <Text style={styles.notFoundText}>Hiç Buluşmamış mıyız ya?</Text>
        )}
      </View>
      <Modalize
        scrollViewProps={{style: styles.scrollViewStyle}}
        ref={modalizeRef}
        adjustToContentHeight
        onClosed={() => dispatch({type: actions.HIDE_MODAL})}>
        <AddRecordModal dispatch={dispatch} state={state} />
      </Modalize>
    </SafeAreaView>
  );
}
const AddRecordModal = ({dispatch, state}) => {
  return (
    <Animatable.View animation={'fadeIn'}>
      <View style={styles.addModalContainer}>
        <Text style={styles.addModalTitle}>Nereye gitmiştik?</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) =>
              dispatch({type: actions.SET_TEMP_TITLE, payload: text})
            }
          />
        </View>
        <DatePicker
          minimumDate={new Date(0)}
          style={styles.datePicker}
          date={state.tempDate.date}
          locale={'tr'}
          fadeToColor={R.colors.background}
          onDateChange={(date) => {
            dispatch({type: actions.SET_TEMP_DATE, payload: new Date(date)});
          }}
          mode={'date'}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch({type: actions.CREATE_DATE})}>
        <Text style={styles.buttonText}>Ekle!</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};
const DateCell = ({date}) => {
  const deleteRecord = () =>
    firestore().collection('dates').doc(date.id).delete();
  return (
    <View style={styles.dateCell}>
      <View style={styles.dateTextContainer}>
        <Text>{date.dateTitle}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: R.colors.gray}}>
            {moment(date.date).format('DD MMMM YYYY')}
          </Text>
          <Text style={{marginLeft: 16, color: R.colors.softGray}}>
            {moment(date.date).fromNow()}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={deleteRecord}
        style={styles.subjectCardRemoveIcon}>
        <RemoveIcon color={R.colors.white} width={32} height={32} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dateTextContainer: {flex: 1, marginRight: 8},
  dateCell: {
    backgroundColor: R.colors.white,
    borderRadius: 5,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
    marginVertical: 4,
    padding: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  subjectCardRemoveIcon: {backgroundColor: R.colors.primary, borderRadius: 24},
  addModalTitle: {
    marginTop: 16,
    fontSize: 24,
    color: 'gray',
  },
  datePicker: {
    backgroundColor: R.colors.background,
    borderRadius: 8,
  },
  scrollViewStyle: {backgroundColor: R.colors.background},
  textInputContainer: {
    width: '90%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 8,
    borderBottomColor: 'rgba(0,0,0,0.4)',
  },
  textInput: {
    borderBottomColor: 'black',
    marginVertical: 16,
    backgroundColor: R.colors.white,
    borderRadius: 5,
    paddingHorizontal: 16,
  },
  addModalContainer: {alignItems: 'center'},
  notFoundText: {
    fontWeight: 'normal',
    color: 'rgba(0,0,0,0.6)',
    textAlign: 'center',
  },
  subContainer: {flex: 1, justifyContent: 'center'},
  screenContainer: {flex: 1},
  buttonText: {color: R.colors.white, fontSize: 24},
  button: {
    backgroundColor: R.colors.primary,
    margin: 16,
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
