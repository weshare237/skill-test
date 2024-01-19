import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import setAuthToken from '../../utils/setAuthToken'
import { SERVER_URL } from '../../constants/env'
import openNotification from '../helpers/notification'
import Wallet from '../../utils/wallet'

const userContextTemplate = {
  userInfo: String,
  userRegister: (requestData) => {},
  sendEmail: (requestData) => {},
  login: (requestData) => {}, // Duclair: Type annotations can only be used in TypeScript files.
  jwtInfo: String,
  wallet: Wallet,
}
const UserContext = React.createContext(userContextTemplate)

function UserProvider(props) {
  const { t, i18n } = useTranslation()
  const [userInfo, setUserInfo] = useState('') // Duclair: useState call is not destructured into value + setter pair
  const [jwtInfo, setJwtInfo] = useState('')
  const wallet = new Wallet()

  const userRegister = (requestData) => {
    axios.post(SERVER_URL + 'users/signup', requestData).then((response) => {
      if (response.data.response) {
        openNotification(
          t('Success'),
          t('Account successfully created!'),
          true,
          goWalletMain
        )
        localStorage.setItem(
          'userInfo',
          JSON.stringify(response.data.data.userInfo)
        )
        localStorage.setItem(
          'jwtToken',
          JSON.stringify(response.data.data.token)
        )

        if (response.data.data.keyPair) {
          localStorage.setItem(
            'privateKey',
            wallet.decrypt(response.data.data.keyPair[0].privateKey)
          )
          localStorage.setItem(
            'publicKey',
            JSON.stringify(response.data.data.keyPair[0].publicKey)
          )
        }
      } else {
        openNotification(t('Fail!'), response.data.message, false, null)
      }
    })
  }
  const sendEmail = (requestData) => {
    return axios
      .post(SERVER_URL + 'users/emailverify', requestData)
      .then((response) => {
        if (response.data.response) {
          openNotification(
            t('Success'),
            t('E-mail sent successfully'),
            true,
            null
          )
        } else {
          openNotification(t('Fail!'), t('E-mail not verified!'), false, null)
        }
      })
  }
  const login = (requestData) => {
    axios.post(SERVER_URL + 'users/login', requestData).then((response) => {
      if (response.data.response) {
        localStorage.setItem(
          'userInfo',
          JSON.stringify(response.data.data.userInfo)
        )
        localStorage.setItem(
          'jwtToken',
          JSON.stringify(response.data.data.token)
        )
        console.log(response.data.data)
        if (response.data.data.keyPair) {
          localStorage.setItem(
            'privateKey',
            wallet.decrypt(response.data.data.keyPair[0].privateKey)
          )
          localStorage.setItem(
            'publicKey',
            response.data.data.keyPair[0].publicKey
          )
        }
        openNotification(
          t('Successful'),
          t('Welcome to our site.'),
          true,
          goMain
        )
        setAuthToken(response.data.data.token)
      } else {
        openNotification(t('Login Failed'), response.data.message, false, null)
      }
    })
  }
  const goWalletMain = () => {
    window.location.href = '/walletMain'
  }
  const goMain = () => {
    window.location.href = '/'
  }

  useEffect(() => {
    setUserInfo(localStorage.getItem('userInfo'))
    setJwtInfo(localStorage.getItem('jwtToken'))
  }, [localStorage.getItem('userInfo'), localStorage.getItem('jwtToken')])

  const contextValue = useMemo(() => {
    return {
      userInfo,
      userRegister,
      sendEmail,
      jwtInfo,
      wallet,
      login,
    }
  }, [userInfo, userRegister, sendEmail, jwtInfo, wallet, login])

  return (
    // Duclair: The object passed as the value prop to the Context provider changes every render. To fix this consider wrapping it in a useMemo hook.
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext }
export default UserProvider
