import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';
export default function MainScreen() {
  const [randomPharmacy, setRandomPharmacy] = useState(null);
  const [products, setProducts] = useState([
    { id: '1', name: 'Dipirona' },
    { id: '2', name: 'Paracetamol' },
    { id: '3', name: 'Dramin' },
    { id: '4', name: 'Dorflex' },
  ]);

  // Função para buscar uma farmácia aleatória
  const fetchRandomPharmacy = async () => {
    try {
      const response = await axios.get('http://192.168.100.79:3000/pharmacies/random');
      setRandomPharmacy(response.data); // Armazena a farmácia aleatória no estado
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar a farmácia aleatória');
    }
  };

  useEffect(() => {
    fetchRandomPharmacy(); // Busca uma farmácia aleatória quando o componente é montado
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={{ width: 290, height: 100 }} />
      </View>

      {randomPharmacy ? (
    <View style={styles.pharmacyInfo}>
        <View style={styles.pharmacyImagePlaceholder} />
        <View style={styles.pharmacyDetails}>
            <Text style={styles.pharmacyName}>{randomPharmacy.name}</Text>
            <Text style={styles.pharmacyAddress}>
                Endereço: {randomPharmacy.address ||  'Não disponível'}
            </Text>
            <Text style={styles.pharmacyPhone}>
                Telefone: {randomPharmacy.phone || 'Não disponível'}
            </Text>
        </View>
        <Text style={styles.distance}>{randomPharmacy.distance} km</Text>
    </View>
) : (
    <Text>Carregando farmácia...</Text>
)}

      <TouchableOpacity style={styles.searchButton}>
        <TextInput style={styles.searchInput} placeholder="Procurar..." />
      </TouchableOpacity>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productRow}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>$</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={styles.productList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  pharmacyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  pharmacyImagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  pharmacyDetails: {
    flex: 1,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pharmacyAddress: {
    fontSize: 14,
  },
  pharmacyPhone: {
    fontSize: 14,
  },
  distance: {
    fontSize: 16,
  },
  searchButton: {
    width: '90%',
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  productList: {
    width: '90%',
    flex: 1,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
  },
});