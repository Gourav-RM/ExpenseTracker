import React, { Component } from 'react';
import { View, Text, Picker, Keyboard } from 'react-native';
import { Card, Title, TextInput, Button, Provider, Snackbar, Modal, Portal, ActivityIndicator } from 'react-native-paper';
import styles from '../styles/add-income-category-style';
import app from '../firebase/firebase-db-component';
import firebase from "firebase";
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class AddIncomeComponent extends Component {

    static navigationOptions = {
        title: 'Add Income',
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
            type: 'Income',
            amount: 0,
            paymentMode: 'Cash',
            description: '',
            incomeDate: undefined,
            date: '',
            month: '',
            year: '',
            visibleError: false,
            visibleSuccess: false,
            datePickerVisible: false,
            spinnerVisible: false
            
        };
        this.mainBalance= 0;
    }

    componentDidMount = () => {
        this.mainBalance = this.props.navigation.getParam('mainBalance');
    }

    componentWillUnmount = () => {
        const {params} = this.props.navigation.state;
        params.reloadHome();
    }

    validateInputData = () => {
        this.setState({spinnerVisible: true});
        if ((this.state.amount === '' || isNaN(this.state.amount)) || (this.state.date === '' || this.state.date == undefined) || (this.state.month === '' || this.state.month == undefined) || (this.state.year === '' || this.state.year == undefined)){
            console.log('failed');
            this.setState({ spinnerVisible: false, visibleError: true });
        } else {
            console.log('success');
            this.submitIncome();
        }
    }

    submitIncome = () => {
        Keyboard.dismiss();
        console.log('methd called ' + this.state.name + ' ' + this.state.frequency + ' ' + app);
        firebase.firestore(app).collection("MoneyData").doc("9620616325").update({
            mainBalance: this.mainBalance + parseInt(this.state.amount),
            transactions: firebase.firestore.FieldValue.arrayUnion({
                type: this.state.type,
                amount: parseInt(this.state.amount),
                date: this.state.date,
                month: this.state.month,
                year: this.state.year,
                mode: this.state.paymentMode,
                description: this.state.description
            })
        })
            .then(() => {
                console.log('there is success');
                this.mainBalance = this.mainBalance + parseInt(this.state.amount);
                this.setState({amount: 0,incomeDate: undefined,description: '',spinnerVisible: false, visibleSuccess: true});
            })
            .catch((error) => {
                console.log(error);
                this.setState({spinnerVisible: false});
                this.setState({ visibleError: true });
            });
    }

    handleChange = incomeDate => {
        this.handleClose();
        this.setState({ incomeDate });
        let dateSelected = new Date(incomeDate.toLocaleString());
        let date = dateSelected.getDate();
        let month = dateSelected.getMonth() + 1;
        let year = dateSelected.getFullYear();
        this.setState({ date: date });
        this.setState({ month: month });
        this.setState({ year: year });
    };

    handleClose = () => {
        this.setState({ datePickerVisible: false });
    };

    handleOpen = () => {
        Keyboard.dismiss();
        this.setState({ datePickerVisible: true });
    };

    changePaymentMode = (item, index) => {
        this.setState({ paymentMode: item });
    }

    render() {
        const { incomeDate } = this.state;
        const value = incomeDate ? incomeDate.toLocaleString() : '';
        return (
            <Provider>
                <View>
                    <Portal>
                        <Modal visible={this.state.spinnerVisible}>
                            <ActivityIndicator animating={this.state.animating} size="large" color="#ff0000" />
                        </Modal>
                    </Portal>
                </View>
                <View>
                    <Card>
                        <Card.Content>
                            <Title style={styles.CardTitle}>Income Details</Title>
                            <TextInput
                                style={{ backgroundColor: 'white' }}
                                label='Amount'
                                value={this.state.amount}
                                placeholder='Enter amount'
                                onChangeText={text => this.setState({ amount: text })}
                            />
                            <Picker selectedValue={this.state.paymentMode} onValueChange={this.changePaymentMode}>
                                <Picker.Item label="Cash" value="Cash" />
                                <Picker.Item label="Net Banking" value="Net Banking" />
                                <Picker.Item label="Digital Wallet" value="Digital Wallet" />
                                <Picker.Item label="Cheque" value="Cheque" />
                            </Picker>
                            <TextInput
                                label='Select Date'
                                value={value}
                                onFocus={this.handleOpen}
                            />
                            <DateTimePicker
                                date={incomeDate}
                                isVisible={this.state.datePickerVisible}
                                onConfirm={this.handleChange}
                                onCancel={this.handleClose}
                                mode={"date"}
                            />
                            <TextInput
                                style={{ backgroundColor: 'white' }}
                                label='Description'
                                value={this.state.description}
                                placeholder='(Optional)'
                                onChangeText={text => this.setState({ description: text })}
                            />
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
                        Some error occurred.
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
                        Income added successfully.
                    </Snackbar>
                </View>
            </Provider>
        );
    }

}