import {MongoClient} from 'mongodb'

let url = 'mongodb://localhost:27017/hafifa'
// let dbInstance = null

export class db {
  static dbInstance = null
  public static getInstance(): Promise<any> {
    let dbInstance = db.dbInstance
    if(dbInstance) {
      return Promise.resolve(dbInstance)
    }

    return MongoClient.connect(url)
    .then( db => {
      dbInstance = db
      return dbInstance
    })
  }

  public static close(): void {
    let dbInstance = db.dbInstance
    if(dbInstance) {
      dbInstance.close()
      dbInstance = null
    }
  }
  
}
