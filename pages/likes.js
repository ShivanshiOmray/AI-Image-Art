import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import {
  Search,
  FaInstagram,
  AiOutlineYoutube,
  BsCameraReelsFill,
} from "../Components/SVG/index";

import {
  Header,
  GetStarted,
  ImageCard,
  SingleImage,
  Button,
  PaymentProssing,
} from "../Components/index";

import { GET_AI_IMAGES, CHECK_AUTH } from "../Utils/index";

const likes = () => {
  const [category, setCategory] = useState("Reel");
  const [singleID, setSingleID] = useState();

  const [activeUser, setActiveUser] = useState();
  const [allAIImages, setAllAIImages] = useState();

  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);

  //V3
  const [V3_1024x1024, setV3_1024x1024] = useState();
  const [V3_1792x1024, setV3_1792x1024] = useState();
  const [V3_1024x1792, setV3_1024x1792] = useState();

  //V2
  const [V2_256x256, setV2_256x256] = useState();
  const [V2_512x512, setV2_512x512] = useState();
  const [V2_1024x1024, setV2_1024x1024] = useState();

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

        const response = await GET_AI_IMAGES();

        const V2_256x256Temp = [];
        const V2_512x512Temp = [];
        const V2_1024x1024Temp = [];

        const V3_1024x1024Temp = [];
        const V3_1792x1024Temp = [];
        const V3_1024x1792Temp = [];

        response.forEach((el) => {
          if (el.likes.includes(user._id)) {
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
          }
        });

        setV2_256x256(V2_256x256Temp);
        setV2_512x512(V2_512x512Temp);
        setV2_1024x1024(V2_1024x1024Temp);

        setV3_1024x1024(V3_1024x1024Temp);
        setV3_1024x1792(V3_1024x1792Temp);
        setV3_1792x1024(V3_1792x1024Temp);

        const model = localStorage.getItem("ACTIVE_MODEL");

        if (model === "AI Image Art Dall-e-v2") {
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
        <div className="flex flex-col">
          <GetStarted activeUser={activeUser} />
          <div className="w-screen overflow-x-hidden flex flex-col items-center py-4 mt-16">
            <div className="text-7xl mb-12 font-logo font-bold mt-0">Likes</div>
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
                <div className="mt-2">&nbsp;</div>
                {/* CATEGORY */}
                <div className="mt-3 relative px-2 md:px-7 w-full">
                  <div
                    className="active:outline-none focus:outline-none overflow-hidden new-css-style-box"
                    role="grid"
                    tabIndex={0}
                    style={{
                      position: "relative",
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill,minmax(200px, 1fr))",
                      listStyle: "none",
                      margin: "0",
                      padding: "0",
                    }}
                  >
                    <>
                      {arrayRender?.reverse().map((item, index) => (
                        <ImageCard
                          key={index}
                          item={item}
                          setSingleID={setSingleID}
                          activeUser={activeUser}
                        />
                      ))}
                    </>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center px-10 text-sm mt-4 text-zinc-400">
                <p>You haven't liked any images yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {singleID && (
        <SingleImage singleID={singleID} setSingleID={setSingleID} />
      )}
    </div>
  );
};

export default likes;
