import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { Provider, Card, Title, FAB, Portal, Modal, Button, DataTable } from 'react-native-paper';
import styles from '../styles/montly-data-style';
import MonthConstants from '../constants/month-constants';

export default class MonthlyDataComponent extends Component {

    static navigationOptions = {
        title: 'Month',
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
        this.currentMonth = new Date().getMonth() + 1;
        this.state = {
            datatype: 'All Transactions',
            month: this.currentMonth.toString(),
            visible: false,
            open: false
        };
        console.log(this.currentMonth);
    }


    _hideModal = () => {
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

    render() {
        console.log(this.state.month);
        return (
            <Provider>
                <Card elevation={10}>
                    <Card.Content>
                        <Title  style={styles.CardTitle}>{this.state.datatype}</Title>
                        <DataTable style={styles.DataTableContainer}>
                            <DataTable.Header>
                                <DataTable.Title style={styles.DataTableHeader}>Description</DataTable.Title>
                                <DataTable.Title numeric>Date</DataTable.Title>
                                <DataTable.Title numeric>Amount</DataTable.Title>
                            </DataTable.Header>

                            <DataTable.Row>
                                <DataTable.Cell>Baskin Robins's Icecream</DataTable.Cell>
                                <DataTable.Cell numeric>12/02/2020</DataTable.Cell>
                                <DataTable.Cell numeric>1250</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                                <DataTable.Cell numeric>12/02/2020</DataTable.Cell>
                                <DataTable.Cell numeric>120</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                                <DataTable.Cell numeric>12/02/2020</DataTable.Cell>
                                <DataTable.Cell numeric>120</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                                <DataTable.Cell numeric>12/02/2020</DataTable.Cell>
                                <DataTable.Cell numeric>120</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                                <DataTable.Cell numeric>12/02/2020</DataTable.Cell>
                                <DataTable.Cell numeric>120</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                                <DataTable.Cell numeric>12/02/2020</DataTable.Cell>
                                <DataTable.Cell numeric>120</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Pagination
                                page={1}
                                numberOfPages={3}
                                onPageChange={(page) => { console.log(page); }}
                                label="1-2 of 6"
                            />
                        </DataTable>
                    </Card.Content>
                </Card>

                <Portal>
                    <FAB.Group
                        open={this.state.open}
                        icon={this.state.open ? 'today' : 'filter'}
                        actions={[]}
                        onStateChange={({ open }) => this.setState({ open })}
                        onPress={() => {
                            this.setState({ visible: true });
                        }}
                    />
                    <View>
                        <Portal>
                            <Modal visible={this.state.visible} onDismiss={this._hideModal}>
                                <View>
                                    <Card>
                                        <Card.Content>
                                            <Title style={styles.CardTitle}>Apply Filters</Title>
                                            <View>
                                                <Picker selectedValue={this.state.datatype} onValueChange={this.changeDatatypeValue}>
                                                    <Picker.Item label="All Transactions" value="All Transactions" />
                                                    <Picker.Item label="Income" value="Income" />
                                                    <Picker.Item label="Expense" value="Expense" />
                                                </Picker>
                                                <Picker selectedValue={this.state.month} onValueChange={this.changeMonthValue}>
                                                    <Picker.Item label="January" value="1" />
                                                    <Picker.Item label="February" value="2" />
                                                    <Picker.Item label="March" value="3" />
                                                    <Picker.Item label="April" value="4" />
                                                    <Picker.Item label="May" value="5" />
                                                    <Picker.Item label="June" value="6" />
                                                    <Picker.Item label="July" value="7" />
                                                    <Picker.Item label="August" value="8" />
                                                    <Picker.Item label="September" value="9" />
                                                    <Picker.Item label="October" value="10" />
                                                    <Picker.Item label="November" value="11" />
                                                    <Picker.Item label="December" value="12" />
                                                </Picker>
                                                <Button mode="contained" onPress={() => console.log('Pressed')}>
                                                    Apply</Button>
                                            </View>
                                        </Card.Content>
                                    </Card>
                                </View>
                            </Modal>
                        </Portal>
                    </View>
                </Portal>
            </Provider>
        );
    }
}