import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

interface IProps {
	title: string;
	text: string;
}

function Note(props: IProps) {
	function evaluateEquation() {
		// const result = eval(props.text);

		// Alert.alert('Result', 'Result: ' + result);

		try {
			/* Security Fix: Only allow numbers and math operators to prevent code injection */
			const sanitizedInput = props.text.replace(/[^0-9+\-*/().]/g, '');

			/* Security Fix: Using a safer method instead of eval() to prevent arbitrary code execution */
			const result = Function('"use strict";return (' + sanitizedInput + ')')();

			Alert.alert('Result', 'Result: ' + result);
		} catch (error) {
			/* Security Fix: Catch errors to prevent crashes if an invalid equation is entered */
			Alert.alert('Error', 'Invalid equation.');
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				{props.title}
			</Text>
			<Text style={styles.text}>
				{props.text}
			</Text>

			<View style={styles.evaluateContainer}>
				<Button title='Evaluate' onPress={evaluateEquation} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginTop: 5,
		marginBottom: 5,
		backgroundColor: '#fff',
		borderRadius: 5,
		borderColor: 'black',
		borderWidth: 1
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	text: {
		fontSize: 16,
	},
	evaluateContainer: {
		marginTop: 10,
		marginBottom: 10
	}
});

export default Note;