/**
 * <HeaderBar />
 */

import React from "react";
// import Grip from '../multi-column/grip';
import DragHandle from "./component-drag-handle";
import { Edit } from "@material-ui/icons";

export default class HeaderBar extends React.Component {
  render() {
    return (
      <div
        className="toolbar-header"
        style={{ display: "flex", flexWrap: "wrap-reverse" }}
      >
        <DragHandle
          data={this.props.data}
          index={this.props.index}
          onDestroy={this.props.onDestroy}
          setAsChild={this.props.setAsChild}
          childComponent={
            <span className="preview-item-label">
              {this.props.index + 1} | {this.props.data.label}
            </span>
          }
        />
        {/* <span className="badge badge-secondary">{this.props.data.text}</span> */}
        <div className="toolbar-header-buttons">
          {this.props.data.element !== "LineBreak" && (
            <div
              className="btn is-isolated"
              onClick={this.props.editModeOn.bind(
                this.props.parent,
                this.props.data
              )}
            >
              {/* <i className="is-isolated fas fa-edit"></i> */}
              <Edit style={{ color: "#787878" }} />
            </div>
          )}
          <div
            className="btn is-isolated"
            onClick={this.props.onDestroy.bind(this, this.props.data)}
          >
            {/* <i className="is-isolated fas fa-trash"></i> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M2.5 5H4.16667H17.5"
                stroke="#787878"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.8332 4.99996V16.6666C15.8332 17.1087 15.6576 17.5326 15.345 17.8451C15.0325 18.1577 14.6085 18.3333 14.1665 18.3333H5.83317C5.39114 18.3333 4.96722 18.1577 4.65466 17.8451C4.3421 17.5326 4.1665 17.1087 4.1665 16.6666V4.99996M6.6665 4.99996V3.33329C6.6665 2.89127 6.8421 2.46734 7.15466 2.15478C7.46722 1.84222 7.89114 1.66663 8.33317 1.66663H11.6665C12.1085 1.66663 12.5325 1.84222 12.845 2.15478C13.1576 2.46734 13.3332 2.89127 13.3332 3.33329V4.99996"
                stroke="#787878"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.3335 9.16663V14.1666"
                stroke="#787878"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.6665 9.16663V14.1666"
                stroke="#787878"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div className="btn is-isolated">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M16.6667 7.5H9.16667C8.24619 7.5 7.5 8.24619 7.5 9.16667V16.6667C7.5 17.5871 8.24619 18.3333 9.16667 18.3333H16.6667C17.5871 18.3333 18.3333 17.5871 18.3333 16.6667V9.16667C18.3333 8.24619 17.5871 7.5 16.6667 7.5Z"
                stroke="#787878"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.1665 12.5H3.33317C2.89114 12.5 2.46722 12.3244 2.15466 12.0118C1.8421 11.6992 1.6665 11.2753 1.6665 10.8333V3.33329C1.6665 2.89127 1.8421 2.46734 2.15466 2.15478C2.46722 1.84222 2.89114 1.66663 3.33317 1.66663H10.8332C11.2752 1.66663 11.6991 1.84222 12.0117 2.15478C12.3242 2.46734 12.4998 2.89127 12.4998 3.33329V4.16663"
                stroke="#787878"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          {/* {!this.props.data.isContainer &&
            <DragHandle data={this.props.data} index={this.props.index} onDestroy={this.props.onDestroy} setAsChild={this.props.setAsChild} />
          } */}
        </div>
      </div>
    );
  }
}
