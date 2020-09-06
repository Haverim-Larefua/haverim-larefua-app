import React, { Component } from 'react';
import { Modal, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { color } from '../../theme';
import { Text } from '../text/text';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ALERT_WIDTH = SCREEN_WIDTH - (SCREEN_WIDTH / 4);

interface ErrorModalProps {
	visible: boolean,
	message: string,
	handelClose: Function
}

class ErrorModal extends Component<ErrorModalProps> {
	constructor (props: ErrorModalProps) {
		super(props);
	}

	render() {
		const { visible, message, handelClose } = this.props;
		return (
			<Modal visible={visible} animationType="fade" transparent>
				<View style={styles.container}>
					<View style={styles.content}>
						<View style={styles.contentUp}>
						<Image source={require('./assets/ic-error-large.png')} style={{ tintColor: color.palette.red }}/>
						<Text style={styles.message}>{message}</Text>
						</View>
						<View style={styles.contentDown}>
							<View style={styles.separator}/>
							<TouchableOpacity style={styles.modalButton}
											onPress={ () => handelClose && handelClose()}>
								<Text style={{ color: color.palette.darkBlue, textAlign: 'center' }}>הבנתי</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}
export default ErrorModal;

const styles = StyleSheet.create({
		container: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'rgba(0, 0, 0, 0.4)',
			justifyContent: 'center',
			alignItems: 'center',
			zIndex: 10
		},
		content: {
			backgroundColor: color.palette.white,
			width: ALERT_WIDTH,
			height: SCREEN_HEIGHT / 3,
			borderRadius: 5,
		},
		contentUp: {
			flex: 0.7,
			justifyContent: 'center',
			alignItems: "center"
		},
		contentDown: {
			flex: 0.3,
			alignItems: 'center',
		},
		message: {
			color: color.palette.black,
			textAlign: 'center',
			marginTop: 15
		},
		separator: {
			borderBottomColor: color.palette.lighterGrey,
			borderBottomWidth: 1,
			width: '100%',
			marginBottom: 20
		},
		modalButton: {
			backgroundColor: color.palette.white,
			borderColor: color.palette.lighterGrey,
			borderRadius: 5,
			padding: 10,
			width: '40%',
			borderWidth: 1,
			marginBottom: 10
		}
	}
);
