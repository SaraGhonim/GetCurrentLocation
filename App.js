import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput,ActivityIndicator, StyleSheet ,StatusBar,Alert} from 'react-native'
import MapView from 'react-native-maps';
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

class Inputs extends Component {

   state = {
      isLoading: true,
  latitude:0,
  longitude:0
      
    }

   async componentDidMount(){
     console.log('I am here')
     // Geolocation.requestAuthorization()
      //Geolocation.requestAuthorization();
     await this.requestLocationPermission()
      Geolocation.getCurrentPosition(info => {
  
        this.setState({
          latitude: info.coords.latitude,
          longitude:info.coords.longitude,
          isLoading:false,
        })
  
      
      });
   }

   async  requestLocationPermission() {
      try {
        let granted=0
        console.log(granted);

         granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Cool Photo App Location Permission',
            message:
              'Cool Photo App needs access to your Location ' +
              'so you can request rides.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log(granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You Can use the location');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }

   render() {
      return (
         <View style = {{flex:1}}>
           {
          (this.state.isLoading)? 
          
            <ActivityIndicator size="small" color="#00ff00" />

          : 
            <MapView
          style={{flex:1}}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />}
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () =>Alert.alert(this.state.latitude)
               }>
               <Text style = {styles.submitButtonText}> Printtt </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7b49f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})