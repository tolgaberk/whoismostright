import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function RemoveIcon(props) {
  return (
    <Svg height={24} viewBox="0 0 24 24" width={24} {...props}>
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path
        fill={props.color}
        d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z"
      />
    </Svg>
  );
}

export default RemoveIcon;
