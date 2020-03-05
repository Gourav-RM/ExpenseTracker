import React, { Component } from 'react';
import { View, Text, Picker, TouchableHighlight } from 'react-native';
import { Provider, Card, Title, Portal, Modal, DataTable, ActivityIndicator } from 'react-native-paper';
import styles from '../styles/all-transactions-style';
import app from '../firebase/firebase-db-component';
import firebase from "firebase";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import FilterComponent from './filter-component';


export default class AllTransactionsComponent extends Component {

    static navigationOptions = {
        title: 'Transactions',
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
        console.log('constructor');
        this.currentMonth = new Date().getMonth() + 1;
        this.state = {
            mainBalance: 0,
            datatype: 'All Transactions',
            month: this.currentMonth.toString(),
            visible: false,
            open: false,
            transactions: [],
            value: 'first',
            incomeTransactions: false,
            spinnerVisible: true,
        };
        this.filters = {
            type: ['All Transactions'],
            category: ['All Categories'],
            mode: ['All Modes'],
            month: ['All Months'],
            year: ['All Years']
        };
    }


    applyFilters = () => {
        this._hideModal();
        this.setState({ filtersApplied: {} });
    }

    getAllTransactions = (filtersReceived) => {
        let filteredDataArray = [];
              
        console.log('length: '+filtersReceived);
        this.setState({ spinnerVisible: true, filters: filtersReceived });
        let query = firebase.firestore(app).collection("MoneyData").doc("9620616325").get()
            .then(doc => {
                let mainBalance = doc.data().mainBalance;
                let details = doc.data().transactions;
                details.forEach((item, index) => {
                    console.log('type from db:'+item.type+' ');
                    if(filtersReceived){
                        if(filtersReceived.type.includes(item.type) || filtersReceived.type.includes('All Transactions')){
                            filteredDataArray.push(item);
                        }
                    }else{
                        filteredDataArray.push(item); 
                    }
                })
                this.setState({ transactions: filteredDataArray, mainBalance: mainBalance, spinnerVisible: false });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentWillUnmount = () => {
        console.log('hahaha unmount');
        const { params } = this.props.navigation.state;
        params.reloadHome();
    }
    componentDidMount = () => {
        console.log('mount');
        this.getAllTransactions();
        console.log('mount end');

    }
    navigateToTransactionDetails = (item) => {
        if (!this.state.spinnerVisible) {
            console.log('spinner: ' + this.state.spinnerVisible);

            this.props.navigation.navigate('TransactionDetails', { reloadAllTransactions: this.getAllTransactions.bind(this), transaction: item, mainBalance: this.state.mainBalance, filtersFromTransaction: this.filters });
        }
    }
    dataGenerator = () => {
        console.log('data generator');

        let dataArray = [];
        let selectedStyle = {};
        console.log(this.state.transactions);
        this.state.transactions.forEach((item, index) => {
                if (item.type == 'Income') {
                    selectedStyle = { color: 'green' };
                } else {
                    selectedStyle = { color: 'red' };
                }
                dataArray.push(<DataTable.Row key={index} onPress={() => this.navigateToTransactionDetails(item)}>
                    <DataTable.Cell><Text>{item.description}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text>{item.date}/{item.month}/{item.year}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={selectedStyle}>{item.amount}</Text></DataTable.Cell>
                </DataTable.Row>);
                console.log('data :' + item.amount + ' ' + item.date + ' ' + item.month + ' ' + item.description + ' ' + item.type);
        });

        return dataArray;
    }
    _hideModal = () => {
        console.log('dismissed');

        this.setState({ visible: false });
    }

    changeMonthValue = (item, index) => {
        console.log(item);
        this.setState({ month: item });
        console.log(this.state.month);
    }

    changeDatatypeValue = (item, index) => {
        this.setState({ datatype: item });
    }

    _onPressButton = () => {
        this.setState({ visible: true });
    }


    render() {
        console.log('render');
        console.log('filter:' + this.state.activeCategory);
        return (
            <Provider>
                <View>
                    <Portal>
                        <Modal visible={this.state.spinnerVisible}>
                            <ActivityIndicator animating={this.state.animating} size="large" color="#ff0000" />
                        </Modal>
                    </Portal>
                </View>
                <View style={styles.FilterButtonContainer}>
                    <TouchableHighlight onPress={this._onPressButton} underlayColor="grey">
                        <View style={styles.Button}>
                            <Text style={styles.ButtonText}>Sort <Icon name="sort" size={20} /></Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => { this.props.navigation.navigate('Filter', { filtersFromTransaction: this.filters, reloadAllTransactions: this.getAllTransactions.bind(this) }) }} underlayColor="grey">
                        <View style={styles.Button}>
                            <Text style={styles.ButtonText}>Filter <Icon name="filter-outline" size={20} /></Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <Card elevation={10}>
                    <Card.Content>
                        <Title style={styles.CardTitle}>{this.state.datatype}</Title>
                        <DataTable style={styles.DataTableContainer}>
                            <DataTable.Header>
                                <DataTable.Title style={styles.DataTableHeader}>Description</DataTable.Title>
                                <DataTable.Title numeric>Date</DataTable.Title>
                                <DataTable.Title numeric>Amount</DataTable.Title>
                            </DataTable.Header>
                            {this.dataGenerator()}
                        </DataTable>
                    </Card.Content>
                </Card>
                <Portal>
                    <Modal contentContainerStyle={styles.FilterModal} visible={this.state.visible} onDismiss={this._hideModal} style={{ backgroundColor: 'blue' }}>

                    </Modal>
                </Portal>
            </Provider>
        );
    }
}