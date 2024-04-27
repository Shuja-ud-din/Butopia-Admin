import React from "react";

const Button = ({
  children,
  onClick,
  className = "",
  type = "primary",
  outlined = false,
  width = "10px",
}) => {
  return (
    <div className={className}>
      {type === "primary" && !outlined && (
        <button
          onClick={onClick}
          class="w-full bg-primary text-[white]  py-2 px-4 border border-primary hover:border-transparent rounded"
        >
          {children}
        </button>
      )}

      {type === "primary" && outlined && (
        <button
          onClick={onClick}
          class="w-full bg-transparent hover:bg-primary hover:text-[white] text-primary  hover:text-white py-2 px-4 border border-primary hover:border-transparent rounded"
        >
          {children}
        </button>
      )}

      {type === "danger" && outlined && (
        <button
          onClick={onClick}
          class=" w-full bg-transparent hover:bg-[red] hover:text-[white] text-[red]  hover:text-white py-2 px-4 border border-[red] hover:border-transparent rounded"
        >
          {children}
        </button>
      )}
    </div>
  );
};

export default Button;
