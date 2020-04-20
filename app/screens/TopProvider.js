import React, {useEffect} from 'react'
import {View, Text} from 'react-native'

export default function TopProvider(){
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => console.log(json))
  });

  return(
    <View>
      <Text>Top Providers</Text>
    </View>
  )
}