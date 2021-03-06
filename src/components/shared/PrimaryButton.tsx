import classNames from "classnames";
import React from "react";

type ButtonProps = {
  onClick?: any;
  children: React.ReactNode;
  bgColor?:
    | "blue"
    | "red"
    | "green"
    | "black"
    | "white"
    | "gray"
    | "transparent";
  textColor?: "black" | "red" | "blue";
  className?: string;
  fixed?: boolean;
  ripple?: boolean;
  type?: "button" | "submit";
  expanded?: boolean;
};

export const PrimaryButton: React.VFC<ButtonProps> = ({
  onClick,
  children,
  bgColor = "blue",
  textColor = "black",
  className,
  fixed = false,
  ripple = false,
  type = "button",
  expanded = false,
}) => {
  const position = fixed ? "fixed" : "relative";

  const width = expanded ? "w-full" : "";

  // 指定した色をクラスに追加
  const colorClasses = classNames({
    "text-white bg-blue-500 hover:bg-blue-600": bgColor === "blue",
    "text-white bg-red-500 hover:bg-red-600": bgColor === "red",
    "text-white bg-green-500 hover:bg-green-600": bgColor === "green",
    "text-black bg-gray-300 hover:bg-gray-400": bgColor === "gray",
    "text-white bg-black hover:bg-gray-600": bgColor === "black",
    "bg-white hover:bg-gray-300": bgColor === "white",
    "bg-transparent": bgColor === "transparent",
    "text-black":
      (bgColor === "white" || bgColor === "transparent") &&
      textColor === "black",
    "text-red-500": bgColor === "white" && textColor === "red",
    "text-blue-500":
      (bgColor === "white" || bgColor === "transparent") &&
      textColor === "blue",
  });

  const addRippleEffect = (rippleElement: HTMLElement, e: any) => {
    const X = e.pageX - e.currentTarget.offsetLeft;
    const Y = e.pageY - e.currentTarget.offsetTop;

    const rippleDiv = document.createElement("div");
    rippleDiv.classList.add("ripple");
    // divの位置を.setAttributeで指定
    rippleDiv.setAttribute("style", "top:" + Y + "px; left:" + X + "px;");
    // divをボタンに入れる
    rippleElement.appendChild(rippleDiv);

    //divを削除する
    setTimeout(function () {
      rippleDiv.remove();
    }, 1200);
  };

  return (
    <button
      id="btn"
      className={classNames(
        "my-4 px-6 py-2 rounded-lg",
        position,
        colorClasses,
        width,
        className
      )}
      type={type}
      onMouseUp={(e) => {
        const rippleElement = document.getElementById("btn");
        if (rippleElement && ripple) addRippleEffect(rippleElement, e);
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
