import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { adaptiveColor, setAlphaColor } from './util';
import type { ItemType, IViuPickerProps, RenderItemProps } from './types';
import * as Haptics from 'expo-haptics';
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from '@gorhom/bottom-sheet';

const WheelPickerExpo: React.FC<IViuPickerProps> = ({
  items = [],
  backgroundColor = '#FFFFFF',
  width = 150,
  haptics = false,
  height,
  initialSelectedIndex = 0,
  flatListProps,
  selectedStyle,
  renderItem,
  onChange,
}) => {
  const flatListRef = useRef<BottomSheetFlatListMethods>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [itemHeight, setItemHeight] = useState(40);
  const [listHeight, setListHeight] = useState(200);
  const [data, setData] = useState<ItemType[]>([]);
  const userTouch = useRef(false);

  const bgColor = setAlphaColor(backgroundColor, 1);

  useEffect(() => {
    const additionalItem = { label: '', value: null };
    const newData = [
      additionalItem,
      additionalItem,
      ...items,
      additionalItem,
      additionalItem,
    ] as ItemType[];

    const calculatedHeight = height || 200;
    const calculatedItemHeight = calculatedHeight / 5;

    setData(newData);
    setListHeight(calculatedHeight);
    setItemHeight(calculatedItemHeight);
  }, [items, height]);

  const gradientColor = Platform.select({
    ios: setAlphaColor(bgColor, 0.2),
    android: setAlphaColor(bgColor, 0.4),
    web: setAlphaColor(bgColor, 0.4),
  }) as string;

  const gradientContainerStyle = [
    { height: 2 * itemHeight, borderColor: selectedStyle?.borderColor },
    styles.gradientContainer,
  ];

  const handleOnSelect = useCallback(
    (index: number) => {
      const selected = Math.abs(index);

      if (selected >= 0 && selected < items.length) {
        if (
          haptics &&
          userTouch.current &&
          selected !== selectedIndex
        ) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }

        setSelectedIndex(selected);
        onChange?.({ index: selected, item: items[selected] });
      }
    },
    [haptics, items, onChange, selectedIndex]
  );

  const handleOnPressItem = (index: number) => {
    if (index >= 0 && index < items.length) {
      flatListRef.current?.scrollToIndex({ index: index + 2, animated: true });
    }
  };

  if (!data.length) return null;

  return (
    <View
      style={{
        height: listHeight,
        width,
        backgroundColor: bgColor,
      }}
    >
      <BottomSheetFlatList
        ref={flatListRef}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={(options) =>
          PickerItem(
            options,
            selectedIndex,
            {
              ...styles.listItem,
              backgroundColor: bgColor,
              fontSize: 14,
              height: itemHeight,
            },
            handleOnPressItem,
            renderItem as any
          )
        }
        onTouchStart={(e) => {
          userTouch.current = true;
          flatListProps?.onTouchStart?.(e);
        }}
        onMomentumScrollEnd={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.y / itemHeight
          );
          handleOnSelect(index);
        }}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: index * itemHeight,
          index,
        })}
        snapToInterval={itemHeight}
        initialScrollIndex={initialSelectedIndex}
        {...flatListProps}
      />

      <View
        style={[
          gradientContainerStyle,
          styles.topGradient,
          { borderBottomWidth: selectedStyle?.borderWidth },
        ]}
        pointerEvents="none"
      >
        <LinearGradient
          style={styles.linearGradient}
          colors={[bgColor, gradientColor]}
        />
      </View>

      <View
        style={[
          gradientContainerStyle,
          styles.bottomGradient,
          { borderTopWidth: selectedStyle?.borderWidth },
        ]}
        pointerEvents="none"
      >
        <LinearGradient
          style={styles.linearGradient}
          colors={[gradientColor, bgColor]}
        />
      </View>
    </View>
  );
};

const Item = React.memo(
  ({ fontSize, label, fontColor, textAlign }: RenderItemProps) => (
    <Text style={{ fontSize, color: fontColor, textAlign }}>{label}</Text>
  )
);

const PickerItem = (
  { item, index }: any,
  indexSelected: number,
  style: any,
  onPress: (index: number) => void,
  renderItem: (props: RenderItemProps) => JSX.Element
) => {
  const gap = Math.abs(index - (indexSelected + 2));
  const sizeText = [style.fontSize, style.fontSize * 0.95, style.fontSize * 0.85];

  const fontSize = gap > 1 ? sizeText[2] : sizeText[gap];
  // const fontColor = adaptiveColor(style.backgroundColor);
  const fontColor = gap === 0 ? '#A9A0F0' : '#000'; // example colors

  const textAlign = 'center';

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => onPress(index - 2)}>
      <View style={style}>
        {typeof renderItem === 'function' &&
          renderItem({ fontSize, fontColor, label: item.label, textAlign })}
        {!renderItem && (
          <Item
            fontSize={fontSize}
            fontColor={fontColor}
            textAlign={textAlign}
            label={item.label}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientContainer: {
    position: 'absolute',
    width: '100%',
  },
  linearGradient: { flex: 1 },
  topGradient: { top: 0 },
  bottomGradient: { bottom: 0 },
});

export default WheelPickerExpo;
