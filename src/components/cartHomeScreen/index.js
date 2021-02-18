import { useFonts } from 'expo-font';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import MenuBottom from '../MenuBottom';
const CartHomeScreen = ({
  getCarts,
  navigation,
  getCooks,
  getFavoriteCookUser,
}) => {
  const [loaded] = useFonts({
    WorkSansRegular: require('../../../assets/fonts/WorkSans-Regular.ttf'),
    WorkSansSemiBold: require('../../../assets/fonts/WorkSans-SemiBold.ttf'),
    WorkSansMedium: require('../../../assets/fonts/WorkSans-Medium.ttf'),
    WorkSansBold: require('../../../assets/fonts/WorkSans-Bold.ttf'),
  });
  const marginTop = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  const { width: viewportWidth } = Dimensions.get('window');
  let total = 0;
  function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  }
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9F9F9', marginTop }}>
      <View style={{ alignSelf: 'center', marginVertical: 20 }}>
        <Text style={{ fontSize: 20 }}>Commandes</Text>
      </View>
      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 20 }}>En cours </Text>
      </View>
      <ScrollView
        style={{
          marginBottom: 20,
          height: wp(50),
        }}
      >
        {getCarts.length > 0 ? (
          getCarts.map((c) => (
            <View
              key={c.cook.id}
              style={{
                flexDirection: 'row',
                display: 'flex',
                marginHorizontal: 20,
                marginVertical: 6,
              }}
            >
              <View style={{ marginRight: 10, alignContent: 'flex-end' }}>
                <Image
                  style={{
                    resizeMode: 'cover',
                    height: 80,
                    borderRadius: 10,
                    width: 100,
                  }}
                  source={c.cook.imagePath}
                />
              </View>
              <View style={{ alignSelf: 'center', flex: 1 }}>
                <Text numberOfLines={1} style={{ fontSize: 16 }}>
                  {c.cook.titleTxt}
                </Text>
                <Text>Quantité: {c.quantity}</Text>

                <Text>Prix: {c.cook.price}€</Text>
                <Pressable>
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      color: '#DAA520',
                    }}
                  >
                    Voir l'adresse
                  </Text>
                </Pressable>
              </View>
              <View style={{ alignSelf: 'center' }}>
                <Pressable
                  style={{
                    backgroundColor: '#DAA520',
                    paddingHorizontal: 12,
                    borderRadius: 6,
                    paddingVertical: 8,
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 16 }}>Détails</Text>
                </Pressable>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ marginHorizontal: 25, fontSize: 16, color: 'grey' }}>
            Aucune commande en cours
          </Text>
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 16,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 20 }}>Total à payer:</Text>
        <Text style={{ fontSize: 18 }}>
          {getCarts.length > 0 &&
            getCarts.map((a) => {
              total = a.quantity * a.cook.price + total;
            })}
          {total.toLocaleString()}€
        </Text>
      </View>
      <View style={styles.divider} />

      <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 20 }}>Terminés</Text>
      </View>
      <ScrollView>
        {getCooks.length > 0 ? (
          getCooks.map(
            (c) =>
              c.isPay && (
                <View
                  key={c.id}
                  style={{
                    flexDirection: 'row',
                    display: 'flex',
                    marginHorizontal: 20,
                    marginVertical: 6,
                  }}
                >
                  <View style={{ marginRight: 10, alignContent: 'flex-end' }}>
                    <Image
                      style={{
                        resizeMode: 'cover',
                        height: 80,
                        borderRadius: 10,
                        width: 100,
                      }}
                      source={c.imagePath}
                    />
                  </View>
                  <View style={{ alignSelf: 'center', flex: 1 }}>
                    <Text numberOfLines={1} style={{ fontSize: 16 }}>
                      {c.titleTxt}
                    </Text>
                    <Text>Quantité: {c.quantity}</Text>
                    <Text>Prix: {c.price}€</Text>
                    <Pressable>
                      <Text
                        style={{
                          textDecorationLine: 'underline',
                          color: '#DAA520',
                        }}
                      >
                        Voir l'adresse
                      </Text>
                    </Pressable>
                  </View>
                  <View style={{ alignSelf: 'center' }}>
                    <Pressable
                      style={{
                        backgroundColor: '#DAA520',
                        paddingHorizontal: 12,
                        borderRadius: 6,
                        paddingVertical: 8,
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: 16 }}>
                        Détails
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ),
          )
        ) : (
          <Text style={{ marginHorizontal: 25, fontSize: 16, color: 'grey' }}>
            Aucune commande passé pour le moment
          </Text>
        )}
      </ScrollView>
      <MenuBottom
        nbFavoriteCookUser={getFavoriteCookUser.length}
        isOrder={true}
        getCarts={getCarts}
        navigation={navigation}
      />
      <StatusBar backgroundColor="white" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'lightgrey' },
});
const mapStateToProps = ({ Cart, Cooks, User }) => {
  const { all: getCarts } = Cart;
  const { all: getCooks } = Cooks;
  const { favoriteCook: getFavoriteCookUser } = User;

  return {
    getCarts,
    getCooks,
    getFavoriteCookUser,
  };
};

CartHomeScreen.propTypes = {
  getCarts: PropTypes.array,
  navigation: PropTypes.object,
  getCooks: PropTypes.array,
  getFavoriteCookUser: PropTypes.array,
};

export default connect(mapStateToProps, null)(CartHomeScreen);
