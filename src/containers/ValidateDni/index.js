
import React, { Component } from 'react';
import { Platform, Image, View, StyleSheet, Text, TouchableOpacity, StatusBar ,Dimensions, AsyncStorage, ActivityIndicator } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
// Actions
import { createUser } from '../../actions/User'
import { setCommunity } from '../../actions/Community'
import { upload_image } from '../../services/post'

// Components
import axios from 'axios'

import { Banner, Button, Input, ModalCustom } from '../../components';

// translate plugin
import I18n from '../../i18n';

// Assets
import close from '../../assets/icons/chevronLeft.png'

// Style
import styles from './styles'

const { width, height } = Dimensions.get('window');

class ValidateDni extends Component {
    constructor(props){
        super(props);
        this.state = {
            dni: '',
            dniError: '',
            disabled: false,
            err: true
        }
    }

    inputChange(text, type){
        this.setState({ dniError: '', disabled: false, err: false })
        this.setState({ [type] :  text })
    }

    componentWillReceiveProps(nextProsp){
        // console.log({ type: "PROPS", payload: nextProsp })
        // this.setState({ emailError: nextProsp.userStore.error })
        // this.isLogin(nextProsp.userStore.me)
    }

    register() {
       let document = this.state.dni;
       if(!document){
            this.setState({ dniError: I18n.t('DNI.TITLE'), disabled: false })
        } else {
            let email = this.props.email
            let password = this.props.password
            this.props.dispatch(createUser({email, password, document})).then((response) => {
                AsyncStorage.setItem('userPending', JSON.stringify(response)).then(() => {
                    Actions.USER_PENDING({ email: email, password: password })
                })
                
            })
        }
    }

    renderButton = () => {
        return(
            <Button 
                text={I18n.t('DNI.CONTINUE')} 
                disabled={ this.state.disabled }
                style={{  backgroundColor: (this.state.disabled) ? '#90a4ae' :'rgb(0,173,142)', borderRadius: 5, marginTop: 14, height: Dimensions.get('window').height / 15 }} 
                txtStyles={{ color: '#fff', fontSize: 14, fontWeight: '500' }} 
                action={ ()=> this.register() } />
        )
    }

    renderHeader() {
        return(
            <View style={[styles.header, stylus.statusBarBackground]}>
                <TouchableOpacity onPress={ ()=> Actions.pop() } style={{ flex: 1 }}>
                    <Image source={ close } resizeMode="contain" style={styles.headerImage} />
                </TouchableOpacity>
                <Text style={styles.headerText} >{I18n.t('DNI.TITLE') + " DNI / ID"}</Text>
                <TouchableOpacity style={{ opacity: 0, flex: 1 }}>
                    <Text>s</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return(
            <View>
                <StatusBar
                        backgroundColor={(this.props.network) ? "#00897b" : "#e53935" }
                        barStyle="light-content"
                    />

                    { this.renderHeader() }

                <View style={{ padding: '10%', paddingTop: '10%' }} >
                    <Input 
                        autoCapitalize='none'
                        value={ this.state.dni } 
                        placeholder={I18n.t('DNI.INPUT_DNI')}
                        customStyle={styles.inputDni} 
                        onChange={ (text)=> this.inputChange(text, 'dni') }/>

                        {(this.state.dniError ) ? <Input value={ this.state.dniError } customStyle={{ backgroundColor: 'transparent', borderWidth: 0, color : 'red', position: 'absolute', top: 5, width: Dimensions.get('window').width, textAlign: 'center' }} /> : null}
                    
                    { this.renderButton() }
                </View>
            </View>
        )
    }
}

const stylus = StyleSheet.create({
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? 64 : 54,
    paddingTop: (Platform.OS === 'ios') ? 12 : 0
  },
  forInput: {
      flexDirection: 'row', height: 60, alignItems: 'center', padding: 10, backgroundColor: '#00ad8e'
  }

})

function mapStateToProps(state) {
  return {
    userStore: state.user,
    network : state.user.network
  };
}

export default connect(mapStateToProps) (ValidateDni);