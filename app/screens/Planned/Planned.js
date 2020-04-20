import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

export default function Planned(props){
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => console.log(json))
  });
  
  return(
    <View>
      <Text>Planned</Text>
    </View>
  )
}