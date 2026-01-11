import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Appbar, List } from '@components';
import { AboutScreenProps, MoreStackScreenProps } from '@navigators/types';
import { ThemeColors } from '@theme/types';

interface MoreHeaderProps {
  title: string;
  navigation:
    | AboutScreenProps['navigation']
    | MoreStackScreenProps['navigation'];
  theme: ThemeColors;
  goBack?: boolean;
}

export const MoreHeader = ({
  title,
  navigation,
  theme,
  goBack,
}: MoreHeaderProps) => (
  <>
    <Appbar
      title={title}
      handleGoBack={goBack ? navigation.goBack : undefined}
      mode="small"
      theme={theme}
    />
    <View style={styles.overflow}>
      <View style={[styles.logoContainer, { backgroundColor: theme.surface }]}>
        <View
          style={[
            styles.logo,
            { backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center' },
          ]}
        >
          <Text style={{ color: theme.onPrimary, fontSize: 36, fontWeight: '700' }}>M</Text>
        </View>
      </View>
    </View>
    <List.Divider theme={theme} />
  </>
);

const styles = StyleSheet.create({
  logo: {
    height: 90,
    width: 90,
  },
  logoContainer: {
    alignItems: 'center',
    paddingBottom: 24,
    paddingTop: 4,
  },
  overflow: {
    overflow: 'hidden',
    paddingBottom: 4,
  },
});
