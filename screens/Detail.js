import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { StyleSheet, View } from 'react-native';

import { Text } from '@rneui/themed';
import DetailComponent from '../components/DetailComponent';


export default function Detail({route, navigation }) {
  // get the params from the route
  const { detailId } = route.params || {};

  // add the three useState for the fetch process
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataResult, setDataResult] = useState([]);


  // This hook fetches data for a specific item based on detailId and handles loading and error states.
  // The hook depends on detailId, meaning it will re-run whenever detailId changes.
  useEffect(() => {
    if (detailId) {
      axios.get(`https://dejapi-8cfa29bb41d9.herokuapp.com/api/items/${detailId}`)
        .then(
          (result) => {
            setIsLoaded(true);
            setDataResult(result.data);
            // Sets the loading state to true and updates the state with the fetched data (result.data).
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    } else {
      // Handle case where detailId is not provided
      setIsLoaded(true);
      setError(new Error('Not any Item has been selected:)'));
    }
  }, [detailId]);

  return (
    <View style={styles.container}>
      {/* Renders the UI based on the current states (error, isLoaded, dataResult, and navigation).
displayData Function: Called with the current states to decide what to display. */}
      {displayData(error, isLoaded, dataResult, navigation)}
    </View>
  );
}

function displayData(error, isLoaded, dataResult, ) {

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
  else if (!isLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
        {/* <ActivityIndicator size="large" color="#00ff00" /> */}
      </View>
    );
  }
  else if (dataResult === undefined) {
    return (
      <View>
        <Text>No records found for search</Text>
      </View>
    );
  }
  else {
    return (
        // Renders the DetailComponent with the fetched data (dataResult) and navigation functionality.
        <DetailComponent currProperty={dataResult} navigatorRef={navigation} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
