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
} from "../Components/index";

import { GET_USER_AI_IMAGES, CHECK_AUTH } from "../Utils/index";
import Link from "next/link";

const history = () => {
  const [category, setCategory] = useState("Reel");
  const [singleID, setSingleID] = useState();

  const [activeUser, setActiveUser] = useState();
  const [allAIImages, setAllAIImages] = useState();
  const [allPostCopy, setAllPostCopy] = useState([]);

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
        setAllPostCopy(V2_256x256);
        setCategory("Reel");
      } else if (category == "Instagram") {
        setAllAIImages(V2_512x512);
        setAllPostCopy(V2_512x512);
        setCategory("Instagram");
      } else if (category == "Youtube") {
        setAllAIImages(V2_1024x1024);
        setAllPostCopy(V2_1024x1024);
        setCategory("Youtube");
      }
    } else {
      if (category == "Reel") {
        setAllAIImages(V3_1024x1792);
        setAllPostCopy(V3_1024x1792);
        setCategory("Reel");
      } else if (category == "Instagram") {
        setAllAIImages(V3_1024x1024);
        setAllPostCopy(V3_1024x1024);
        setCategory("Instagram");
      } else if (category == "Youtube") {
        setAllAIImages(V3_1792x1024);
        setAllPostCopy(V3_1792x1024);
        setCategory("Youtube");
      }
    }
  };

  const CALLING_ALL_POSTS = async () => {
    try {
      const storedCookiedValue = Cookies.get("token");

      if (!storedCookiedValue) {
        console.error("User is not authenticated.");
        return;
      }

      const user = await CHECK_AUTH();
      if (!user) {
        console.error("Failed to fetch user details.");
        return;
      }

      setActiveUser(user);

      const response = await GET_USER_AI_IMAGES(user._id);

      if (!Array.isArray(response)) {
        console.error("Invalid response data:", response);
        return;
      }

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

      const activeModel = localStorage.getItem("ACTIVE_MODEL");

      if (activeModel === "AI Image Art Dall-e-v2") {
        setAllAIImages(V2_256x256Temp);
        setAllPostCopy(V2_256x256Temp);
      } else if (activeModel === "AI Image Art Dall-e-v3") {
        setAllAIImages(V3_1024x1792Temp);
        setAllPostCopy(V3_1024x1792Temp);
      } else {
        console.warn("No active model found, using default images.");
        setAllAIImages(V2_256x256Temp); // Default fallback
        setAllPostCopy(V2_256x256Temp); // Default fallback
      }
    } catch (error) {
      console.error("Error in CALLING_ALL_POSTS:", error);
    }
  };

  useEffect(() => {
    CALLING_ALL_POSTS();
  }, []);

  const onHandleSearch = (value) => {
    const filterPosts = allAIImages?.filter(({ prompt }) =>
      prompt.toLowerCase().includes(value.toLowerCase())
    );
    if (filterPosts.length === 0) {
      setAllAIImages(allPostCopy);
    } else {
      setAllAIImages(filterPosts);
    }
  };

  const onClearSearch = () => {
    if (allAIImages?.length && allPostCopy?.length) {
      setAllAIImages(allPostCopy);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 1000);
    return () => clearTimeout(timer);
  }, [searchItem]);

  useEffect(() => {
    if (search) {
      onHandleSearch(search);
    } else {
      onClearSearch();
    }
  }, [search]);

  const arrayRender = [...(allAIImages?.reverse() || [])];
  return (
    <div>
      <Header />
      <div className="mb-[56px] sm:mb-0 sm:mt-[56px]">
        <div className="flex flex-col">
          <GetStarted activeUser={activeUser} />
          <div className="w-screen overflow-x-hidden flex flex-col items-center py-4 mt-16">
            <Link
              href="/history"
              className="text-5xl sm:text-6xl md:text-7xl mb-8 font-bold mt-0 text-center"
            >
              History
            </Link>

            <div className="flex items-center w-full max-w-[500px] px-4 pl-5 md:px-5">
              <div
                className="w-full flex items-center relative"
                onClick={() => changeCategory("Filter")}
              >
                <Search />
                <input
                  className="bg-zinc-700 flex-1 pl-12 pr-12 rounded-full text-sm px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-700"
                  placeholder="Search for an image"
                  onChange={(e) => setSearchItem(e.target.value)}
                  value={searchItem}
                />
              </div>
            </div>

            <div className="mb-8">
              <button
                type="button"
                className="w-32 sm:w-36 flex items-center text-xs justify-center text-center h-9 rounded-full hover:brightness-110 bg-opacity-0 shadow-sm mt-4 bg-gradient-to-t from-indigo-900 via-indigo-900 to-indigo-800"
              >
                Search
              </button>
            </div>
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
            {allAIImages?.length ? (
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
                <p>
                  Your camera roll is empty. Go{" "}
                  <Link href="/aperture" className="underline">
                    generate an image
                  </Link>
                </p>
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

export default history;
