import { useFonts } from 'expo-font';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { cartAdd } from '../../redux/cart/action';
import { setCookCurrent } from '../../redux/cook/action';
import { addFavoriteUser } from '../../redux/user/action';
import CookDetailModal from '../cookDetailScreen';
import MenuBottom from '../MenuBottom';
import MenuTop from '../MenuTop';
import CookListItem from './CookListItem';

const { width: viewportWidth } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(80);
const itemHorizontalMargin = wp(2);
const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;
const CookHomeScreen = ({
  getCooks,
  addCartAction,
  getCarts,
  setCookCurrentAction,
  getCurrentCook,
  addFavoriteUserAction,
  getFavoriteCookUser,
  navigation,
  getCooksLast,
}) => {
  const [search, setSearch] = useState('');

  const [showCart, setShowCart] = useState(false);
  const [showCookDetail, setShowCookDetail] = useState(false);

  const [loaded] = useFonts({
    WorkSansRegular: require('../../../assets/fonts/WorkSans-Regular.ttf'),
    WorkSansSemiBold: require('../../../assets/fonts/WorkSans-SemiBold.ttf'),
  });
  const carouselref = useRef(null);
  const carouselref2 = useRef(null);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <MenuTop
          setShowCart={(v) => setShowCart(v)}
          nbProduct={getCarts.length}
        />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <TextInput
            style={styles.searchInput}
            placeholder="Que désirez vous manger"
            value={search}
            editable
            onChangeText={(text) => setSearch(text)}
            selectionColor="#DAA520"
          />
        </View>
        <ScrollView scrollEventThrottle={200} directionalLockEnabled={true} a>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: '#000000',
                fontFamily: 'WorkSansRegular',
              }}
            >
              Autour de vous
            </Text>
            <Pressable>
              <Text
                style={{
                  fontSize: 15,
                  color: '#D3A756',
                  textDecorationLine: 'underline',
                  fontFamily: 'WorkSansRegular',
                }}
              >
                Voir plus
              </Text>
            </Pressable>
          </View>

          <View>
            <Carousel
              ref={carouselref}
              data={getCooksLast}
              renderItem={(data) => (
                <CookListItem
                  key={data.item.id}
                  getCurrentCook={getCurrentCook}
                  setCookCurrentAction={(i) => setCookCurrentAction(i, true)}
                  setShowCart={(v) => setShowCart(v)}
                  setShowCookDetail={(v) => setShowCookDetail(v)}
                  getCarts={getCarts}
                  {...{ data }}
                />
              )}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              inactiveSlideScale={0.95}
              loop={true}
              inactiveSlideOpacity={1}
              enableMomentum={true}
              activeSlideAlignment={'start'}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              activeAnimationType={'spring'}
              activeAnimationOptions={{
                friction: 4,
                tension: 40,
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: '#000000',
                fontFamily: 'WorkSansRegular',
              }}
            >
              Derniers part
            </Text>
            <Pressable>
              <Text
                style={{
                  fontSize: 15,
                  color: '#D3A756',
                  textDecorationLine: 'underline',
                  fontFamily: 'WorkSansRegular',
                }}
              >
                Voir plus
              </Text>
            </Pressable>
          </View>

          <View>
            <Carousel
              ref={carouselref2}
              data={getCooks}
              renderItem={(data) => (
                <CookListItem
                  key={data.item.id}
                  getCurrentCook={getCurrentCook}
                  setCookCurrentAction={(i) => setCookCurrentAction(i, false)}
                  setShowCart={(v) => setShowCart(v)}
                  setShowCookDetail={(v) => setShowCookDetail(v)}
                  getCarts={getCarts}
                  {...{ data }}
                  addCartAction={(item) => addCartAction(item)}
                />
              )}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              inactiveSlideScale={0.95}
              loop={true}
              inactiveSlideOpacity={1}
              enableMomentum={true}
              activeSlideAlignment={'start'}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              activeAnimationType={'spring'}
              activeAnimationOptions={{
                friction: 4,
                tension: 40,
              }}
            />
          </View>
        </ScrollView>
        <MenuBottom
          nbFavoriteCookUser={getFavoriteCookUser.length}
          getCarts={getCarts}
          setShowCart={(v) => setShowCart(v)}
          navigation={navigation}
          isHome={true}
        />
      </SafeAreaView>

      <CookDetailModal
        addCartAction={(c, q) => addCartAction(c, q)}
        setShowCart={(v) => setShowCart(v)}
        getCarts={getCarts}
        navigation={navigation}
        showCookDetail={showCookDetail}
        getFavoriteCookUser={getFavoriteCookUser}
        addFavoriteUser={(c) => addFavoriteUserAction(c)}
        getCurrentCook={getCurrentCook}
        setShowCookDetail={(v) => setShowCookDetail(v)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,

    color: '#939393',
    fontSize: 18,
  },
  slider: {
    marginTop: 10,
    overflow: 'visible',
  },
  sliderContentContainer: {
    paddingVertical: 10,
  },
});

const mapStateToProps = ({ Cooks, Cart, User }) => {
  const {
    all: getCooks,
    lastpart: getCooksLast,
    current: getCurrentCook,
  } = Cooks;
  const { all: getCarts } = Cart;
  const { favoriteCook: getFavoriteCookUser } = User;
  return {
    getCooks,
    getCarts,
    getCurrentCook,
    getFavoriteCookUser,
    getCooksLast,
  };
};

const mapDispatchToProps = {
  addCartAction: cartAdd,
  setCookCurrentAction: setCookCurrent,
  addFavoriteUserAction: addFavoriteUser,
};

CookHomeScreen.propTypes = {
  getCooks: PropTypes.array,
  addCartAction: PropTypes.func,
  getCarts: PropTypes.array,
  setCookCurrentAction: PropTypes.func,
  getCurrentCook: PropTypes.object,
  addFavoriteUserAction: PropTypes.func,
  getFavoriteCookUser: PropTypes.array,
  navigation: PropTypes.object,
  getCooksLast: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(CookHomeScreen);
