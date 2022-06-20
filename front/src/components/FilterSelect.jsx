import '../styles/components/FilterSelect.scss'

import { Select } from 'antd'

const { Option } = Select

const FilterSelect = ({
  options = [],
  selectActiveOption = 'Rent',
  title = 'Rent',
  handleChange = () => {},
}) => {
  return (
    <div className="filter_select__content">
      <p>{title}</p>
      <Select
        style={{ width: 120 }}
        defaultValue={selectActiveOption}
        placeholder={title}
        onChange={handleChange}
      >
        {options.map((option, index) => {
          return (
            <Option key={`filter-option-${index}`} value={option}>
              {option}
            </Option>
          )
        })}
      </Select>
    </div>
  )
}

export default FilterSelect
