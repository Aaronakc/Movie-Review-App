import { Image } from "react-native";
import { BaseToast, ErrorToast, InfoToast } from "react-native-toast-message";


export const toastConfig = {

  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderBottomColor: 'green',borderBottomWidth:4,borderLeftWidth:0, justifyContent: "center", alignItems: "center",paddingLeft:60,marginHorizontal:25}}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        fontFamily:"serif"
      }}
        renderLeadingIcon={() => (
        <Image style={{width:25,height:25}} source={require('../../assets/success.png')}/>
      )}
    />
  ),
  info: (props: any) => (
    <InfoToast
      {...props}
      style={{ borderBottomColor: '#1c96c5',borderBottomWidth:4,borderLeftColor:0, justifyContent: "center", alignItems: "center",paddingLeft:60,marginHorizontal:25}}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        fontFamily:"serif"
      }}
         renderLeadingIcon={() => (
        <Image style={{width:25,height:25}} source={require('../../assets/info.png')}/>
      )}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderBottomColor: 'red',borderBottomWidth:4,borderLeftColor:0, justifyContent: "center", alignItems: "center",minHeight:0,paddingLeft:60,marginHorizontal:25}}
      contentContainerStyle={{ paddingHorizontal: 10,paddingVertical:0, }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        fontFamily:"serif"
      }}
       renderLeadingIcon={() => (
        <Image style={{width:25,height:25}} source={require('../../assets/error.png')}/>
      )}

    />
  ),
}