import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'

interface ProfileCardProps {
  username?: string;
  backgroundImg?: any;
  profileImg?: any;
  email?: string;
  borderRadius?: number;
  onPress: () => void;
}


const ProfileCard = ({ username, backgroundImg, profileImg, email, borderRadius, onPress }: ProfileCardProps) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <FastImage source={backgroundImg} style={styles.image} resizeMode='cover' />
        </View>

        <View style={[styles.profileImageWrapper, { borderRadius: 65 }]}>
          <FastImage source={profileImg} style={[styles.profileImage, { borderRadius: 65 }]} resizeMode='cover' />
        </View>

        {/* <Text style={styles.emailText}>{email}</Text> */}
        <View style={styles.title}>
          <Text style={styles.titleText}>{username}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={{ color: "white" }}>LogOut</Text>
          </TouchableOpacity>
        </View>
      </View>


    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: 334,
    height: 292,
    marginLeft: 13,
    marginTop: 15,
    position: "relative",
    backgroundColor: "#93a6a990",
    paddingLeft: 8,
    paddingVertical: 10,
  },
  imageContainer: {
    width: 318,
    height: 150,
    borderRadius: 15,
    overflow: "hidden",
  },
  title: {
    alignItems: "flex-end",

  },
  titleText: {
    color: "white",
    fontSize: 25,
    fontWeight: 800,
    letterSpacing: 1,
    width: 180,
    height: 60,
    flexWrap: 'wrap',
    marginTop: 0,

  },
  image: {
    width: "100%",
    height: "100%",
  },


  profileImageWrapper: {
    position: 'absolute',
    top: 70,
    left: 20,
    width: 130,
    height: 130,
    overflow: "hidden",
    borderWidth: 0,
  },

  profileImage: {
    width: '100%',
    height: '100%',

  },
  emailText: {
    fontSize: 12,
    color: "white",
    width: 190,
    marginLeft: 147,

  },
  button: {
    backgroundColor: "#758e9290",
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: "center",
  },

})
export default ProfileCard