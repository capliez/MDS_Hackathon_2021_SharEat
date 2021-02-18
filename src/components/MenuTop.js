import React from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AppImages } from '../../assets/images';
const MenuTop = () => {
  const marginTop = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  return (
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
          justifyContent: 'flex-end',
        }}
      >
        <Text style={{ fontSize: 18, fontFamily: 'WorkSansRegular' }}>
          Bonjour
        </Text>
        <Text
          style={{
            fontSize: 22,
            color: '#D3A756',
            fontFamily: 'WorkSansRegular',
          }}
        >
          Ilana Kaza
        </Text>
      </View>
      <View
        style={{
          marginTop,
        }}
      >
        <Image style={styles.img} source={AppImages.userProfil} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
});

export default MenuTop;
