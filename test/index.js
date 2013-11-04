var test = require('tape')
var endo = require('../endo')

function add(b) {
	return function(a) {
		return a + b
	}
}

function multi(b) {
	return function(a) {
		return a * b
	}
}

test('Shares functions', function(t) {
	t.plan(1)
	t.equal(endo().concat, endo().concat)
})

test('Has the endo constructor', function(t) {
	t.plan(1)
	t.equal(endo().constructor, endo)
})

test('.concat does function composition', function(t) {
	t.plan(3)
	var multiThenAdd = endo(multi(3)).concat(add(2))
	var addThenMulti = endo(add(3)).concat(multi(2))

	t.equal(endo(add(3)).concat(add(2))(1), 6)
	t.equal(multiThenAdd(1), 5)
	t.equal(addThenMulti(1), 8)
})

test('.empty() returns the endo id function', function(t) {
	t.plan(2)
	var v = ['value']

	t.equal(v, endo.empty()(v), 'is the id function')
	t.equal(endo.empty, endo().constructor.empty, 'empty is on the constructor')
})

test('laws', function(t) {
	var a = endo(add(3))
	var b = endo(multi(2))
	var c = endo(add(9))

	test('semigroup', function(t) {
		t.plan(1)
		t.same(
			a.concat( b ).concat( c )(8),
			a.concat( b.concat( c ) )(8),
			'a.concat(b).concat(c) == a.concat(b.concat(c)'
		)
	})

	test('monoid', function(t) {
		t.plan(1)
		t.same(
			a.concat(endo.empty())(4),
			endo.empty().concat(a)(4),
			'a.concat(endo.empty()) == endo.empty().concat(a)'
		)
	})

	t.end()
})