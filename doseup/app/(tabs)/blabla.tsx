import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';

export default function MainScreen() {
  const [medicine, setMedicine] = useState(''); // Nome do remédio que o usuário quer buscar
  const [pharmacies, setPharmacies] = useState([]); // Lista de farmácias que têm o remédio
  const [loading, setLoading] = useState(false); // Estado de carregamento

  const searchMedicine = async () => {
    if (!medicine) return;

    setLoading(true);
    try {
      const response = await fetch(`http://192.168.100.79:3000/pharmacies/${medicine}`); // Faz a requisição para a API
      const result = await response.json();

      if (response.status === 200) {
        setPharmacies(result); // Armazena o resultado na variável de estado
      } else {
        setPharmacies([]);
        alert('Medicamento não encontrado em nenhuma farmácia');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar o medicamento');
    } finally {
      setLoading(false);
    }
  };

  const renderPharmacy = ({ item }) => (
    <View style={styles.pharmacyInfo}>
      <Text style={styles.pharmacyText}>{item.pharmacy}</Text>
      <Text style={styles.distanceText}>{item.distance} km</Text>
      <Text style={styles.priceText}>R$ {item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={{ width: 100, height: 100 }} />
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Digite o nome do remédio..."
        value={medicine}
        onChangeText={setMedicine}
      />

      <TouchableOpacity style={styles.button} onPress={searchMedicine}>
        <Text style={styles.buttonText}>Procurar Remédio</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#28a745" />
      ) : (
        <FlatList
          data={pharmacies}
          renderItem={renderPharmacy}
          keyExtractor={(item) => item.pharmacy}
          ListEmptyComponent={<Text style={styles.noResultText}>Nenhum resultado encontrado</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
  },
  searchInput: {
    width: '90%',
    height: 40,
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pharmacyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  },
  pharmacyText: {
    fontSize: 16,
  },
  distanceText: {
    fontSize: 16,
  },
  priceText: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: 'bold',
  },
  noResultText: {
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },
});
