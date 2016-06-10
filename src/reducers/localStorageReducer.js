/*
 * 在React Native的持久话存储中，使用key-value的存储方式。
 * 因此每一条item都需要有一个唯一的识别标志，我们可以使用一个Date.now()来实现
 * key的唯一值
 */

const CREATE_SUCCESS = 'CREATE_SUCCESS'
const READ_SUCCESS = 'READ_SUCCESS'
const UPDATE_SUCCESS = 'UPDATE_SUCCESS'
const DELETE_SUCCESS = 'DELETE_SUCCESS'

export function add (item) {

}

export function delete (key) {

}

export function update (index, item) {

}

export function load () {

}

const initialState = {
	items: []
}

export default function reducer (state = initialState, action) {
	switch (action.type) {
		case CREATE_SUCCESS:
			return {
				items: [...state.items, action.payload.item]
			}
		case READ_SUCCESS:
			return {
				items: action.payload.items
			}
		case UPDATE_SUCCESS:
			return {
				items: updateItems(action.payload.index, action.payload.newItem)
			}
		case DELETE_SUCCESS:
			return {
				items: state.items.filter((item) => item.key !== action.payload.key)
			}
	}
}

function updateItems(index, newItem) {
	const before = state.items.slice(0, index)
	const after = state.items.slice(index + 1)
	return [...before, newItem, ...after]
}
