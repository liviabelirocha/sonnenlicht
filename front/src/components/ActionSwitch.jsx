import { Switch } from 'antd'
import { useState } from 'react'

const ActionSwitch = ({ checked = false }) => {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isChecked, setIsChecked ] = useState(checked)

  const handleChange = (value) => {
    setIsLoading(true)
    // make API call
    console.log("Delay for 2 second.");
    setTimeout(() => {
      console.log('loading false')
      setIsLoading(false)
      setIsChecked(value)
    }, 2000)
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
