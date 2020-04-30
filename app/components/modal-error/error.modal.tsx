import React, { Component } from 'react';
import { Modal, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import VectorIcon from 'react-native-vector-icons/FontAwesome';
import { color } from '../../theme';
import { Text } from '../text/text';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ALERT_WIDTH = SCREEN_WIDTH - (SCREEN_WIDTH / 4);

interface IErrorModalProps {
	visible: boolean,
	message: string,
	handelClose: Function
}


class ErrorModal extends Component<IErrorModalProps> {
	constructor (props: IErrorModalProps) {
		super(props);
	}

	render() {
		return (
			<Modal visible={this.props.visible} animationType="fade" transparent onRequestClose={() => null }>
				<View style={styles.container}>
					<View style={[styles.iconCircle, { top: 32, borderColor: color.palette.white }]}>
						<View style={styles.iconCircleTop}>
							<VectorIcon name="close" size={20} color='white' />
						</View>
					</View>

					<View style={[styles.content, { backgroundColor: color.palette.white }]}>
						<View style={[styles.iconCircle, { top: -32, borderColor: color.palette.white }]}>
							<View style={styles.iconCircleTop}>
								<VectorIcon name="close" size={20} color='white' />
							</View>
						</View>

						<Text style={styles.message}>{this.props.message}</Text>
						<TouchableOpacity style={styles.modalButton}
										onPress={()=>this.props.handelClose()}>
							<Text style={{color : color.palette.white, textAlign: 'center'}}>OK</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		)
	}
}
export default ErrorModal;

const styles=StyleSheet.create( {
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
			flexDirection: 'column',
			alignItems: 'center',
			width: ALERT_WIDTH,
			paddingHorizontal: 8,
			borderRadius: 16,
		},
		iconCircle: {
			height: 64,
			width: 64,
			borderRadius: 32,
			borderWidth: 4,
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		},
		iconCircleTop: {
			flex: 1,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'red',
			borderRadius: 50,
			width: '100%'
		},
		btnPrimary: {
			width: ALERT_WIDTH - 16,
			margin: 8,
			padding: 8,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 32,
		},
		message: {
			color: color.palette.black,
			textAlign: 'center',
			marginTop: -15,
			marginBottom: 15
		},
		modalButton: {
			backgroundColor: 'red',
			borderRadius: 50,
			padding: 10,
			marginBottom: 8,
			width: '100%'
		}
	}
)