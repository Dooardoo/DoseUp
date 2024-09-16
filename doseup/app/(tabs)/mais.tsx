import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router'; // Mova o hook para o topo

interface UserData {
  name: string;
  email: string;
}

const SettingsScreen = () => {
  const [theme, setTheme] = useState('light');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const router = useRouter(); // Mova o hook para o topo do componente

  const handleSaveSettings = () => {
    Alert.alert("Configurações salvas", "Suas configurações foram salvas com sucesso!");
    // Salvar as configurações (a lógica de salvamento depende de como seu app armazena os dados)
  };

  const getData = async (): Promise<void> => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Token not found');
        return;
      }

      const response = await axios.post('http://192.168.100.79:3000/userdata', { token });
      if (response.data.status === 'ok') {
        const userData: UserData = response.data.data;
        setUsername(userData.name);
        setEmail(userData.email);
      } else {
        Alert.alert('Error fetching user data');
      }
      console.log(response.data);
    } catch (error: any) {
      Alert.alert('An error occurred', error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleLogout = async (): Promise<void> => {
    Alert.alert(
      "Logout",
      "Você foi desconectado!",
      [
        {
          text: "OK",
          onPress: async () => {
            try {
              // Limpa os tokens e os dados do usuário
              await AsyncStorage.clear();
              // Navega para a tela de login ou outra rota
              router.replace("/"); // Agora o router funciona corretamente aqui
            } catch (error) {
              console.error("Erro ao fazer logout:", error);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      {/* Senha */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alterar senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSaveSettings}>
        <Text style={styles.buttonText}>Salvar Configurações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  optionText: {
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: 150,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
