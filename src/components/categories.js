import React, { memo } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CategoryItem = ({ item, active, onPress }) => {
  const isActive = active === item.strCategory;

  return (
    <TouchableOpacity
      testID="categoryItem"
      style={styles.itemWrap}
      onPress={() => onPress(item.strCategory)}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={`Category ${item.strCategory}`}
    >
      <View style={[styles.thumbWrap, isActive && styles.thumbActive]}>
        <Image
          source={item.strCategoryThumb}
          style={styles.thumb}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
      </View>
      <Text style={[styles.label, isActive && styles.labelActive]} numberOfLines={1}>
        {item.strCategory}
      </Text>
    </TouchableOpacity>
  );
};

function Categories({ categories, activeCategory, handleChangeCategory }) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(it) => `${it.idCategory}-${it.strCategory}`}
      renderItem={({ item }) => (
        <CategoryItem item={item} active={activeCategory} onPress={handleChangeCategory} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: wp('4%') }}
    />
  );
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      idCategory: PropTypes.string.isRequired,
      strCategory: PropTypes.string.isRequired,
      // can be a local require(...) or { uri }
      strCategoryThumb: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
    })
  ).isRequired,
  activeCategory: PropTypes.string.isRequired,
  handleChangeCategory: PropTypes.func.isRequired,
};

const CIRCLE = wp('16%');

const styles = StyleSheet.create({
  itemWrap: { marginRight: wp('4%'), alignItems: 'center' },
  thumbWrap: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: 9999,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbActive: {
    borderWidth: 3,
    borderColor: '#22C55E', // green ring like the screenshot
    backgroundColor: '#FEEFC3', // subtle warm bg for active
  },
  thumb: { width: CIRCLE * 0.78, height: CIRCLE * 0.78, borderRadius: CIRCLE },
  label: { marginTop: 6, fontSize: hp('1.6%'), color: '#6B7280' },
  labelActive: { color: '#111827', fontWeight: '600' },
});

export default memo(Categories);
