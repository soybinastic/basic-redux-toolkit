import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UserList() {
  const api = 'https://jsonplaceholder.typicode.com/users'

  const [state, setState] = useState({
    users : [],
    isLoading : false,
    errorMessage : null
  })

  const { users, isLoading, errorMessage } = state
  useEffect( () => {
    setState({
      ...state,
      isLoading : true
    })
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(api)
      setState({
        ...state,
        users: response.data,
        isLoading : false
      })
    } catch (error) {
      setState({
        ...state,
        errorMessage: error,
        isLoading : false
      })
    }
  } 

  return <>
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <p className="h3 text-primary">User list</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere labore fuga debitis repellendus cumque porro, qui repellat voluptas corporis? Placeat magnam ea enim ullam aliquid unde vero, non blanditiis perferendis.</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {
            isLoading && <>Loading...</>
          }
          {
            !isLoading && errorMessage && <p className="h3">{errorMessage}</p> 
          }
          {
            !isLoading && users.length > 0 && <>
              <table className="table table-hover text-center table-striped">
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Website</th>
                    <th>Company</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((user) => {
                      return <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.website}</td>
                        <td>{user.company.name}</td>
                        <td>{user.address.city}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </>
          }
        </div>
      </div>
    </div>
  </>
}

export default UserList