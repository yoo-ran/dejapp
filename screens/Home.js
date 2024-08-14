import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Button, Text } from '@rneui/themed';
import axios from 'axios'; // Import Axios for making HTTP requests

import CardItem from '../components/CardItem'; // Import CardItem component for displaying regular items
import SaleCardItem from '../components/SaleCardItem'; // Import SaleCardItem component for displaying sale items

export default function Home({ navigation }) {
  // State hooks for managing component state
  const [search, setSearch] = useState(''); // Search query
  const [data, setData] = useState([]); // Holds all fetched data
  const [filteredData, setFilteredData] = useState([]); // Holds data filtered by search query
  const [saleData, setSaleData] = useState([]); // Holds data for items on sale
  const [error, setError] = useState(null); // Holds error if fetching fails
  const [isLoaded, setIsLoaded] = useState(false); // Indicates if data is loaded
  const [recommendItem, setRecommendItem] = useState(null); // Holds a randomly recommended item
  const [isClicked, setIsClicked] = useState(false); // State for handling button clicks

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('https://dejapi-8cfa29bb41d9.herokuapp.com/api/items')
      .then(response => {
        // Update state with fetched data
        setData(response.data);
        setFilteredData(response.data);
        setIsLoaded(true);

        // Filter sale items and update state
        const saleItems = response.data.filter(item => item.onsale === true);
        setSaleData(saleItems.length > 0 ? saleItems : response.data);

        // Select a random item for recommendation
        const getRandomItem = () => {
          const randomIndex = Math.floor(Math.random() * response.data.length);
          return response.data[randomIndex];
        };
        setRecommendItem(getRandomItem());
      })
      .catch(error => {
        // Handle errors
        setIsLoaded(false);
        setError(error);
      });
  }, []);

  // Handle search input changes
  const handleSearch = (text) => {
    setSearch(text);
    // Filter data based on search query
    const filtered = data.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));
    setFilteredData(filtered);
  };

  // Define filter button data
  const filterBtn = [
    { type: "House", icon: "home-outline" },
    { type: "Apartment", icon: "business-outline" },
    { type: "Villa", icon: "laptop-outline" },
  ];

  // Handle filter button press
  const filterPress = (type) => {
    // Filter data based on selected type
    let filtered = data.filter(item => item.category.toLowerCase().includes(type.toLowerCase()));
    setFilteredData(filtered);
    setIsClicked(type); // Update button click state
  };

  // Render each item in the filtered data list
  const filterItem = ({ item }) => (
    <CardItem properties={item} navigation={navigation} />
  );

  // Render each item in the sale list
  const saleItem = ({ item }) => (
    <SaleCardItem properties={item} navigation={navigation} isLike={false} />
  );

  // Display data based on the current state
  const displayDataContainer = (error, isLoaded, displayData, renderItem) => {
    if (error) {
      // Display error message
      return (
        <View style={styles.messageContainer}>
          <Text>Error: {error.message}</Text>
        </View>
      );
    } else if (!isLoaded) {
      // Display loading message
      return (
        <View style={styles.messageContainer}>
          <Text>Loading...</Text>
        </View>
      );
    } else if (!displayData.length) {
      // Display no results message
      return (
        <View style={styles.messageContainer}>
          <Text>No results found</Text>
        </View>
      );
    } else {
      // Display filtered or sale items
      return (
        <FlatList
          data={displayData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={true}
        />
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>

        {/* Find Places Near You Section */}
        <View style={styles.flexCol}>
          <Text h2>Find Places Near You</Text>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={search}
            onChangeText={handleSearch}
          />
        </View>

        {/* Search by Category Section */}
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
                  color: isClicked === btn.type ? 'white' : '#00495F' // Change color based on state
                }}
                iconPosition='left'
                buttonStyle={{
                  backgroundColor: isClicked === btn.type ? '#00495F' : 'white', // Change background color based on state
                }}
                titleStyle={{
                  color: isClicked === btn.type ? 'white' : '#00495F' // Change text color based on state
                }}
                onPress={() => filterPress(btn.type)}
              />
            ))}
          </View>
          <View style={styles.flexRow}>
            {displayDataContainer(error, isLoaded, filteredData, filterItem)}
          </View>
        </View>

        {/* On Sale Section */}
        <View style={styles.flexCol}>
          <View style={styles.flexRow}>
            <Text h2>On Sale:</Text>
            <Text>See All</Text>
          </View>
          <View>
            {displayDataContainer(error, isLoaded, saleData, saleItem)}
          </View>
        </View>

        {/* Recommended for You Section */}
        <View style={styles.flexCol}>
          <View style={styles.flexRow}>
            <Text h2>Recommended for You</Text>
            <Text>See All</Text>
          </View>
          <View style={styles.flexCol}>
            {recommendItem ? <CardItem properties={recommendItem} navigation={navigation} /> : <Text>Loading...</Text>}
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
  messageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
});
