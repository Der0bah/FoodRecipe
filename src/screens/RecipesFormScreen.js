import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function RecipesFormScreen({ route }) {
  const navigation = useNavigation();

  // Params (may be undefined when creating a new recipe)
  const { recipeToEdit, recipeIndex, onrecipeEdited } = route?.params ?? {};

  // Local state
  const [title, setTitle] = useState(recipeToEdit?.title ?? '');
  const [image, setImage] = useState(recipeToEdit?.image ?? '');
  const [description, setDescription] = useState(recipeToEdit?.description ?? '');

  // ---- SAVE FUNCTION (create or edit) ----
  const saverecipe = async () => {
    try {
      const newrecipe = { title: title?.trim(), image: image?.trim(), description: description?.trim() };

      // Read existing list
      const raw = await AsyncStorage.getItem('customrecipes');
      let recipes = [];
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) recipes = parsed;
        } catch {
          // corrupted value, reset to empty array
          recipes = [];
        }
      }

      if (recipeToEdit) {
        // Edit flow: replace the item at recipeIndex
        const idx = Number.isInteger(recipeIndex) ? recipeIndex : -1;
        if (idx >= 0 && idx < recipes.length) {
          recipes[idx] = newrecipe;
        } else {
          // If index is missing/out of range, append as fallback
          recipes.push(newrecipe);
        }
      } else {
        // Create flow
        recipes.push(newrecipe);
      }

      // Persist
      await AsyncStorage.setItem('customrecipes', JSON.stringify(recipes));

      // Notify parent (if provided)
      if (typeof onrecipeEdited === 'function') {
        onrecipeEdited();
      }

      // Return to previous screen
      navigation.goBack();
    } catch (err) {
      console.error('Failed to save recipe:', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.heading}>{recipeToEdit ? 'Edit Recipe' : 'Create Recipe'}</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        autoCapitalize="none"
        style={styles.input}
      />

      {image ? (
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.placeholder}><Text style={styles.placeholderTxt}>Upload Image URL</Text></View>
      )}

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={[styles.input, styles.textarea]}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={saverecipe}>
        <Text style={styles.saveTxt}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: wp('4%'), backgroundColor: '#fff' },
  heading: { fontSize: hp('3%'), fontWeight: '800', marginBottom: hp('2%'), color: '#111827' },
  input: {
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 12, marginBottom: hp('1.5%'),
    fontSize: hp('2%'),
  },
  textarea: { height: hp('16%'), textAlignVertical: 'top' },
  image: { width: '100%', height: hp('24%'), borderRadius: 12, marginBottom: hp('1.5%') },
  placeholder: {
    height: hp('24%'), borderRadius: 12, backgroundColor: '#F3F4F6',
    alignItems: 'center', justifyContent: 'center', marginBottom: hp('1.5%'),
  },
  placeholderTxt: { color: '#6B7280' },
  saveBtn: {
    backgroundColor: '#2563EB', paddingVertical: 14, borderRadius: 12, alignItems: 'center',
  },
  saveTxt: { color: '#fff', fontWeight: '700', fontSize: hp('2%') },
});
