import React, { useEffect } from 'react';
import { View, Text, PermissionsAndroid, Alert, Image } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const App = () => {

  let dirs = RNFetchBlob.fs.dirs

  useEffect(() => {
    downloadFile()
    testes()
 })

  async function downloadFile() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "App needs access to memory to download the file "
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert("Permission granted","Now you can download anything!");
      } else {
        Alert.alert(
          "Permission Denied!",
          "You need to give storage permission to download the file"
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }

async function testes(){
    console.log('DIR ' + dirs.MainBundleDir)

    // Write file
    await RNFetchBlob
    .config({
      indicator: true,
      path: dirs.MainBundleDir + '/files/Paul-Walker.jpeg',
    })
    .fetch('GET', 'http://www.bestriders.com.br/wp-content/uploads/2017/11/Paul-Walker-Skyline-GTR-1200x750.jpeg', {
    })
    .then((res) => {
      console.log('The file saved to ', res.path())
    })

    // Read files
    RNFetchBlob.fs.ls(dirs.MainBundleDir + '/files/')
    .then((files) => {
        console.log(files)
    })

    // Delete file
    path = dirs.MainBundleDir + '/files/test.txt'
    RNFetchBlob.fs.unlink(path)
    .then(() => { console.log('delete ' + path) })
    .catch((err) => { console.log(err) })

  }

    
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20}}> oi</Text>
      <Image source={{uri: 'file://' +  dirs.MainBundleDir + '/files/Paul-Walker.jpeg'}} height={500} width={500} style={{flex: 1, width: 500, height: 200}}/>
      </View>
  );
}

export default App;