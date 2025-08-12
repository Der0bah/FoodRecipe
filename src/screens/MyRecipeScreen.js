import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function MyRecipeScreen() {
  const navigation = useNavigation();
  const [recipes, setrecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------- Fetch recipes on mount --------
  useEffect(() => {
    const fetchrecipes = async () => {
      try {
        const raw = await AsyncStorage.getItem('customrecipes');           // Fetch Recipes
        const parsed = raw ? JSON.parse(raw) : [];                          // Check and Set State
        setrecipes(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error('Failed to load recipes', e);
        setrecipes([]);
      } finally {
        setLoading(false);                                                  // Update Loading State
      }
    };
    fetchrecipes();
  }, []);

  // -------- Navigate to detail (CustomRecipesScreen) --------
  const handlerecipeClick = useCallback(
    (recipe, index) => {
      navigation.navigate('CustomRecipesScreen', { recipe, index })        // Pass data
    },
    [navigation]
  );

  // -------- Add new recipe (go to form) --------
  const handleAddrecipe = useCallback(() => {
    navigation.navigate('RecipesFormScreen');                               // Open form
  }, [navigation]);

  // -------- Delete recipe --------
  const deleterecipe = useCallback(
    async (index) => {
      try {
        const updatedrecipes = [...recipes];                                // Clone
        updatedrecipes.splice(index, 1);                                     // Remove
        await AsyncStorage.setItem('customrecipes', JSON.stringify(updatedrecipes)); // Persist
        setrecipes(updatedrecipes);                                          // Update state
      } catch (e) {
        console.error('Error deleting recipe:', e);                          // Error handling
      }
    },
    [recipes]
  );

  // -------- Edit recipe --------
  const editrecipe = useCallback(
    (recipe, index) => {
      navigation.navigate('RecipesFormScreen', {                            // Navigate to edit screen
        recipeToEdit: recipe,                                               // Pass parameters
        recipeIndex: index,
        onrecipeEdited: async () => {
          // refresh list after editing
          try {
            const raw = await AsyncStorage.getItem('customrecipes');
            const parsed = raw ? JSON.parse(raw) : [];
            setrecipes(Array.isArray(parsed) ? parsed : []);
          } catch {}
        },
      });
    },
    [navigation]
  );

  // -------- Render --------
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Loading recipes…</Text>
      </View>
    );
  }

  if (!recipes.length) {
    return (
      <View style={[styles.container, { padding: wp('4%') }]}>
        <Text style={styles.header}>My Recipes</Text>
        <Text style={styles.emptyText}>No recipes yet.</Text>

        <TouchableOpacity style={styles.primaryBtn} onPress={handleAddrecipe}>
          <Text style={styles.primaryTxt}>Add New Recipe</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.secondaryBtn, { marginTop: 10 }]} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryTxt}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { padding: wp('4%') }]}>
      <Text style={styles.header}>My Recipes</Text>

      <TouchableOpacity style={styles.primaryBtn} onPress={handleAddrecipe}>
        <Text style={styles.primaryTxt}>Add New Recipe</Text>
      </TouchableOpacity>

      <FlatList
        data={recipes}
        keyExtractor={(_, i) => `my-recipe-${i}`}
        contentContainerStyle={{ paddingVertical: hp('2%') }}
        renderItem={({ item, index }) => {
          const imgSrc = item?.image ? { uri: item.image } : null;
          const preview =
            item?.description
              ? item.description.length > 50
                ? item.description.slice(0, 50) + '…'
                : item.description
              : '';

          return (
            <View style={styles.card}>
              <TouchableOpacity
                testID="handlerecipeBtn"
                style={styles.cardTap}
                activeOpacity={0.9}
                onPress={() => handlerecipeClick(item, index)}
              >
                {imgSrc && <Image source={imgSrc} style={styles.recipeImage} />}
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item?.title || 'Untitled'}</Text>
                  <Text testID="recipeDescp" style={styles.cardDesc}>
                    {preview}
                  </Text>
                </View>
              </TouchableOpacity>

              <View testID="editDeleteButtons" style={styles.row}>
                <TouchableOpacity style={styles.secondaryBtn} onPress={() => editrecipe(item, index)}>
                  <Text style={styles.secondaryTxt}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.secondaryBtn, { marginLeft: 10, backgroundColor: '#EF4444' }]}
                  onPress={() => deleterecipe(index)}
                >
                  <Text style={[styles.secondaryTxt, { color: '#fff' }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { fontSize: hp('3%'), fontWeight: '800', color: '#111827', marginBottom: hp('1.5%') },

  primaryBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  primaryTxt: { color: '#fff', fontWeight: '700' },

  secondaryBtn: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  secondaryTxt: { color: '#111827', fontWeight: '700' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginTop: hp('2%'),
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardTap: { flexDirection: 'row', alignItems: 'center' },
  recipeImage: {
    width: wp('28%'),
    height: wp('28%'),
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#F3F4F6',
  },
  cardTitle: { fontSize: hp('2.1%'), fontWeight: '700', color: '#111827' },
  cardDesc: { marginTop: 4, color: '#6B7280' },

  row: { flexDirection: 'row', marginTop: 10 },
});
