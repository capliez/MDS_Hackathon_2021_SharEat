import { useFonts } from 'expo-font';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Config from '../../helpers/Config';
import DetailsCook from './details';
import ShowCart from './showCart';

const CookDetailScreen = ({
  showCookDetail,
  getCurrentCook,
  addFavoriteUser,
  getCarts,
  setShowCookDetail,
  addCartAction,
  getFavoriteCookUser,
  navigation,
}) => {
  const [loaded] = useFonts({
    WorkSansRegular: require('../../../assets/fonts/WorkSans-Regular.ttf'),
    WorkSansSemiBold: require('../../../assets/fonts/WorkSans-SemiBold.ttf'),
    WorkSansMedium: require('../../../assets/fonts/WorkSans-Medium.ttf'),
    WorkSansBold: require('../../../assets/fonts/WorkSans-Bold.ttf'),
  });
  const [quantity, setQuantity] = useState(0);
  const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
  const marginTop = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  const [isClickAddCart, setIsClickAddCart] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const quantityProduct = getCarts.filter(
      (c) => c.cook.id === getCurrentCook[0].id,
    );
    if (quantityProduct && quantityProduct.length > 0) {
      setQuantity(quantityProduct[0].quantity);
      setIsInCart(true);
    } else {
      setQuantity(0);
      setIsInCart(false);
      setIsClickAddCart(false);
    }
  }, [showCookDetail]);
  if (
    !getCurrentCook ||
    getCurrentCook[0] === undefined ||
    (getCurrentCook && !has.call(getCurrentCook[0], 'id'))
  ) {
    setShowCookDetail(false);
    return null;
  }
  const cookCurrent = getCurrentCook[0];

  if (!loaded) {
    return null;
  }

  const addCart = () => {
    setIsClickAddCart(true);
    setIsInCart(true);
    addCartAction(cookCurrent, quantity);
  };

  const addCartByProduct = () => {
    setIsClickAddCart(false);

    addCartAction(cookCurrent, quantity);
    setShowCookDetail(false);
    navigation.navigate('cart');
  };

  return (
    <Modal
      visible={showCookDetail}
      animationType="slide"
      transparent
      onRequestClose={() => {
        setShowCookDetail(false);
        setIsClickAddCart(false);
      }}
    >
      <StatusBar backgroundColor="white" />

      <ImageHeaderScrollView
        maxHeight={isClickAddCart ? 300 : 400}
        fadeOutForeground
        minHeight={180}
        style={{ borderRadius: 30 }}
        bouncesZoom={true}
        bounces={true}
        renderHeader={() => (
          <Image
            style={{
              resizeMode: 'cover',
              height: 400,
              width: Dimensions.get('window').width,
            }}
            source={cookCurrent.imagePath}
          />
        )}
        renderFixedForeground={() => (
          <View
            style={{
              flexDirection: 'row',
              padding: 8,
              marginTop,
              paddingVertical: 50,
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}
            >
              <Pressable
                style={({ pressed }) => [
                  {
                    padding: 8,
                    opacity: !Config.isAndroid && pressed ? 0.6 : 1,
                    backgroundColor: 'rgba(0,0,0, 0.4)',
                    borderRadius: 20,
                  },
                ]}
                onPress={() => {
                  setShowCookDetail(false);
                  setIsClickAddCart(false);
                }}
                android_ripple={{ color: 'grey', radius: 20, borderless: true }}
              >
                <Icon name="arrow-back" size={25} color="white" />
              </Pressable>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Pressable
                style={({ pressed }) => [
                  {
                    padding: 8,
                    opacity: !Config.isAndroid && pressed ? 0.6 : 1,
                    backgroundColor: 'rgba(0,0,0, 0.4)',
                    borderRadius: 20,
                  },
                ]}
                onPress={() => {
                  addFavoriteUser(cookCurrent);
                }}
                android_ripple={{ color: 'grey', radius: 20, borderless: true }}
              >
                <Icon
                  name={
                    getFavoriteCookUser &&
                    getFavoriteCookUser.includes(cookCurrent)
                      ? 'favorite'
                      : 'favorite-border'
                  }
                  size={25}
                  color="white"
                />
              </Pressable>
            </View>
            {isInCart && !isClickAddCart && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 10,
                  backgroundColor: 'rgba(34,139,34, 0.89)',
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ color: 'white' }}>
                  Cette commande t'attends, dépêche toi de payez :D
                </Text>
              </View>
            )}
          </View>
        )}
      >
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <TriggeringView>
            {!isClickAddCart ? (
              <DetailsCook cookCurrent={cookCurrent} />
            ) : (
              <ShowCart
                quantity={quantity}
                cookCurrent={cookCurrent}
                setQuantity={(q) => setQuantity(q)}
                addCartByProduct={() => addCartByProduct()}
                setIsClickAddCart={(v) => setIsClickAddCart(v)}
                setShowCookDetail={(v) => setShowCookDetail(v)}
              />
            )}
          </TriggeringView>
        </View>
      </ImageHeaderScrollView>
      {!isClickAddCart && (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
          <View style={styles.divider} />
          <View style={styles.buttonContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Pressable
                disabled={quantity > 0 ? false : true}
                style={({ pressed }) => [
                  {
                    opacity: !Config.isAndroid && pressed ? 0.6 : 1,
                    marginHorizontal: 10,
                    alignSelf: 'center',
                    borderRadius: 15,
                    backgroundColor:
                      quantity > 0 ? '#D3A756' : 'rgba(211, 167,86, 0.5)',
                  },
                ]}
                onPress={() => {
                  setQuantity(quantity > 0 ? quantity - 1 : 0);
                }}
                android_ripple={{ color: 'lighgrey' }}
              >
                <Icon color="white" size={30} name="remove" />
              </Pressable>
              <Text style={{ alignSelf: 'center', fontSize: 18 }}>
                {quantity}
              </Text>
              <Pressable
                disabled={quantity === cookCurrent.quantity}
                style={({ pressed }) => [
                  {
                    opacity: !Config.isAndroid && pressed ? 0.6 : 1,
                    backgroundColor:
                      quantity === cookCurrent.quantity
                        ? 'rgba(211, 167,86, 0.5)'
                        : '#D3A756',

                    alignSelf: 'center',
                    marginHorizontal: 10,
                    borderRadius: 15,
                  },
                ]}
                onPress={() => {
                  quantity <= cookCurrent.quantity && setQuantity(quantity + 1);
                }}
                android_ripple={{ color: 'lighgrey' }}
              >
                <Icon color="white" size={30} name="add" />
              </Pressable>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                {
                  opacity: !Config.isAndroid && pressed ? 0.6 : 1,
                  backgroundColor:
                    quantity > 0 ? '#D3A756' : 'rgba(211, 167,86, 0.5)',
                },
              ]}
              disabled={quantity > 0 ? false : true}
              onPress={() => {
                isInCart ? addCartByProduct() : addCart();
              }}
              android_ripple={{ color: 'lighgrey' }}
            >
              <Text style={styles.buttonText}>
                {isInCart ? 'Payez' : 'Ajouter au panier'}
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'lightgrey' },
  buttonContainer: {
    flexDirection: 'row',
    margin: 16,
    elevation: 8,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#D3A756',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'WorkSansMedium',
  },
});

CookDetailScreen.propTypes = {
  showCookDetail: PropTypes.bool,
  getCurrentCook: PropTypes.object,
  addFavoriteUser: PropTypes.func,
  getCarts: PropTypes.array,
  setShowCookDetail: PropTypes.func,
  addCartAction: PropTypes.func,
  getFavoriteCookUser: PropTypes.array,
  navigation: PropTypes.object,
};

export default CookDetailScreen;
