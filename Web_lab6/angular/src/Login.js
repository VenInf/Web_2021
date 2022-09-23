import React from "react";

import "./css/Login.css";

export default class Login extends React.Component {
  render()
  {
    return (
      <div className="Login">
        <form onSubmit={this.props.login}>
          <p><input name="name" placeholder="User name"/>
            <button className="button" id="but"> + </button>
          </p>
        </form>
      </div>
  );
  }
}
