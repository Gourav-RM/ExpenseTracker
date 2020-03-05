import React, { Component } from 'react';
import styles from '../styles/home-style';
import { View, Text, ActivityIndicator } from 'react-native';
import { Button, Card, Title, DataTable, Provider, Portal, FAB, Modal } from 'react-native-paper';
import MonthlyDataComponent from './monthy-data-component';
import PieChart from 'react-native-pie-chart';
import app from '../firebase/firebase-db-component';
import firebase from "firebase";
const chart_wh = 200;
const sliceColor = ['green', 'red'];


export default class HomeComponent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            open: false,
            mainBalance: 0,
            income: 0,
            expense: 0,
            savings: 0,
            test: {},
            animating: true,
            spinnerVisible: true
        }
    }

    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#297373',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold'
        },
    };
    monthDataFilter = (transacData) => {
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        console.log('month: ' + transacData.month + ' year: ' + transacData.year + ' type: ' + transacData.type);
        console.log(typeof new Date().getMonth());
        return transacData.month == currentMonth + 1 && transacData.year == currentYear;
    }

    componentDidMount = () => {
        this.getBalanceDetails();
    }

    getBalanceDetails = () => {
        this.setState({spinnerVisible: true});
        let query = firebase.firestore(app).collection("MoneyData");
        query.get()
            .then(doc => {
                doc.forEach((item, index) => {
                    console.log('mmm:' + item.data().mainBalance);
                });
            })
            .catch(error => {
                console.log(error);
            });
        firebase.firestore(app).collection("MoneyData").doc("9620616325").get()
            .then(doc => {
                if (doc.exists) {
                    console.log('maib bal: ' + doc.data().mainBalance);
                    console.log('transactions: ' + doc.data().transactions);
                    let income = 0;
                    let expense = 0;
                    console.log('hghg:' + doc.data().transactions);

                    doc.data().transactions.filter(this.monthDataFilter).map(data => {
                        console.log('entered');
                        if (data.type == 'Income') {
                            console.log('income entered');
                            income += data.amount;
                        } else {
                            console.log('expense entered');
                            expense += data.amount;
                        }
                    });
                    let savings = income - expense;
                    let mainBalance = doc.data().mainBalance;
                    this.setState({ income: income, expense: expense, savings: savings, mainBalance: mainBalance, spinnerVisible: false });
                } else {
                    firebase.firestore().collection("MoneyData").doc("9620616325").set({
                        mainBalance: 0
                    });
                    this.setState({spinnerVisible: false});
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onMonthlyCardPressed = () => {
        this.props.navigation.navigate('Month');
    }

    render() {
        let a = 24;
        let b = 12;
        let series = [a, b];
        let data = {};
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
                    <Text>{this.state.test.date}</Text>
                </View>
                <View style={styles.CardsContainer}>
                    <View>
                        <Card elevation={10}>
                            <Card.Content>
                                <View style={styles.MainBalanceStyle}>
                                    <Text>Main Balance: {this.state.mainBalance}</Text>
                                </View>
                            </Card.Content>
                            <Card.Actions style={styles.TransactionButtonStyle}>
                                <Button onPress={() => this.props.navigation.navigate('AllTransactions', { reloadHome: this.getBalanceDetails.bind(this) })}>All Transactions</Button>
                            </Card.Actions>
                        </Card>
                    </View >
                    <View>
                        <Card elevation={7}>
                            <Card.Content>
                                <Title style={styles.CardTitle}>Current Month</Title>
                                <View style={styles.container}>
                                    <PieChart
                                        chart_wh={chart_wh}
                                        series={series}
                                        sliceColor={sliceColor}
                                        doughnut={true}
                                    />
                                </View>
                                <View>
                                    <DataTable style={styles.DataTableContent}>
                                        <DataTable.Header style={styles.DataTableContent1}>
                                            <DataTable.Title style={styles.DataHeaderContent}>Income</DataTable.Title>
                                            <DataTable.Title style={styles.DataHeaderContent}>Expense</DataTable.Title>
                                            <DataTable.Title style={styles.DataHeaderContent}>Savings</DataTable.Title>
                                        </DataTable.Header>
                                        <DataTable.Row style={styles.DataTableContent1}>
                                            <DataTable.Cell style={styles.DataCellContent}>{this.state.income}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataCellContent}>{this.state.expense}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataCellContent}>{this.state.savings}</DataTable.Cell>
                                        </DataTable.Row>
                                    </DataTable>
                                </View>
                            </Card.Content>
                            <Card.Actions style={styles.TransactionButtonStyle}>
                                <Button onPress={() => this.props.navigation.navigate('Month')}>View Transactions</Button>
                            </Card.Actions>
                        </Card>
                    </View >
                </View>
                <Portal>
                    <FAB.Group
                        open={this.state.open}
                        icon={this.state.open ? 'menu-up' : 'plus'}
                        actions={[
                            { icon: 'plus', label: 'Add Income', onPress: () => this.props.navigation.navigate('AddIncome', { reloadHome: this.getBalanceDetails.bind(this), mainBalance: this.state.mainBalance }) },
                            { icon: 'plus', label: 'Add Expense', onPress: () => this.props.navigation.navigate('AddExpense', { reloadHome: this.getBalanceDetails.bind(this), mainBalance: this.state.mainBalance }) }
                        ]}
                        onStateChange={({ open }) => this.setState({ open })}
                        onPress={() => {
                            if (this.state.open) {
                                // do something if the speed dial is open
                            }
                        }}
                    />
                </Portal>
            </Provider >
        );
    }
}  