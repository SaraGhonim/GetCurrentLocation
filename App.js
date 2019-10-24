import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput,ActivityIndicator, StyleSheet ,StatusBar,Alert} from 'react-native'
import MapView ,{  ProviderPropType,Marker,Polyline,AnimatedRegion } from 'react-native-maps';
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

class Inputs extends Component {

  
   state = {
     isLoading: true,
  //latitude: 0,
  //longitude: 
    //latlng: { latitude:  31.00, longitude: 30.79 },

   latlng: new AnimatedRegion({ latitude:  31.00, longitude: 30.79 }),
            
    // {
    //     latlng: {
    //         latitude: 24.09,
    //         longitude: 32.90
    //     },
    //     title: "Best Place2",
    //     description: "Description 2",
    //     id: 2
    // }

routeCoordinates:[{ latitude:31.00, longitude: 30.79 },
                  { latitude:45.00, longitude: 75.00 },
                  { latitude:50.00, longitude: 40.00 },
                  { latitude:60.00, longitude: 50.00 }]
      
    }

  

   async componentDidMount(){
      //Geolocation.requestAuthorization();
     await this.requestLocationPermission()
      Geolocation.getCurrentPosition(info => {
  
        this.setState({
          latitude: info.coords.latitude,
          longitude:info.coords.longitude,
          isLoading:false,
        });
      
  });}
  animate=()=>
   {
    const newCoordinate = {latitude:45,  longitude:75};
    const new2={latitude:50,longitude:40}
    const new3={latitude:60,longitude:50}
    let routeCoordinates=[{ latitude:32.00, longitude: 30.79 },{latitude:45,longitude:75},{latitude:50, longitude:40},{latitude:60,longitude:50}]


    if (Platform.OS === 'android') {
       if(this.marker){
      routeCoordinates.map((item)=>{console.log(item)
        this.marker.animateMarkerToCoordinate(item, 500);})
         
        }}}

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
          console.log('You Can use The location');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }

   render() {

      return (
         <View style = {styles.container}>
           {
          (this.state.isLoading)? 
          
            <ActivityIndicator size="small" color="#90ff10" />

          : 
            <MapView
          style={styles.container}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 10.92,
            longitudeDelta: 10.921,
          }} >
      <Marker
     ref={marker => {
      this.marker = marker;
    }}
      coordinate={this.state.latlng}
      title='Club'
      //image="https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png"

       /> 
     
       
        <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />

           </MapView>
        
        }
            <TouchableOpacity
               style = {styles.submitButton}
               onPress={()=>{this.animate()} }>
               <Text style = {styles.submitButtonText}> Animate</Text>
            </TouchableOpacity>
         </View>
      )
   }
}
Inputs.propTypes = {
  provider: ProviderPropType,
};
export default Inputs

const styles = StyleSheet.create({
   container: {
     flex:1
   },
   submitButton: {
      backgroundColor: '#7b23f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})