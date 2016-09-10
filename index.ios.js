/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class pody extends Component {


  componentDidMount() {
    // require the module
    var RNFS = require('react-native-fs');

    // create a path you want to write to
    var path = RNFS.DocumentDirectoryPath + '/test.txt';

    var options = {
      fromUrl: "https://devchat.cachefly.net/javascriptjabber/JSJ228React_Native_with_Nader_Dabit_and_Mike_Grabowski.mp3",
      toFile: RNFS.DocumentDirectoryPath + '/podcast.mp3',
    }

    RNFS.downloadFile(options)
      .promise.then((result) => {
        console.log('DOWNLOAD WORKED', result)
        
        RNFS.readDir(RNFS.DocumentDirectoryPath)
          .then((result) => {
            console.log('GOT RESULT', result);

            // stat the first file
            return Promise.all([RNFS.stat(result[0].path), result[0].path]);
          })
          .then((statResult) => {
            if (statResult[0].isFile()) {
              // if we have a file, read it
              return RNFS.readFile(statResult[1], 'utf8');
            }

            return 'no file';
          })
          .then((contents) => {
            // log the file contents
            console.log(contents);
          })
          .catch((err) => {
            console.log(err.message, err.code);
          });
      });

    // write the file
    // RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
    //   .then((success) => {
    //     console.log('FILE WRITTEN!');
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });

    // get a list of files and directories in the main bundle

  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('pody', () => pody);
