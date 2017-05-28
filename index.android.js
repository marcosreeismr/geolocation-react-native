var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
} = ReactNative;

exports.framework = 'React';
exports.title = 'Geolocation';
exports.description = 'Exemplo de utilização da Geolocalização.';

exports.examples = [
  {
    title: 'navigator.geolocation',
    render: function(): React.Element<any> {
      return <Geolocation />;
    },
  }
];

class Geolocation extends React.Component {
  state = {
    initialPosition: 'Aguarde...',
    initialLatitude: 'Aguarde...',
    initialLongitude: 'Aguarde...',
    initialSpeed: 'Aguarde...',
    lastPosition: 'Aguarde...',
    lastLatitude: 'Aguarde...',
    lastLongitude: 'Aguarde...',
    lastSpeed: 'Aguarde...',
  };

  watchID: ?number = null;

  componentDidMount() {
    this.getLocationGPS();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getLocationGPS() {
    navigator.geolocation.clearWatch(this.watchID);
    this.setState({lastLatitude: 'Aguarde...', lastLongitude: 'Aguarde...', lastSpeed: 'Aguarde...', lastPosition: 'Aguarde...'});
    this.setState({initialLatitude: 'Aguarde...', initialLongitude: 'Aguarde...', initialSpeed: 'Aguarde...', initialPosition: 'Aguarde...'});
        navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialLatitude: position.coords.latitude, initialLongitude: position.coords.longitude, initialSpeed: position.coords.speed, initialPosition: 'OK'});
      },
      (error) => alert(JSON.stringify(error) + ' Não foi possível obter as coordenadas de origem!'),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastLatitude: position.coords.latitude, lastLongitude: position.coords.longitude, lastSpeed: position.coords.speed, lastPosition: 'OK'});
    });
  }

  render() {
    return (
      <View>
        <Text>
          <Text style={styles.title}>Geolocalização Inicial: </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text style={styles.title}>Latitude Inicial: </Text>
          {this.state.initialLatitude}
        </Text>
        <Text>
          <Text style={styles.title}>Longitude Inicial: </Text>
          {this.state.initialLongitude}
        </Text>
        <Text>
          <Text style={styles.title}>Speed Inicial: </Text>
          {this.state.initialSpeed}
        </Text>
        <Text>
          <Text style={styles.title}>Atual Geolocalização: </Text>
          {this.state.lastPosition}
        </Text>
        <Text>
          <Text style={styles.title}>Atual Latitude: </Text>
          {this.state.lastLatitude}
        </Text>
        <Text>
          <Text style={styles.title}>Atual Longitude: </Text>
          {this.state.lastLongitude}
        </Text>
        <Text>
          <Text style={styles.title}>Atual Speed: </Text>
          {this.state.lastSpeed}
        </Text>
        <Button title="Obter" onPress={() => { this.getLocationGPS(); }} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});

AppRegistry.registerComponent('Geolocation', () => Geolocation);