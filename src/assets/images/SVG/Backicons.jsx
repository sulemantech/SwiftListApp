import * as React from 'react';
const BackIcon = props => (
  <svg width={20} height={13} fill="none" {...props}>
    <path fill="url(#a)" d="M0 0h20v13H0z" />
    <defs>
      <pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox">
        <use xlinkHref="#b" transform="matrix(.01275 0 0 .0196 -.003 0)" />
      </pattern>
      <image id="b" width={79} height={51} />
    </defs>
  </svg>
);
export default BackIcon;
