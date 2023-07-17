/**
 * <ToolbarItem />
 */

import React from "react";
import { DragSource } from "react-dnd";
import ItemTypes from "./ItemTypes";
import ID from "./UUID";

const cardSource = {
  beginDrag(props) {
    return {
      id: ID.uuid(),
      index: -1,
      data: props.data,
      onCreate: props.onCreate,
    };
  },
};

class ToolbarItem extends React.Component {
  render() {
    const { connectDragSource, data, onClick } = this.props;
    if (!connectDragSource) return null;
    return connectDragSource(
      <div className="dragList p-0" onClick={onClick}>
        <div
          style={{
            display: "flex",
            padding: "11px 16px",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
          className={data.icon}
        >
          {/* {data.icon} */}
        </div>
        <div
          style={{
            display: "flex",
            width: 124,
            alignItems: "center",
            gap: 16,
            flexShrink: 0,
            borderLeft: "1px solid  #BCBCBC",
          }}
        >
          <div
            style={{
              paddingLeft: 16,
              color: "#46494F",
              fontFamily: "Inter",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            {data.name}
          </div>
        </div>
      </div>
    );
  }
}

export default DragSource(ItemTypes.CARD, cardSource, (connect) => ({
  connectDragSource: connect.dragSource(),
}))(ToolbarItem);
