/**
 * <Toolbar />
 */

import React from "react";
import { injectIntl } from "react-intl";
import ToolbarItem from "./toolbar-draggable-item";
import ToolbarGroupItem from "./toolbar-group-item";

import ID from "./UUID";
import store from "./stores/store";
import { groupBy } from "./functions";

// function isDefaultItem(item) {
//   const keys = Object.keys(item);
//   return keys.filter(x => x !== 'element' && x !== 'key' && x !== 'group_name').length === 0;
// }

function buildItems(items, defaultItems) {
  if (!items) {
    return defaultItems;
  }
  return items.map((x) => {
    let found = defaultItems.find(
      (y) => x.element === y.element && y.key === x.key
    );
    if (!found) {
      found = defaultItems.find(
        (y) => (x.element || x.key) === (y.element || y.key)
      );
    }
    if (found) {
      if (x.inherited !== false) {
        found = { ...found, ...x };
      } else if (x.group_name) {
        found.group_name = x.group_name;
      }
    }
    return found || x;
  });
}

function buildGroupItems(allItems) {
  const items = allItems.filter((x) => !x.group_name);
  const gItems = allItems.filter((x) => !!x.group_name);
  const grouped = groupBy(gItems, (x) => x.group_name);
  const groupKeys = gItems
    .map((x) => x.group_name)
    .filter((v, i, self) => self.indexOf(v) === i);
  return { items, grouped, groupKeys };
}

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    const { intl } = this.props;
    const items = buildItems(props.items, this._defaultItems(intl));
    this.state = {
      items,
      selectedFieldList: "basic",
    };
    this.create = this.create.bind(this);
  }

  componentDidMount() {
    store.subscribe((state) => this.setState({ store: state }));
  }

  static _defaultItemOptions(element, intl) {
    switch (element) {
      case "Dropdown":
        return [
          {
            value: "place_holder_option_1",
            text: intl.formatMessage({ id: "place-holder-option-1" }),
            key: `dropdown_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_2",
            text: intl.formatMessage({ id: "place-holder-option-2" }),
            key: `dropdown_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_3",
            text: intl.formatMessage({ id: "place-holder-option-3" }),
            key: `dropdown_option_${ID.uuid()}`,
          },
        ];
      case "Tags":
        return [
          {
            value: "place_holder_tag_1",
            text: intl.formatMessage({ id: "place-holder-tag-1" }),
            key: `tags_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_tag_2",
            text: intl.formatMessage({ id: "place-holder-tag-2" }),
            key: `tags_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_tag_3",
            text: intl.formatMessage({ id: "place-holder-tag-3" }),
            key: `tags_option_${ID.uuid()}`,
          },
        ];
      case "Checkboxes":
        return [
          {
            value: "place_holder_option_1",
            text: intl.formatMessage({ id: "place-holder-option-1" }),
            key: `checkboxes_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_2",
            text: intl.formatMessage({ id: "place-holder-option-2" }),
            key: `checkboxes_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_3",
            text: intl.formatMessage({ id: "place-holder-option-3" }),
            key: `checkboxes_option_${ID.uuid()}`,
          },
        ];
      case "RadioButtons":
        return [
          {
            value: "place_holder_option_1",
            text: intl.formatMessage({ id: "place-holder-option-1" }),
            key: `radiobuttons_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_2",
            text: intl.formatMessage({ id: "place-holder-option-2" }),
            key: `radiobuttons_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_3",
            text: intl.formatMessage({ id: "place-holder-option-3" }),
            key: `radiobuttons_option_${ID.uuid()}`,
          },
        ];
      default:
        return [];
    }
  }

  _defaultItems(intl) {
    return [
      {
        key: "TextInput",
        canHaveAnswer: true,
        name: "Text",
        label: intl.formatMessage({ id: "place-holder-label" }),
        icon: "fas fa-font",
        field_name: "text_input_",
      },
      {
        key: "Paragraph",
        name: "Paragraph",
        static: true,
        icon: "fas fa-paragraph",
        content: intl.formatMessage({ id: "place-holder-text" }),
      },
      {
        key: "Dropdown",
        canHaveAnswer: true,
        name: "Dropdown",
        icon: "far fa-caret-square-down",
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "dropdown_",
        options: [],
      },
      {
        key: "Checkboxes",
        canHaveAnswer: true,
        name: "Checkbox",
        icon: "far fa-check-square",
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "checkboxes_",
        options: [],
      },
      {
        key: "RadioButtons",
        canHaveAnswer: true,
        name: "Radio Button",
        icon: "far fa-dot-circle",
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "radiobuttons_",
        options: [],
      },
      {
        key: "Range",
        name: "Slider",
        icon: "fas fa-sliders-h",
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "range_",
        step: 1,
        default_value: 3,
        min_value: 1,
        max_value: 5,
        min_label: intl.formatMessage({ id: "easy" }),
        max_label: intl.formatMessage({ id: "difficult" }),
      },
      {
        key: "NumberInput",
        canHaveAnswer: true,
        name: "Number",
        label: "",
        icon: "fas fa-plus",
        field_name: "number_input_",
      },
      {
        key: "Calculation",
        canHaveAnswer: true,
        name: "Calculation",
        label: intl.formatMessage({ id: "place-holder-label" }),
        icon: "fas fa-plus",
        field_name: "number_input_",
      },
      {
        key: "Date",
        canDefaultToday: true,
        canReadOnly: true,
        dateFormat: "MM/dd/yyyy",
        timeFormat: "hh:mm aa",
        showTimeSelect: false,
        showTimeSelectOnly: false,
        showTimeInput: false,
        name: "Date",
        icon: "far fa-calendar-alt",
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "date_picker_",
      },
      {
        key: "Time",
        canDefaultToday: true,
        canReadOnly: true,
        dateFormat: "MM/dd/yyyy",
        timeFormat: "hh:mm aa",
        showTimeSelect: false,
        showTimeSelectOnly: false,
        showTimeInput: false,
        name: "Time",
        icon: "far fa-calendar-alt",
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "date_picker_",
      },
      {
        key: "DateAndTime",
        canDefaultToday: true,
        canReadOnly: true,
        dateFormat: "MM/dd/yyyy",
        timeFormat: "hh:mm aa",
        showTimeSelect: false,
        showTimeSelectOnly: false,
        showTimeInput: false,
        name: "Date & Time",
        icon: "far fa-calendar-alt",
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "date_picker_",
      },
      {
        key: "NumAndDate",
        canDefaultToday: true,
        canReadOnly: true,
        dateFormat: "MM/dd/yyyy",
        timeFormat: "hh:mm aa",
        showTimeSelect: false,
        showTimeSelectOnly: false,
        showTimeInput: false,
        name: "Num & Date",
        icon: "far fa-calendar-alt",
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "date_picker_",
      },
      {
        key: "Image",
        name: "Image",
        label: "",
        icon: "far fa-image",
        field_name: "image_",
        src: "",
      },
      {
        key: "FileUpload",
        name: "Upload File",
        icon: "fas fa-file",
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "file_upload_",
      },
      {
        key: "QRCode",
        name: "QR Code",
        label: "",
        icon: "far fa-image",
        field_name: "image_",
        src: "",
      },
      {
        key: "Remark",
        name: "Remark",
        static: true,
        icon: "fas fa-font",
        content: intl.formatMessage({ id: "place-holder-text" }),
      },
      {
        key: "Summary",
        name: "Summary",
        static: true,
        icon: "fas fa-font",
        content: intl.formatMessage({ id: "place-holder-text" }),
      },
      {
        key: "Grid",
        name: "Grid",
        static: true,
        icon: "fas fa-font",
        content: intl.formatMessage({ id: "place-holder-text" }),
      },
      {
        key: "Subform",
        name: "Subform",
        static: true,
        icon: "fas fa-font",
        content: intl.formatMessage({ id: "place-holder-text" }),
      },
    ];
  }

  create(item) {
    const { intl } = this.props;

    let elementOptions = {
      id: ID.uuid(),
      element: item.element || item.key,
      text: item.name,
      group_name: item.group_name,
      static: item.static,
      required: false,
      showDescription: item.showDescription,
    };

    if (item.element === "NumberInput" || item.key === "NumberInput") {
      elementOptions = {
        ...elementOptions,
        enforce_decimal: false,
        decimal_value: "",
        limit: "",
        lower_limit: "",
        upper_limit: "",
        measurement_unit: "",
        help_text: "",
        instructions: "",
        variable_name: "",
        sectionFilled: {
          variable_name: 0,
          enforce_decimal: 0,
          limit: 0,
          measurement_unit: 0,
          help_text: 0,
          instructions: 0,
          export_field: 0,
        },
      };
    }

    if (this.props.showDescription === true && !item.static) {
      elementOptions.showDescription = true;
    }

    if (item.type === "custom") {
      elementOptions.key = item.key;
      elementOptions.custom = true;
      elementOptions.forwardRef = item.forwardRef;
      elementOptions.bare = item.bare;
      elementOptions.props = item.props;
      elementOptions.component = item.component || null;
      elementOptions.custom_options = item.custom_options || [];
    }

    if (item.static) {
      elementOptions.bold = false;
      elementOptions.italic = false;
    }

    if (item.canHaveAnswer) {
      elementOptions.canHaveAnswer = item.canHaveAnswer;
    }

    if (item.canReadOnly) {
      elementOptions.readOnly = false;
    }

    if (item.canDefaultToday) {
      elementOptions.defaultToday = false;
    }

    if (item.content) {
      elementOptions.content = item.content;
    }

    if (item.href) {
      elementOptions.href = item.href;
    }

    if (item.inherited !== undefined) {
      elementOptions.inherited = item.inherited;
    }

    elementOptions.canHavePageBreakBefore =
      item.canHavePageBreakBefore !== false;
    elementOptions.canHaveAlternateForm = item.canHaveAlternateForm !== false;
    elementOptions.canHaveDisplayHorizontal =
      item.canHaveDisplayHorizontal !== false;
    if (elementOptions.canHaveDisplayHorizontal) {
      elementOptions.inline = item.inline;
    }
    elementOptions.canHaveOptionCorrect = item.canHaveOptionCorrect !== false;
    elementOptions.canHaveOptionValue = item.canHaveOptionValue !== false;
    elementOptions.canPopulateFromApi = item.canPopulateFromApi !== false;

    if (item.class_name) {
      elementOptions.class_name = item.class_name;
    }

    if (item.key === "Image") {
      elementOptions.src = item.src;
    }

    if (item.key === "DatePicker") {
      elementOptions.dateFormat = item.dateFormat;
      elementOptions.timeFormat = item.timeFormat;
      elementOptions.showTimeSelect = item.showTimeSelect;
      elementOptions.showTimeSelectOnly = item.showTimeSelectOnly;
      elementOptions.showTimeInput = item.showTimeInput;
    }

    if (item.key === "Download") {
      elementOptions._href = item._href;
      elementOptions.file_path = item.file_path;
    }

    if (item.key === "Range") {
      elementOptions.step = item.step;
      elementOptions.default_value = item.default_value;
      elementOptions.min_value = item.min_value;
      elementOptions.max_value = item.max_value;
      elementOptions.min_label = item.min_label;
      elementOptions.max_label = item.max_label;
    }

    if (item.element === "MultiColumnRow") {
      elementOptions.col_count = item.col_count;
    }

    if (item.defaultValue) {
      elementOptions.defaultValue = item.defaultValue;
    }

    if (item.field_name) {
      elementOptions.field_name = item.field_name + ID.uuid();
    }

    if (item.label) {
      elementOptions.label = item.label;
    }

    if (item.options) {
      if (item.options.length > 0) {
        elementOptions.options = item.options;
      } else {
        elementOptions.options = Toolbar._defaultItemOptions(
          elementOptions.element,
          intl
        );
      }
    }

    return elementOptions;
  }

  _onClick(item) {
    // ElementActions.createElement(this.create(item));
    // store.dispatch("create", this.create(item));
  }

  renderItem = (item) => (
    <ToolbarItem
      data={item}
      key={item.key}
      onClick={this._onClick.bind(this, item)}
      onCreate={this.create}
    />
  );

  render() {
    const { items, grouped, groupKeys } = buildGroupItems(this.state.items);
    return (
      <div className="d-flex-row">
        <div
          className="col-md-4 react-form-builder-toolbar float-left p-0"
          style={
            {
              // backgroundColor: "rgb(221,221,221)",
              // borderTopLeftRadius: 20,
              // borderBottomLeftRadius: 20,
            }
          }
        >
          {/* <h4 style={{ marginTop: 10 }}>
            {this.props.intl.formatMessage({ id: "toolbox" })}
          </h4> */}
          <div
            className="d-flex w-100 justify-content-between"
            style={{ marginTop: 13, marginBottom: 23 }}
          >
            <div
              onClick={() => {
                this.setState({ ...this.state, selectedFieldList: "basic" });
              }}
              className="w-50 d-flex flex-wrap justify-content-center align-items-center"
              style={{
                height: 52,
                color: "#2A2C30",
                fontSize: 16,
                fontStyle: "normal",
                fontWeight: 500,
                cursor: "pointer",
                borderBottom:
                  this.state.selectedFieldList === "basic"
                    ? "4px solid #0D487B"
                    : "1px solid #BCBCBC",
              }}
            >
              Basic Fields
            </div>
            <div
              onClick={() => {
                this.setState({ ...this.state, selectedFieldList: "library" });
              }}
              className="w-50 d-flex flex-wrap justify-content-center align-items-center"
              style={{
                height: 52,
                textAlign: "center",
                color: "#2A2C30",
                fontSize: 16,
                fontStyle: "normal",
                fontWeight: 500,
                cursor: "pointer",
                borderBottom:
                  this.state.selectedFieldList === "library"
                    ? "4px solid #0D487B"
                    : "1px solid #BCBCBC",
              }}
            >
              Field Library
            </div>
          </div>
          <div
            className="d-flex col align-items-start justify-items-between m-0 p-0"
            style={{ marginBottom: 10 }}
          >
            {this.state.selectedFieldList === "basic" ? (
              <div
                className="w-100"
                style={{
                  display: "inline-flex",
                  height: 715,
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 48,
                  flexShrink: 0,
                }}
              >
                <div className="d-flex flex-wrap" style={{ gap: 28 }}>
                  {items.slice(0, 6).map(this.renderItem)}
                </div>
                <div className="d-flex flex-wrap" style={{ gap: 28 }}>
                  {items.slice(6, 12).map(this.renderItem)}
                </div>
                <div className="d-flex flex-wrap" style={{ gap: 28 }}>
                  {items.slice(12, 19).map(this.renderItem)}
                </div>
              </div>
            ) : (
              <div
                className="w-100 d-flex justify-content-center flex-wrap align-items-center"
                style={{
                  color: "#2A2C30",
                  fontSize: 20,
                  fontStyle: "normal",
                  fontWeight: 500,
                  height: 200,
                }}
              >
                Coming Soon!
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(Toolbar);
