import React from "react";
import { ImgSearch, Magic, FaRegHeart, FaHeart } from "../SVG/index";

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const ImageCard = ({ index, item, setSingleID, activeUser }) => {
  return (
    <div
      key={index}
      onClick={() => setSingleID(item?._id)}
      className="new-Card-width"
    >
      <div
        className="block relative group select-none overflow-hidden m-0.5 border-indigo-600 cursor-pointer"
        style={{ transition: "opacity 250ms ease 0s", borderRadius: "5px" }}
      >
        <a className={`absolute inset-0`}>
          <div
            className="absolute inset-0 z-10 block text-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none line-clamp px-2 pb-2 text-sm px-4"
            style={{
              background:
                "linear-gradient(to top,rgba(0,0,0.8) 0%,rgba(0,0,0,0) 60%, rgba(0,0,0,0) 100%",
            }}
          >
            <div className="flex-shrink h-full flex items-end">
              <div className="flex flex-col">
                <p
                  className="text-sm mb-1.5 font-medium leading-snug"
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item?.prompt.slice(0, 24)}
                  {item?.prompt.length > 24 ? ".." : ""}
                </p>
                <p
                  className="opacity-70 leading-snug text-xs mb-1"
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item?.negativePrompt.slice(0, 24)}
                  {item?.negativePrompt.length > 24 ? ".." : ""}
                </p>
              </div>
            </div>
          </div>
        </a>

        <div className="absolute top-0 left-0 right-0 p-2 flex z-10 text-zinc-100 justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity text-sm">
          <a className="bg-zinc-900 bg-opacity-50 hover:bg-opacity-100 transition-opacity flex items-center justify-center pointer-events-auto cursor-pointer text-lg h-10 w-10 rounded-lg">
            <ImgSearch />
          </a>
          <div className="flex flex-col space-y-2">
            {item?.likes.includes(activeUser?._id) ? (
              <button className="bg-zinc-900 bg-opacity-70 hover:bg-opacity-100 flex items-center justify-center pointer-events-auto cursor-pointer active:scale-90 transition-all rounded-lg text-lg h-10 w-10">
                <FaHeart style={{ color: "red" }} />
              </button>
            ) : (
              <button className="bg-zinc-900 bg-opacity-70 hover:bg-opacity-100 flex items-center justify-center pointer-events-auto cursor-pointer active:scale-90 transition-all rounded-lg text-lg h-10 w-10">
                <FaHeart />
              </button>
            )}

            <button className="bg-zinc-900 bg-opacity-50 hover:bg-opacity-100 transition-opacity flex items-center justify-center pointer-events-auto rounded-lg text-lg h-10 w-10">
              <Magic />
            </button>
          </div>
        </div>
        <img
          className="pointer-events-none"
          src={`${DOMAIN_URL}${item?.images[0]}`}
          alt=""
        />
      </div>
    </div>
  );
};

export default ImageCard;
