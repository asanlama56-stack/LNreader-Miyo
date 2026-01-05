import { useTheme } from '@hooks/persisted';
import React, { useState } from 'react';
import {
  Dimensions,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialDesignIconName } from '@type/icon';
import Animated, {
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import { Menu } from 'react-native-paper';

type Action = {
  icon: MaterialDesignIconName;
  title: string;
  onPress: () => void;
};

interface ActionbarProps {
  active: boolean;
  actions: Action[];
  viewStyle?: StyleProp<ViewStyle>;
}

export const Actionbar: React.FC<ActionbarProps> = ({
  active,
  actions,
  viewStyle,
}) => {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);

  if (!active) {
    return null;
  }

  const shownActions = actions.slice(0, 3);
  const overflowActions = actions.slice(3);

  return (
    <Animated.View
      entering={SlideInDown.duration(150)}
      exiting={SlideOutDown.duration(150)}
      style={[
        styles.actionbarContainer,
        {
          backgroundColor: theme.surface2,
          minHeight: 80 + bottom,
          paddingBottom: bottom,
        },
        viewStyle,
      ]}
    >
      {shownActions.map(({ icon, onPress }) => (
        <Pressable
          key={icon}
          android_ripple={{
            radius: 50,
            color: theme.rippleColor,
            borderless: true,
          }}
          style={styles.actionButton}
          onPress={onPress}
        >
          <MaterialCommunityIcons
            name={icon}
            color={theme.onSurface}
            size={24}
          />
        </Pressable>
      ))}
      {overflowActions.length > 0 ? (
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Pressable
              android_ripple={{
                radius: 50,
                color: theme.rippleColor,
                borderless: true,
              }}
              onPress={() => setMenuVisible(true)}
              style={styles.actionButton}
            >
              <MaterialCommunityIcons
                name="dots-vertical"
                color={theme.onSurface}
                size={24}
              />
            </Pressable>
          }
          contentStyle={{ backgroundColor: theme.surface2 }}
        >
          {overflowActions.map(({ title, onPress, icon }) => (
            <Menu.Item
              key={icon}
              onPress={() => {
                onPress();
                setMenuVisible(false);
              }}
              title={title}
              titleStyle={{ color: theme.onSurface }}
            />
          ))}
        </Menu>
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  actionbarContainer: {
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    bottom: 0,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  actionButton: {
    padding: 16,
  },
});
