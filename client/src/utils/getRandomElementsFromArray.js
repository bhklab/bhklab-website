/**
 *
 * @param {Array} input - an array of input elements
 * @param {number} requiredLength - the length of the subset array
 * @returns {Array} - returns a subset array of 'requiredLength' from the 'input' array
 */
function getRandomElementsFromArray(input, requiredLength) {
	if (requiredLength > input.length) return [];

	const result = [];
	const taken = new Set();

	while (result.length < requiredLength) {
		const randomIndex = Math.floor(Math.random() * input.length);
		if (!taken.has(randomIndex)) {
			taken.add(randomIndex);
			result.push(input[randomIndex]);
		}
	}
	return result;
}

export default getRandomElementsFromArray;
