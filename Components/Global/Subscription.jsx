import Link from "next/link";
import React from "react";

const Subscription = ({ activeUser }) => {
  return (
    <div
      className="flex flex-col w-full flex-1 items-center justify-center"
      style={{ position: "relative" }}
    >
      <div className="max-w-[800px]">
        <div className="my-4 mb-8 text-sm bg-indigo-800 relative border-1-4 border-1-indigo-500 bg-opacity-10 rounded-lg border border-indigo-900 border-opacity-50 shadow-md py-2 items-center w-full px-4">
          <p className="font-medium text-sm mt-1">
            {activeUser?.credit > 5
              ? `Welcome @${activeUser?.username}`
              : `@${activeUser?.username}: Your Credit left ${activeUser?.credit}`}
          </p>
          <p className="mt-2 text-sm">
            <span>
              {activeUser?.credit > 5
                ? "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic necessitatibus quae eos eveniet harum, soluta"
                : "autem qui assumenda vitae nihil distinctio error beatae! Totam quibusdam possimus molestiae repudiandae ipsum. Dolor."}
            </span>
          </p>
          <Link href="/account">
            <button className="mt-4 mb-2 text-sm px-4 py-2 bg-gradient-to-t from-indigo-700 via-indigo-700 to-indigo-600 rounded-md drop-shadow text-md shadow active:scale-95 transition-all hover:brightness-110">
              View plans
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
