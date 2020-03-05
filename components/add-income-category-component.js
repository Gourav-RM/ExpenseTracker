import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { Card, Title, TextInput, Button, Provider, Snackbar } from 'react-native-paper';
import styles from '../styles/add-income-category-style';
import app from '../firebase/firebase-db-component';
import firebase from "firebase";

export default class AddIncomeCategoryComponent extends Component {

    static navigationOptions = {
        title: 'Add Income Category',
        headerStyle: {
            backgroundColor: '#297373',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold'
        },
    };


    constructor(props) {
        super(props);
        this.state = {
            frequency: 'Select Frequency',
            name: '',
            visibleError: false,
            visibleSuccess: false
        };
    }

    validateInputData = () => {
        if ((this.state.name === '' || this.state.name == undefined) || (this.state.frequency === 'Select Frequency' || this.state.frequency == undefined)) {
            console.log('failed');
            this.setState({ visibleError: true });
        } else {
            console.log('success');
            this.submitCategory();
        }
    }

    changeFrequencyValue = (item, index) => {
        this.setState({ frequency: item });
    }

    submitCategory = () => {
        console.log('methd called ' + this.state.name + ' ' + this.state.frequency + ' ' + app);
        firebase.firestore(app).collection("IncomeCategory").doc("9620616325").update({
            categories: firebase.firestore.FieldValue.arrayUnion({
                name:this.state.name,
                frequency:this.state.frequency
            })
        })
        .then(() => {
            console.log('there is success');
            this.setState({ visibleSuccess: true });
        })
         .catch((error) => {
            console.log(error);
            this.setState({ visibleError: true });
        });

        this.setState({ name: '' });
        this.setState({ frequency: 'Select Frequency' });
    }

    render() {

        let name = this.state.name;
        let frequency = this.state.frequency;
        return (
            <Provider>
                <View>
                    <Card>
                        <Card.Content>
                            <Title style={styles.CardTitle}>Add Category</Title>
                            <TextInput
                                style={{ backgroundColor: 'white' }}
                                label='Category Name'
                                value={this.state.name}
                                placeholder='e.g. : Salary,Pocket Money,Payment,etc.'
                                onChangeText={text => this.setState({ name: text })}
                            />
                            <Picker selectedValue={this.state.frequency} onValueChange={this.changeFrequencyValue}>
                                <Picker.Item label="Select Frequency" value="Select Frequency" />
                                <Picker.Item label="Random" value="Random" />
                                <Picker.Item label="Monthly" value="Monthly" />
                            </Picker>
                            <Button mode="contained" onPress={this.validateInputData}>Add</Button>
                        </Card.Content>
                    </Card>
                </View>
                <View style={styles.SnackbarStyle}>
                    <Snackbar
                        visible={this.state.visibleError}
                        onDismiss={() => this.setState({ visibleError: false })}
                        action={{
                            label: 'OK',
                            onPress: () => {
                                this.setState({ visibleError: false });
                            },
                        }}
                    >
                        Please enter the name and choose frequency.
                    </Snackbar>
                    <Snackbar
                        visible={this.state.visibleSuccess}
                        onDismiss={() => this.setState({ visibleSuccess: false })}
                        action={{
                            label: 'OK',
                            onPress: () => {
                                this.setState({ visibleSuccess: false });
                            },
                        }}
                    >
                        Category saved successfully.
                    </Snackbar>
                </View>
            </Provider>
        );
    }

}