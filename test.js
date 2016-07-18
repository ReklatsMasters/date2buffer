'use strict'

var test = require('tape')
var d2b = require('./')
var Buffer = require('safe-buffer').Buffer

var time1 = 1456909977176
var time2 = 1458520589912
var time1b = Buffer.from('00000153369a0658', 'hex')
var time2b = Buffer.from('00000153969a0658', 'hex')

test('encode', function (t) {

  var buf1 = d2b.encode(new Date(time1))
  var buf2 = d2b.encode(new Date(time2))

  t.ok(buf1.equals(time1b), 'low buffer < INT32')
  t.ok(buf2.equals(time2b), 'low buffer > INT32')

  t.end()
})

test('decode', function (t) {
  var dtime1 = d2b.decode(time1b)
  var dtime2 = d2b.decode(time2b)

  t.equal(dtime1.getTime(), time1, 'low buffer < INT32')
  t.equal(dtime2.getTime(), time2, 'low buffer > INT32')

  t.end()
})
