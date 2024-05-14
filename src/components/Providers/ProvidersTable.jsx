import React, { useEffect } from "react";
import Button from "../Button/Button";
import Table from "../Table/Table";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import useProvider from "../../Hooks/useProvider";

const CustomersTable = () => {
  const navigate = useNavigate();
  const { getProviderTable, data, getProvider, getProviderData } =
    useProvider();
  useEffect(() => {
    getProviderTable();
  }, []);
  console.log(getProviderData)
  return (
    <>
      <div className="w-full flex justify-between mb-5">
        <h3 className="text-[25px] font-[500] ">Providers</h3>
        <Button
          className=""
          onClick={() => navigate("/admin/providers/addproviders")}
        >
          <FaPlus size={14} className="mr-2" />
          Add Providers
        </Button>
      </div>

      <Table
        routes={["/admin/providers"]}
        array={data}
        search={"name"}
        keysToDisplay={["index", "name", "email", "phoneNumber",]}
        label={[
          "#",
          "Providers",
          "Email",
          "Phone Number",
          "Actions",
        ]}
        extraColumns={[
          (record) => {
            return (
              <MdEdit
                onClick={() => navigate(`${"/admin/providers/"}${record.id}`)}
                className="text-[#ccccc] text-[1.3rem]" />
            );
          },
        ]}
      />
    </>
  );
};

export default CustomersTable;
