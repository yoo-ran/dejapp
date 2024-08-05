import React, { useState,useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import { Icon } from 'react-native-elements';

import axios from 'axios';

import SearchInput from '../components/searchPage/SearchInput'; // Adjust the import path as necessary
import SearchResult from '../components/searchPage/SearchResult'; // Adjust the import path as necessary
import SearchCity from '../components/searchPage/SearchCity';

const Search = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedCity, setSelectedCity] = useState(null);
  


  useEffect(() => {
    axios.get('https://dejapi-8cfa29bb41d9.herokuapp.com/api/items')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
        setIsLoaded(true);
      })
      .catch(error => {
        console.error(error);
        setIsLoaded(false);
        setError(error);
      });
  }, []);

  const handleSearch = (text) => {
    setQuery(text);
    if (text) {
      const newData = data.filter(item => {
        const itemData = item.category ? item.category.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };
 
  const handleCityPress = (city) => {
    setSelectedCity(city);

    const filtered = data.filter(property => property.city === city.name);
    setFilteredData(filtered);
  };

  const displaySearch = () =>{
    if(query.length > 0 || selectedCity !== null) {
      return <SearchResult results={filteredData} navigationRef={navigation}/>
    }else{
      return <SearchCity onCityPress={handleCityPress} />
    }
  }

  return (
    <View style={styles.container}>
      {/* Search header */}
      <View style={styles.searchheader}>
        <Icon
              color='#00495F'
              name='chevron-back-outline'
              type='ionicon'
              onPress={() => {
                setQuery("") 
                setSelectedCity(null)
              }} 
            />
        <Text h2>Search</Text>
        <Icon
              color='#00495F'
              name='heart'
              type='ionicon'
            />
      </View>
      <View>
        <SearchInput query={query} onChange={handleSearch} />
      </View>

        {displaySearch()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent:"center",
    rowGap:10,
    padding: 10,
  },
  searchheader:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingVertical:2,
  }
});

export default Search;
