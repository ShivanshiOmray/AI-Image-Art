import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";

import {
  Close,
  Copy,
  LinkFollow,
  LinkCopyUrl,
  Magic2,
  ArrowRight,
  ArrowLeft,
  ArrowRight2,
  Download,
  FaHeart,
  FaRegHeart,
  MdOutlineDelete,
} from "../SVG/index";

import {
  DISLIKE_POST,
  LIKE_POST,
  CHECK_AUTH,
  GET_SINGLE_POST,
  DELETE_POST,
} from "../../Utils/index";
import Link from "next/link";

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL;
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

const SingleImage = ({ setSingleID, singleID }) => {
  const [like, setLike] = useState(false);
  const [postDetail, setPostDetail] = useState();
  const [activeUser, setActiveUser] = useState();
  const [loader, setLoader] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [reCall, setReCall] = useState(0);
  const [deletePost, setDeletePost] = useState(false);

  const AI_IMAGE_DOWNLOAD = (image) => {
    let url = `${DOMAIN_URL}${image}`;
    saveAs(url, `${DOMAIN}-${image}`);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const CALLING_LIKE = async (postID) => {
    try {
      setLoader(true);
      const response = await LIKE_POST(postID);
      if (response.status == 200) {
        setReCall(reCall + 1);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const CALLING_DISLIKE = async (postID) => {
    try {
      setLoader(true);
      const response = await DISLIKE_POST(postID);
      if (response.status == 200) {
        setReCall(reCall + 1);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const CALLING_DELETE = async (postID) => {
    try {
      setLoader(true);
      const response = await DELETE_POST(postID);
      if (response.status == 200) {
        window.location.reload();
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const CALLING_USER_INFO = async (postID) => {
    try {
      const singlePost = await GET_SINGLE_POST(postID);
      if (singlePost?.images?.length > 0) {
        setPostDetail(singlePost);
        setSelectedImage(singlePost.images[0]); // Set the first image as default
      } else {
        console.error("No images found in the post details.");
      }

      const response = await CHECK_AUTH();
      setActiveUser(response);

      if (response?._id === singlePost?.user._id) {
        setDeletePost(true);
      }

      setLike(singlePost?.likes.includes(response?._id));
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    CALLING_USER_INFO(singleID);
  }, [reCall]);

  return (
    <div
      className="singleImage-width fixed inset-0 w-screen h-screen overflow-hidden px-16 py-4  flex justify-center z-40 sm:z-50 bg-zinc-900 bg-opacity-80"
      style={{
        overscrollBehavior: "contain",
        minHeight: "-webkit-fill-available",
      }}
    >
      <div
        onClick={() => setSingleID("")}
        className="absolute top-0 left-0 cursor-pointer h-12 w-12 flex items-center justify-center text-4xl drop-shadow"
      >
        <Close />
      </div>
      <div className="single-scroll flex flex-col bg-zinc-800 drop-shadow-xl overflow-hidden rounded-xl border border-zinc-700 box-content">
        <div className="flex w-full h-full self-stretch flex-col md:flex-row pb-16 md:pb-0 md:pt-0 flex-1">
          <div
            className="flex flex-shrink-0 overflow-hidden text-base px-5 flex flex-col h-auto"
            style={{ height: "fit-content", width: 400 }}
          >
            <div className="mt-6 px-4 py-3 bg-zinc-700 rounded-xl shadow bg-opacity-50 font-light flex flex-col space-y-5">
              <p>
                <a className="bg-red-500 bg-opacity-0 rounded hover:bg-opacity-40 cursor-pointer">
                  {postDetail?.prompt}
                </a>
              </p>

              <div className="flex text-xs font-light">
                <div className="flex flex-1 flex-row space-x-2 mr-2">
                  <div
                    onClick={() => copyText(postDetail?.prompt)}
                    className="text-xs rounded-md sm:text-xs active:scale-95 transition-all transform-gpu whitespace-nowrap flex-1 flex select-none cursor-pointer hover:bg-zinc-600 border border-zinc-600 bg-zinc-700 items-center justify-center shadow px-2.5 py-2 w-fit-content"
                  >
                    <Copy />
                    Copy Prompt
                  </div>

                  <div
                    onClick={() => copyText(`${DOMAIN_URL}${selectedImage}`)}
                    className="text-xs rounded-md sm:text-xs active:scale-95 transition-all transform-gpu whitespace-nowrap flex-1 flex select-none cursor-pointer hover:bg-zinc-600 border border-zinc-600 bg-zinc-700 items-center justify-center shadow px-2.5 py-2 w-fit-content"
                  >
                    <LinkCopyUrl />
                    Copy URL
                  </div>
                </div>

                <Link
                  href="/aperture"
                  className="text-sm w-12 flex select-none cursor-pointer hover:bg-zinc-600 border border-zinc-600 bg-zinc-700 items-center justify-center rounded-md shadow px-3"
                >
                  <LinkFollow />
                </Link>
              </div>
            </div>

            <div className="flex space-x-2 px-2">
              <Link
                href="/aperture"
                className="text-sm rounded-md sm:text-sm group mt-4 whitespace-nowrap flex-1 flex select-none cursor-pointer hover:brightness-110 bg-gradient-to-t from-indigo-900 via-indigo-900 to-indigo-800 drop-shadow items-center justify-center px-2.5 py-2.5 w-fit-content active:scale-95 transition-all"
              >
                {" "}
                <Magic2 />
                Open Creator
              </Link>
              <Link
                href="/history"
                className="text-sm rounded-md sm:text-sm group mt-4 whitespace-nowrap flex-1 flex select-none cursor-pointer hover:brightness-110 bg-gradient-to-t from-indigo-900 via-indigo-900 to-indigo-800 drop-shadow items-center justify-center px-2.5 py-2.5 w-fit-content "
              >
                Explore Your History
                <ArrowRight />
              </Link>
            </div>

            <div className="md:mt-6 mt-4 opacity-80 ml-2 grid grid-clos-2 gap-2 md:flex flex-wrap md:flex-col md:space-x-0 md:space-y-1 h-auto pb-32 sm:pb-8">
              <div>
                <div className="text-xs opacity-50">Model</div>
                <div className="text-sm">{postDetail?.aiModel}</div>
              </div>
              <div>
                <div className="text-xs opacity-50">Dimensions - Quantity</div>
                <div className="text-sm">{postDetail?.quantity}</div>
              </div>
              <div>
                <div className="text-xs opacity-50">Quality</div>
                <div className="text-sm">{postDetail?.quality}</div>
              </div>
              <div>
                <div className="text-xs opacity-50">Style</div>
                <div className="text-sm">{postDetail?.style}</div>
              </div>
              <div>
                <div className="text-xs opacity-50">Creator</div>
                <div className="text-sm">{postDetail?.user.username}</div>
              </div>
            </div>
          </div>

          <div className="w-full md:h-full flex flex-col" style={{ order: 0 }}>
            <div className="flex mx-auto mt-[20px]">
              <button className="h-full w-14 text-5xl flex items-center justify-center opacity-10">
                <ArrowLeft />
              </button>

              <div className="relative">
                <div className="absolute top-2 right-2 z-30">
                  <button className="bg-zinc-900 bg-opacity-70 hover:bg-opacity-100 flex items-center justify-center pointer-events-auto cursor-pointer active:scale-90 transition-all rounded-lg text-lg h-11 w-11">
                    <div className="scale-50" style={{ fontSize: "2.5rem" }}>
                      {like ? (
                        <FaHeart
                          style={{ color: "red" }}
                          onClick={() => CALLING_DISLIKE(postDetail?._id)}
                        />
                      ) : (
                        <FaRegHeart
                          onClick={() => CALLING_LIKE(postDetail?._id)}
                        />
                      )}
                    </div>
                  </button>

                  {deletePost && (
                    <button
                      style={{ marginTop: "1rem" }}
                      className="bg-zinc-900 bg-opacity-70 hover:bg-opacity-100 flex items-center justify-center pointer-events-auto cursor-pointer active:scale-90 transition-all rounded-lg text-lg h-11 w-11"
                    >
                      <div className="scale-50" style={{ fontSize: "2.5rem" }}>
                        <MdOutlineDelete
                          onClick={() => CALLING_DELETE(postDetail?._id)}
                        />
                      </div>
                    </button>
                  )}
                </div>

                <img
                  src={
                    selectedImage
                      ? `${DOMAIN_URL}${selectedImage}`
                      : `${DOMAIN_URL}${postDetail?.images[0]}`
                  }
                  className="singleImage-new"
                />
                <img
                  src={
                    selectedImage
                      ? `${DOMAIN_URL}${selectedImage}`
                      : `${DOMAIN_URL}${postDetail?.images[0]}`
                  }
                  className="relative z-20 new-hide-image"
                  style={{
                    width: "330.056px",
                    height: "457px",
                    maxWidth: "none",
                  }}
                />

                <div className="absolute bottom-2 right-2 space-y-2 flex flex-col items-end z-30">
                  <a
                    onClick={() => AI_IMAGE_DOWNLOAD(selectedImage)}
                    className="bg-zinc-900 bg-opacity-70 hover:bg-opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-lg h-10 w-10 rounded-lg"
                  >
                    <Download />
                  </a>
                </div>
              </div>

              <button className="h-full w-14 text-5xl flex items-center justify-center opacity-80 hover:opacity-100 cursor-pointer">
                <ArrowRight2 />
              </button>
            </div>

            <div className="flex space-x-2 items-center justify-center overflow-hidden w-full flex-wrap mt-4 md:mt-[10px] md:px-2">
              {postDetail?.images.map((image, index) => (
                <div
                  key={index}
                  className="relative"
                  onClick={() => setSelectedImage(image)}
                  style={{ height: 50, width: "36.1111px", marginBottom: 6 }}
                >
                  <img
                    src={`${DOMAIN_URL}${image}`}
                    className="select-none cursor-pointer opacity-100"
                    style={{
                      width: "auto",
                      objectFit: "contain",
                      backgroundColor: "black",
                    }}
                  />

                  <div className="hidden">
                    <img src={`${DOMAIN_URL}${image}`} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleImage;
