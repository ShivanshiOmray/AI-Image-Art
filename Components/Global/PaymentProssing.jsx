import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { Loader } from "../index";
import { LoginLogo } from "../SVG/index";
import { BUYING_CREDIT } from "../../Utils/index";

const MAX_PLAN = process.env.NEXT_PUBLIC_MAX_PLAN;
const PRO_PLAN = process.env.NEXT_PUBLIC_PRO_PLAN;
const STARTER_PLAN = process.env.NEXT_PUBLIC_STARTER_PLAN;

const PaymentProssing = ({ buying, setBuying }) => {
  const [buyStatus, setBuyStatus] = useState("WAIT PROCESSING...");

  const CALLING_BUYING_CREDIT = async (buying) => {
    try {
      if (buying == "MAX_PLAN") {
        setBuyStatus("Creaditing...");
        const response = await BUYING_CREDIT(MAX_PLAN);
        setBuyStatus("Completed");
        Router.push("/");
        setBuying();
      } else if (buying == "PRO_PLAN") {
        setBuyStatus("Creaditing...");
        const response = await BUYING_CREDIT(PRO_PLAN);
        setBuyStatus("Completed");
        Router.push("/");
        setBuying();
      } else if (buying == "STARTER_PLAN") {
        setBuyStatus("Creaditing...");
        const response = await BUYING_CREDIT(STARTER_PLAN);
        setBuyStatus("Completed");
        Router.push("/");
        setBuying();
      }
    } catch (error) {
      console.log(error);
      setBuyStatus("Contact Support team");
    }
  };

  useEffect(() => {
    CALLING_BUYING_CREDIT(buying);
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 bg-zinc-900 bg-opacity-40 z-50"
        style={{ pointerEvents: "auton" }}
      >
        <div
          className="bg-zinc-800 items-center fixed shadow-xl rounded-2xl z-50 px-8 py-8 text-sm border border-zinc-700"
          style={{
            top: "50%",
            transform: "translate(-50%,-50%)",
            left: "50%",
            maxWidth: "330px",
            width: "100%",
            maxHeight: "84vh",
          }}
        >
          <div className="flex flex-col text-zinc-200 text-center items-center">
            <LoginLogo />
            <div className="new_loader JS_on">
              <span className="binary"></span>
              <span className="binary"></span>
              <span className="getting-there">{buyStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentProssing;
