import React, { Component } from 'react'
import './sticker-widget.css'

export default class StickerWidget extends Component {
  render() {
    const { fontColor, bgColor, width, icon, number, text, iconSize, oneSideColor } = this.props;

    const textColor = {
      color: fontColor,
    };
    const widgetStyle = {
      backgroundColor: !oneSideColor ? bgColor : 'white',
      width: width,
    };
    const iconStyle = {
      color: fontColor,
      fontSize: iconSize
    };
    const isoIconStyle = {
      backgroundColor: bgColor,
    }

    return (
      <div className="isoStickerWidget" style={widgetStyle}>
        <div className="isoIconWrapper" style={oneSideColor ? isoIconStyle : null}>
          <i className={icon} style={iconStyle} />
        </div>

        <div className="isoContentWrapper">
          <h3 className="isoStatNumber" style={textColor}>{number}</h3>
          <span className="isoLabel" style={textColor}>{text}</span>
        </div>
      </div>
    );
  }
}
