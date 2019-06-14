import {Writable} from 'stream'
import CRC32 from './crc32'

export default class CRC32Writer extends Writable {

    constructor(header) {

        super({emitClose: false, autoDestroy: true})
        this.crc32 = new CRC32()
        this.header = header
    }

    _write = (chunk, encoding, callback) => {

        this.crc32.update(chunk)
        callback()
    }

    _final = (callback) => {

        if (this.header.getCRC32() !== this.crc32.getValue())
            throw 'CRC32 error'

        callback()
    }
}