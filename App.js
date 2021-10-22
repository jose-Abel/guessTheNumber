import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from "./components/Header";
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from "expo-font";
import AppLoading  from 'expo-app-loading';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const [guessRounds, setGuessRounds] = useState(0);

  const [datLoaded, setDataLoaded] = useState(false);

  if (!datLoaded) {
    return( 
    <AppLoading 
      startAsync={fetchFonts} 
      onFinish={()=> setDataLoaded(true)}
      onError={(error) => console.log(error)}
      />
    )
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  }

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>

  if(userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />

  } else if (guessRounds > 0) {
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />
  }

  return (
    <View style={styles.screen}>

      <Header title="Guess a Number"/> 
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
});
