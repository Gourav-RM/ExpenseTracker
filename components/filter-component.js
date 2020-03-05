import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import styles from '../styles/filter-component-style';
import AllTransactionsComponent from './all-transactions-component';
import { List, Button } from 'react-native-paper';


export default class FilterComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            activeCategory: 'type',
            checkStatusIncome: {
                isChecked: false,
                value: 'Income'
            },
            checkStatusExpense: {
                isChecked: false,
                value: 'Expense'
            }
        };
        this.filters = {
            type: ['All Transactions'],
            category: ['All Categories'],
            mode: ['All Modes'],
            month: ['All Months'],
            year: ['All Years']
        };
    }

    // componentDidMount = () => {
    //     this.filters = this.props.navigation.getParam('filtersFromTransaction', this.filters);
    // }

    updateFilters = () => {
        this.updateTypeFilters();
        this.props.navigation.goBack();
    }

    updateTypeFilters = () => {
        let typeFilterArray = this.filters.type;
        let all = 'All Transactions';
        if (this.state.checkStatusIncome.isChecked) {
            if (this.filters.type.includes(all)) {
                typeFilterArray = [];
                typeFilterArray.push(this.state.checkStatusIncome.value);
            } else
                typeFilterArray.push(this.state.checkStatusIncome.value);
        }else{
            let index = typeFilterArray.indexOf('Income');
            if(index >= 0){
                typeFilterArray.splice(index,1);
            }
        }

        if (this.state.checkStatusExpense.isChecked) {
            if (this.filters.type.includes(all)) {
                typeFilterArray = [];
                typeFilterArray.push(this.state.checkStatusExpense.value);
            } else {
                typeFilterArray.push(this.state.checkStatusExpense.value);
            }

        }else{
            let index = typeFilterArray.indexOf('Expense');
            if(index >= 0){
                typeFilterArray.splice(index,1);
            }
        }
        this.filters.type = typeFilterArray;
    }


    componentWillUnmount = () => {
        const { params } = this.props.navigation.state;
        params.reloadAllTransactions(this.filters);
    }

    redirectToFilter = (activeCategory, filters) => {
        let typeFilters = filters.type;
        let categoryFilters = filters.category;
        let modeFilters = filters.mode;
        let monthFilters = filters.month;
        let yearFilters = filters.year;

        if (activeCategory == "type") {
            return this.renderTypeFilterOptions(activeCategory, typeFilters);
        }
        if (activeCategory == "category") {
            return this.renderCategoryFilterOptions(activeCategory, categoryFilters);
        }
        if (activeCategory == "mode") {
            return this.renderModeFilterOptions(activeCategory, modeFilters);
        }
        if (activeCategory == "month") {
            return this.renderMonthFilterOptions(activeCategory, monthFilters);
        }
        if (activeCategory == "year") {
            return this.renderYearFilterOptions(activeCategory, yearFilters);
        }
    }

    applyFilters = () => {
        this.updateFilters();
    }

    renderTypeFilterOptions = (activeCategory, typeFilters) => {
        let allTransactions = 'All Transactions';
        let incomeTransactions = 'Income';
        let expenseTransactions = 'Expense';
        console.log('not there');
        if (!typeFilters.includes(allTransactions)) {
            console.log('there');
            this.setState({ checkStatusIncome: {isChecked: typeFilters.includes(incomeTransactions) ? true : false, value: 'Income'} });
            this.setState({ checkStatusExpense: {isChecked: typeFilters.includes(expenseTransactions) ? true : false, value: 'Expense'} });
        }
        return (
            <ScrollView>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status={this.state.checkStatusIncome.isChecked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            let status = this.state.checkStatusIncome.isChecked;
                            this.setState({ checkStatusIncome: { value: 'Income', isChecked: status ? false : true } });
                        }}
                    />
                    <Text style={styles.FilterOptionListText}>Income</Text>
                </View>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status={this.state.checkStatusExpense.isChecked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            let status = this.state.checkStatusExpense.isChecked;
                            this.setState({ checkStatusExpense: { value: 'Expense', isChecked: status ? false : true } });
                        }}
                    />
                    <Text style={styles.FilterOptionListText}>Expense</Text>
                </View>
            </ScrollView>
        );
    }
    renderCategoryFilterOptions = (activeCategory) => {
        return (
            <ScrollView>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>Category1</Text>
                </View>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>Category2</Text>
                </View>
            </ScrollView>
        );
    }

    renderModeFilterOptions = (activeCategory) => {
        return (
            <ScrollView>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>Cash</Text>
                </View>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>Net Banking</Text>
                </View>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>Digital Wallet</Text>
                </View>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>Cheque</Text>
                </View>
            </ScrollView>
        );
    }

    renderMonthFilterOptions = (activeCategory) => {
        return (
            <ScrollView>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>January</Text>
                </View>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>February</Text>
                </View>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>March</Text>
                </View>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>April</Text>
                </View>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>May</Text>
                </View>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>June</Text>
                </View>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>July</Text>
                </View>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>August</Text>
                </View>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>September</Text>
                </View>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>October</Text>
                </View>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>November</Text>
                </View>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>December</Text>
                </View>
            </ScrollView>
        );
    }

    renderYearFilterOptions = (activeCategory) => {
        return (
            <ScrollView>
                <View style={styles.FilterOptionListContainer}>
                    <Checkbox
                        status='checked'
                        onPress={() => { console.log('checked') }}
                    />
                    <Text style={styles.FilterOptionListText}>2020</Text>
                </View>
            </ScrollView>
        );
    }

    getAppliedFilters = () => {
        return filtersApplied;
    }

    render() {
        console.log('filters render');
        return (
            <View style={styles.FilterModal}>
                <View style={styles.FilterContainer}>
                    <View style={styles.FilterList}>
                        <List.Section title="Filters">
                            <List.Item title="Type" style={this.state.activeCategory == 'type' ? styles.FilterListStyleActive : styles.FilterListStyleInactive}
                                onPress={() => {
                                    console.log('super changed');
                                    this.setState({ activeCategory: "type" });
                                }} />
                            <List.Item title="Category" style={this.state.activeCategory == 'category' ? styles.FilterListStyleActive : styles.FilterListStyleInactive}
                                onPress={() => {
                                    console.log('super changed');
                                    this.setState({ activeCategory: "category" });
                                }} />
                            <List.Item title="Mode" style={this.state.activeCategory == 'mode' ? styles.FilterListStyleActive : styles.FilterListStyleInactive}
                                onPress={() => {
                                    console.log('super changed');
                                    this.setState({ activeCategory: "mode" });
                                }} />
                            <List.Item title="Month" style={this.state.activeCategory == 'month' ? styles.FilterListStyleActive : styles.FilterListStyleInactive}
                                onPress={() => {
                                    console.log('super changed');
                                    this.setState({ activeCategory: "month" });
                                }} />
                            <List.Item title="Year" style={this.state.activeCategory == 'year' ? styles.FilterListStyleActive : styles.FilterListStyleInactive}
                                onPress={() => {
                                    console.log('super changed');
                                    this.setState({ activeCategory: "year" });
                                }} />
                        </List.Section>
                    </View>
                    <View style={styles.FilterOptionList}>
                        {this.redirectToFilter(this.state.activeCategory, this.props.navigation.getParam('filtersFromTransaction', this.filters))}
                    </View>
                </View>
                <View>
                    <Button icon="camera" mode="contained" onPress={this.applyFilters}>Apply</Button>
                    <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>Reset Filters</Button>
                </View>
            </View>
        );

    }

}


