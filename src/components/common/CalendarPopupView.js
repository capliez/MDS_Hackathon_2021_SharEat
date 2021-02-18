import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  SafeAreaView,
  Pressable,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import Config from '../../helpers/Config';
import CustomCalendar from './CustomCalendar';
import { useFonts } from 'expo-font';
import PropTypes from 'prop-types';
const HALF_MONTHS = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

const WEEKS = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Dimanche',
];

const CustomerCalendar = ({
  showCal,
  setShowCal,
  minimumDate,
  initialStartDate,
  onApplyClick,
}) => {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [loaded] = useFonts({
    WorkSansRegular: require('../../../assets/fonts/WorkSans-Regular.ttf'),
    WorkSansBold: require('../../../assets/fonts/WorkSans-Bold.ttf'),
    WorkSansMedium: require('../../../assets/fonts/WorkSans-Medium.ttf'),
  });

  if (!loaded) return null;

  const formattedDate = (date) => {
    return date
      ? `${WEEKS[date?.getDay()]}, ${String(date.getDate()).padStart(2, '0')} ${
          HALF_MONTHS[date.getMonth()]
        }`
      : '--/--';
  };

  return (
    <Modal
      visible={showCal}
      animationType="fade"
      transparent
      onRequestClose={() => setShowCal(false)}
    >
      <StatusBar backgroundColor="rgba(218,165,32)" />
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => setShowCal(false)}
      >
        <SafeAreaView style={styles.containerStyle}>
          <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => {}}>
            <View
              style={{ backgroundColor: 'white', borderRadius: 24, margin: 24 }}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.timelineContainerStyle}>
                  <Text style={styles.fromToTextStyle}>Pour</Text>
                  <Text style={styles.startEndDateTextStyles}>
                    {formattedDate(startDate)}
                  </Text>
                </View>
              </View>
              <View style={{ height: 0.5, backgroundColor: 'lightgrey' }} />

              <CustomCalendar
                minDate={minimumDate}
                startDate={startDate}
                startEndDateChange={(startDateData) => {
                  setStartDate(startDateData);
                }}
              />

              <View style={styles.applyBtnMainContainer}>
                <View
                  style={{ borderRadius: 24, elevation: 8, overflow: 'hidden' }}
                >
                  <Pressable
                    style={({ pressed }) => [
                      styles.applyBtn,
                      { opacity: !Config.isAndroid && pressed ? 0.6 : 1 },
                    ]}
                    android_ripple={{ color: 'lighgrey' }}
                    onPress={() => {
                      onApplyClick(startDate);
                      setShowCal(false);
                    }}
                  >
                    <Text style={styles.applyBtnText}>Valider</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  timelineContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fromToTextStyle: {
    fontSize: 16,
    fontFamily: 'WorkSansRegular',
    color: 'rgba(128, 128, 128, 0.8)',
    marginBottom: 4,
  },
  startEndDateTextStyles: { fontSize: 16, fontFamily: 'WorkSansBold' },
  applyBtn: {
    backgroundColor: '#DAA520',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyBtnText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'WorkSansMedium',
  },
  verticleDivider: {
    height: 74,
    width: 1,
    backgroundColor: 'grey',
    opacity: 0.4,
  },
  applyBtnMainContainer: {
    padding: 16,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.63,
  },
});

CustomCalendar.propTypes = {
  showCal: PropTypes.bool,
  setShowCal: PropTypes.bool,
  minimumDate: PropTypes.string,
  initialStartDate: PropTypes.string,
  onApplyClick: PropTypes.func,
};

export default CustomerCalendar;
