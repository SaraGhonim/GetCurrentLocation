import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput,ActivityIndicator, StyleSheet ,StatusBar,Alert} from 'react-native'
import MapView ,{ Marker,Polyline,AnimatedRegion } from 'react-native-maps';
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

class Inputs extends Component {

   state = {
      isLoading: true,
  latitude: 0,
  longitude: 0,
  markers: [
    {
     latlng: new AnimatedRegion({ latitude:  31.00, longitude: 30.79 }),
        title: "Best Place",
        description: "Description1",
        id: 1,
        ImageSource :"https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png"
    },
    {
        latlng: {
            latitude: 24.09,
            longitude: 32.90
        },
        title: "Best Place2",
        description: "Description 2",
        id: 2
    }
],
routeCoordinates:[{latitude: 24.09,longitude: 32.90},{ latitude:  31.00,longitude: 30.79}]
      
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
     console.log('saraaaaa')
      return (
         <View style = {styles.container}>
           {
          (this.state.isLoading)? 
          
            <ActivityIndicator size="small" color="#00ff00" />

          : 
            <MapView
          style={styles.container}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 10.92,
            longitudeDelta: 10.921,
          }} >
     {this.state.markers.map((marker1) => (
      <Marker
      identifier="DestMarker"

      coordinate={marker1.latlng}
      title={marker1.title}
      description={marker1.description}
      image={marker1.ImageSource}
      width={48}
      height={48}

       /> 
     
       ))}
       {this.state.markers.map((marker2) => (
      <Marker 
      
      coordinate={ marker2.latlng }
      title={marker2.title}
      description={marker2.description}
       /> 
     
       ))}
        <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />

           </MapView>
        
        }
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
     flex:1
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