import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';

export default class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    } 
  }

  static getDerivedStateFromProps(props, state) {
    if (props.visible !== undefined) {
      return {
        visible: props.visible
      }
    }

    return null;
  }
  render() {
    return (
      <Modal animationType={'fade'} visible={this.state.isVisible} transparent={true} >
        <View style={styles.overlay}>
          {this.props.children}
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255, .6)',
    justifyContent: 'center'
  }
});