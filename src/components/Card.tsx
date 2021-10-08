import React, { useEffect } from "react";
import { Pressable, Text, Animated, Dimensions, StyleSheet } from "react-native";
import { View, ViewProps } from "./Themed";
import Colors from '../constants/Colors';

const {width} = Dimensions.get("window")
const ratio = 114/362;
export const CARD_WIDTH = width*0.8
export const CARD_HEIGHT = CARD_WIDTH * ratio
const styles=StyleSheet.create({
    card:{
        width:CARD_WIDTH,
        height:CARD_HEIGHT
    }
})

interface CardProps extends ViewProps{

}

export const Card = ({children, style}:CardProps)=>{
    
    return(
        <View style={[styles.card, style]}>
            {children}
        </View>
    )
}