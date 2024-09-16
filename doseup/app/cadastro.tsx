import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Correção da importação do hook router
import axios from 'axios';

interface UserData {
  name: string;
  email: string;
  password: string;
  birthday: string;
}

const SignupScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter(); // Correção do uso do router

  // Função para validar os dados
  const validate = (): boolean => {
    if (!name || !birthday || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return false;
    }
    // Você pode adicionar mais validações se necessário
    return true;
  };

  const handleSignup = () => {
    console.log('Nome:', name, 'Data de Nascimento:', birthday, 'Email:', email, 'Senha:', password);
    
    // Validação dos dados
    if (!validate()) return;

    const userData: UserData = {
      name,
      email,
      password,
      birthday,
    };
    console.log(userData)
    axios
      .post('http://192.168.100.79:3000/signup', userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 'ok') {
          Alert.alert('Sucesso', 'Registrado com sucesso!');
          router.replace('/'); // Redireciona para a página inicial
        } else {
          Alert.alert('Erro', JSON.stringify(res.data));
        }
      })
      .catch((error) => {
        Alert.alert('Erro', 'Ocorreu um erro ao registrar. Tente novamente.');
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>DOSE.UP</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#aaa"
        onChangeText={setName}
        value={name}
      />

      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento"
        placeholderTextColor="#aaa"
        onChangeText={setBirthday}
        value={birthday}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#aaa"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
