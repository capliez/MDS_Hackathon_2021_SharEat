import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import IconVector from 'react-native-vector-icons/MaterialIcons';
import Config from '../../helpers/Config';
const ShowCart = ({
  cookCurrent,
  setIsClickAddCart,
  addCartByProduct,
  setQuantity,
  quantity,
  setShowCookDetail,
}) => {
  const total = quantity * cookCurrent.price;
  return (
    <View>
      <View style={{ alignSelf: 'flex-end' }}>
        <Pressable onPress={() => setIsClickAddCart(false)}>
          <IconVector size={25} name="close" />
        </Pressable>
      </View>
      <View style={{ alignItems: 'center', marginBottom: 15 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 22, paddingVertical: 15 }}>
            {cookCurrent.titleTxt}
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <IconVector
            color="#D3A756"
            style={{ marginRight: 4 }}
            size={20}
            name="query-builder"
          />
          <Text style={{ alignSelf: 'center' }}>18h30 - 20h00</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={{ alignItems: 'center', marginVertical: 30 }}>
        <Text style={{ fontSize: 16 }}>Confirmez la quantité</Text>
        <View style={{ flexDirection: 'row', marginTop: 25 }}>
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
            <IconVector color="white" size={30} name="remove" />
          </Pressable>
          <Text style={{ alignSelf: 'center', fontSize: 18 }}>{quantity}</Text>
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
            <IconVector color="white" size={30} name="add" />
          </Pressable>
        </View>
      </View>
      <View style={styles.divider} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 25,
        }}
      >
        <Text style={{ fontSize: 18 }}>Total</Text>
        <Text style={{ fontSize: 16 }}>{total.toLocaleString()}€</Text>
      </View>
      <View style={styles.divider} />
      <View style={{ alignItems: 'center', marginVertical: 25 }}>
        <Pressable style={{ textAlign: 'center' }}>
          <Text style={{ textAlign: 'center' }}>
            En achetant ce plat, vous acceptez les
          </Text>
          <Text
            style={{ textAlign: 'center', textDecorationLine: 'underline' }}
          >
            Conditions Générales d’Utilisation
          </Text>
          <Text style={{ textAlign: 'center' }}>de Shareat</Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 20,
        }}
      >
        <Pressable
          onPress={() => {
            setShowCookDetail(false);
            setIsClickAddCart(false);
          }}
          style={{
            backgroundColor: 'white',
            paddingVertical: 12,
            borderColor: 'black',
            borderWidth: 1,
            marginRight: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: 'black', fontSize: 18 }}>
            Continuer mes achats
          </Text>
        </Pressable>
        <Pressable
          onPress={() => quantity > 0 && addCartByProduct()}
          disabled={quantity > 0 ? false : true}
          style={{
            backgroundColor:
              quantity > 0 ? '#D3A756' : 'rgba(211, 167,86, 0.5)',
            paddingVertical: 12,
            paddingHorizontal: 14,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Payez</Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <Icon
          color="grey"
          style={{ marginHorizontal: 10 }}
          type="font-awesome-5"
          size={25}
          name="paypal"
        />
        <Icon
          style={{ marginHorizontal: 10 }}
          color="grey"
          type="font-awesome-5"
          size={25}
          name="apple"
        />
        <Icon
          style={{ marginHorizontal: 10 }}
          color="grey"
          type="font-awesome-5"
          size={25}
          name="cc-visa"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'lightgrey' },
});

ShowCart.propTypes = {
  cookCurrent: PropTypes.object,
  setIsClickAddCart: PropTypes.func,
  addCartByProduct: PropTypes.func,
  setQuantity: PropTypes.func,
  quantity: PropTypes.number,
  setShowCookDetail: PropTypes.func,
};

export default ShowCart;
