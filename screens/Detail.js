import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed'; // Import Text component from RNEUI for styled text
import DetailComponent from '../components/DetailComponent'; // Import DetailComponent to display property details

export default function Detail({ route, navigation }) {
  // Extract the detailId from route parameters
  const { detailId } = route.params || {};

  // State hooks for managing component state
  const [error, setError] = useState(null); // Holds error if fetching fails
  const [isLoaded, setIsLoaded] = useState(false); // Indicates if data is loaded
  const [dataResult, setDataResult] = useState([]); // Holds fetched data

  useEffect(() => {
    // Fetch data when detailId is available
    if (detailId) {
      console.log("Fetching data for detailId:", detailId);
      axios.get(`https://dejapi-8cfa29bb41d9.herokuapp.com/api/items/${detailId}`)
        .then(
          (result) => {
            // On successful data fetch
            console.log("API response:", result.data);
            setIsLoaded(true);
            setDataResult(result.data);
          },
          (error) => {
            // On error
            console.log("API error:", error);
            setIsLoaded(true);
            setError(error);
          }
        );
    } else {
      // Handle case where detailId is not available
      setIsLoaded(true);
      setError("Choose property to see the information :)");
    }
  }, [detailId]); // Dependency array ensures this runs whenever detailId changes

  return (
    <View style={styles.container}>
      {/* Display data based on the current state */}
      {displayData(error, isLoaded, dataResult, navigation)}
    </View>
  );
}

// Function to handle displaying content based on state
function displayData(error, isLoaded, dataResult) {
  if (error) {
    // Display error message
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  } else if (!isLoaded) {
    // Display loading message
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else if (!dataResult || dataResult.length === 0) {
    // Display message when no data is found
    return (
      <View>
        <Text>No records found for search</Text>
      </View>
    );
  } else {
    // Display the detail component with fetched data
    console.log("Rendering DetailComponent with data:", dataResult);
    return (
      <DetailComponent currProperty={dataResult} />
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
