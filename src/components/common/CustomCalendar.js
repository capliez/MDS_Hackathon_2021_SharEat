import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Config from '../../helpers/Config';
import { useFonts } from 'expo-font';

const monthNames = [
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

const CustomCalendar = ({
  minDate,
  startDate,
  endDate,
  startEndDateChange,
}) => {
  const [dateList, setDateList] = useState([]);
  let currentMonthDate = useRef(new Date()).current;
  let minimumDate = useRef(minDate).current;
  let maximumDate = useRef(null).current;
  const [loaded] = useFonts({
    WorkSansRegular: require('../../../assets/fonts/WorkSans-Regular.ttf'),
    WorkSansBold: require('../../../assets/fonts/WorkSans-Bold.ttf'),
    WorkSansMedium: require('../../../assets/fonts/WorkSans-Medium.ttf'),
  });

  const setListOfDate = useCallback((monthDate) => {
    const dates = [];
    let newDate = new Date();
    newDate.setFullYear(monthDate.getFullYear(), monthDate.getMonth(), 0);
    const prevMonthDate = newDate.getDate();
    let previousMothDay = 0;
    // console.log(new Date().toLocaleDateString('default', { weekday: 'long' }));

    if (newDate.getDay() !== 0) {
      previousMothDay = newDate.getDay() === 0 ? 7 : newDate.getDay();
      for (let i = 1; i <= previousMothDay; i++) {
        const date = new Date(newDate);
        date.setDate(prevMonthDate - (previousMothDay - i));

        dates.push(date);
      }
    }
    for (let i = 0; i < 42 - previousMothDay; i++) {
      const date = new Date(newDate);
      date.setDate(prevMonthDate + (i + 1));
      dates.push(date);
    }
    // console.log(dates);
    setDateList(dates);
  }, []);

  useEffect(() => {
    setListOfDate(new Date());
  }, [setListOfDate]);
  if (!loaded) return null;

  const getIsInRange = (date) => {
    if (startDate != null && endDate != null) {
      // change, "new Date(date.toDateString())" started giving "Inavlid date" for some reason
      /* if (
        new Date(date.toDateString()) > new Date(startDate.toDateString()) &&
        new Date(date.toDateString()) < new Date(endDate.toDateString()) */
      if (date > startDate && date < endDate) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const getIsItStartAndEndDate = (date) => {
    if (startDate != null && startDate.toDateString() === date.toDateString()) {
      return true;
    } else {
      return false;
    }
  };

  const isStartDateRadius = (date) => {
    if (startDate != null && startDate.toDateString() === date.toDateString()) {
      return true;
    } else if (date.getDay() === 1) {
      return true;
    } else {
      return false;
    }
  };

  const onDateClick = (date) => {
    startDate = date;

    startEndDateChange(startDate);
  };

  const getDaysNameUI = () => {
    if (dateList.length === 0) {
      return;
    }

    const listUI = [];
    for (let i = 0; i < 7; i++) {
      listUI.push(
        <View key={i.toString()} style={{ flex: 1, alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'WorkSansMedium',
              color: '#DAA520',
            }}
          >
            {
              ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][
                dateList[i].getDay()
              ]
            }
          </Text>
        </View>,
      );
    }
    return listUI;
  };

  const getDaysNoUI = () => {
    const noList = [];
    let count = 0;
    for (let i = 0; i < dateList.length / 7; i++) {
      const listUI = [];
      for (let j = 0; j < 7; j++) {
        const date = dateList[count];
        listUI.push(
          <View key={count.toString()} style={{ flex: 1, aspectRatio: 1.0 }}>
            <View
              style={{
                flex: 1,
                marginVertical: 3,
                // paddingVertical: 2,
                paddingLeft: isStartDateRadius(date) ? 4 : 0,
                backgroundColor:
                  startDate != null
                    ? getIsItStartAndEndDate(date) || getIsInRange(date)
                      ? 'rgba(84, 211, 194, 0.4)'
                      : 'transparent'
                    : 'transparent',
                borderRadius: 24,
              }}
            />
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                // flex: 1,
                // position: 'absolute',
                // flexDirection: 'row',
                padding: 2,
                borderRadius: 32,
                borderWidth: getIsItStartAndEndDate(date) ? 2 : 0,
                borderColor: getIsItStartAndEndDate(date)
                  ? 'white'
                  : 'transparent',
                // overflow: 'hidden',
                backgroundColor: getIsItStartAndEndDate(date)
                  ? 'rgb(218,165,32)'
                  : 'transparent',
                elevation: getIsItStartAndEndDate(date) ? 4 : 0,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.63,
              }}
            >
              <Pressable
                style={({ pressed }) => [
                  {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: !Config.isAndroid && pressed ? 0.4 : 1,
                  },
                ]}
                android_ripple={{ borderless: true }}
                onPress={() => {
                  if (currentMonthDate.getMonth() === date.getMonth()) {
                    if (minimumDate != null && maximumDate != null) {
                      const newMinimumDate = new Date(minimumDate);
                      newMinimumDate.setDate(minimumDate.getDate() - 1);
                      const newMaximumDate = new Date(maximumDate);
                      newMaximumDate.setDate(maximumDate.getDate() + 1);
                      if (date > newMinimumDate && date < newMaximumDate) {
                        onDateClick(date);
                      }
                    } else if (minimumDate != null) {
                      const newMinimumDate = new Date(minimumDate);

                      if (date >= newMinimumDate) {
                        onDateClick(date);
                      }
                    } else if (maximumDate != null) {
                      const newMaximumDate = new Date(maximumDate);
                      newMaximumDate.setDate(maximumDate.getDate() + 1);
                      if (date < newMaximumDate) {
                        onDateClick(date);
                      }
                    } else {
                      onDateClick(date);
                    }
                  }
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: getIsItStartAndEndDate(date)
                      ? 'WorkSansBold'
                      : 'WorkSansRegular',
                    color: getIsItStartAndEndDate(date)
                      ? 'white'
                      : currentMonthDate.getMonth() === date.getMonth()
                      ? 'black'
                      : 'lightgrey',
                  }}
                >
                  {date.getDate()}
                </Text>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 6,
                    height: 6,
                    width: 6,
                    borderRadius: 3,
                    backgroundColor:
                      new Date().toDateString() === date.toDateString()
                        ? getIsInRange(date)
                          ? 'white'
                          : 'rgb(84, 211, 194)'
                        : 'transparent',
                  }}
                />
              </Pressable>
            </View>
          </View>,
        );
        count += 1;
      }
      noList.push(
        <View
          key={i.toString()}
          style={{ flexDirection: 'row', marginVertical: 1 }}
        >
          {listUI}
        </View>,
      );
    }
    return noList;
  };

  return (
    <View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
      <View style={{ flexDirection: 'row', padding: 8 }}>
        <View style={styles.arrowContainerStyle}>
          <Pressable
            style={({ pressed }) => [
              styles.arrowBtnStyle,
              { opacity: !Config.isAndroid && pressed ? 0.6 : 1 },
            ]}
            android_ripple={{ color: 'lighgrey' }}
            onPress={() => {
              // currentMonthDate = new Date();
              currentMonthDate.setMonth(currentMonthDate.getMonth() - 1);
              setListOfDate(currentMonthDate);
            }}
          >
            <Icon name="keyboard-arrow-left" size={28} color="grey" />
          </Pressable>
        </View>
        <Text style={styles.monthHeaderStyle}>
          {monthNames[currentMonthDate.getMonth()]},{' '}
          {currentMonthDate.getFullYear()}
        </Text>
        <View style={styles.arrowContainerStyle}>
          <Pressable
            style={({ pressed }) => [
              styles.arrowBtnStyle,
              { opacity: !Config.isAndroid && pressed ? 0.6 : 1 },
            ]}
            android_ripple={{ color: 'lighgrey' }}
            onPress={() => {
              // currentMonthDate = new Date();
              currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
              setListOfDate(currentMonthDate);
            }}
          >
            <Icon name="keyboard-arrow-right" size={28} color="grey" />
          </Pressable>
        </View>
      </View>
      <View
        style={{ flexDirection: 'row', paddingHorizontal: 8, paddingBottom: 8 }}
      >
        {getDaysNameUI()}
      </View>
      <View style={{ paddingHorizontal: 8 }}>{getDaysNoUI()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  arrowContainerStyle: {
    borderRadius: 24,
    borderWidth: 0.6,
    borderColor: 'lightgrey',
    overflow: 'hidden',
  },
  arrowBtnStyle: {
    height: 38,
    width: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthHeaderStyle: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'WorkSansMedium',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default CustomCalendar;
