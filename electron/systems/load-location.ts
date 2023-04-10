import * as fs from 'fs'

const loadLocation = (filepath: string, timeoutMS = 5_000): Promise<any> => {
  return Promise.race([

    new Promise((resolve, reject) => {
      fs.readFile(filepath, 'utf8', (err, rawdata) => {
        if (err) {
          reject(err);
        } else {
          try {
            const data = JSON.parse(rawdata);
            resolve(data);
          } catch (err) {
            reject(err);
          }
        }
      })
    }),

    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Timeout exceeded"))
      }, timeoutMS)
    })
  ])
}

export default loadLocation;