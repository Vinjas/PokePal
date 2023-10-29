import { Colors, LogoColors, StatsColors } from '@constants/styles/colors';
import { AppThemeContext } from 'context/app-theme-context';
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Rect } from 'react-native-svg';

export const StatsBarTotalChart = ({ stat }: { stat: number }) => {
  const maxStatValue = 720; // Maximum value for the stats
  const barHeight = 5; // Height of the bar

  const { isDarkMode } = useContext(AppThemeContext);

  const barWidth = (stat / maxStatValue) * 100;
  const x = 0;
  const y = 0;

  const styles = StyleSheet.create({
    wrapper: {
      width: '60%',
      marginHorizontal: 15,
      borderRadius: 2,
      marginTop: 8
    },
    wrapperDark: {
      backgroundColor: LogoColors.darkerBlue
    },
    wrapperLight: {
      backgroundColor: LogoColors.lightBlue
    }
  });

  return (
    <View style={[styles.wrapper, isDarkMode ? styles.wrapperDark : styles.wrapperLight]}>
      <Svg
        width={'100%'}
        height={barHeight}
      >
        <Rect
          x={x}
          y={y}
          rx={2}
          width={barWidth + '%'}
          height={barHeight}
          fill={StatsColors.blue}
        />
      </Svg>
    </View>
  );
};
