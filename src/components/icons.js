import React from "react";

export const IconType = {
  LOADING: "loading",
  RIGHT: "right",
}

export const Icon = ({ type, className }) => {
  return (
    <div className={`${className}`}>
      {type === IconType.LOADING && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle cx="84" cy="50" r="10" fill="#e15b64">
            <animate
              attributeName="r"
              repeatCount="indefinite"
              dur="0.25s"
              calcMode="spline"
              keyTimes="0;1"
              values="10;0"
              keySplines="0 0.5 0.5 1"
              begin="0s"
            ></animate>
            <animate
              attributeName="fill"
              repeatCount="indefinite"
              dur="1s"
              calcMode="discrete"
              keyTimes="0;0.25;0.5;0.75;1"
              values="#e15b64;#abbd81;#f8b26a;#f47e60;#e15b64"
              begin="0s"
            ></animate>
          </circle>
          <circle cx="16" cy="50" r="10" fill="#e15b64">
            <animate
              attributeName="r"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.25;0.5;0.75;1"
              values="0;0;10;10;10"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              begin="0s"
            ></animate>
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.25;0.5;0.75;1"
              values="16;16;16;50;84"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              begin="0s"
            ></animate>
          </circle>
          <circle cx="50" cy="50" r="10" fill="#f47e60">
            <animate
              attributeName="r"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.25;0.5;0.75;1"
              values="0;0;10;10;10"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              begin="-0.25s"
            ></animate>
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.25;0.5;0.75;1"
              values="16;16;16;50;84"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              begin="-0.25s"
            ></animate>
          </circle>
          <circle cx="84" cy="50" r="10" fill="#f8b26a">
            <animate
              attributeName="r"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.25;0.5;0.75;1"
              values="0;0;10;10;10"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              begin="-0.5s"
            ></animate>
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.25;0.5;0.75;1"
              values="16;16;16;50;84"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              begin="-0.5s"
            ></animate>
          </circle>
          <circle cx="16" cy="50" r="10" fill="#abbd81">
            <animate
              attributeName="r"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.25;0.5;0.75;1"
              values="0;0;10;10;10"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              begin="-0.75s"
            ></animate>
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.25;0.5;0.75;1"
              values="16;16;16;50;84"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              begin="-0.75s"
            ></animate>
          </circle>
        </svg>
      )}
      {type === IconType.RIGHT && (
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M16.000,32.000 C7.178,32.000 0.000,24.822 0.000,16.000 C0.000,7.178 7.178,-0.000 16.000,-0.000 C24.822,-0.000 32.000,7.178 32.000,16.000 C32.000,24.822 24.822,32.000 16.000,32.000 ZM16.000,2.000 C8.280,2.000 2.000,8.280 2.000,16.000 C2.000,23.720 8.280,30.000 16.000,30.000 C23.720,30.000 30.000,23.720 30.000,16.000 C30.000,8.280 23.720,2.000 16.000,2.000 ZM23.923,16.382 C23.872,16.505 23.799,16.615 23.706,16.708 L19.707,20.707 C19.512,20.902 19.256,21.000 19.000,21.000 C18.744,21.000 18.488,20.902 18.293,20.707 C17.902,20.316 17.902,19.684 18.293,19.293 L20.586,17.000 L9.000,17.000 C8.448,17.000 8.000,16.552 8.000,16.000 C8.000,15.448 8.448,15.000 9.000,15.000 L20.586,15.000 L18.293,12.707 C17.902,12.316 17.902,11.684 18.293,11.293 C18.684,10.902 19.316,10.902 19.707,11.293 L23.706,15.292 C23.799,15.385 23.872,15.495 23.923,15.618 C24.024,15.862 24.024,16.138 23.923,16.382 Z"></path>{" "}
          </g>
        </svg>
      )}
    </div>
  );
};
