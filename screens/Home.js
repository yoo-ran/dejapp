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
  const [isClicked, setIsClicked] = useState(false)


  useEffect(() => {
    // makes a GET request to the specified API endpoint to fetch items data.
    // a promise-based HTTP client for the browser and Node.js.
    axios.get('https://dejapi-8cfa29bb41d9.herokuapp.com/api/items')
    // This block runs when the request is successful.
      .then(response => {
        // Updates the state data with the response data
        setData(response.data);
        // Initializes filteredData with the same response data.
        setFilteredData(response.data);
        // Sets the loading state to true, indicating that the data has been loaded.
        setIsLoaded(true);

        const saleItems = response.data.filter(item => item.onsale === true);
        // This filters the response.data array to include only those items where the onsale property is true.
        // saleItems will be an array containing only the items that are currently on sale.
        
        // If there are on-sale items, it sets the state to only those items. 
        // If there are no on-sale items, it sets the state to all items from the response.
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

      // This block runs if the request fails.
      .catch(error => {
        // Sets the loading state to true, even if there is an error, to stop any loading indicators.
        setIsLoaded(true);
        // setError(error): Sets the error state with the encountered error.
        setError(error);
      });
      // With the empty dependency array [], this effect runs only once when the component mounts
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = data.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));
    setFilteredData(filtered);
  };

  const filterBtn = [
    { type: "House", icon: "home-outline" },
    { type: "Apartment", icon: "business-outline" },
    { type: "Villa", icon: "laptop-outline" },
  ];

  const filterPress = (type) => {
    let filtered = data.filter(item => item.category.toLowerCase().includes(type.toLowerCase()));
    // Converts the category property of the item to lowercase to make the comparison case-insensitive.
    // Checks if the lowercase category includes the lowercase type. If it does, the item is included in the filtered array.
    setFilteredData(filtered);
    // Updates the state filteredData with the filtered results from the data array. This will typically cause a re-render of the component to display the filtered items.
    setIsClicked(type); 
    // Updates the state isClicked with the type that was passed to filterPress. 
    // This is used to keep track of which filter button was clicked, possibly for styling or other logic.
  }

  const filterItem = ({ item }) => (
    <CardItem properties={item} navigatorRef={navigation} />
  );

  // This function defines how each item in the sale list should be rendered.
  const saleItem = ({ item }) => (
    <SaleCardItem properties={item} navigatorRef={navigation} isLike={false} />
  );

  // This function manages the display of data based on the current state of the component.
  const displayDataContainer = (error, isLoaded, displayData, navigation, renderItem) => {
    // Error State:
    // Displays an error message if there was a problem fetching the data.
    if (error) {
      return (
        <View style={styles.messageContainer}>
          <Text>Error: {error.message}</Text>
        </View>
      );

    // Loading State:
    // Displays a loading message while data is being fetched.
    } else if (!isLoaded) {
      return (
        <View style={styles.messageContainer}>
          <Text>Loading...</Text>
        </View>
      );
    // No Results State:
    // Displays a message when no results are found in the filteredData.
    } else if (!filteredData.length) {
      return (
        <View style={styles.messageContainer}>
          <Text>No results found</Text>
        </View>
      );
    // Displaying Data:
    // Uses FlatList to render a scrollable list of items:
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
              //  the map method to iterate over each element in the filterBtn array.
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
                backgroundColor: isClicked === btn.type ? '#00495F' : 'white',// Change color based on state
              }}
              titleStyle={{
                color: isClicked === btn.type ? 'white' : '#00495F' // Change text color based on state
              }}    
              onPress={() => filterPress(btn.type)}
              // Sets up a click handler for the button that calls the filterPress function with the button's type when clicked.
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
            {/* This renders the displayDataContainer function. */}
            {/* saleItem: Render function for individual sale items. */}
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

