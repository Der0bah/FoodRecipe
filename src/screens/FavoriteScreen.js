import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ROUTES } from '../navigation'; // or replace with 'RecipeDetail'

export default function FavoriteScreen() {
  const navigation = useNavigation();
  const favoriteRecipesList =
    useSelector((s) => s.favorites?.favoriterecipes) ?? [];

  const renderCard = ({ item }) => {
    const imgSrc =
      typeof item.recipeImage === 'number'
        ? item.recipeImage
        : item.recipeImage?.uri
        ? item.recipeImage
        : { uri: item.recipeImage };

    const title =
      (item.recipeName || '').length > 20
        ? item.recipeName.slice(0, 20) + '...'
        : item.recipeName || '';

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate(ROUTES?.RECIPE_DETAIL ?? 'RecipeDetail', item)
        }
      >
        <Image source={imgSrc} style={styles.cardImage} resizeMode="cover" />
        <Text style={styles.cardTitle}>{title}</Text>
      </TouchableOpacity>
    );
  };

  // Empty state
  if (!favoriteRecipesList.length) {
    return (
      <View style={[styles.container, { padding: wp('4%') }]}>
        <Text style={styles.heading}>My Favorite Recipes</Text>
        <View
          testID="favoriteRecipes"
          style={[styles.panel, { alignItems: 'center', justifyContent: 'center' }]}
        >
          <Text style={styles.emptyText}>No favorite recipes yet!</Text>
        </View>

        {/* Go back button (after favoriteRecipes view) */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backTxt}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // List state
  return (
    <View style={[styles.container, { padding: wp('4%') }]}>
      <Text style={styles.heading}>My Favorite Recipes</Text>

      <View testID="favoriteRecipes" style={styles.panel} />

      {/* Go back button (after favoriteRecipes view) */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backTxt}>Go back</Text>
      </TouchableOpacity>

      {/* FlatList of favorites */}
      <FlatList
        data={favoriteRecipesList}
        keyExtractor={(it) => String(it.idC ?? it.idFood ?? it.id)}
        renderItem={renderCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  heading: {
    fontSize: hp('3%'),
    fontWeight: '800',
    color: '#111827',
    marginBottom: hp('1.5%'),
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: wp('3%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    minHeight: hp('8%'),
  },
  backBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: hp('2%'),
  },
  backTxt: { color: '#fff', fontWeight: '700' },

  listContent: { paddingBottom: hp('3%') },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  cardImage: {
    width: wp('35%'),
    height: wp('35%'),
    borderRadius: 16,
  },
  cardTitle: {
    marginLeft: 16,
    fontSize: hp('2.1%'),
    fontWeight: '700',
    color: '#374151',
  },

  emptyText: { color: '#6B7280', fontSize: hp('2%') },
});
