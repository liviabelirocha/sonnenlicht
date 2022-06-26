import { Table } from 'antd'
import styled, { css } from 'styled-components'
import Footer from '../components/Footer'
import Header from '../components/Header'

const ManageUsers = () => {
  const users = [
    {
      name: 'John Brown',
      address: 'Big Address Here',
      action: 'Approve',
    },
    {
      name: 'John Brown',
      address: 'Big Address Here',
      action: 'Approve',
    },
  ]

  const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }

  let userFilterOptions = users.reduce(
    (accumulate, user) => {
      accumulate.names = [...accumulate.names, user.name]
      accumulate.addresses = [...accumulate.addresses, user.address]
      return accumulate
    },
    {
      names: [],
      addresses: [],
    }
  )

  let { names, addresses } = userFilterOptions

  names = names.filter(unique).map((name) => ({ text: name, value: name }))
  addresses = addresses
    .filter(unique)
    .map((address) => ({ text: address, value: address }))

  userFilterOptions = { names, addresses }

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      filterSearch: true,
      filterMode: 'tree',
      filters: userFilterOptions.names,
      onFilter: (value, record) => {
        record.name.startsWith(value)
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filterSearch: true,
      filterMode: 'tree',
      filters: userFilterOptions.addresses,
      onFilter: (value, record) => {
        record.address.startsWith(value)
      },
    },
    {
      title: 'Ação',
      dataIndex: 'action',
    },
  ]

  const data = users.map((user, index) => ({
    key: `offer-${index + 1}`,
    name: `${user.name}`,
    address: `${user.address}`,
    action: `${user.action}`,
  }))

  const StyledTable = styled.div(
    () => css`
      display: block;
      margin: 10vh 5vw 0;
      min-height: 50vh;
    `
  )

  return (
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
