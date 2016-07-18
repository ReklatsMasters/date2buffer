'use strict'

var Buffer = require('safe-buffer').Buffer
var SIZE = 8
var MAX_UINT32 = 0xFFFFFFFF

/**
 * encode date
 * @param date {Date}
 * @param buf {Buffer}
 * @param offset {number}
 * @returns {Buffer}
 */
exports.encode = function encode(date, buf, offset) {
  offset = offset | 0
  buf = buf || Buffer.alloc(SIZE)

  var time = date.getTime()

  var low = (time & MAX_UINT32) >>> 0
  var big = time % MAX_UINT32 - low

  buf.writeUInt32BE(big, offset)
  buf.writeUInt32BE(low, offset + 4)

  encode.bytes = SIZE
  return buf
}

/**
 * decode date
 * @param buf {Buffer}
 * @param offset {number}
 * @param end {number}
 * @returns {Date}
 */
exports.decode = function decode(buf, offset, end) {
  offset = offset | 0
  end = end | 0 || SIZE
  buf = buf.slice(offset, end)

  decode.bytes = SIZE
  return new Date(parseInt(buf.toString('hex'), 16))
}

/**
 * the amount of bytes needed to encode date
 * @returns {number}
 */
exports.encodingLength = function encodingLength() {
  return SIZE
}
