/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, {Component} from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import HealthApi from '@me/sdk-template-health-api';

interface Props {}
interface PropsState {
  permissionInfo: string;
  stepCountTodayInfo: string;
}

interface ItemProps {
  buttonText: string;
  onPressButton?: () => void;
  message?: string;
}

const healthApi = new HealthApi();

const PlaygroundItem: React.SFC<ItemProps> = props => {
  return (
      <View style={styles.columnContainer}>
          <View style={styles.columnItem}>
              <TouchableOpacity style={styles.button} onPress={props.onPressButton}>
                  <Text style={styles.buttonText}>{props.buttonText.toUpperCase()}</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.columnItem}>
              {!props.message || <Text style={styles.columnText}>{props.message}</Text>}
          </View>
      </View>
  );
};

export default class App extends Component<Props, PropsState> {
  constructor(props: object) {
    super(props);
    this.state = {
        permissionInfo: 'Please check!',
        stepCountTodayInfo: '-',
    };

    this.onTapAskPermissions = this.onTapAskPermissions.bind(this);
    this.onTapStepCountToday = this.onTapStepCountToday.bind(this);
    this.onError = this.onError.bind(this);
  }

  onTapAskPermissions() {
    healthApi
      .askPermissionFor(['stepCount'])
      .then(() => this.setState({permissionInfo: 'Permission for step count was granted.'}))
      .catch(error => this.onError(error))
  }

  onTapStepCountToday() {
    healthApi
      .getStepCountToday()
      .then(total => this.setState({stepCountTodayInfo: total.toString()}))
      .catch(error => this.onError(error))
  }

  onError(error: any) {
    Alert.alert('Error: ', JSON.stringify(error));
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <PlaygroundItem
            buttonText="ASK PERMISSIONS"
            onPressButton={this.onTapAskPermissions}
            message={this.state.permissionInfo}
        />
        <PlaygroundItem
            buttonText="GET STEP COUNT TODAY"
            onPressButton={this.onTapStepCountToday}
            message={this.state.stepCountTodayInfo}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    paddingTop: Platform.OS === 'ios' ? 24 : 0
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    borderRadius: 4,
    height: 48,
    shadowColor: '#DDDDDD',
    shadowRadius: 2,
    paddingHorizontal: 4,
    width: Dimensions.get('window').width / 2,
  },
  buttonText: {
      height: 48,
      color: '#FFFFFF',
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
  },
  columnContainer: {
      flex: 1,
      flexDirection: 'row',
      alignContent: 'stretch',
      alignItems: 'center',
  },
  columnItem: {
      alignContent: 'center',
      height: 56,
      padding: 4,
      width: Dimensions.get('window').width / 2,
  },
  columnText: {
      height: 56,
      textAlignVertical: 'center',
      alignSelf: 'center',
  },
});