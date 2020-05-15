//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// React Prop Types
import PropTypes from "prop-types";

//> Additional
// Google Analytics
import ReactGA from "react-ga";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBBtn, MDBIcon } from "mdbreact";
//#endregion

//#region > Components
class AIButton extends React.Component {
  componentDidMount = () => {};

  registerGoogleAnalytics = (googleAnalytics) => {
    const { category, action, label, value, register } = googleAnalytics;

    // Check if click should be registered
    if (register) {
      // Check if there is a value to be set
      if (value) {
        ReactGA.event({
          category: category ? category : "Button click",
          action: action
            ? action
            : this.props.name
            ? this.props.name
            : "Unnamed action",
          value: value ? value : 0,
        });
      } else {
        ReactGA.event({
          category: category ? category : "Button click",
          action: action
            ? action
            : this.props.name
            ? this.props.name
            : "Unnamed action",
          label,
        });
      }
    }
  };

  handleClick = (props) => {
    const googleAnalytics = props.googleAnalytics;

    if (googleAnalytics) {
      // Register Google Analytics button click
      this.registerGoogleAnalytics(googleAnalytics);
    }

    // Execute functionality given by props
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    const {
      type,
      value,
      icon,
      iconType,
      editable,
      className,
      disabled,
    } = this.props;

    return (
      <MDBBtn
        onClick={this.handleClick}
        type={type ? type : undefined}
        className={className}
        disabled={disabled}
      >
        {icon && (
          <MDBIcon
            icon={icon}
            fab={iconType === "fab" ? true : false}
            far={iconType === "far" ? true : false}
          />
        )}
        {value}
      </MDBBtn>
    );
  }
}
//#endregion

//#region > PropTypes
AIButton.defaultProps = {
  color: "primary",
  editable: false,
  disabled: false,
};

AIButton.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  editable: PropTypes.bool,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  iconType: PropTypes.string,
  analytics: PropTypes.object,
};
//#endregion

//#region > Exports
export default AIButton;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
