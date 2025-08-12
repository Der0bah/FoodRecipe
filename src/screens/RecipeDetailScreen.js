import React, { useMemo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favoritesSlice';

export default function RecipeDetailScreen(props) {
  // The whole recipe object is passed in params
  const recipe = props.route?.params ?? {};
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // favorites state (assumes slice stores by id)
  const favorites = useSelector((s) => s.favorites?.items ?? []);
  const isFav = useMemo(
    () => favorites.some((f) => (f.idFood ?? f.id) === (recipe.idFood ?? recipe.id)),
    [favorites, recipe]
  );

  const onBack = () => navigation.goBack();
  const onToggleFavorite = () => dispatch(toggleFavorite(recipe));

  // Image source can be a local require (number) or a remote uri (string/object)
  const imageSource =
    typeof recipe.recipeImage === 'number'
      ? recipe.recipeImage
      : recipe.recipeImage?.uri
      ? recipe.recipeImage
      : { uri: recipe.recipeImage };

  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Image */}
      <View testID="imageContainer">
        <Image source={imageSource} style={styles.recipeImage} resizeMode="cover" />
      </View>

      {/* Header actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={onBack} style={styles.actionBtn} accessibilityRole="button">
          <Text style={styles.actionTxt}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onToggleFavorite}
          style={[styles.actionBtn, styles.favBtn]}
          accessibilityRole="button"
        >
          <Text style={styles.actionTxt}>{isFav ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      {/* Title & Category */}
      <View style={styles.metaWrap}>
        <Text testID="recipeTitle" style={styles.title}>
          {recipe.recipeName}
        </Text>
        <Text testID="recipeCategory" style={styles.category}>
          {recipe.category}
        </Text>
      </View>

      {/* Misc pills */}
      <View testID="miscContainer" style={styles.miscRow}>
        <View style={styles.miscItem}>
          <Text style={styles.miscIcon}>🕒</Text>
          <Text style={styles.miscText}>35 Mins</Text>
        </View>
        <View style={styles.miscItem}>
          <Text style={styles.miscIcon}>👥</Text>
          <Text style={styles.miscText}>03 Servings</Text>
        </View>
        <View style={styles.miscItem}>
          <Text style={styles.miscIcon}>🔥</Text>
          <Text style={styles.miscText}>103 Cal</Text>
        </View>
        <View style={styles.miscItem}>
          <Text style={styles.miscIcon}>🎚️</Text>
          <Text style={styles.miscText}>Medium</Text>
        </View>
      </View>

      {/* Ingredients */}
      <View testID="sectionContainer" style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View testID="ingredientsList" style={styles.ingredientsList}>
          {ingredients.length > 0 ? (
            ingredients.map((ing, idx) => (
              <View key={`${ing.name ?? 'ing'}-${idx}`} style={styles.ingredientItem}>
                <View style={styles.bullet} />
                <Text style={styles.ingredientText}>
                  {ing.name} {ing.measure ? `• ${ing.measure}` : ''}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.ingredientsEmpty}>No ingredients provided.</Text>
          )}
        </View>
      </View>

      {/* Instructions */}
      <View testID="sectionContainer" style={[styles.section, { paddingBottom: hp('6%') }]}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructionsText}>{recipe.recipeInstructions}</Text>
      </View>
    </ScrollView>
  );
}

const RADIUS = 24;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  recipeImage: {
    width: '100%',
    height: hp('32%'),
  },
  actionsRow: {
    position: 'absolute',
    top: hp('2%'),
    left: wp('2.5%'),
    right: wp('2.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  favBtn: { alignSelf: 'flex-end' },
  actionTxt: { fontWeight: '700', color: '#111827' },

  metaWrap: { paddingHorizontal: wp('4%'), paddingTop: hp('2%') },
  title: { fontSize: hp('3%'), fontWeight: '800', color: '#111827' },
  category: { marginTop: 2, color: '#6B7280' },

  miscRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: wp('4%'),
    marginTop: hp('2%'),
  },
  miscItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  miscIcon: { marginRight: 8, fontSize: 16 },
  miscText: { fontWeight: '600', color: '#111827' },

  section: { paddingHorizontal: wp('4%'), marginTop: hp('2.5%') },
  sectionTitle: { fontSize: hp('2.2%'), fontWeight: '800', color: '#111827', marginBottom: 10 },

  ingredientsList: { gap: 8 },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  bullet: {
    width: 8, height: 8, borderRadius: 999, backgroundColor: '#F59E0B', marginRight: 10,
  },
  ingredientText: { color: '#111827', fontWeight: '600' },
  ingredientsEmpty: { color: '#6B7280' },

  instructionsText: { color: '#374151', lineHeight: 20 },
});
