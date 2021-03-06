import React, { Component } from 'react';
import api from '../services/api';

import { View,FlatList ,StyleSheet,TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Tweet from '../components/Tweet';

export default class Timeline extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Inicio',
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('New')}>
            <Icon
                style={{marginRight: 20}}
                name="add-circle-outline"
                size={24}
                color={'#4BB0EE'}
            />
          </TouchableOpacity>
        )
    });

    state= {
        tweets: [],
    };

    async componentDidMount() {

        try {
            const response = await api.get('tweets');
            this.setState({ tweets: response.data });
          } catch (err) {
            console.log(err)
          }
    };

  render() {
    return (
    <View style={styles.container}> 
    
    <FlatList
        data={this.state.tweets}
        keyExtractor={tweet => tweet._id}
        renderItem={({item}) => <Tweet tweet={item}/>}
    />
    
    </View>
    

    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    }
  });
  