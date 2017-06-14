import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = {
    header : {
        height: 54, 
        backgroundColor: '#00ad8e', 
        width: Dimensions.get('window').width, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
    },
    headerText: { 
        color: '#fff', 
        textAlign: 'center', 
        flex: 2, 
        fontSize: 17, 
        fontWeight: '600'
    },
    headerImage: { 
        marginLeft: 10, 
        height: 21, 
        width: 12.5 
    },
    inputDni: { 
        borderWidth: .2, 
        marginBottom: 10, 
        paddingLeft: 15,
        height: Dimensions.get('window').height / 15 
    }
}

export default styles