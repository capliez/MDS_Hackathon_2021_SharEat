import PropTypes from 'prop-types';
import React from 'react';
import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
const MenuBotom = ({
  getCarts,
  nbFavoriteCookUser,
  navigation,
  isHome,
  isOrder,
}) => {
  const marginTop = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  return (
    <>
      <View style={styles.divider} />

      <View
        style={{
          marginTop,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Pressable
            style={{ alignItems: 'center' }}
            onPress={() => navigation.navigate('home')}
          >
            <Icon
              color={isHome ? 'black' : '#939393'}
              size={25}
              name="explore"
            />

            <Text style={{ fontSize: 14, fontFamily: 'WorkSansRegular' }}>
              Découvrir
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {nbFavoriteCookUser > 0 && (
            <Badge
              value={nbFavoriteCookUser}
              badgeStyle={{ backgroundColor: '#D3A756' }}
              containerStyle={{
                position: 'absolute',
                top: -4,
                right: 2,
                zIndex: 10,
              }}
            />
          )}
          <Icon color="#939393" size={25} name="favorite-border" />

          <Text style={{ fontSize: 14, fontFamily: 'WorkSansRegular' }}>
            Favoris
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Pressable
            style={{ alignItems: 'center' }}
            onPress={() => navigation.navigate('cart')}
          >
            {getCarts.length > 0 && (
              <Badge
                value={getCarts.length}
                badgeStyle={{ backgroundColor: '#D3A756' }}
                containerStyle={{
                  position: 'absolute',
                  top: -4,
                  right: 26,
                  zIndex: 10,
                }}
              />
            )}
            <Icon
              color={isOrder ? 'black' : '#939393'}
              size={25}
              name="shopping-bag"
            ></Icon>

            <Text style={{ fontSize: 14, fontFamily: 'WorkSansRegular' }}>
              Commandes
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Icon color="#939393" size={25} name="more-horiz" />

          <Text style={{ fontSize: 14, fontFamily: 'WorkSansRegular' }}>
            Plus
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'lightgrey' },
});

MenuBotom.propTypes = {
  getCarts: PropTypes.array,
  nbFavoriteCookUser: PropTypes.number,
  navigation: PropTypes.object,
  isHome: PropTypes.bool,
  isOrder: PropTypes.bool,
};

export default MenuBotom;
