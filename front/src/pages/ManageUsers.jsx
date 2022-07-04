import { Table } from 'antd'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import styled, { css } from 'styled-components'
import ActionSwitch from '../components/ActionSwitch'
import Footer from '../components/Footer'
import Header from '../components/Header'
import useToken from '../hooks/useToken'
import SignIn from './SignIn'
import { useUserData } from '../hooks/useUserData'
import ErrorPage from './ErrorPage'

const StyledTable = styled.div(
  () => css`
    display: block;
    margin: 10vh 5vw 0;
    min-height: 50vh;
  `
)

const ManageUsers = () => {
  const { userData } = useUserData()

  const users = [
    {
      name: 'John Brown',
      email: 'Big email Here',
      role: 'owner',
    },
    {
      name: 'John Brown',
      email: 'Big email Here',
      role: 'admin',
    },
  ]

  const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }

  let userFilterOptions = users.reduce(
    (accumulate, user) => {
      accumulate.names = [...accumulate.names, user.name]
      accumulate.emails = [...accumulate.emails, user.email]
      return accumulate
    },
    {
      names: [],
      emails: [],
    }
  )

  let { names, emails } = userFilterOptions

  names = names.filter(unique).map((name) => ({ text: name, value: name }))
  emails = emails.filter(unique).map((email) => ({ text: email, value: email }))

  userFilterOptions = { names, emails }

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      filterSearch: true,
      filterMode: 'tree',
      filters: userFilterOptions.names,
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: 'email',
      dataIndex: 'email',
      filterSearch: true,
      filterMode: 'tree',
      filters: userFilterOptions.emails,
      onFilter: (value, record) => record.email.includes(value),
    },
    {
      title: 'Admin',
      dataIndex: 'role',
      render: (record) => {
        const checked = record === 'admin'
        return <ActionSwitch checked={checked}></ActionSwitch>
      },
    },
  ]

  const data = users.map((user, index) => ({
    key: `offer-${index + 1}`,
    name: `${user.name}`,
    email: `${user.email}`,
    role: `${user.role}`,
  }))

  console.log(userData && userData.token)

  return !userData || !userData.token ? (
    <SignIn />
  ) : !(userData && userData.role === 'Admin') ? (
    <ErrorPage />
  ) : (
    <>
      <Header></Header>
      <StyledTable>
        <Table columns={columns} dataSource={data}></Table>
      </StyledTable>
      <Footer></Footer>
    </>
  )
}

export default ManageUsers
