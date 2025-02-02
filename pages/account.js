import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { BsCameraReelsFill } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";
import { HomeLogo, Search, Filter, ColorTick } from "../Components/SVG/index";
import {
  Header,
  GetStarted,
  ImageCard,
  Slider,
  SingleImage,
  ApertImageCard,
} from "../Components/index";
import { CHECK_AUTH } from "../Utils/index";
import information from "../data/account.json";
import features from "../data/features.json";
import Link from "next/link";

const account = () => {
  const [activeUser, setActiveUser] = useState();

  const GET_USER_DETAILS = async () => {
    try {
      const storedCookieValue = Cookies.get("token");

      if (storedCookieValue) {
        const user = await CHECK_AUTH();
        setActiveUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GET_USER_DETAILS();
  }, []);
  return (
    <div>
      <Header />
      <div className="mb-[56px] sm:mb-0 sm:mt-[56px]">
        <GetStarted activeUser={activeUser} />
        <div className="pt-8 sm:pt-10 pb-16 container mx-auto max-w-6xl px-5 mb-32 sm:mb-0">
          <div className="sm:flex sm:flex-col sm:align-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-logo font-bold mt-0 text-center">
              Account
            </div>
            <p className="text-xl text-center mt-2">
              Choose the plan that's right for you
            </p>
            <div className="flex items-center justify-center flex-col flex-shrink mt-10">
              <p
                className="text-right text-sm pr-4 pb-1"
                style={{ width: "300px" }}
              >
                Save 20%
              </p>

              <div
                className="border rounded-full border-opacity-20 border-white relative overflow-hidden bg-zinc-900 flex"
                style={{ width: "300px" }}
              >
                <div
                  className="bg-zinc-600 text-white shadow-md bg-opacity-80 h-full absolute top-0 left-0 rounded-full"
                  style={{
                    width: "150px",
                    transform: "translateX(150px) translateZ(0px)",
                  }}
                />
                <button
                  type="button"
                  className="w-64 rounded-full py-2.5 text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10 sm:w-auto sm:px-7 relative text-zinc-400"
                >
                  Starter plan
                </button>
                <button
                  type="button"
                  className="w-64 rounded-full py-2.5 text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10 sm:w-auto sm:px-7 relative text-white"
                >
                  Max plan
                </button>
              </div>
            </div>

            {/* PLAN */}
            <div
              className="items-center justify-center mt-8 sm:mt-16 flex flex-col space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-2 md:gap-6"
              style={{ maxWidth: "1100px" }}
            >
              {features.map((item, index) => (
                <div
                  key={index}
                  className="col-span-1 flex-shrink-0 border border-opacity-20 bg-zinc-900 rounded-2xl transition-all h-full flex-1 border border-opacity-20 border-white"
                  style={{ maxWidth: "330px" }}
                >
                  <div
                    className="px-12 py-6 sm:px-4 sm:py-4 md:px-6 md:py-4 flex flex-col relative rounded-2xl"
                    style={{
                      background:
                        "radial-gradient(rgba(194,97,254,0.05),rgb(24,24,27) 100%)",
                    }}
                  >
                    <div className="text-left">
                      <div className="flex">
                        <p className="text-xl mr-2">{item?.plan}</p>
                      </div>
                      <div className="mt-6 mb-6">
                        <div className="flex items-end">
                          <p className="text-4xl font-semibold">{item.price}</p>
                          <p className="text-lg opacity-70">
                            &nbsp; / {item.type}
                          </p>
                        </div>
                        <p className="my-2">{item?.billing}</p>
                      </div>
                    </div>

                    <Link
                      href={item.link}
                      className="w-full h-11 flex items-center justify-center rounded-lg drop-shadow px-8 shadow cursor-pointer active:scale-95 hover:brightness-110 transition-all bg-gradient-to-t from-cyan-600 via-cyan-600 to-cyan-500"
                      target="_blank"
                    >
                      Buy Credit
                    </Link>

                    <div className="flex justify-center text-sm my-2">
                      <button className="cursor-pointer select-none opacity-50 hover:opacity-100 flex items-center justify-center my-2 hover:border-opacity-50 border-opacity-0 border-b border-white">
                        {item.monthly} &nbsp;
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 24 24"
                          height="1rem"
                          width="1rem"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z" />
                        </svg>
                      </button>
                    </div>
                    <div className="my-3 mx-2">
                      <div className="text-xl">Unlimited</div>
                      <div className="text-sm opacity-70">slow generations</div>

                      <div className="text-white text-sm text-left space-y-3 mt-4 mb-6">
                        {item.features.map((list, index) => (
                          <div
                            key={index}
                            className="flex items-baseline place-items-baseline"
                          >
                            <ColorTick />
                            <span className="opacity-90">
                              &nbsp; {list.item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {information.map((item, index) => (
                <div key={index} className="prose prose-indigo">
                  <h4 className="mb-2">
                    <span
                      className="mr-3 hidden target:!inline-flex"
                      id="plan-limit"
                    >
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-indigo-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500" />
                    </span>
                    {item.question}
                  </h4>
                  <div className="text-zinc-400">{item.description}</div>
                </div>
              ))}
            </div>
            <div className="prose prose-indigo">
              <h4 className="mb-2">
                <span
                  className="mr-3 hidden target:!inline-flex"
                  id="plan-limit"
                >
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500" />
                </span>
                How does the plan limit work?
              </h4>
              <div className="text-zinc-400">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni
                tempora eum debitis, modi deserunt, illum voluptatem commodi
                vitae atque obcaecati nemo, praesentium nostrum necessitatibus
                amet at officia alias natus nobis.
                <div className="mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corporis, nam?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default account;
