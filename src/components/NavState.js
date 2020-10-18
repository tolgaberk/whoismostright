export const NavigationActions = {
  navigate: 'NAVIGATE',
};
export const Screens = {
  HomeScreen: 'HOME_SCREEN',
};
export const initialState = {activeScreen: Screens.HomeScreen};

export function navStateReducer(state, action) {
  switch (action.payload) {
    case 'NAVIGATE':
      const {screen, navigationProps} = action.payload;
      return {
        ...state,
        activeScreen: screen,
        activeScreenDefaulProps: navigationProps,
      };

    default:
      return state;
  }
}
