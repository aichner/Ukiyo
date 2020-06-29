//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React, { Component } from "react";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBRow, MDBCard, MDBCol, MDBBtn } from "mdbreact";
import MDBSortable from "mdb-react-sortable";

//> CSS
import "./protopage.scss";
//#endregion

//#region > Components
class ProtoPage extends Component {
  state = {
    edit: false,
    items: [
      { key: 1 },
      { key: 2 },
      { key: 3 },
      { key: 4 },
      { key: 5 },
      { key: 6 },
    ],
  };

  componentDidMount() {
    const items = localStorage.getItem("items");

    if (items) {
      this.setState({ items: JSON.parse(localStorage.getItem("items")) });
    }
  }

  renderItems(edit) {
    return this.state.items.map((item) => {
      if (edit) {
        return <p className="SortableItem">Focken Card {item.key}</p>;
      } else {
        return (
          <p className="SortableItem unsortable" disabled>
            Focken Card {item.key}
          </p>
        );
      }
    });
  }

  swap = (newIndex, oldIndex) => {
    let items = this.state.items;

    if (newIndex >= items.length) {
      let k = newIndex - items.length + 1;
      while (k--) {
        items.push(undefined);
      }
    }

    items.splice(newIndex, 0, items.splice(oldIndex, 1)[0]);

    this.setState({ items });
  };

  render() {
    return (
      <div id="proto">
        {this.state.items && (
          <>
            <MDBBtn
              onClick={() => {
                if (this.state.edit) {
                  this.setState({ edit: false }, () => {
                    localStorage.setItem(
                      "items",
                      JSON.stringify(this.state.items)
                    );
                  });
                } else {
                  this.setState({ edit: true });
                }
              }}
              color={this.state.edit ? "success" : "primary"}
            >
              {this.state.edit ? "Save" : "Edit"}
            </MDBBtn>
            <MDBSortable
              axis="xy"
              items={this.renderItems(this.state.edit ? true : false)}
              itemClassName={
                this.state.edit ? "SortableItem" : "SortableItem unsortable"
              }
              listClassName="SortableList"
              onSortEnd={(obj, e) => {
                this.swap(obj.newIndex, obj.oldIndex);
              }}
            />
          </>
        )}
      </div>
    );
  }
}
//#endregion

//#region > Exports
export default ProtoPage;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
