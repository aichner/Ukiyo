//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBBtn, MDBIcon } from "mdbreact";

/**
 * PARAMETERS
 * googleAnalytics: {register: Boolean!, category: String!, action: String!, label: String!, value: Int!}
 * type: "submit"
 * action
 */
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
          action: eventAction
            ? eventAction
            : this.props.name
            ? this.props.name
            : "Unnamed action",
          value: value ? value : 0,
        });
      } else {
        ReactGA.event({
          category: eventCategory ? eventCategory : "Button click",
          action: eventAction
            ? eventAction
            : this.props.name
            ? this.props.name
            : "Unnamed action",
          label,
        });
      }
    }
  };

  handleClick = (props) => {
    // Register Google Analytics button click
    this.registerGoogleAnalytics();

    // Execute functionality given by props
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    const { type, value, icon, iconType, editable, className } = this.props;

    return (
      <MDBBtn
        onClick={this.handleClick}
        type={type ? type : undefined}
        className={className}
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

export default AIButton;
