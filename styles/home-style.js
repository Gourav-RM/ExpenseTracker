import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    CardsContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 7
    },
    CardTitle: {
        backgroundColor: '#FF8552',
        padding: 6,
        color: 'white'

    },
    DataTableContent1: {
        borderBottomWidth: 0,
        flexDirection:'row'
    },
    DataHeaderContent:{
        justifyContent:'center'
    },
    DataCellContent:{
        justifyContent:'center'
    },
    TransactionButtonStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    AppbarContainer: {
        backgroundColor: '#297373'
    },
    container: {
        alignItems: 'center',
        padding: 12
    },
    dataCntainer: {
        flexDirection: 'column'
    },
    MainBalanceStyle:{
        flexDirection:'row',
        justifyContent:'flex-end'
    }
});
export default styles;
