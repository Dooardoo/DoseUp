import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Correção para 'useRouter'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const router = useRouter(); // Correção para usar useRouter no lugar de router direto

  // Função para verificar se o usuário já está logado
  const getData = async () => {
    const data = await AsyncStorage.getItem('isLoggedIn');
    if (data === 'true') {
      setIsLoggedIn(true);
    }
  };

  // Executa apenas uma vez ao montar o componente
  useEffect(() => {
    getData();
  }, []); // Adicionado array de dependências vazio

  const handleSubmit = async () => {
    console.log(email, password);
    const userData = {
      email,
      password,
    };

    try {
      const res = await axios.post('http://192.168.100.79:3000/login-user', userData);
      if (res.data.status === 'ok') {
        Alert.alert('Logged in Successfully!!');
        await AsyncStorage.setItem('token', res.data.data);
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        router.replace("/blabla");
      } else {
        Alert.alert(JSON.stringify(res.data));
        console.log("error");
      }
    } catch (error) {
      console.log("Error during login", error);
      Alert.alert("Login failed. Please try again.");
    }
  };

  // Se já estiver logado, redireciona para o arquivo "blabla"
  if (isLoggedIn) {
    router.replace("/blabla");
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={{ width: 330, height: 100 }} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="exemplo@gmail.com"
          value={email}
          onChangeText={setEmail} // Mantém o valor do e-mail atualizado
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="sua senha..."
          secureTextEntry
          value={password}
          onChangeText={setPassword} // Mantém o valor da senha atualizado
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("/cadastro")}>
        <Text style={styles.createAccount}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 15,
  },
  forgotPassword: {
    color: '#007BFF',
    marginBottom: 20,
  },
  loginButton: {
    width: '80%',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  createAccount: {
    color: '#007BFF',
    marginTop: 20,
  },
});

export default LoginScreen;