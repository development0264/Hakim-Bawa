import React, { FC, useContext, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import defaultStyles from 'src/styles/defaultStyles';
import { Text, ThemeContext } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  iconName: string;
  title: string;
  TextComponent: ReactNode;
}
const CardSmall: FC<Props> = ({ iconName, title, TextComponent }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText}>{title}</Text>
        <Icon name={iconName} color={theme.colors?.primary} size={20} />
      </View>
      <View style={styles.bottom}>{TextComponent}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 80,
    width: 100,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    ...defaultStyles.raised,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topText: {
    fontSize: 10,
  },
  bottom: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
export default CardSmall;
