import * as React from 'react';
import {Path, Svg} from 'react-native-svg';

function BackIcon(props) {
  return (
    <Svg height={24} width={24} {...props}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path
        fill={props.color}
        d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
      />
    </Svg>
  );
}

export default BackIcon;
