import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function MenuIcon(props) {
  return (
    <Svg height={24} width={24} viewBox="0 0 24 24" {...props}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path
        fill={props.color}
        d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
      />
    </Svg>
  );
}

export default MenuIcon;
