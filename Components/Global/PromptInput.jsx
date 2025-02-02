import React, { useState } from "react";
import { AILogo, Dimensions } from "../SVG/index";
import { ActiveModel, FastSlow } from "../index";

const PromptInput = ({
  promptv3,
  setPromptv3,
  promptv2,
  setPromptv2,
  activeModel,
  setActiveModel,
  activeUser,
}) => {
  const [rangeValue, setRangeValue] = useState(3);

  const [v3Style, setV3Style] = useState("vivid");
  const [AISizeStyleV3, setAISizeStyleV3] = useState("1024x1024");
  const [AISizeStyleV2, setAISizeStyleV2] = useState("256x256");

  const handleRangeChange = (event) => {
    setPromptv2({ ...promptv2, n: event.target.value });
    setRangeValue(event.target.value);
  };

  const changeModel = (model) => {
    setActiveModel(model);
    localStorage.setItem("ACTIVE_MODEL", model);
  };
  return (
    <div className="w-full mt-[20px] ml-0 md:ml-8 md:max-w-[300px]">
      <div className="relative border border-zinc-700 rounded-lg shadow-md">
        <div className="px-5 py-4 pb-5">
          <div className="mb-4 text-sm opacity-40 select-none">
            {activeModel}
          </div>
          <div className="flex space-x-2 px-2">
            <div
              onClick={() => changeModel("AI Image Art Dall-e-v3")}
              className={`text-xs rounded-md sm:text-sm group mt-4 whitespace-nowrap flex-1 flex select-none cursor-pointer hover:brightness-100 bg-gradient-to-t drop-shadow items-center justify-center px-2.5 ${
                activeModel == "AI Image Art Dall-e-v3"
                  ? "py-2.5 w-fit-content active:scale-95 transition-all from-indigo-900 via-indigo-900 to-indigo-800"
                  : "from-zinc-700 via-zinc-700 to-zinc-700 py-2 w-fit-content"
              }`}
            >
              <AILogo /> &nbsp; &nbsp; Dall-e-V3
            </div>
            <div
              onClick={() => changeModel("AI Image Art Dall-e-v2")}
              className={`text-xs rounded-md sm:text-sm group mt-4 whitespace-nowrap flex-1 flex select-none cursor-pointer hover:brightness-100 bg-gradient-to-t drop-shadow items-center justify-center px-2.5 ${
                activeModel == "AI Image Art Dall-e-v2"
                  ? "py-2.5 w-fit-content active:scale-95 transition-all from-indigo-900 via-indigo-900 to-indigo-800"
                  : "from-zinc-700 via-zinc-700 to-zinc-700 py-2 w-fit-content"
              }`}
            >
              <AILogo /> &nbsp; &nbsp; Dall-e-V2
            </div>
          </div>

          {activeModel == "AI Image Art Dall-e-v2" && (
            <>
              <label
                htmlFor="levelRange"
                className="slider"
                style={{ width: "100%", marginTop: "1.5rem" }}
              >
                <input
                  type="range"
                  className="level"
                  id="levelRange"
                  min="1"
                  max="5"
                  value={rangeValue}
                  onChange={handleRangeChange}
                />
              </label>

              <div className="mt-1">
                <div className="select-none opacity-50 text-xs flex items-center justify-start mb-3">
                  <Dimensions />
                  <p>Quantity:{rangeValue}</p>
                </div>
              </div>
            </>
          )}

          {activeModel == "AI Image Art Dall-e-v2" ? (
            <ActiveModel
              activeModel={activeModel}
              size1="256x256"
              size2="512x512"
              size3="1024x1024"
              updateState={setPromptv2}
              value={promptv2}
              addClass={AISizeStyleV2}
              updateClass={setAISizeStyleV2}
            />
          ) : (
            <ActiveModel
              activeModel={activeModel}
              size1="1024x1792"
              size2="1792x1024"
              size3="1024x1024"
              updateState={setPromptv3}
              value={promptv3}
              addClass={AISizeStyleV3}
              updateClass={setAISizeStyleV3}
              setV3Style={setV3Style}
              v3Style={v3Style}
            />
          )}
          <FastSlow />
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
