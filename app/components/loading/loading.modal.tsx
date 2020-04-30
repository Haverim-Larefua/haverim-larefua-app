import React, { Component } from 'react';
import { Modal, ActivityIndicator, View, StyleSheet} from 'react-native';


interface ILoadingModalProps {
	visible: boolean
}

class LoadingModal extends Component<ILoadingModalProps> {
   render() {
      return (
            <Modal animationType = {"slide"} transparent = {false}
               visible = {this.props.visible}
               onRequestClose = {() => null }>
                <View style={styles.container}>
					<View style={styles.content}>
						<ActivityIndicator color="#95A5A6" size="large" />
					</View>
				</View>
            </Modal>
      )
   }
}
export default LoadingModal

const styles = StyleSheet.create({
			container: {
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: 'rgba(0, 0, 0, 0.4)',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			},
			content: {
				backgroundColor: 'rgba(0, 0, 0, 0.6)',
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				paddingHorizontal: 64,
				paddingVertical: 32,
				borderRadius: 16,
			}
})