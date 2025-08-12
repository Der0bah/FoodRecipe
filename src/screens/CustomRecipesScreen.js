import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { toggleFavorite } from '../redux/favoritesSlice';

export default function CustomRecipesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  // Accept either { recipe } or the object itself as params
  const article = route.params?.recipe ?? route.params ?? null;
  const index = route.params?.index ?? 0;

  const dispatch = useDispatch();
  const favoriteRecipes = useSelector((s) => s.favorites?.favoriterecipes ?? []);

  const isFavorite = useMemo(() => {
    if (!article) return false;
    const id = article.idFood ?? article.id;
    return favoriteRecipes.some((r) => (r.idFood ?? r.id) === id);
  }, [favoriteRecipes, article]);

  const handleToggleFavorite = () => {
    if (!article) return;
    dispatch(toggleFavorite(article));
  };

  if (!article) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyText}>No Recipe Details Available</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>GoBack</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Image can be local require(number) or remote uri(string/object)
  const imageSource =
    typeof article.recipeImage === 'number'
      ? article.recipeImage
      : article.recipeImage?.uri
      ? article.recipeImage
      : { uri: article.recipeImage };

  const imageHeight = index % 3 === 0 ? hp(25) : hp(35);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Image */}
      <View testID="imageContainer">
        <Image source={imageSource} style={[styles.articleImage, { height: imageHeight }]} resizeMode="cover" />
      </View>

      {/* Top Buttons */}
      <View testID="topButtonsContainer" style={styles.topButtons}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>GoBack</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favoriteButton} onPress={handleToggleFavorite}>
          <Text style={styles.favText}>{isFavorite ? '♥' : '♡'}</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View testID="contentContainer" style={styles.contentWrap}>
        <Text style={styles.title}>{article.recipeName ?? article.title ?? 'Untitled Recipe'}</Text>

        <View style={{ marginTop: 8 }}>
          <Text style={styles.sectionLabel}>Content</Text>
          <Text style={styles.description}>
            {article.recipeInstructions ?? article.description ?? 'No description provided.'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  articleImage: {
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    marginTop: hp('1.5%'),
  },
  backButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  backText: { color: '#fff', fontWeight: '700' },

  favoriteButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  favText: { fontSize: 18, fontWeight: '700', color: '#111827' },

  contentWrap: {
    paddingHorizontal: wp('4%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('4%'),
  },
  title: { fontSize: hp('3%'), fontWeight: '800', color: '#111827' },
  sectionLabel: { fontSize: hp('2%'), fontWeight: '700', color: '#374151', marginBottom: 6 },
  description: { fontSize: hp('1.9%'), color: '#4B5563', lineHeight: 22 },

  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  emptyText: { marginBottom: 12, color: '#6B7280', fontWeight: '600' },
});
