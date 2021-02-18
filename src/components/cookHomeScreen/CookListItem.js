import { useFonts } from 'expo-font';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HotelListItem = ({
  data,
  setCookCurrentAction,
  lastPart,
  setShowCookDetail,
}) => {
  const { item, index } = data;
  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [loaded] = useFonts({
    WorkSansRegular: require('../../../assets/fonts/WorkSans-Regular.ttf'),
    WorkSansSemiBold: require('../../../assets/fonts/WorkSans-SemiBold.ttf'),
  });
  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay: index * (400 / 3),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay: index * (400 / 3),
        useNativeDriver: true,
      }),
    ]).start();
  });

  if (!loaded) {
    return null;
  }
  return (
    <Pressable
      onPress={() => {
        setCookCurrentAction(item);
        setShowCookDetail(true);
      }}
    >
      <Animated.View
        style={[styles.container, { opacity, transform: [{ translateY }] }]}
      >
        <View style={styles.imageContainer}>
          <Image
            style={{ height: 200, width: undefined }}
            source={item.imagePath}
            resizeMode="stretch"
          />

          <View
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              padding: 10,
              borderRadius: 10,
              backgroundColor: 'rgba(249,249,249, 0.55)',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'WorkSansSemiBold',
                color: 'white',
                textShadowColor: 'rgba(0,0,0, 0.5)',
                textShadowOffset: { width: 0.5, height: 0.5 },
                textShadowRadius: 1,
              }}
            >
              {item.price}€
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
          <View style={{ marginBottom: 10, flexDirection: 'row' }}>
            <Text style={styles.title}>{item.titleTxt}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 3,
              }}
            >
              <Icon color="#D3A756" size={16} name="location-pin" />
              <Text>{item.dist.toPrecision(2)} km</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flexDirection: 'row',
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F9F9F9',
                borderRadius: 4,
                padding: 4,
              }}
            >
              <Icon color="#D3A756" size={20} name="star-outline" />
              <Text>{item.rating}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F9F9F9',
                marginLeft: 3,
                borderRadius: 4,
                padding: 4,
              }}
            >
              <Icon
                color="#D3A756"
                style={{ marginRight: 4 }}
                size={20}
                name="query-builder"
              />
              <Text>18h30 - 20h00</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F9F9F9',
                marginLeft: 3,
                borderRadius: 4,
                padding: 4,
              }}
            >
              <Icon
                style={{ marginRight: 2 }}
                color="#D3A756"
                size={20}
                name="restaurant"
              />
              <Text>
                {item.quantity > 1
                  ? item.quantity + ' parts'
                  : item.quantity + ' part'}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const textStyle = {
  fontFamily: 'WorkSansSemiBold',
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 12,
    marginHorizontal: 24,
    borderRadius: 16,
    // overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  imageContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  title: { fontSize: 16 },
  subText: {
    ...textStyle,
    flex: 1,
    paddingRight: 4,
  },
  perNightText: { ...textStyle },
  badgeText: {
    ...textStyle,
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
  },
});

HotelListItem.propTypes = {
  data: PropTypes.object,
  setCookCurrentAction: PropTypes.func,
  setShowCookDetail: PropTypes.func,
};

export default HotelListItem;
