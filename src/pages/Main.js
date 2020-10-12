import React, { useEffect, useState } from "react";
import Split from "react-split";
import ResponsiveContainer from "components/ResponsiveContainer";
import ListItem from "./components/ListItem";
import "./styles.css";

const gutterFn = (_index, direction, _pairElement) => {
  const gutter = document.createElement("div");
  gutter.className = `
            gutter
            gutter-${direction}
            flex
            items-center
            justify-center
            cursor-col-resize
          `;
  const gutterRule = document.createElement("div");
  gutterRule.className = `
            w-5
            h-full
            absolute
            flex
            items-center
            justify-center
          `;
  const gutterCenter = document.createElement("div");
  gutterCenter.className = "gutter-center h-full bg-gray-300";
  gutterCenter.style = "width: 1px;";
  gutterRule.appendChild(gutterCenter);
  const gutterDragContainer = document.createElement("div");
  gutterDragContainer.className = `
            w-full
            flex
            items-center
            justify-center
            absolute
            border-4
            border-white
          `;
  const gutterDrag = document.createElement("div");
  gutterDrag.className = `
            gutter-drag
            w-full
            h-8
            border-l-2
            border-r-2
            flex
            items-center
            justify-center
            bg-white
          `;
  const gutterDragCenter = document.createElement("div");
  gutterDragCenter.className = "gutter-drag-center w-1/4 h-full bg-gray-300";
  gutterDrag.appendChild(gutterDragCenter);
  gutterDragContainer.appendChild(gutterDrag);
  gutterRule.appendChild(gutterDragContainer);
  gutter.appendChild(gutterRule);
  return gutter;
};

export default function Main() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getImages = async () => {
      const res = await fetch("https://picsum.photos/v2/list");
      const list = await res.json();
      setImages(list);
      setLoading(false);
    };
    getImages();
  }, []);

  const panel = (
    <ResponsiveContainer
      className="overflow-y-auto"
      breakpoints={{ SM: 0, MD: 430 }}
    >
      <div className="panel">
        {images.map((img, i) => (
          <ListItem
            key={i}
            imgSrc={img.download_url}
            title={img.author}
            dimensions={{ width: img.width, height: img.height }}
          />
        ))}
      </div>
    </ResponsiveContainer>
  );

  return (
    <div className="flex justify-center h-screen p-10">
      {loading ? (
        <div className="flex items-center">
          <span className="text-xl font-thin">Loading...</span>
        </div>
      ) : (
        <React.Fragment>
          <Split
            className="w-3/4 border flex relative"
            sizes={[50, 50]}
            minSize={150}
            gutter={gutterFn}
            gutterSize={1}
          >
            {panel}
            {panel}
          </Split>
        </React.Fragment>
      )}
    </div>
  );
}
