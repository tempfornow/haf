import * as chai from "chai"
import * as chaiAsPromised from "chai-as-promised"
import { usersCol } from '../db/users';
import {db} from '../db/db'
chai.use(chaiAsPromised)
chai.should()

let {addUser, removeUser, getUser, updateUser, flushDb} = usersCol
//Flush db before tests begin
beforeEach ( () => {
  return flushDb()
})

//Close connection to db after tests end
after( () => {
  db.close()
})

describe('Add users', () => {

    it('Adding user to empty db should be fulfilled', () =>
      addUser({username: 'avi'})
      .should.be.fulfilled
    )

    it('Adding two users with different usernames to empty db should be fulfilled', () =>
      addUser({username: 'avi'})
      .then(result => addUser({username: 'benny'}))
      .should.be.fulfilled)

    it('Adding two users with same usernames to empty db should be rejected', () =>
      addUser({username: 'avi'})
      .should.be.fulfilled
      .then(result => addUser({username: 'avi'}))
      .should.be.rejected)
})

describe('Remove users', () => {
  it('Remove unexisting user from empty db should be rejected', () =>
    removeUser('avi').should.be.rejected)

  it('Remove unexisting user from non-empty db should be rejected', () =>
    addUser({username: 'avi'}).should.be.fulfilled
    .then(result => removeUser('benny'))
    .should.be.rejected)

  it('Remove existing user should be fulfilled', () =>
    addUser({username: 'avi'}).should.be.fulfilled
    .then(result => removeUser('avi'))
    .should.be.fulfilled)

  it('Remove one of two users should be fulfilled', () =>
    addUser({username: 'avi'}).should.be.fulfilled
    .then( () =>  addUser({username: 'benny'}))
    .should.be.fulfilled
    .then( () => removeUser('avi'))
    .should.be.fulfilled)

  it('Add,remove and add same user should be fulfilled', () =>
    addUser({username: 'avi'})
    .then( () => removeUser('avi'))
    .then( () => addUser({username: 'avi'}))
    .should.be.fulfilled)
})

describe('Get users', () => {
  it('Get user from empty db should be rejected', () =>
    getUser('avi').should.be.rejected
  )

  it('Add user, then get another user should be rejected', () =>
    addUser({username: 'avi'})
    .then( () => getUser('benny')).should.be.rejected
  )

  it('Add and get same user - should return the user', () =>
    addUser({username: 'avi', age: 19})
    .then( () => getUser('avi'))
    .should.eventually.deep.equal({username: 'avi', age:19})
  )

  it('Add and get two users', () =>
    addUser({username: 'avi'})
    .then( () => addUser({username: 'benny'}))
    .then( () => getUser('avi'))
    .should.eventually.deep.equal({username: 'avi'})
    .then( () => getUser('benny'))
    .should.eventually.deep.equal({username: 'benny'})
  )

  it('Add, remove and then get', () =>
    addUser({username: 'avi'})
    .then( () => removeUser('avi'))
    .then( () => getUser('avi'))
    .should.be.rejected
  )

  it('Add two users, remove one of them and then get the removed', () =>
    addUser({username: 'avi'})
    .then( () => addUser({username: 'benny'}))
    .then( () => removeUser('avi'))
    .then( () => getUser('avi'))
    .should.be.rejected
  )

  it('Add two users, remove one of them and then get the removed', () =>
    addUser({username: 'avi'})
    .then( () => addUser({username: 'benny'}))
    .then( () => removeUser('avi'))
    .then( () => getUser('benny'))
    .should.eventually.deep.equal({username: 'benny'})
  )

  it('Add, remove and add user - then get him', () =>
    addUser({username: 'avi'})
    .then( () => removeUser('avi'))
    .then( () => addUser({username: 'avi'}))
    .then( () => getUser('avi'))
    .should.eventually.deep.equal({username: 'avi'})
  )

})

describe('Update user', () => {
  it('update nonexisting user', () =>
    updateUser({username: 'avi'})
    .should.be.rejected
  )

  it('update existing user - one field', () =>
    addUser({username: 'avi', age: 15})
    .then( () => updateUser({username: 'avi', age: 89}))
    .then( () => getUser('avi'))
    .should.eventually.deep.equal({username: 'avi', age: 89})
  )

  it('update existing user - two fields', () =>
    addUser({username: 'avi', age: 15, surname: 'cohen'})
    .then( () => updateUser({username: 'avi', age: 89, surname: 'levy'}))
    .then( () => getUser('avi'))
    .should.eventually.deep.equal({username: 'avi', age: 89, surname: 'levy'})
  )

  it('update existing user - one of two fields', () =>
    addUser({username: 'avi', age: 19, surname: 'cohen'})
    .then( () => updateUser({username: 'avi', age: 89}))
    .then( () => getUser('avi'))
    .should.eventually.deep.equal({username: 'avi', age: 89, surname: 'cohen'})
  )

  it('update one of two users', () =>
    addUser({username: 'avi', age: 19, surname: 'cohen'})
    .then( () => addUser({username: 'benny', age: 26, surname: 'levy'}))
    .then( () => updateUser({username: 'avi', age: 89}))
    .then( () => getUser('avi'))
    .should.eventually.deep.equal({username: 'avi', age: 89, surname: 'cohen'})
  )

  it('update removed user', () =>
    addUser({username: 'avi', age: 19, surname: 'cohen'})
    .then( () => removeUser('avi'))
    .then( () => updateUser({username: 'avi', age: 89}))
    .should.be.rejected
  )
})
