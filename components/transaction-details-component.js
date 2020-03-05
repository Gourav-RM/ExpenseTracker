import React, { Component } from 'react';
import { View, Text, Picker, Keyboard } from 'react-native';
import { Provider, Card, Title, Snackbar, Button, ActivityIndicator, Modal, TextInput, Portal } from 'react-native-paper';
import styles from '../styles/all-transactions-style';
import app from '../firebase/firebase-db-component';
import firebase from "firebase";
import DateTimePicker from 'react-native-modal-datetime-picker';


export default class TransactionDetailsComponent extends Component {
    static navigationOptions = {
        title: 'Transaction Detail',
        headerStyle: {
            backgroundColor: '#297373',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    constructor(props) {
        super(props);
        this.transaction = this.props.navigation.getParam('transaction', 'no result');
        this.mainBalance = this.props.navigation.getParam('mainBalance', 0);
        this.formattedDate = this.transaction.month + '/' + this.transaction.date + '/' + this.transaction.year;
        this.state = {
            mainBalance: this.mainBalance,
            type: this.transaction.type,
            amount: this.transaction.amount,
            description: this.transaction.description,
            transactionDate: new Date(this.formattedDate),
            paymentMode: this.transaction.mode,
            date: new Date(this.formattedDate).getDate(),
            month: new Date(this.formattedDate).getMonth() + 1,
            year: new Date(this.formattedDate).getFullYear(),
            visibleError: false,
            visibleSuccess: false,
            datePickerVisible: false,
            spinnerVisible: false
        };
        this.filters = {
            type: ['All Transactions'],
            category: ['All Categories'],
            mode: ['All Modes'],
            month: ['All Months'],
            year: ['All Years']
        };
        console.log(this.state.amount);
    }

    updateTransaction = () => {
        this.setState({spinnerVisible: true});
        Keyboard.dismiss();
        let balance = 0;
        if (this.state.type == 'Income') {
            if (this.state.amount > this.transaction.amount) {
                balance = this.state.mainBalance + (this.state.amount - this.transaction.amount);
                this.setState({ mainBalance: balance });
            } else if (this.state.amount < this.transaction.amount) {
                balance = this.state.mainBalance - (this.transaction.amount - this.state.amount);
                this.setState({ mainBalance: balance });
            }
        } else {
            if (this.state.amount > this.transaction.amount) {
                balance = this.state.mainBalance - (this.state.amount - this.transaction.amount);
                this.setState({ mainBalance: balance });
            } else if (this.state.amount < this.transaction.amount) {
                balance = this.state.mainBalance + (this.transaction.amount - this.state.amount);
                this.setState({ mainBalance: balance });
            }
        }

        firebase.firestore(app).collection("MoneyData").doc("9620616325").update({
            transactions: firebase.firestore.FieldValue.arrayRemove(this.transaction)
        })
            .then(() => {
                firebase.firestore(app).collection("MoneyData").doc("9620616325").update({
                    mainBalance: this.state.mainBalance,
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
                        console.log('from update: ' + this.state.type + ' ' + this.state.amount + ' ' + this.state.paymentMode + ' ' + this.state.date + ' ' + this.state.month + ' ' + this.state.year + ' ');
                        this.mainBalance = this.state.mainBalance;
                        this.transaction.type = this.state.type;
                        this.transaction.amount = parseInt(this.state.amount);
                        this.transaction.mode = this.state.paymentMode;
                        this.transaction.date = this.state.date;
                        this.transaction.month = this.state.month;
                        this.transaction.year = this.state.year;
                        this.transaction.description = this.state.description;
                        this.setState({spinnerVisible: false});
                        this.setState({ visibleSuccess: true });
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({ visibleError: true });
                    });
            })
            .catch((error) => {
                console.log(error);
                this.setState({ visibleError: true });
            });
    }

    deleteTransaction = () => {
        this.setState({spinnerVisible: true});
        console.log('from delete:'+this.transaction.type+' '+this.transaction.amount+' '+this.transaction.date+' '+this.transaction.month);
        
        let balance = 0;
        if (this.state.type == 'Income') {
            balance = this.state.mainBalance - this.transaction.amount;
            this.mainBalance = balance;
        } else {
            balance = this.state.mainBalance + this.transaction.amount;
            this.mainBalance = balance;
        }
        firebase.firestore(app).collection("MoneyData").doc("9620616325").update({
            mainBalance: this.mainBalance,
            transactions: firebase.firestore.FieldValue.arrayRemove(this.transaction)
        })
            .then(() => {
                console.log('there is success');
                this.setState({ visibleSuccess: true });
                this.setState({spinnerVisible: false});
                this.props.navigation.goBack();
            })
            .catch((error) => {
                console.log(error);
                this.setState({ visibleError: true });
            });
    }

    handleChange = transactionDate => {
        this.handleClose();
        this.setState({ transactionDate });
        let dateSelected = transactionDate;
        console.log('in function transactionDate: ' + transactionDate);
        console.log('in function dateSelected: ' + dateSelected);
        let date = dateSelected.getDate();
        let month = dateSelected.getMonth() + 1;
        let year = dateSelected.getFullYear();
        console.log('in function date: ' + date);
        console.log('in function month: ' + month);
        console.log('in function year: ' + year);
        this.setState({ date });
        this.setState({ month });
        this.setState({ year });
    };

    handleClose = () => {
        this.setState({ datePickerVisible: false });
    };

    handleOpen = () => {
        Keyboard.dismiss();
        this.setState({ datePickerVisible: true });
    };

    componentDidMount = () => {
        this.filters = this.props.navigation.getParam('filtersFromTransaction', this.filters);
    }

    componentWillUnmount = () => {
        const { params } = this.props.navigation.state;
        params.reloadAllTransactions(this.filters);
    }

    render() {
        const { transactionDate } = this.state;
        const value = transactionDate ? transactionDate.toLocaleString() : '';
        console.log('render');
        console.log('date:' + this.state.transactionDate);
        console.log(new Date(this.state.transactionDate).toLocaleString());

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
                            <Title style={styles.CardTitle}>Expense Details</Title>
                            <TextInput
                                style={{ backgroundColor: 'white' }}
                                label='Amount'
                                value={this.state.amount.toString()}
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
                                label='Transaction Date'
                                value={new Date(transactionDate).toLocaleDateString()}
                                onFocus={this.handleOpen}
                            />
                            <DateTimePicker
                                date={transactionDate}
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
                            <Button mode="contained" onPress={this.updateTransaction}>Update</Button>
                            <Button mode="contained" onPress={this.deleteTransaction}>Delete</Button>
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
                        Transaction updated successfully.
                    </Snackbar>
                </View>
            </Provider>
        )
    }
}