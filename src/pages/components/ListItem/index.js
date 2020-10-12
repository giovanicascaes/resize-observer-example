import React, { useRef } from "react";

export default function ListItem({
  imgSrc,
  title,
  dimensions: { width, height },
  onSelect,
  selected,
}) {
  function select() {
    onSelect(imgSrc);
  }

  return (
    <div
      className={`
        flex
        flex-col
        flex-1
        bg-white
        p-6
        items-center
        md:flex-row
        md:border-b
        md:items-start
      `}
    >
      <div
        className={`
          w-24
          border
          shadow
          mb-6
          md:mb-0
          md:mr-6
          relative
          transition
          duration-200
          ease-in-out${selected ? " transform -translate-y-1 scale-125" : ""}`}
        onClick={select}
      >
        <img
          className="h-24 w-full border-4 border-white"
          src={imgSrc}
          alt="thumb"
        />
        <div
          className={`
          absolute
          top-0
          w-full
          h-full
          bg-opacity-0
          text-opacity-0
          flex
          items-center
          justify-center
          text-xs
          text-white
          font-bold
          uppercase
          transition
          duration-200
          ease-in-out
          ${
            selected
              ? `bg-opacity-75
                text-opacity-100
                cursor-pointer
                text-shadow-xl
                bg-green-500`
              : `hover:bg-opacity-75
              hover:text-opacity-100
              hover:cursor-pointer
              hover:text-shadow-xl
              bg-blue-500`
          }
        `}
        >
          {selected ? "Selected" : "Select"}
        </div>
      </div>
      <div className="text-center md:text-left">
        <h2 className="text-lg font-thin">{title}</h2>
        <div className="text-sm text-purple-500 flex justify-center md:justify-start">
          <span>{width}</span>
          <span className="font-semibold">px</span>&nbsp;
          <span className="text-xs">&nbsp;/&nbsp;</span>
          &nbsp;
          <span>{height}</span>
          <span className="font-semibold">px</span>
        </div>
        <div className="mt-2">
          <a className="btn-link" href={imgSrc}>
            View
          </a>
        </div>
      </div>
    </div>
  );
}
