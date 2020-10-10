import React from "react";
import "./styles.css";

export default function ListItem({
  imgSrc,
  title,
  dimensions: { width, height },
}) {
  return (
    <div className="flex bg-white p-6 item-container flex-1">
      <div className="w-24 border shadow photo-container">
        <img
          className="h-24 w-full border-4 border-white"
          src={imgSrc}
          alt="thumb"
        />
      </div>
      <div className="text-left description-container">
        <h2 className="text-lg font-thin">{title}</h2>
        <div className="text-sm text-purple-500">
          {width} / {height} px
        </div>
      </div>
    </div>
  );
}
