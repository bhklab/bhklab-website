import React from 'react';

/**
 * A custom React component that returns
 *
 * @param {Object} props - The props that are passed to the component.
 * @param {Array} props.items - An array of items to display in the list.
 * @param {function} props.onItemClick - A callback function that is called when an item in the list is clicked.
 *
 * @returns {JSX.Element} The JSX representation of the list.
 *
 * @example
 * <ItemList items={myItems} onItemClick={handleItemClick} />
 */
const slugGeneratorHelper = (str, id, num) => {
	let url = str.toLowerCase().replaceAll('/','_').replaceAll(' ','_');
	if (id) {
		url = url + id.slice(-num, 0);
	}
	return url;
};

export default slugGeneratorHelper;
