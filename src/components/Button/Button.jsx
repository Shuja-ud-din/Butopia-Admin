import React from "react";

const Button = ({
  children,
  onClick,
  className = "",
  type = "primary",
  outlined = false,
}) => {
  return (
    <div className={className}>
      {type === "primary" && !outlined && (
        <button
          onClick={onClick}
          className="w-full bg-primary flex items-center justify-center text-[white]  py-2 px-4 border border-primary hover:border-transparent rounded"
        >
          {children}
        </button>
      )}
      {type === "secondary" && !outlined && (
        <button
          onClick={onClick}
          className="w-full bg-[gray] flex items-center justify-center text-[white] border-[grey] py-2 px-4 border  hover:border-transparent rounded"
        >
          {children}
        </button>
      )}

      {type === "primary" && outlined && (
        <button
          onClick={onClick}
          className="w-full bg-transparent flex items-center justify-center hover:bg-primary hover:text-[white] text-primary  hover:text-white py-2 px-4 border border-primary hover:border-transparent rounded"
        >
          {children}
        </button>
      )}

      {type === "danger" && outlined && (
        <button
          onClick={onClick}
          className="w-full  bg-transparent flex items-center justify-center hover:bg-[red] hover:text-[white] text-[red]  hover:text-white py-2 px-4 border border-[red] hover:border-transparent rounded"
        >
          {children}
        </button>
      )}
    </div>
  );
};

export default Button;
