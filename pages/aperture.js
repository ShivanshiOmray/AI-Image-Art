import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import {
  FaInstagram,
  AiOutlineYoutube,
  BsCameraReelsFill,
} from "../Components/SVG/index";

import {
  Header,
  GetStarted,
  SingleImage,
  ApertImageCard,
  Subscription,
  PromptInput,
  Prompt,
  Button,
  AIProcessing,
} from "../Components/index";

import {
  IMAGE_GENERATOR_V2,
  IMAGE_GENERATOR_V3,
  GET_USER_AI_IMAGES,
  CHECK_AUTH,
} from "../Utils/index";
import Link from "next/link";

const aperture = () => {
  const [activeModel, setActiveModel] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState();
  const [category, setCategory] = useState("Reel");
  const [singleID, setSingleID] = useState();

  const [activeUser, setActiveUser] = useState();
  const [allAIImages, setAllAIImages] = useState();

  //V3
  const [V3_1024x1024, setV3_1024x1024] = useState();
  const [V3_1792x1024, setV3_1792x1024] = useState();
  const [V3_1024x1792, setV3_1024x1792] = useState();

  //V2
  const [V2_256x256, setV2_256x256] = useState();
  const [V2_512x512, setV2_512x512] = useState();
  const [V2_1024x1024, setV2_1024x1024] = useState();

  const [promptv3, setPromptv3] = useState({
    prompt: "",
    negativePrompt: "",
    size: "1024x1024",
    style: "vivid",
  });

  const [promptv2, setPromptv2] = useState({
    prompt: "",
    negativePrompt: "",
    size: "256x256",
    n: 3,
  });

  useEffect(() => {
    var value = localStorage.getItem("ACTIVE_MODEL");
    if (value) {
      setActiveModel(value);
    }
  }, [activeModel]);

  const CLICK_V3 = async (promptv3) => {
    try {
      setLoader(true);
      const response = await IMAGE_GENERATOR_V3(promptv3);
      if (response == "Data is Missing") {
        setError(response);
        setLoader(false);
      } else if (response.status == 201) {
        setLoader(false);
        setSingleID(response.data.post._id);
      }
    } catch (error) {
      const errorMessage =
        error.message || "An unexpected error occured (OpenAI)";
      setLoader(false);
      setError(errorMessage);
    }
  };

  const CLICK_V2 = async (promptv2) => {
    try {
      setLoader(true);
      const response = await IMAGE_GENERATOR_V2(promptv2);
      if (response == "Data is Missing") {
        setError(response);
        setLoader(false);
      } else if (response.status == 201) {
        setLoader(false);
        setSingleID(response.data.post._id);
      }
    } catch (error) {
      const errorMessage =
        error.message || "An unexpected error occured (OpenAI)";
      setLoader(false);
      setError(errorMessage);
    }
  };

  const changeCategory = (category) => {
    const model = localStorage.getItem("ACTIVE_MODEL");

    if (model == "AI Image Art Dall-e-v2") {
      if (category == "Reel") {
        setAllAIImages(V2_256x256);
        setCategory("Reel");
      } else if (category == "Instagram") {
        setAllAIImages(V2_512x512);
        setCategory("Instagram");
      } else if (category == "Youtube") {
        setAllAIImages(V2_1024x1024);
        setCategory("Youtube");
      }
    } else {
      if (category == "Reel") {
        setAllAIImages(V3_1024x1792);
        setCategory("Reel");
      } else if (category == "Instagram") {
        setAllAIImages(V3_1024x1024);
        setCategory("Instagram");
      } else if (category == "Youtube") {
        setAllAIImages(V3_1792x1024);
        setCategory("Youtube");
      }
    }
  };

  const CALLING_ALL_POSTS = async () => {
    try {
      const storedCookiedValue = Cookies.get("token");

      if (storedCookiedValue) {
        const user = await CHECK_AUTH();
        setActiveUser(user);

        const response = await GET_USER_AI_IMAGES(user?._id);

        const V2_256x256Temp = [];
        const V2_512x512Temp = [];
        const V2_1024x1024Temp = [];

        const V3_1024x1024Temp = [];
        const V3_1792x1024Temp = [];
        const V3_1024x1792Temp = [];

        response.forEach((el) => {
          if (el.aiModel === "AI Image Art Dall-e-v2") {
            if (el.size === "256x256") {
              V2_256x256Temp.push(el);
            } else if (el.size === "512x512") {
              V2_512x512Temp.push(el);
            } else if (el.size === "1024x1024") {
              V2_1024x1024Temp.push(el);
            }
          } else if (el.aiModel === "AI Image Art Dall-e-v3") {
            if (el.size === "1024x1024") {
              V3_1024x1024Temp.push(el);
            } else if (el.size === "1792x1024") {
              V3_1792x1024Temp.push(el);
            } else if (el.size === "1024x1792") {
              V3_1024x1792Temp.push(el);
            }
          }
        });

        setV2_256x256(V2_256x256Temp);
        setV2_512x512(V2_512x512Temp);
        setV2_1024x1024(V2_1024x1024Temp);

        setV3_1024x1024(V3_1024x1024Temp);
        setV3_1024x1792(V3_1024x1792Temp);
        setV3_1792x1024(V3_1792x1024Temp);

        const model = localStorage.getItem("ACTIVE_MODEL");

        if (model === "AI Image Art Dalle-e-v2") {
          setAllAIImages(V2_256x256Temp);
        } else {
          setAllAIImages(V3_1024x1792Temp);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CALLING_ALL_POSTS();
  }, []);

  const arrayRender = [...(allAIImages?.reverse() || [])];

  return (
    <div>
      <Header />
      <div className="mb-[56px] sm:mb-0 sm:mt-[56px]">
        <GetStarted activeUser={activeUser} />
        <div>
          <div className="w-screen overflow-x-hidden">
            <div className="flex items-center w-full mt-8 sm:mt-4 md:mt-10">
              <div className="w-full px-2 md:px-10 lg:px-16 flex items-center flex-col max-w-[1300px]">
                {/* PART 1 */}
                <div className="w-full flex flex-col-reverse md:flex-row">
                  <Prompt
                    promptv3={promptv3}
                    setPromptv3={setPromptv3}
                    promptv2={promptv2}
                    setPromptv2={setPromptv2}
                    loader={loader}
                    error={error}
                    activeUser={activeUser}
                    generateFunction={() =>
                      activeModel == "AI Image Art Dall-e-v3"
                        ? CLICK_V3(promptv3)
                        : CLICK_V2(promptv2)
                    }
                  />
                  <PromptInput
                    promptv3={promptv3}
                    setPromptv3={setPromptv3}
                    promptv2={promptv2}
                    setPromptv2={setPromptv2}
                    activeModel={activeModel}
                    setActiveModel={setActiveModel}
                    activeUser={activeUser}
                  />
                </div>

                <div
                  className="items-center w-full max-w-[800px] mt-8 px-4 pl-5 md:px-5"
                  style={{
                    minHeight: "1px",
                    position: "relative",
                  }}
                >
                  <div></div>
                </div>
                <Subscription activeUser={activeUser} />
              </div>
            </div>

            {/* BODY */}

            <div className="flex items-center justify-center w-full">
              <div className="flex w-full flex-col-reverse max-w-[1400px] pb-32 px-2 sm:px-8">
                <div
                  className="active:outline"
                  tabIndex={0}
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "100%",
                    height: "994px",
                    maxHeight: "994px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      position: "absolute",
                      writingMode: "horizontal-tb",
                    }}
                  >
                    <div className="mb-10">
                      <div className="flex space-x-2 px-2">
                        <Button
                          icon={<BsCameraReelsFill />}
                          name={"Reel"}
                          handleClick={() => changeCategory("Reel")}
                          category={category}
                        />
                        <Button
                          icon={<AiOutlineYoutube />}
                          name={"Youtube"}
                          handleClick={() => changeCategory("Youtube")}
                          category={category}
                        />
                        <Button
                          icon={<FaInstagram />}
                          name={"Instagram"}
                          handleClick={() => changeCategory("Instagram")}
                          category={category}
                        />
                      </div>

                      {arrayRender?.length ? (
                        <>
                          <div className="flex flex-wrap justify-center flex-1 w-full items-center">
                            {arrayRender?.map((item, index) => (
                              <ApertImageCard
                                key={index}
                                item={item}
                                setSingleID={setSingleID}
                              />
                            ))}
                          </div>
                        </>
                      ) : (
                        ""
                      )}

                      <div className="px-4 text-sm text-zinc-100 w-full flex items-center justify-center mt-2">
                        <div className="opacity-80 hover:opacity-100 transition-all cursor-pointer group">
                          <div title="Load in editor">
                            Welcome to AI Image Generator
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {singleID && (
        <SingleImage singleID={singleID} setSingleID={setSingleID} />
      )}
      {loader && <AIProcessing />}
    </div>
  );
};

export default aperture;
