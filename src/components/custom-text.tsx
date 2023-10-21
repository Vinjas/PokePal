import React from 'react';
import { StyleSheet, Text } from 'react-native';

type CustomTextProps = {
  children: string;
  style?: any;
};

export const CustomText = ({
  children,
  style,
  ...props
}: CustomTextProps): JSX.Element => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: 'Poppins-Regular'
    }
  });

  return (
    <Text
      style={[styles.text, style]}
      {...props}
    >
      {children}
    </Text>
  );
};
