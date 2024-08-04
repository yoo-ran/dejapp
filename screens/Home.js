import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Button, Text } from '@rneui/themed';
import axios from 'axios'; // If you prefer using Axios

import CardItem from '../components/CardItem';
import SaleCardItem from '../components/SaleCardItem';

export default function Home({ navigation }) {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [saleData, setSaleData] = useState ([])
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recommendItem, setRecommendItem] = useState(null);


  useEffect(() => {
    axios.get('https://dejapi-8cfa29bb41d9.herokuapp.com/api/items')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
        setIsLoaded(true);

        const saleItems = response.data.filter(item => item.onsale === true);
        if (saleItems.length > 0) {
          setSaleData(saleItems);
        } else {
          setSaleData(response.data);
        }

        const getRandomItem = () => {
          const randomIndex = Math.floor(Math.random() * response.data.length);
          return response.data[randomIndex];
        };
        // Set a random item on component mount
        setRecommendItem(getRandomItem());
      })
      .catch(error => {
        console.error(error);
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = data.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));
    setFilteredData(filtered);
  };

  const filterBtn = [
    { type: "Houses", icon: "home-outline" },
    { type: "Apartment", icon: "business-outline" },
    { type: "Villa", icon: "laptop-outline" },
  ];

  const filterPress = (e) => {
    let filterText = e.target
    let filtered = data.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));

  }

  const filterItem = ({ item }) => (
    <CardItem properties={item} navigatorRef={navigation} />
  );
  const saleItem = ({ item }) => (
    <SaleCardItem properties={item} navigatorRef={navigation} />
  );

  const displayDataContainer = (error, isLoaded, displayData, navigation, renderItem) => {
    if (error) {
      return (
        <View style={styles.messageContainer}>
          <Text>Error: {error.message}</Text>
        </View>
      );
    } else if (!isLoaded) {
      return (
        <View style={styles.messageContainer}>
          <Text>Loading...</Text>
        </View>
      );
    } else if (!filteredData.length) {
      return (
        <View style={styles.messageContainer}>
          <Text>No results found</Text>
        </View>
      );
    } else {
      return (
          <FlatList
            data={displayData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.categoryList}
            contentContainerStyle={styles.categoryListContent}
            horizontal
          />
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>

        {/* Find Places Near You */}
        <View style={styles.flexCol}>
          <Text h2>Find Places Near You</Text>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={search}
            onChangeText={handleSearch}
          />
        </View>

        {/* Search by Category */}
        <View style={styles.flexCol}>
          <View style={styles.flexRow}>
            <Text h2>Search by Category:</Text>
            <Text>See All</Text>
          </View>
          <View style={styles.flexRow}>
            {filterBtn.map((btn, index) => (
              <Button
                key={index}
                title={btn.type}
                icon={{
                  name: btn.icon,
                  type: 'ionicon',
                  size: 15,
                  color: "#00495F"
                }}
                iconPosition='left'
                onPress={() => navigation.navigate('Main')}
              />
            ))}
          </View>
          <View style={styles.flexCol}>
            {displayDataContainer(error, isLoaded, filteredData, navigation, filterItem)}
          </View>
        </View>

        {/* On Sale: */}
        <View style={styles.flexCol}>
          <View style={styles.flexRow}>
            <Text h2>On Sale:</Text>
            <Text>See All</Text>
          </View>
          <View style={styles.flexRow}>
            {displayDataContainer(error, isLoaded, saleData, navigation, saleItem)}
          </View>
        </View>

        {/* Recommended for You */}
        <View style={styles.flexCol}>
          <View style={styles.flexRow}>
            <Text h2>Recommended for You</Text>
            <Text>See All</Text>
          </View>
          <View style={styles.flexCol}>
            {recommendItem ? <CardItem properties={recommendItem} navigatorRef={navigation} /> : <p>Loading...</p>}
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical:20,
    rowGap:30
  },
  input: {
    height: 40,
    borderColor: "#00495F",
    borderWidth: 1,
    borderRadius:10,
    paddingLeft: 8,
    marginVertical: 10,
    width: '100%',
    color:"#00495F"
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    width: "100%",
  },
  flexCol: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: "start",
    width: "100%",
    rowGap:10
  },
  categoryList: {
    width: '100%',
  },
  categoryListContent: {
    flex:1,
    paddingBottom: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  messageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
});

