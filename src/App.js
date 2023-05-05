import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    showPassword: false,
    userList: [],
    searchInput: '',
  }

  searchUser = event => {
    const {userList, searchInput} = this.state
    this.setState({searchInput: event.target.value})
  }

  displayPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onDelete = id => {
    const {userList} = this.state
    const filteredList = userList.filter(each => each.id !== id)
    this.setState({userList: filteredList})
  }

  addWebsite = event => {
    this.setState({website: event.target.value})
  }

  addUsername = event => {
    this.setState({username: event.target.value})
  }

  addPassword = event => {
    this.setState({password: event.target.value})
  }

  onAdd = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newUser = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      userList: [...prevState.userList, newUser],
      username: '',
      password: '',
      website: '',
    }))
  }

  render() {
    const {
      userList,
      showPassword,
      username,
      password,
      website,
      searchInput,
    } = this.state
    console.log(userList)
    console.log(searchInput)
    const newList = userList.filter(each =>
      each.website.toUpperCase().includes(searchInput.toUpperCase()),
    )
    return (
      <div className="main-container">
        <div className="bg-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo-img"
          />
          <div className="get-details-container">
            <div className="inputs-container">
              <h1 className="add-pass-head">Add New Password</h1>
              <form onSubmit={this.onAdd}>
                <div className="website-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="website-img"
                  />
                  <input
                    type="text"
                    placeholder="Enter Website"
                    className="website-input"
                    value={website}
                    onChange={this.addWebsite}
                  />
                </div>
                <div className="website-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="website-img"
                  />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="website-input"
                    onChange={this.addUsername}
                    value={username}
                  />
                </div>
                <div className="website-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="website-img"
                  />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="website-input"
                    onChange={this.addPassword}
                    value={password}
                  />
                </div>
                <div className="btn-container">
                  <button type="submit" className="add-btn">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-img"
            />
          </div>
          <div className="display-pass-container">
            <div className="display-sub-container">
              <div className="count-pass-container">
                <h1 className="your-password-head">Your Passwords</h1>
                <p className="count">{userList.length}</p>
              </div>
              <div className="search-password-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-logo"
                />
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  value={searchInput}
                  onChange={this.searchUser}
                />
              </div>
            </div>
            <hr />
            <div className="display-original-pass">
              <input
                type="checkbox"
                className="check-box"
                value={showPassword}
                onChange={this.displayPassword}
                id="pass"
              />
              <label htmlFor="pass">Show Passwords</label>
            </div>
            {newList.length === 0 && (
              <div className="no-password-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="password-manager-img"
                />
                <p>No Passwords</p>
              </div>
            )}
            <ul>
              {newList.length > 0 &&
                newList.map(eachUser => (
                  <li key={eachUser.id}>
                    <p className="icon">{eachUser.username[0]}</p>
                    <div className="details-container">
                      <p className="website-name">{eachUser.website}</p>
                      <p className="name">{eachUser.username}</p>
                      {showPassword ? (
                        <p className="name">{eachUser.password}</p>
                      ) : (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="star-img"
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      className="delete-btn"
                      data-testid="delete"
                      onClick={() => this.onDelete(eachUser.id)}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                        className="delete-img"
                      />
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default App
