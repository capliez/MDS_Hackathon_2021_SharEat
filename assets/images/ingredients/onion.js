import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      height={40}
      width={40}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 472 472"
      {...props}
    >
      <Path
        d="M252 432h-32c-22.08.026-39.974 17.92-40 40h16a23.952 23.952 0 0117.128-22.872A23.659 23.659 0 00212 456v16h16v-16a8 8 0 0116 0v16h16v-16a23.653 23.653 0 00-1.128-6.872A23.952 23.952 0 01276 472h16c-.026-22.08-17.92-39.974-40-40z"
        fill="#763a02"
      />
      <Path
        d="M196 128a64 64 0 01-25.6 51.2l-53.336 40A122.664 122.664 0 0068 317.336C68 385.081 122.919 440 190.664 440h90.672C349.081 440 404 385.081 404 317.336a122.664 122.664 0 00-49.064-98.136l-53.336-40A64 64 0 01276 128h-80z"
        fill="#fcc78a"
      />
      <Path
        d="M212 128V96.568a78.626 78.626 0 00-23.032-55.6A57.943 57.943 0 01172 0a57.943 57.943 0 0140.968 16.968A105.943 105.943 0 01244 91.88V128h-32z"
        fill="#33bc00"
      />
      <Path
        d="M260 144v-31.432a78.626 78.626 0 0123.032-55.6A57.943 57.943 0 00300 16a57.943 57.943 0 00-40.968 16.968A105.943 105.943 0 00228 107.88V144h32z"
        fill="#008100"
      />
      <Path
        d="M364 326.864C364 389.347 313.347 440 250.864 440h-29.728C158.653 440 108 389.347 108 326.864a113.137 113.137 0 0133.136-80l36.92-36.92A115.882 115.882 0 00212 128h48c0 30.735 12.21 60.212 33.944 81.944l36.92 36.92a113.137 113.137 0 0133.136 80z"
        fill="#fadbb7"
      />
      <Path
        d="M159.448 377.24c7.296 36.493 39.337 62.761 76.552 62.76 37.215.001 69.256-26.267 76.552-62.76a147.007 147.007 0 00-19.488-106.744l-15.144-24.224A223.149 223.149 0 01244 128h-16a223.149 223.149 0 01-33.92 118.272l-15.144 24.224a147.007 147.007 0 00-19.488 106.744z"
        fill="#fce9cc"
      />
    </Svg>
  );
}

export default SvgComponent;
