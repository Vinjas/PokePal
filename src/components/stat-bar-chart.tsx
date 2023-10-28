import { Colors } from '@constants/styles/colors';
import { AppThemeContext } from 'context/app-theme-context';
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Rect } from 'react-native-svg';

export const StatsBarChart = ({ stat, color }: { stat: number; color: string }) => {
  const maxStatValue = 255; // Maximum value for the stats
  const barHeight = 7; // Height of the bar

  const { isDarkMode } = useContext(AppThemeContext);

  const barWidth = (stat / maxStatValue) * 100;
  const x = 0;
  const y = 0;

  const styles = StyleSheet.create({
    wrapper: {
      width: '60%',
      marginHorizontal: 15,
      borderRadius: 3,
      marginTop: 8
    },
    wrapperDark: {
      backgroundColor: Colors.darkGrey1
    },
    wrapperLight: {
      backgroundColor: Colors.ligthGrey1
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
          rx={3}
          width={barWidth + '%'}
          height={barHeight}
          fill={color}
        />
      </Svg>
    </View>
  );
};
