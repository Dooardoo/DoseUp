import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, Image } from 'react-native';

const TimerScreen = () => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    if (seconds <= 0 && isRunning) {
      setIsRunning(false);
      Alert.alert("Tempo finalizado", "O seu tempo acabou!");
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const startTimer = () => {
    const timeInSeconds = (parseInt(hours, 10) * 3600) + (parseInt(minutes, 10) * 60);
    if (isNaN(timeInSeconds) || timeInSeconds <= 0) {
      Alert.alert("Erro", "Por favor, insira valores válidos para horas e minutos.");
      return;
    }
    setSeconds(timeInSeconds);
    setIsRunning(true);
  };

  const cancelTimer = () => {
    setIsRunning(false);
    setSeconds(0);
    setHours('');
    setMinutes('');
  };

  const formatTime = (sec) => {
    const hrs = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const remainingSeconds = sec % 60;
    return `${String(hrs).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={{width: 440, height: 100}}/>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
      </View>
      <Text style={styles.inputLabel}>
        Defina o horário de tomar seu remédio
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="HH"
          keyboardType="numeric"
          value={hours}
          onChangeText={setHours}
        />
        <Text style={styles.inputLabel}>:</Text>
        <TextInput
          style={styles.input}
          placeholder="MM"
          keyboardType="numeric"
          value={minutes}
          onChangeText={setMinutes}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={startTimer}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#dc3545' }]} onPress={cancelTimer}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 48,
    color: '#ffffff',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: 24,
    borderRadius: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  inputLabel: {
    fontSize: 20,
    color: '#000',
  },
  button: {
    width: '80%',
    backgroundColor: '#28a745',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#007bff',
    padding: 10,
  },
  footerIcon: {
    color: '#fff',
    fontSize: 30,
  },
});