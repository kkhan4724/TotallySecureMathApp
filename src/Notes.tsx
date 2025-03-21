import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage'; /* Security Fix: Replaced AsyncStorage with EncryptedStorage for secure data storage */
import Note from './components/Note';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from './App';

export interface INote {
	title: string;
	text: string;
}

interface IProps {
}

interface IState {
	notes: INote[];
	newNoteTitle: string;
	newNoteEquation: string;
}

type TProps = NativeStackScreenProps<TRootStackParamList, 'Notes'> & IProps;

export default class Notes extends React.Component<TProps, IState> {
	constructor(props: Readonly<TProps>) {
		super(props);

		this.state = {
			notes: [],
			newNoteTitle: '',
			newNoteEquation: ''
		};

		this.onNoteTitleChange = this.onNoteTitleChange.bind(this);
		this.onNoteEquationChange = this.onNoteEquationChange.bind(this);
		this.addNote = this.addNote.bind(this);
	}

	public async componentDidMount() {
		const existing = await this.getStoredNotes();

		this.setState({ notes: existing });
	}

	public async componentWillUnmount() {
		this.storeNotes(this.state.notes);
	}

	private async getStoredNotes(): Promise<INote[]> {
		const suffix = this.props.route.params.user.username + '-' + this.props.route.params.user.password;

		// const value = await AsyncStorage.getItem('notes-' + suffix);
		const value = await EncryptedStorage.getItem('notes-' + suffix); /* Security Fix: Encrypted storage prevents unauthorized access */
		if (value !== null) {
			return JSON.parse(value);
		} else {
			return [];
		}
	}

	private async storeNotes(notes: INote[]) {
		const suffix = this.props.route.params.user.username + '-' + this.props.route.params.user.password;

		const jsonValue = JSON.stringify(notes);
		// await AsyncStorage.setItem('notes-' + suffix, jsonValue);
		await EncryptedStorage.setItem('notes-' + suffix, jsonValue); /* Security Fix: Storing encrypted notes */
	}

	private onNoteTitleChange(value: string) {
		/* Security Fix: Sanitizing title input to prevent injection attacks */
		const sanitizedTitle = value.replace(/[^a-zA-Z0-9 ]/g, ''); // Only allow letters, numbers, and spaces
	
		// this.setState({ newNoteTitle: value });
		this.setState({ newNoteTitle: sanitizedTitle });
	}

	private onNoteEquationChange(value: string) {
		/* Security Fix: Sanitizing equation input to prevent code injection */
		const sanitizedEquation = value.replace(/[^0-9+\-*/().]/g, ''); // Only allow numbers and math symbols
		// this.setState({ newNoteEquation: value });
		this.setState({ newNoteEquation: sanitizedEquation });
	}

	private addNote() {
		const note: INote = {
			title: this.state.newNoteTitle,
			text: this.state.newNoteEquation
		};

		if (note.title === '' || note.text === '') {
			Alert.alert('Error', 'Title and equation cannot be empty.');
			return;
		}

		this.setState({ 
			notes: this.state.notes.concat(note),
			newNoteTitle: '',
			newNoteEquation: ''
		});
	}

	public render() {
		return (
			<SafeAreaView>
				<ScrollView contentInsetAdjustmentBehavior="automatic">
					<View style={styles.container}>
						<Text style={styles.title}>
							{'Math Notes: ' + this.props.route.params.user.username}
						</Text>
						<TextInput
							style={styles.titleInput}
							value={this.state.newNoteTitle}
							onChangeText={this.onNoteTitleChange}
							placeholder="Enter your title"
						/>
						<TextInput
							style={styles.textInput}
							value={this.state.newNoteEquation}
							onChangeText={this.onNoteEquationChange}
							placeholder="Enter your math equation"
						/>
						<Button title="Add Note" onPress={this.addNote} />

						<View style={styles.notes}>
							{this.state.notes.map((note, index) => (
								<Note key={index} title={note.title} text={note.text} />
							))}
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	titleInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	},
	notes: {
		marginTop: 15
	},
});