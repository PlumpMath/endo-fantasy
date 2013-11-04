module.exports = endo

function endo(fn) {
	fn = fn || id

	if (typeof fn !== 'function')
		throw new Error('endo only works with functions')

	fn.constructor = endo
	fn.concat = concater

	return fn
}

endo.empty = function() { return endo(id) }


function concater(target) {
	var source = this
	return endo(function composed(v) {
		return target(source(v))
	})
}

function id(v) {
	return v
}
