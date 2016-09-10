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
  TextInput,
  View
} from 'react-native'
import Button from 'apsl-react-native-button'

import $ from "jquery"

class pody extends Component {

  constructor(props) {
    super(props)
    this.state = {text: ""}
  }


  componentDidMount() {
    // require the module
    // var RNFS = require('react-native-fs')
    // var Sound = require('react-native-sound')
    //
    // // create a path you want to write to
    // var path = RNFS.DocumentDirectoryPath + '/test.txt';
    //
    // var options = {
    //   fromUrl: "https://devchat.cachefly.net/javascriptjabber/JSJ228React_Native_with_Nader_Dabit_and_Mike_Grabowski.mp3",
    //   toFile: RNFS.DocumentDirectoryPath + '/podcast.mp3',
    // }
    //
    // RNFS.downloadFile(options)
    //   .promise.then((result) => {
    //     console.log('DOWNLOAD WORKED', result)
    //
    //     RNFS.readDir(RNFS.DocumentDirectoryPath)
    //       .then((result) => {
    //         console.log('GOT RESULT', result);
    //
    //         var path = result[0].path
    //
    //         console.log(path)
    //
    //         var cast = new Sound(path, '', (error) => {
    //           if (error) {
    //             console.log('failed to load the sound', error);
    //           } else { // loaded successfully
    //             console.log('yay!')
    //             console.log(cast)
    //             cast.play((success) => {
    //               if (success) {
    //                 console.log('should be playing')
    //               } else {
    //                 console.log('failed :(')
    //               }
    //             })
    //           }
    //         });
    //
    //         // stat the first file
    //         return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    //       })
    //       .then((statResult) => {
    //         if (statResult[0].isFile()) {
    //           // if we have a file, read it
    //           return RNFS.readFile(statResult[1], 'utf8');
    //         }
    //
    //         return 'no file';
    //       })
    //       .then((contents) => {
    //         // log the file contents
    //         console.log(contents);
    //       })
    //       .catch((err) => {
    //         console.log(err.message, err.code);
    //       });
    //
    //
    //
    //
    //   });

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

  handleTextChange(text) {
    this.setState({
      text: text
    })
  }

  handleSearch() {
    const search = this.state.text
    fetch(`https://itunes.apple.com/search?media=podcast-episode&entity=podcast&term=${search}`)
      .then((response) => response.json())
      .then((responseJson) =>  {
        const results = responseJson.results.map(result => ({
          podcast: result.collectionName,
          rssUrl: result.feedUrl,
        }))
        console.log(results)
        this.setState({
          results: results
        })
      })
  }

  handlePodcastPress(podcast) {
    const url = `http://rss2json.com/api.json?rss_url=${podcast.rssUrl}`
    console.log(url)
    fetch(url)
      .then((response) => {
        console.log(response)
      })
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Search for a podcast
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.handleTextChange(text)}
          value={this.state.text}
        />
        <Button
          textStyle={{fontSize: 18}}
          onPress={this.handleSearch.bind(this)}
          >
          Search
        </Button>
        {this.renderResults()}
      </View>
    );
  }


  renderResults() {
    if (this.state.results) {
      return this.state.results.map((result, index) => {
        var podcast = result.podcast.substring(0, 30)
        if (result.podcast.length > 30) {
          podcast += '...'
        }
        return (
          <Button
            key={index}
            textStyle={{fontSize: 16}}
            onPress={() => this.handlePodcastPress(result)}
            >
            {podcast}
          </Button>
        )
      })
    }
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
