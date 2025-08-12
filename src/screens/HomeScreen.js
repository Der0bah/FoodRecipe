// src/screens/HomeScreen.js
import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Components
import Categories from '../components/categories';
import Recipes from '../components/recipes';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Chicken');

  // --- Categories kept locally (with thumbs) ---
  const [categories] = useState([
    { idCategory: '1',  strCategory: 'Beef',         strCategoryThumb: 'https://www.themealdb.com/images/category/beef.png' },
    { idCategory: '2',  strCategory: 'Chicken',      strCategoryThumb: 'https://www.themealdb.com/images/category/chicken.png' },
    { idCategory: '3',  strCategory: 'Dessert',      strCategoryThumb: 'https://www.themealdb.com/images/category/dessert.png' },
    { idCategory: '4',  strCategory: 'Lamb',         strCategoryThumb: 'https://www.themealdb.com/images/category/lamb.png' },
    { idCategory: '5',  strCategory: 'Miscellaneous',strCategoryThumb: 'https://www.themealdb.com/images/category/miscellaneous.png' },
    { idCategory: '6',  strCategory: 'Pasta',        strCategoryThumb: 'https://www.themealdb.com/images/category/pasta.png' },
    { idCategory: '7',  strCategory: 'Pork',         strCategoryThumb: 'https://www.themealdb.com/images/category/pork.png' },
    { idCategory: '8',  strCategory: 'Seafood',      strCategoryThumb: 'https://www.themealdb.com/images/category/seafood.png' },
    { idCategory: '9',  strCategory: 'Side',         strCategoryThumb: 'https://www.themealdb.com/images/category/side.png' },
    { idCategory: '10', strCategory: 'Starter',      strCategoryThumb: 'https://www.themealdb.com/images/category/starter.png' },
    { idCategory: '11', strCategory: 'Vegan',        strCategoryThumb: 'https://www.themealdb.com/images/category/vegan.png' },
    { idCategory: '12', strCategory: 'Vegetarian',   strCategoryThumb: 'https://www.themealdb.com/images/category/vegetarian.png' },
    { idCategory: '13', strCategory: 'Breakfast',    strCategoryThumb: 'https://www.themealdb.com/images/category/breakfast.png' },
    { idCategory: '14', strCategory: 'Goat',         strCategoryThumb: 'https://images.unsplash.com/photo-1619711667542-c049700dd9e0?q=80&w=1888&auto=format&fit=crop' },
  ]);

  // --- Full recipe list kept locally (remote images) ---
  const [allFood] = useState([
    // Beef
    {
      category: 'Beef',
      idFood: '1',
      idCategory: '1',
      recipeName: 'Beef and Mustard Pie',
      recipeInstructions:
        'Preheat the oven to 150C/300F/Gas 2... bake for 30 minutes, or until the pastry is golden-brown and cooked through.',
      recipeImage:
        'https://images.unsplash.com/photo-1587248720327-8eb72564be1e?q=80&w=1887&auto=format&fit=crop',
      recipeId: 'beef_01',
      recipeCategory: 'Beef',
      recipeOrigin: 'British',
      cookingDescription:
        'Preheat the oven to 150C/300F/Gas 2. Toss the beef and flour together...',
      recipeTags: 'Meat,Pie',
      ingredients: [
        { ingredientName: 'Beef', measure: '1kg' },
        { ingredientName: 'Plain Flour', measure: '2 tbs' },
        // ... (rest unchanged)
      ],
    },
    {
      category: 'Beef',
      idFood: '2',
      idCategory: '1',
      recipeName: 'Beef Banh Mi Bowls with Sriracha Mayo, Carrot & Pickled Cucumber',
      recipeInstructions:
        'Place rice in a fine-mesh sieve and rinse... Drizzle with sriracha mayo.',
      recipeImage:
        'https://images.unsplash.com/photo-1676300185292-e23bb3db50fa?q=80&w=2070&auto=format&fit=crop',
      recipeId: 'beef_02',
      recipeCategory: 'Beef',
      recipeOrigin: 'Vietnamese',
      cookingDescription: 'In a medium bowl, toss cucumber with vinegar...',
      recipeTags: 'Rice,Bowl',
      ingredients: [
        { ingredientName: 'Ground Beef', measure: '500g' },
        // ...
      ],
    },
    {
      category: 'Beef',
      idFood: '3',
      idCategory: '1',
      recipeName: 'Beef Brisket Pot Roast',
      recipeInstructions:
        'Preheat the oven to 160°C... serve with the vegetables and sauce from the pot.',
      recipeImage:
        'https://images.unsplash.com/photo-1622003184404-bc0c66144534?q=80&w=1887&auto=format&fit=crop',
      recipeId: 'beef_03',
      recipeCategory: 'Beef',
      recipeOrigin: 'American',
      cookingDescription: 'Preheat oven to 160°C/325°F...',
      recipeTags: 'Roast,Pot',
      ingredients: [
        { ingredientName: 'Beef Brisket', measure: '1.5kg' },
        // ...
      ],
    },
    {
      category: 'Beef',
      idFood: '4',
      idCategory: '1',
      recipeName: 'Beef Bourguignon',
      recipeInstructions:
        'Heat a large casserole pan... Spoon the beef bourguignon into serving bowls...',
      recipeImage:
        'https://images.unsplash.com/photo-1548869206-93b036288d7e?q=80&w=1895&auto=format&fit=crop',
      recipeId: 'beef_04',
      recipeCategory: 'Beef',
      recipeOrigin: 'French',
      cookingDescription: 'Preheat the oven to 150°C...',
      recipeTags: 'Stew,Meat',
      ingredients: [
        { ingredientName: 'Beef Chuck', measure: '1kg' },
        // ...
      ],
    },
    {
      category: 'Beef',
      idFood: '5',
      idCategory: '1',
      recipeName: 'Beef Stroganoff',
      recipeInstructions:
        'Season beef, sear in batches... thicken and coat the beef. Serve over noodles or rice.',
      recipeImage:
        'https://images.unsplash.com/photo-1726677730666-fdc08a8da464?q=80&w=1887&auto=format&fit=crop',
      recipeId: 'beef_05',
      recipeCategory: 'Beef',
      recipeOrigin: 'Russian',
      cookingDescription: 'Heat butter in a pan, cook the beef strips...',
      recipeTags: 'Creamy,Meat',
      ingredients: [
        { ingredientName: 'Beef Sirloin', measure: '500g' },
        // ...
      ],
    },
    {
      category: 'Beef',
      idFood: '6',
      idCategory: '1',
      recipeName: 'Beef Tacos',
      recipeInstructions:
        'Heat oil, brown ground beef... fill tortillas and top as desired.',
      recipeImage:
        'https://images.unsplash.com/photo-1619221882161-95135fca04e4?q=80&w=2070&auto=format&fit=crop',
      recipeId: 'beef_06',
      recipeCategory: 'Beef',
      recipeOrigin: 'Mexican',
      cookingDescription: 'In a skillet, cook the beef until browned...',
      recipeTags: 'Mexican,Taco',
      ingredients: [
        { ingredientName: 'Ground Beef', measure: '500g' },
        // ...
      ],
    },

    // Chicken
    {
      idCategory: '2',
      idFood: '7',
      category: 'Chicken',
      recipeName: 'Chicken Curry',
      recipeInstructions:
        'Heat oil, sauté aromatics, add spices and chicken, pour coconut milk and stock, simmer until tender.',
      recipeImage:
        'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop',
      recipeId: 'chicken_01',
      recipeCategory: 'Chicken',
      recipeOrigin: 'Indian',
      cookingDescription: 'Cook chicken with spices, tomatoes, and onions until tender.',
      recipeTags: 'Spicy,Curry',
      ingredients: [
        { ingredientName: 'Chicken', measure: '500g' },
        // ...
      ],
    },
    {
      idCategory: '2',
      idFood: '8',
      category: 'Chicken',
      recipeName: 'Chicken Alfredo',
      recipeInstructions:
        'Cook chicken; make garlic cream with Parmesan; toss with fettuccine.',
      recipeImage:
        'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=2070&auto=format&fit=crop',
      recipeId: 'chicken_02',
      recipeCategory: 'Chicken',
      recipeOrigin: 'Italian',
      cookingDescription: 'Cook chicken with Alfredo sauce and serve with pasta.',
      recipeTags: 'Pasta,Creamy',
      ingredients: [
        { ingredientName: 'Chicken', measure: '400g' },
        // ...
      ],
    },
    {
      idCategory: '2',
      idFood: '9',
      category: 'Chicken',
      recipeName: 'Chicken Parmesan',
      recipeInstructions:
        'Bread cutlets, fry, top with marinara and mozzarella, bake until bubbly.',
      recipeImage:
        'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?q=80&w=2070&auto=format&fit=crop',
      recipeId: 'chicken_03',
      recipeCategory: 'Chicken',
      recipeOrigin: 'Italian',
      cookingDescription:
        'Bread and fry chicken cutlets, then top with marinara sauce and cheese.',
      recipeTags: 'Breaded,Cheesy',
      ingredients: [
        { ingredientName: 'Chicken Cutlets', measure: '4 pieces' },
        // ...
      ],
    },
    {
      idCategory: '2',
      idFood: '10',
      category: 'Chicken',
      recipeName: 'Chicken Teriyaki',
      recipeInstructions:
        'Cook chicken; whisk soy, honey, vinegar, sesame oil, cornstarch, garlic; simmer to thicken.',
      recipeImage:
        'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2070&auto=format&fit=crop',
      recipeId: 'chicken_04',
      recipeCategory: 'Chicken',
      recipeOrigin: 'Japanese',
      cookingDescription: 'Marinate chicken in teriyaki sauce and grill until cooked.',
      recipeTags: 'Grilled,Asian',
      ingredients: [
        { ingredientName: 'Chicken', measure: '500g' },
        // ...
      ],
    },
    {
      idCategory: '2',
      idFood: '11',
      category: 'Chicken',
      recipeName: 'Chicken Fajitas',
      recipeInstructions:
        'Cook seasoned chicken; sauté peppers and onions; combine and serve in tortillas.',
      recipeImage:
        'https://images.unsplash.com/photo-1689773976415-293dd893f77e?q=80&w=1974&auto=format&fit=crop',
      recipeId: 'chicken_05',
      recipeCategory: 'Chicken',
      recipeOrigin: 'Mexican',
      cookingDescription:
        'Cook chicken with bell peppers and onions, serve in tortillas.',
      recipeTags: 'Mexican,Spicy',
      ingredients: [
        { ingredientName: 'Chicken', measure: '500g' },
        // ...
      ],
    },
    {
      idCategory: '2',
      idFood: '12',
      category: 'Chicken',
      recipeName: 'Chicken Caesar Salad',
      recipeInstructions:
        'Grill chicken, toss with romaine, Parmesan, croutons, and Caesar dressing.',
      recipeImage:
        'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1887&auto=format&fit=crop',
      recipeId: 'chicken_06',
      recipeCategory: 'Chicken',
      recipeOrigin: 'American',
      cookingDescription:
        'Grill chicken and toss with romaine lettuce, croutons, and Caesar dressing.',
      recipeTags: 'Salad,Healthy',
      ingredients: [
        { ingredientName: 'Chicken Breast', measure: '2 grilled' },
        // ...
      ],
    },
    {
      idCategory: '2',
      idFood: '13',
      category: 'Chicken',
      recipeName: 'Buffalo Chicken Wings',
      recipeInstructions:
        'Bake or fry wings; toss in butter + hot sauce; serve with celery and dip.',
      recipeImage:
        'https://images.unsplash.com/photo-1608039755401-742074f0548d?q=80&w=1935&auto=format&fit=crop',
      recipeId: 'chicken_07',
      recipeCategory: 'Chicken',
      recipeOrigin: 'American',
      cookingDescription: 'Deep-fry chicken wings and toss in buffalo sauce.',
      recipeTags: 'Spicy,Fried',
      ingredients: [
        { ingredientName: 'Chicken Wings', measure: '12 pieces' },
        // ...
      ],
    },
    {
      idCategory: '2',
      idFood: '14',
      category: 'Chicken',
      recipeName: 'Chicken and Rice',
      recipeInstructions:
        'Brown thighs; sauté aromatics; add rice and broth; simmer covered until tender.',
      recipeImage:
        'https://images.unsplash.com/photo-1617651523904-8768096faf40?q=80&w=1887&auto=format&fit=crop',
      recipeId: 'chicken_08',
      recipeCategory: 'Chicken',
      recipeOrigin: 'American',
      cookingDescription: 'Cook chicken with rice and seasonings in a single pot.',
      recipeTags: 'Comfort Food,One-Pot',
      ingredients: [
        { ingredientName: 'Chicken', measure: '500g' },
        // ...
      ],
    },
  ]);

  const handleChangeCategory = (category) => setActiveCategory(category);

  const filteredfoods = useMemo(
    () => allFood.filter((f) => f.category === activeCategory),
    [allFood, activeCategory]
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        testID="scrollContainer"
      >
        <View style={styles.headerContainer} testID="headerContainer">
          <Image
            source={{ uri: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png' }}
            style={styles.avatar}
          />
          <Text style={styles.greetingText}>Hello, User!</Text>
        </View>

        <View style={styles.titleContainer} testID="titleContainer">
          <Text style={styles.title}>Make your own food,</Text>
          <Text style={styles.subtitle}>
            stay at <Text style={styles.highlight}>home</Text>
          </Text>
        </View>

        {/* Categories */}
        <View testID="categoryList" style={styles.section}>
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        {/* Recipes */}
        <View testID="foodList" style={[styles.section, { marginTop: hp('2%') }]}>
          <Recipes foods={filteredfoods} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}

const SPACING = 16;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { paddingBottom: hp('4%') },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING,
    paddingTop: hp('2%'),
    justifyContent: 'space-between',
  },
  avatar: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    resizeMode: 'cover',
  },
  greetingText: { color: '#667085', fontWeight: '600' },

  titleContainer: { paddingHorizontal: SPACING, marginTop: hp('2%'), marginBottom: hp('2%') },
  title: { fontSize: hp('4%'), fontWeight: '700', color: '#111827' },
  subtitle: { fontSize: hp('4%'), fontWeight: '700', color: '#111827' },
  highlight: { color: '#F59E0B', fontWeight: '800' },

  section: { paddingLeft: SPACING },
});
