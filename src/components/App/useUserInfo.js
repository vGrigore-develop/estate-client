import { useState } from 'react'

export default function useUserInfo() {
  const getUserInfo = () => {
    const userInfoString = sessionStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    return userInfo
  }

  const [userInfo, setUserInfo] = useState(getUserInfo())

  const saveUserInfo = (userInfo) => {
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    setUserInfo(userInfo)
  }

  return {
    setUserInfo: saveUserInfo,
    userInfo,
  }
}
