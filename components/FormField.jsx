import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'

const FormField = ( {title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  const [showPassword, setshowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className={`border-2 w-full h-16 px-4 bg-black rounded-2xl items-center flex-row ${
    isFocused ? 'border-secondary' : 'border-black-200'
  }`}>
        <TextInput
        className='flex-1 text-white font-psemibold text-base'
        value ={value}
        placeholder={placeholder}
        placeholderTextColor='#7b7b8b'
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (<TouchableOpacity onPress={()=>setshowPassword(!showPassword)}>
          <Image source={!showPassword? icons.eye : icons.eyeHide} className="w-6 h-6"
          resizablemode='contain' />
        </TouchableOpacity>)}
      </View>
    </View>
  )
}

export default FormField