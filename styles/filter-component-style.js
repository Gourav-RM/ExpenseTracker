import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    FilterContainer: {
        flexDirection: 'row',
        flex:1,
        marginTop: 0
    },
    FilterModal: {
        flex:1,
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