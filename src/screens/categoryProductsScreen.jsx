import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCards';
import { getProductsByCategory } from '../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const CategoryProductsScreen = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const email = await AsyncStorage.getItem('token');
        const data = await getProductsByCategory(categoryId, email);
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{categoryName}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.produtoId} product={product} />
          ))
        ) : (
          <Text>No products available</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    paddingBottom: 16,
  },
});

export default CategoryProductsScreen;