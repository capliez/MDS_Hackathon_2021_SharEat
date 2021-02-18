import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../../../assets/images';
import { comments, getIngredients } from './data';
const { width: viewportWidth } = Dimensions.get('window');

const sliderWidth = viewportWidth;

const DetailsCook = ({ cookCurrent }) => {
  const carouselref = useRef(null);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 20 }}>{cookCurrent.titleTxt}</Text>
        <Text style={{ fontSize: 20, color: '#2CA500' }}>
          {cookCurrent.price}€
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
          }}
        >
          <Icon color="#D3A756" size={20} name="star-outline" />
          <Text style={{ alignSelf: 'center' }}>{cookCurrent.rating}</Text>
        </View>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            marginLeft: 10,
          }}
        >
          <Icon color="#D3A756" size={16} name="location-pin" />
          <Text style={{ alignSelf: 'center' }}>
            {cookCurrent.dist.toPrecision(2)} km
          </Text>
        </View>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            marginLeft: 10,
          }}
        >
          <Icon
            color="#D3A756"
            style={{ marginRight: 4 }}
            size={20}
            name="query-builder"
          />
          <Text style={{ alignSelf: 'center' }}>18h30 - 20h00</Text>
        </View>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 15 }}>Détails</Text>
        <Text style={{ color: '#939393', marginVertical: 10, fontSize: 14 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={{ fontSize: 15 }}>Ingrédients</Text>

        <Carousel
          ref={carouselref}
          data={getIngredients}
          renderItem={(data) => (
            <View
              style={{
                borderRadius: 10,
                backgroundColor: data.item.color,
                alignItems: 'center',
                paddingVertical: 5,
                marginTop: 10,
              }}
              key={data.item.id}
            >
              {data.item.image}
            </View>
          )}
          sliderWidth={sliderWidth}
          itemWidth={60}
          loop={true}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 15, paddingVertical: 5 }}>Profil</Text>
        <View
          style={{
            backgroundColor: '#F0F0F0',
            borderRadius: 10,
            paddingVertical: 16,
            paddingHorizontal: 14,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image style={styles.img} source={AppImages.userImage} />
            <View style={{ marginLeft: 10, alignSelf: 'center' }}>
              <Text style={{ fontSize: 15 }}>Justine</Text>

              <View style={{ flexDirection: 'row' }}>
                <Icon color="#D3A756" size={20} name="star-outline" />
                <Text size={styles.badgeText}>4.8</Text>
              </View>
            </View>
          </View>
          <View style={{ alignSelf: 'center' }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#D3A756',
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: 'white' }}>Détails</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 15, marginBottom: 10 }}>
          Commentaires ({comments.length})
        </Text>
        {comments.map((c) => (
          <View
            key={c.id}
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 6,
            }}
          >
            <View>
              <Image style={styles.userComment} source={c.profil} />
            </View>
            <View
              style={{
                backgroundColor: '#F0F0F0',
                marginVertical: 5,
                borderTopRightRadius: 10,
                marginHorizontal: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              <Text
                style={{
                  marginBottom: 6,
                  fontSize: 15,
                  fontWeight: '600',
                }}
              >
                {c.name}
              </Text>
              <Text>{c.message}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};
const textStyle = {
  color: 'rgba(128,128,128, 0.46)',
  fontFamily: 'WorkSansRegular',
};
const styles = StyleSheet.create({
  slider: {
    marginTop: 10,
    overflow: 'visible',
  },
  sliderContentContainer: {
    paddingVertical: 10,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  userComment: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  badgeText: {
    ...textStyle,
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
  },
});
DetailsCook.propTypes = {
  cookCurrent: PropTypes.object,
};

export default DetailsCook;
