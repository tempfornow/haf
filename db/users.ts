import * as  _ from 'lodash'
import { db } from './db';


export const errorCode = {
  USER_DOES_NOT_EXIST: {
    code: 0,
    description: "Requested user doesn't exist"
  },
  SERVICE_UNAVAILABLE: {
    code: 1,
    description: "Service is currently unavailable - please try again letter"
  },
  USER_ALREADY_EXIST: {
    code: 2,
    description: "Requested user already exists"
  },
  INVALID_USER_FORMAT: {
    code: 3,
    description: "Invalid user format"
  }
}

function getUsersCol() {
  
  return db.getInstance()
    .then(function(db){
      return db.collection('users')
    })
}

export class usersCol { 

  //Returns users collection

  // Checks if login details are valid
  public static verifyLogin(login) {
    return getUsersCol().
    then(col => col.count({username: login.username,
      password: login.password}))
    .catch(err => {
      throw errorCode.SERVICE_UNAVAILABLE
    })
    .then(count => {
      return count > 0
    })
  }

  public static addUser(user) {
    return getUsersCol()
    .then(col => {
        var username = user.username
        return col.findOne({username})
        .catch(err => {
          throw errorCode.SERVICE_UNAVAILABLE
        })
        .then(doc => {
          //Throw an error if user doesn't exist. Otherwise,
          //Return user
          if(doc) {
            throw errorCode.USER_ALREADY_EXIST
          } else {
            return col.insertOne(user)
          }
        })
    })
  }

  public static flushDb() {
    return getUsersCol().
    then(col => {
      return col.deleteMany({})
    })
  }

  public static removeUser(username: string) {
    //Get users collection
    return getUsersCol()
    .then(col => col.deleteOne({username}))
    .catch(err => {
      throw errorCode.SERVICE_UNAVAILABLE
    })
    .then(result => {
      //If user doesn't exist throw an error
      //Otherwise, return empty object to mark success
      if(!result.deletedCount) {
        throw errorCode.USER_DOES_NOT_EXIST
      } else {
        return {}
      }
    })
  }

  public static getUser(username: string) {
    return getUsersCol()
    .then(col => col.findOne({username}))
    .catch(err => {
      throw errorCode.SERVICE_UNAVAILABLE
    })
    .then(doc => {
      if(!doc) {
        throw errorCode.USER_DOES_NOT_EXIST
      } else {
        delete doc['_id']
        return doc
      }
    })
  }

  public static updateUser(user) {
    var username = user.username
    return getUsersCol()
    .then(col => col.updateOne({username},{$set: user}))
    .catch(err => {
      throw errorCode.SERVICE_UNAVAILABLE
    })
    .then(result => {
      //If no document was altered return error
      if(!result.matchedCount) {
        throw errorCode.USER_DOES_NOT_EXIST
      }

      if(!result.modifiedCount) {
        throw errorCode.SERVICE_UNAVAILABLE
      }

      return user
    })
  }

  public static getChunk(query) {
    let page = query.page
    let itemsPerPage = query.itemsPerPage
    let sort = {
      attr: query.attr,
      order: query.order
    }
    let subStr = query.subStr || ''

    return getUsersCol()
    .then(col => col.find({username: RegExp(subStr)}).toArray())
    .catch(err => {
      throw errorCode.SERVICE_UNAVAILABLE
    })
    .then(filtered => {
      let chunk = _.chunk(
          _.orderBy(filtered,sort.attr,sort.order),
          itemsPerPage
      )[page - 1]

      return {chunk, totalItems: filtered.length}
    })
  }
}