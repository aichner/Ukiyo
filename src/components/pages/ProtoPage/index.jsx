import React, { Component } from "react";
import { MDBRow, MDBCard, MDBCol, MDBBtn } from "mdbreact";
import MDBSortable from "mdb-react-sortable";

import "./protopage.scss";

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

  saveChanges(movedObject) {}

  swap = (newIndex, oldIndex) => {
    let items = this.state.items;

    if (newIndex >= items.length) {
      var k = newIndex - items.length + 1;
      while (k--) {
        items.push(undefined);
      }
    }

    items.splice(newIndex, 0, items.splice(oldIndex, 1)[0]);

    this.setState({ items });
  };

  render() {
    if (this.state.items) {
      return (
        <div>
          <div>
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
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ProtoPage;
