'use strict'

const fs = require('fs')
const parse = require('fast-csv').parse;

class CSVReader {
  constructor(props) {
    this.data = []
    this.line_number = 0
    this.batch_id = props.batch_id
    this.file_path = props.file_path
    this.reader = fs.createReadStream(props.file_path)
  }

  read(callback) {
    this.reader
      .pipe(
        parse()
          .on('error', error => console.error(error))
          .on('data', row => {
            ++this.line_number
            if (this.line_number === 1) return

            this.data.push({
              name: row[0],
              email: row[1],
              batch_id: this.batch_id
            })
          })
          .on('end', () => {
            fs.unlinkSync(this.file_path);
            return callback(this.data)
          })
      )
  }
}

module.exports = CSVReader