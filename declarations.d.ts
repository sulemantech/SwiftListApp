declare module "*.svg" {
  import { FC } from "react";
  import Svg, { SvgProps } from "react-native-svg";
  const content: FC<SvgProps>;
  export default content;
  Svg: string;
}

declare module "*.png" {
  import { ImageSourcePropType } from "react-native";
  const content: ImageSourcePropType;
  export default content;
}
