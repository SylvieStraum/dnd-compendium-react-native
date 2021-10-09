import Colors from '../constants/Colors'
import useColorScheme from './useColorScheme'

export interface Theme {
  theme: 'light' | 'dark'
  colors: typeof Colors.light & typeof Colors.dark
}

export function useTheme(): Theme {
  const theme = useColorScheme();

  switch (theme) {
    case 'light':
      return {
        theme: 'light',
        colors: Colors.light,
      }
    case 'dark':
      return {
        theme: 'dark',
        colors: Colors.dark,
      }
  }
}
