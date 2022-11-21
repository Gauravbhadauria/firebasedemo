import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';

const Loader = ({modalVisible, setModalVisible}) => {
  return (
    <View style={{flex: 1, position: 'absolute', top: 0}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
            backgroundColor: 'rgba(0,0,0,.5)',
          }}>
          <View
            style={{
              margin: 20,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <ActivityIndicator size={'large'} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Loader;
