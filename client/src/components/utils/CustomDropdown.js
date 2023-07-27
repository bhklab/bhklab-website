/* eslint-disable react/prop-types */
// const [filterValue, setFilterValue] = useState('');
// const filterInputRef = useRef();
//
// const valueTemplate = () => {
//     return (
//         <span>Custom Content</span>
//     )
// }
//
// const filterTemplate = (options) => {
//     let {filterOptions} = options;
//
//     return (
//         <div className="flex gap-2">
//             <InputText
//					value={filterValue}
// 					ref={filterInputRef}
//					onChange={(e) => myFilterFunction(e, filterOptions)}
// 				/>
//             <Button label="Reset" onClick={() => myResetFunction(filterOptions)} />
//         </div>
//     )
// }
//
// const myResetFunction = (options) => {
//     setFilterValue('');
//     options.reset();
//     filterInputRef && filterInputRef.current.focus()
// }
//
// const myFilterFunction = (event, options) => {
//     let _filterValue = event.target.value;
//     setFilterValue(_filterValue);
//     options.filter(event);
// }
// TODO: Again not sure if this is used anywhere! Ask Parinaz for details

import React from 'react';
import styled from 'styled-components';
import { Dropdown } from 'primereact/dropdown';
import colors from '../../styles/colors';

const StyledDropdown = styled(Dropdown)`
  min-width: 200px;

  .pi {
    font-size: 0.7rem;
  }

  .p-dropdown-items .p-dropdown-item {
    color: ${colors.gray_text};
  }

  .p-dropdown-label,
  .p-dropdown-item {
    font-size: 12px;
  }
`;

function CustomDropdown(props) {
	const {
		className,
		value,
		options,
		onChange,
		placeholder,
		filter,
		disabled,
		editable,
		optionLabel,
		valueTemplate,
		tooltip,
	} = props;

	return (
		<StyledDropdown
			className={className}
			value={value}
			options={options}
			onChange={onChange}
			placeholder={placeholder}
			filter={filter}
			disabled={disabled}
			editable={editable}
			optionLabel={optionLabel}
			valueTemplate={valueTemplate}
			tooltip={tooltip}
			resetFilterOnHide
		/>
	);
}

export default CustomDropdown;
