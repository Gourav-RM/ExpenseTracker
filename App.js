import React, { Component } from 'react';
import HomeComponent from './components/home-component';
import MonthlyDataComponent from './components/monthy-data-component';
import { createStackNavigator }  from 'react-navigation-stack'; 
import { createAppContainer } from 'react-navigation';
import AddIncomeCategoryComponent from './components/add-income-category-component';
import * as firebase from "firebase/app";    
import "firebase/auth";
import "firebase/firestore";
import AddIncomeComponent from './components/add-income-component';
import AddExpenseComponent from './components/add-expense-component';
import AllTransactionsComponent from './components/all-transactions-component';
import TransactionDetailsComponent from './components/transaction-details-component';
import FilterComponent from './components/filter-component';

const AppNavigator = createStackNavigator(  
  {    
    Home: HomeComponent, 
    Month: MonthlyDataComponent,
    AddIncomeCategory: AddIncomeCategoryComponent,
    AddIncome: AddIncomeComponent,
    AddExpense: AddExpenseComponent,
    AllTransactions: AllTransactionsComponent,
    TransactionDetails: TransactionDetailsComponent,
    Filter: FilterComponent
  }
)

const AppContainer = createAppContainer(AppNavigator); 

export default class App extends Component {

render(){
  return(
      <AppContainer />
    );
  }
}  