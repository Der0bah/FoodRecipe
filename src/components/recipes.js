import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ROUTES } from '../navigation'; // or replace with 'RecipeDetail' string if you didn't export ROUTES

const CARD_RADIUS = 28;

const ArticleCard = ({ item, index }) => {
  const navigation = useNavigation();

  return (
    <View testID="articleDisplay" style={styles.cardWrap}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate(ROUTES?.RECIPE_DETAIL ?? 'RecipeDetail', {
            id: item.id,
            recipe: item,
          })
        }
        style={styles.card}
      >
        <Image source={item.recipeImage} style={styles.image} resizeMode="cover" />
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>
        {item.recipeName}
      </Text>
      <Text style={styles.subtitle} numberOfLines={2}>
        {item.recipeInstructions}
      </Text>
    </View>
  );
};

function Recipes({ foods, categories }) {
  return (
    <View testID="recipesDisplay" style={styles.container}>
      <FlatList
        data={foods}
        keyExtractor={(it) => it.id}
        numColumns={2}
        renderItem={({ item, index }) => <ArticleCard item={item} index={index} />}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columns}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No recipes in this category</Text>
            <Text style={styles.emptySub}>Try selecting another one above.</Text>
          </View>
        }
      />
    </View>
  );
}

Recipes.propTypes = {
  foods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      recipeName: PropTypes.string.isRequired,
      recipeInstructions: PropTypes.string.isRequired,
      recipeImage: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  categories: PropTypes.array, // currently unused but kept for parity/future
};

const CARD_W = (wp('100%') - wp('8%') - wp('5%')) / 2; // padding + gap
const CARD_H = hp('22%');

const styles = StyleSheet.create({
  container: { flex: 1, paddingRight: wp('4%') },
  listContent: { paddingBottom: hp('2%') },
  columns: { gap: wp('5%'), paddingRight: 0 },

  cardWrap: {
    width: CARD_W,
    marginBottom: hp('2.6%'),
  },
  card: {
    width: '100%',
    height: CARD_H,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: CARD_RADIUS,
  },
  title: {
    marginTop: 8,
    fontSize: hp('1.8%'),
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    marginTop: 2,
    fontSize: hp('1.5%'),
    color: '#6B7280',
  },

  empty: { paddingVertical: hp('5%') },
  emptyTitle: { fontWeight: '700', fontSize: hp('2%'), color: '#111827' },
  emptySub: { marginTop: 4, color: '#6B7280' },
});

export default memo(Recipes);
