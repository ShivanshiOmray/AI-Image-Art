import React from "react";
import {
  FaInstagram,
  BsCameraReelsFill,
  AILogo,
  Dimensions,
} from "../SVG/index";

const ActiveModel = ({
  activeModel,
  size1,
  size2,
  size3,
  updateState,
  value,
  addClass,
  updateClass,
  setV3Style,
  v3Style,
}) => {
  return (
    <>
      {activeModel == "AI Image Art Dall-e-v3" && (
        <>
          <div className="mt-3">
            <div className="select-none opacity-50 text-xs flex items-center justify-start mb-1">
              <Dimensions />
              <p>Image Style Type</p>
            </div>
          </div>
          <div className="flex space-x-2 px-2">
            <div
              onClick={() => (
                updateState({ ...value, style: "vivid" }), setV3Style("vivid")
              )}
              className={`text-xs rounded-md sm:text-sm group mt-4 whitespace-nowrap flex-1 flex select-none cursor-pointer hover:brightness-110 bg-gradient-to-t drop-shadow items-center justify-center px-2.5 ${
                v3Style == "vivid"
                  ? "py-2.5 w-fit-content active:scale-95 transition-all from-indigo-900 via-indigo-900 to-indigo-800"
                  : "from-zinc-700 via-zinc-700 to-zinc-700 py-2 w-fit-content"
              }`}
            >
              <AILogo /> &nbsp; &nbsp; {"Vivid"}
            </div>
            <button
              onClick={() => (
                updateState({ ...value, style: "natural" }),
                setV3Style("natural")
              )}
              className={`text-xs rounded-md sm:text-sm group mt-4 whitespace-nowrap flex-1 flex select-none cursor-pointer hover:brightness-110 bg-gradient-to-t drop-shadow items-center justify-center px-2.5 ${
                v3Style == "natural"
                  ? "py-2.5 w-fit-content active:scale-95 transition-all from-indigo-900 via-indigo-900 to-indigo-800"
                  : "from-zinc-700 via-zinc-700 to-zinc-700 py-2 w-fit-content"
              }`}
            >
              <AILogo /> &nbsp; &nbsp; {"Natural"}
            </button>
          </div>

          <div className="mt-3">
            <div className="select-none opacity-50 text-xs flex items-center justify-start mb-1">
              <Dimensions />
              <p>Dimensions</p>
            </div>
          </div>
        </>
      )}

      <div className="flex space-x-2 px-2">
        <div
          onClick={() => (
            updateState({ ...value, size: size1 }), updateClass(size1)
          )}
          className={`text-xs rounded-md sm:text-sm group mt-4 whitespace-nowrap flex-1 flex select-none cursor-pointer hover:brightness-110 bg-gradient-to-t drop-shadow items-center justify-center px-2.5 ${
            addClass == size1
              ? "py-2.5 w-fit-content active:scale-95 transition-all from-indigo-900 via-indigo-900 to-indigo-800"
              : "from-zinc-700 via-zinc-700 to-zinc-700 py-2 w-fit-content"
          }`}
        >
          <BsCameraReelsFill /> &nbsp; &nbsp; {size1}
        </div>
        <button
          onClick={() => (
            updateState({ ...value, size: size2 }), updateClass(size2)
          )}
          className={`text-xs rounded-md sm:text-sm group mt-4 whitespace-nowrap flex-1 flex select-none cursor-pointer hover:brightness-110 bg-gradient-to-t drop-shadow items-center justify-center px-2.5 ${
            addClass == size2
              ? "py-2.5 w-fit-content active:scale-95 transition-all from-indigo-900 via-indigo-900 to-indigo-800"
              : "from-zinc-700 via-zinc-700 to-zinc-700 py-2 w-fit-content"
          }`}
        >
          <AILogo /> &nbsp; &nbsp; {size2}
        </button>
      </div>

      <div className="flex space-x-2 px-2">
        <div
          onClick={() => (
            updateState({ ...value, size: size3 }), updateClass(size3)
          )}
          className={`text-xs rounded-md sm:text-sm group mt-4 whitespace-nowrap flex-1 flex select-none cursor-pointer hover:brightness-110 bg-gradient-to-t drop-shadow items-center justify-center px-2.5 ${
            addClass == size3
              ? "py-2.5 w-fit-content active:scale-95 transition-all from-indigo-900 via-indigo-900 to-indigo-800"
              : "from-zinc-700 via-zinc-700 to-zinc-700 py-2 w-fit-content"
          }`}
        >
          <FaInstagram /> &nbsp; &nbsp; {size3}
        </div>
      </div>
    </>
  );
};

export default ActiveModel;
