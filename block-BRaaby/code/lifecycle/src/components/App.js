import React from 'react';
import Loader from "./Loader"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faCalendarXmark,
  faMapLocation,
  faPhone,
  faLock,
} from '@fortawesome/free-solid-svg-icons';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      selected: 'name',
    };
  }

//   handleClick = (item) => {
//     this.setState({ selected: item });
//   };

  fetchRandomUser = () => {
    fetch('https://randomuser.me/api/')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data });
        this.setState({ selected: 'name' });
      })
      .then(() => console.log(this.state.data));
  };

  handleIconHover = (item) => {
    this.setState({ selected: item });
  };
  componentDidMount() {
    this.fetchRandomUser();
  }

  render() {
    const icons = {
      user: faUser,
      mail: faEnvelope,
      calendar: faCalendarXmark,
      address: faMapLocation,
      phone: faPhone,
      lock: faLock,
    };

    const { data, selected } = this.state;

    if (!data || !data.results) {
      return <Loader/>;
    }
    return (
      <div className="main-box">
        {data.results.map((post, index) => {
          return (
            <div key={index}>
              <img className="img" src={post.picture.medium} alt="pictures" />
              <div className="text-center">
                {selected === 'name' && (
                  <div>
                    <p>My Name is</p>
                    <h2>
                      {post.name.first} {post.name.last}
                    </h2>
                  </div>
                )}

                {selected === 'email' && (
                  <div>
                    <p>My Email is</p>
                    <h2>{post.email}</h2>
                  </div>
                )}
                {selected === 'dob' && (
                  <div>
                    <p>My Age is</p>
                    <h2>{post.dob.age}</h2>
                  </div>
                )}
                {selected === 'location' && (
                  <div>
                    <p>My Street is</p>
                    <h2>
                      {post.location.street.number} {post.location.street.name}{' '}
                      {post.location.city} {post.location.state}
                    </h2>
                  </div>
                )}

                {selected === 'phone' && (
                  <div>
                    <p>My Phone is</p>
                    <h2>{post.cell || 'No phone number available'}</h2>
                  </div>
                )}

                {selected === 'password' && (
                  <div>
                    <p>My Password</p>
                    <h2>{post.login.password}</h2>
                  </div>
                )}
              </div>
              <div className="all-btn-box">
                <button
                  className="btn"
                  onMouseEnter={() => this.handleIconHover('name')}
                >
                  <FontAwesomeIcon icon={icons.user} />
                </button>
                <button
                  className="btn"
                  onMouseEnter={() => this.handleIconHover('email')}
                >
                  <FontAwesomeIcon icon={icons.mail} />
                </button>
                <button
                  className="btn"
                  onMouseEnter={() => this.handleIconHover('dob')}
                >
                  <FontAwesomeIcon icon={icons.calendar} />
                </button>
                <button
                  className="btn"
                  onMouseEnter={() => this.handleIconHover('location')}
                >
                  <FontAwesomeIcon icon={icons.address} />
                </button>
                <button
                  className="btn"
                  onMouseEnter={() => this.handleIconHover('phone')}
                >
                  <FontAwesomeIcon icon={icons.phone} />
                </button>
                <button
                  className="btn"
                  onMouseEnter={() => this.handleIconHover('password')}
                >
                  <FontAwesomeIcon icon={icons.lock} />
                </button>
              </div>
            </div>
          );
        })}
        <div className="text-center">
          <button className="btn-primary" onClick={this.fetchRandomUser}>
            Random user
          </button>
        </div>
      </div>
    );
  }
}

export default App;
