import React from 'react';
import { View, Button ,StyleSheet,Image,TextInput} from 'react-native';
// import all basic components
import ActionSheet from 'react-native-actionsheet';
// import ActionSheet
import { ImagePicker,Permissions } from 'expo';

var optionArray = [
  'Camera',
  'Gallery',
  'Cancel',
];
class ActionSheetTag extends React.Component {
  constructor(props){
    super(props);
    this.state={
      imageurl:null
    }
    
  }
  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };
  showActionSheet = () => {
    //To show the Bottom ActionSheet
    this.ActionSheet.show();
  };
  _pickImageGallery = async () => {
    await this.askPermissionsAsync();

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.props.image=result.uri ;
      this.setState({imageurl:result.uri})
      this.props.onChangeText(result.uri);
    }
  };
  _pickImageCamera = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.props.image=result.uri ;
      this.setState({imageurl:result.uri})
      this.props.onChangeText(result.uri);
    }
  };
  handleChange=(text)=>{
    this.setState({imageurl:text});
    this.props.onChangeText(imageurl)
  }

  render() {
    ;

    return (
      <View style={styles.containerStyle}>
          <Button style={styles.labelStyle}
            onPress={this.showActionSheet}
            title="Choose file"
          />
          <ActionSheet 
            ref={o => (this.ActionSheet = o)}
            //Title of the Bottom Sheet
            title={'Which one do you like ?'}
            //Options Array to show in bottom sheet
            options={optionArray}
            //Define cancel button index in the option array
            //this will take the cancel option in bottom and will highlight it
            cancelButtonIndex={2}
            //If you want to highlight any specific option you can use below prop
            onPress={index =>{
              if(index==1){
                this._pickImageGallery();
              }else if( index==0){
                this._pickImageCamera();
              }
            }
            }
          />

          {this.props.image &&
          <TextInput editable={false} 
                     style={styles.inputStyle} 
                     onChangeText={this.onChangeText}
                     value={this.state.imageurl}/>}
        </View>
    )
  };
}

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },  
    inputStyle: {
      color: '#000',
      paddingRight: 5,
      paddingLeft: 10,
      fontSize: 18,
      lineHeight: 23,
      flex: 2
    },
    labelStyle: {
      fontSize: 18,
      paddingLeft: 20,
      flex: 1
    },
    containerStyle: {
      height: 40,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    }

});

export { ActionSheetTag };