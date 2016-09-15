import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "tabledataTable tbody trselected": {
        "backgroundColor": "#B0BED9"
    },
    "tabledataTablestripe tbody troddselected": {
        "backgroundColor": "#acbad4"
    },
    "tabledataTabledisplay tbody troddselected": {
        "backgroundColor": "#acbad4"
    },
    "tabledataTablehover tbody tr:hover": {
        "backgroundColor": "#f6f6f6"
    },
    "tabledataTabledisplay tbody tr:hover": {
        "backgroundColor": "#f6f6f6"
    },
    "tabledataTablehover tbody tr:hoverselected": {
        "backgroundColor": "#aab7d1"
    },
    "tabledataTabledisplay tbody tr:hoverselected": {
        "backgroundColor": "#aab7d1"
    },
    "dt-toolbar dataTables_length": {
        "float": "right"
    },
    "nav ul spanmenu-item-parent": {
        "fontSize": 13
    },
    "btnbtn-defaultbtn-xs": {
        "marginRight": 5,
        "marginLeft": 5
    },
    "row-action-buttons": {
        "cursor": "pointer",
        "textAlign": "center"
    },
    "logo img": {
        "width": "auto",
        "height": 20,
        "marginLeft": 20
    },
    "yadcf-filter-wrapper": {
        "display": "flex"
    },
    "yadcf-filter-range-dateyadcf-filter-rangehasDatepicker": {
        "marginRight": 10
    },
    "yadcf-filter-reset-button": {
        "paddingBottom": 4
    },
    "jarviswidget": {
        "display": "none"
    },
    "color": {
        "color": "white",
        "paddingTop": 2,
        "paddingRight": 2,
        "paddingBottom": 2,
        "paddingLeft": 2,
        "WebkitBorderRadius": 5,
        "MozBorderRadius": 5,
        "borderRadius": 5,
        "border": "none",
        "fontFamily": "monospace"
    }
});