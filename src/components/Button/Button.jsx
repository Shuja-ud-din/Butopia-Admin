import React from "react";

const Button = ({
  children,
  onClick,
  className = "",
  type = "primary",
  outlined = false,
}) => {
  return (
    <>
      {type === "primary" && !outlined && (
        <button class="bg-primary text-white   py-2 px-4 border border-primary hover:border-transparent rounded">
          {children}
        </button>
      )}

      {type === "primary" && outlined && (
        <button class="bg-transparent hover:bg-primary hover:text-[white] text-primary  hover:text-white py-2 px-4 border border-primary hover:border-transparent rounded">
          {children}
        </button>
      )}

      {type === "danger" && outlined && (
        <button class="bg-transparent hover:bg-[red] hover:text-[white] text-[red]  hover:text-white py-2 px-4 border border-[red] hover:border-transparent rounded">
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
