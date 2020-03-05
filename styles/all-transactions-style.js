import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    CardTitle:{
        backgroundColor:'#FF8552',
        padding:5,
        color:'white'
    },
    DataTableContainer:{
        backgroundColor:'white'
    },
    FilterButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    Button: {     
        width: 180,
        alignItems: 'center',  
        backgroundColor: '#F5F5F5'  
    },  
    ButtonText: {  
        padding: 20,  
        color: 'black',  
        fontSize: 18  
    },
    FilterContainer: {
        flexDirection: 'row',
        flex:1,
        marginTop: 0
    },
    FilterModal: {
        flex:0.8,
        backgroundColor: 'lightgrey'
    },
    FilterList: {
        flex:1
    },
    FilterOptionList: {
        flex:2,
        padding:10,
        backgroundColor: 'white'
    },
    FilterListStyleActive: {
        backgroundColor: 'white',
    },
    FilterListStyleInactive: {
        backgroundColor: 'lightgrey',
    },
    FilterOptionListContainer: {
        flexDirection: 'row'
    },
    FilterOptionListText: {
        marginTop: 7
    },

});

export default styles;