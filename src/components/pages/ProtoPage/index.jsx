import React, { Component } from "react";

class ProtoPage extends Component {
  state = { edit: false, items: [{ pos: 1 }] };
  
  render() {
    return (
      <MDBRow>
        {this.state.items.map((item, i) => {
          return (
            <MDBCol md="4">
              <p>Test {i}</p>
            </MDBCol>
          );
        })}
      </MDBRow>
    );
  }
}

export default ProtoPage;
