import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      height={40}
      width={40}
      viewBox="0 0 331.339 331.339"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M286.51 189.056c0 67.708-29.624 113.12-72.076 132.104a117.87 117.87 0 01-48.764 10.176c-66.736 0-120.84-50.8-120.84-142.28S98.95 0 165.67 0a80.277 80.277 0 0148.764 17.972c42.451 32.352 72.076 103.376 72.076 171.084z"
        fill="#f7ecd0"
      />
      <Circle cx={165.67} cy={202.7} fill="#f7c452" r={69.316} />
    </Svg>
  );
}

export default SvgComponent;
