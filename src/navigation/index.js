import React, { useRef } from 'react';
import { Platform } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import MyRecipeScreen from '../screens/MyRecipeScreen';
import CustomRecipesScreen from '../screens/CustomRecipesScreen'; // ✅ fixed import
import RecipesFormScreen from '../screens/RecipesFormScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';

/** ROUTE NAMES (single source of truth) */
export const ROUTES = {
  WELCOME: 'Welcome',
  HOME: 'Home',
  MY_RECIPES: 'MyRecipes',
  CUSTOM_RECIPES: 'CustomRecipesScreen', // ✅ matches your navigate() calls
  RECIPES_FORM: 'RecipesForm',
  FAVORITES: 'Favorites',
  RECIPE_DETAIL: 'RecipeDetail',
};

/** (Optional) JSDoc route params to help autocomplete in editors
 * @typedef {Object} RootStackParamList
 * @property {undefined} Welcome
 * @property {undefined} Home
 * @property {{ userId?: string }} MyRecipes
 * @property {{ campaignId?: string }} CustomRecipesScreen
 * @property {{ draftId?: string }} RecipesForm
 * @property {undefined} Favorites
 * @property {{ id: string }} RecipeDetail
 */

/** Navigation ref + helpers so you can navigate from anywhere */
export const navigationRef = createNavigationContainerRef();
/** @param {keyof typeof ROUTES} name @param {object=} params */
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
export function resetTo(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.reset({ index: 0, routes: [{ name, params }] });
  }
}

/** Deep linking config (foodie://recipe/123, https links, etc.) */
const linking = {
  prefixes: ['foodie://', 'https://foodie.app', 'https://www.foodie.app'],
  config: {
    screens: {
      [ROUTES.WELCOME]: 'welcome',
      [ROUTES.HOME]: 'home',
      [ROUTES.MY_RECIPES]: 'my-recipes',
      [ROUTES.CUSTOM_RECIPES]: 'custom',
      [ROUTES.RECIPES_FORM]: 'submit',
      [ROUTES.FAVORITES]: 'favorites',
      [ROUTES.RECIPE_DETAIL]: 'recipe/:id',
      NotFound: '*',
    },
  },
};

/** Slight theme polish to match the Welcome screen palette */
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
};

const Stack = createNativeStackNavigator();

/** Unified Root Navigator */
export default function RootNavigation() {
  const routeNameRef = useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      theme={AppTheme}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute()?.name;
      }}
      onStateChange={() => {
        const current = navigationRef.getCurrentRoute();
        const previous = routeNameRef.current;
        if (!current) return;

        if (previous !== current.name) {
          // analytics hook if needed
        }
        routeNameRef.current = current.name;
      }}
    >
      <Stack.Navigator
        initialRouteName={ROUTES.WELCOME}
        screenOptions={{
          headerShown: false,
          animation: Platform.OS === 'android' ? 'slide_from_right' : 'default',
        }}
      >
        <Stack.Screen name={ROUTES.WELCOME} component={WelcomeScreen} />
        <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
        <Stack.Screen name={ROUTES.MY_RECIPES} component={MyRecipeScreen} />
        <Stack.Screen name={ROUTES.CUSTOM_RECIPES} component={CustomRecipesScreen} />
        <Stack.Screen name={ROUTES.RECIPES_FORM} component={RecipesFormScreen} />
        <Stack.Screen name={ROUTES.FAVORITES} component={FavoriteScreen} />
        <Stack.Screen
          name={ROUTES.RECIPE_DETAIL}
          component={RecipeDetailScreen}
          options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

