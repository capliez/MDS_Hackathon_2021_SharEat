import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  SafeAreaView,
  Pressable,
  StatusBar,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Config from '../../helpers/Config';
import RangeSliderView from '../cookHomeScreen/RangeSliderView';
import SliderView from '../cookHomeScreen/SliderView';
import Switch from '../cookHomeScreen/Swtch';
import { useFonts } from 'expo-font';
import PropTypes from 'prop-types';
const popularFList = [
  { titleTxt: 'Bon cuisinier', isSelected: false },
  { titleTxt: 'Moins chère', isSelected: false },
];

const type_List = [
  { titleTxt: 'Tous', isSelected: false },
  { titleTxt: 'Petits déjeuners', isSelected: false },
  { titleTxt: 'Apéritifs', isSelected: false },
  { titleTxt: 'Entrées', isSelected: true },
  { titleTxt: 'Repas', isSelected: false },
  { titleTxt: 'Desserts', isSelected: false },
  { titleTxt: 'Boissons', isSelected: false },
];

const FilterModal = ({ showFilter, setShowFilter }) => {
  const [popularFilterList, setPopularFilterList] = useState(popularFList);
  const [accomodationList, setAccomodationList] = useState(type_List);
  const [loaded] = useFonts({
    WorkSansRegular: require('../../../assets/fonts/WorkSans-Regular.ttf'),
    WorkSansSemiBold: require('../../../assets/fonts/WorkSans-SemiBold.ttf'),
    WorkSansMedium: require('../../../assets/fonts/WorkSans-Medium.ttf'),
    WorkSansBold: require('../../../assets/fonts/WorkSans-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const getPList = () => {
    const noList = [];
    let count = 0;
    const columnCount = 2;

    for (let i = 0; i < popularFilterList.length / columnCount; i++) {
      const listUI = [];
      for (let j = 0; j < columnCount; j++) {
        const data = popularFilterList[count];
        listUI.push(
          <View
            key={j}
            style={{ flex: 1, borderRadius: 4, overflow: 'hidden' }}
          >
            <Pressable
              style={({ pressed }) => [
                styles.checkBoxBtn,
                { opacity: !Config.isAndroid && pressed ? 0.6 : 1 },
              ]}
              android_ripple={{ color: 'lightgrey' }}
              onPress={() => {
                data.isSelected = !data.isSelected;
                setPopularFilterList([...popularFilterList]);
              }}
            >
              <Icon
                name={data.isSelected ? 'check-box' : 'check-box-outline-blank'}
                size={25}
                color={data.isSelected ? '#DAA520' : 'lightgrey'}
              />
              <Text style={{ marginStart: 4, fontFamily: 'WorkSansRegular' }}>
                {data.titleTxt}
              </Text>
            </Pressable>
          </View>,
        );

        if (count < popularFilterList.length - 1) {
          count += 1;
        } else {
          break;
        }
      }
      noList.push(
        <View key={noList.length} style={{ flex: 1, flexDirection: 'row' }}>
          {listUI}
        </View>,
      );
    }

    return noList;
  };

  const checkAppPosition = (index) => {
    if (index === 0) {
      if (accomodationList[0].isSelected) {
        accomodationList.forEach((d) => (d.isSelected = false));
      } else {
        accomodationList.forEach((d) => (d.isSelected = true));
      }
    } else {
      accomodationList[index].isSelected = !accomodationList[index].isSelected;

      let count = 0;
      for (let i = 0; i < accomodationList.length; i++) {
        if (i !== 0) {
          const data = accomodationList[i];
          if (data.isSelected) {
            count += 1;
          }
        }
      }

      accomodationList[0].isSelected = count === accomodationList.length - 1;
    }

    setAccomodationList([...accomodationList]);
  };

  const getAccomodationListUI = () => {
    const noList = [];
    for (let i = 0; i < accomodationList.length; i++) {
      const data = accomodationList[i];
      noList.push(
        <View key={i} style={{ borderRadius: 4, overflow: 'hidden' }}>
          <Pressable
            style={({ pressed }) => [
              {
                flexDirection: 'row',
                padding: 12,
                opacity: !Config.isAndroid && pressed ? 0.6 : 1,
              },
            ]}
            android_ripple={{ color: 'lightgrey' }}
            onPress={() => checkAppPosition(i)}
          >
            <Text style={styles.switchText}>{data.titleTxt}</Text>
            <Switch
              value={data.isSelected}
              onValueChange={() => checkAppPosition(i)}
            />
          </Pressable>
        </View>,
      );
      if (i === 0) {
        noList.push(<View key="divider" style={styles.divider} />);
      }
    }
    return noList;
  };

  return (
    <Modal
      visible={showFilter}
      animationType="slide"
      transparent
      onRequestClose={() => setShowFilter(false)}
    >
      <StatusBar backgroundColor="white" />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', padding: 8 }}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Pressable
              style={({ pressed }) => [
                { padding: 8, opacity: !Config.isAndroid && pressed ? 0.6 : 1 },
              ]}
              onPress={() => setShowFilter(false)}
              android_ripple={{ color: 'grey', radius: 20, borderless: true }}
            >
              <Icon name="close" size={25} color="black" />
            </Pressable>
          </View>
          <Text style={styles.headerText}>Filtres</Text>
          <View style={{ flex: 1 }} />
        </View>
        <View style={styles.headerShadow} />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 16 }}
        >
          <Text style={styles.sectionTitle}>Prix </Text>
          <RangeSliderView />

          <View style={styles.divider} />
          <Text style={[styles.sectionTitle, { paddingVertical: 12 }]}>
            Filtres Populaires
          </Text>
          <View style={{ paddingHorizontal: 16 }}>{getPList()}</View>
          <View style={styles.divider} />

          <Text
            style={[styles.sectionTitle, { paddingTop: 16, paddingBottom: 24 }]}
          >
            Distance
          </Text>
          <SliderView />
          <View style={styles.divider} />

          <Text
            style={[styles.sectionTitle, { paddingTop: 16, paddingBottom: 8 }]}
          >
            Type
          </Text>
          <View style={{ paddingHorizontal: 16 }}>
            {getAccomodationListUI()}
          </View>
        </ScrollView>

        <View style={styles.divider} />
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { opacity: !Config.isAndroid && pressed ? 0.6 : 1 },
            ]}
            android_ripple={{ color: 'lighgrey' }}
            onPress={() => setShowFilter(false)}
          >
            <Text style={styles.buttonText}>Appliquer</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 22,
    fontFamily: 'WorkSansBold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  headerShadow: {
    height: Config.isAndroid ? 0.2 : 1,
    elevation: 4,
    backgroundColor: 'lightgrey',
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'lightgrey' },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'WorkSansRegular',
    color: 'darkgrey',
    paddingHorizontal: 16,
  },
  checkBoxBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    padding: 8,
  },
  switchText: {
    flex: 1,
    fontFamily: 'WorkSansRegular',
    alignSelf: 'center',
  },
  buttonContainer: {
    borderRadius: 24,
    margin: 16,
    marginTop: 8,
    elevation: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  button: {
    backgroundColor: '#DAA520',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'WorkSansMedium',
  },
});

FilterModal.propTypes = {
  showFilter: PropTypes.bool,
  setShowFilter: PropTypes.func,
};

export default FilterModal;
