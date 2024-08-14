import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import { Icon } from 'react-native-elements';
import axios from 'axios';

import SearchInput from '../components/searchPage/SearchInput'; 
import SearchResult from '../components/searchPage/SearchResult'; 
import SearchCity from '../components/searchPage/SearchCity';

const Search = ({ navigation }) => {
  const [query, setQuery] = useState(''); // State to store the current search query
  const [data, setData] = useState([]); // State to store all fetched data
  const [filteredData, setFilteredData] = useState([]); // State to store data filtered by search query
  const [isLoaded, setIsLoaded] = useState(false); // State to track if data is loaded
  const [selectedCity, setSelectedCity] = useState(null); // State to store the selected city

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('https://dejapi-8cfa29bb41d9.herokuapp.com/api/items')
      .then(response => {
        setData(response.data); // Store the fetched data
        setFilteredData(response.data); // Initialize filtered data with all data
        setIsLoaded(true); // Set loaded state to true
      })
      .catch(error => {
        console.error(error); // Log any errors
        setIsLoaded(false); // Set loaded state to false on error
      });
  }, []);

  const handleSearch = (text) => {
    setQuery(text); // Update the query state
    if (text) {
      // Filter data based on the search text
      const newData = data.filter(item => {
        const itemData = item.category ? item.category.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData); // Update filtered data with the search results
    } else {
      setFilteredData(data); // Reset filtered data if search text is empty
    }
  };

  const handleCityPress = (city) => {
    setSelectedCity(city); // Set the selected city
    // Filter data based on the selected city
    const filtered = data.filter(property => property.city === city.name);
    setFilteredData(filtered); // Update filtered data with the city-based results
  };

  const displaySearch = () => {
    // Conditionally render search results or city options
    if (query.length > 0 || selectedCity !== null) {
      return <SearchResult results={filteredData} navigation={navigation} />;
    } else {
      return <SearchCity onCityPress={handleCityPress} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchheader}>
        <Icon
          color='#00495F'
          name='chevron-back-outline'
          type='ionicon'
          onPress={() => {
            setQuery(""); // Clear the search query
            setSelectedCity(null); // Reset selected city
          }}
        />
        <Text h2>Search</Text>
        <Icon
          color='#00495F'
          name='heart'
          type='ionicon'
          onPress={() => navigation.navigate('Like')} // Navigate to the Like screen
        />
      </View>
      <View>
        <SearchInput query={query} onChange={handleSearch} /> 
        {/* Render search input component */}
      </View>
      {displaySearch()} 
      {/* Render search results or city options */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    rowGap: 10,
    padding: 10,
  },
  searchheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 2,
  }
});

export default Search;
