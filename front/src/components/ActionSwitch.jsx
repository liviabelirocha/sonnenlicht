import { Switch } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useUserData } from '../hooks/useUserData'

const ActionSwitch = ({ checked = false, id, role }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(checked)

  const { userData } = useUserData()

  const handleChange = async (value) => {
    setIsLoading(true)
    await axios.patch(
      `https://sonnenlicht-back.herokuapp.com/api/user/${id}`,
      {
        role: `${role === 'Owner' ? 'Admin' : 'Owner'}`,
      },
      {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
      }
    )
    setIsLoading(false)
    setIsChecked(value)
  }

  return (
    <Switch
      disabled={isLoading}
      checked={isChecked}
      onChange={(e) => handleChange(e)}
    />
  )
}

export default ActionSwitch
