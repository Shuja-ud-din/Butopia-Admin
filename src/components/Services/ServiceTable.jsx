import React, { useEffect } from "react";
import Button from "../Button/Button";
import Table from "../Table/Table";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import useServices from "../../Hooks/useServices";

const ServiceTable = () => {
  const navigate = useNavigate("")
  const { data, getServicesTable } = useServices();
  useEffect(() => {
    getServicesTable();
  }, [])
  console.log(data);
  return (
    <>
      <div className="w-full flex justify-between mb-5">
        <h3 className="text-[25px] font-[500] ">Services</h3>
        <Button
          className=""
          onClick={() => navigate("/admin/services/addservices")}
        >
          <FaPlus size={14} className="mr-2" />
          Add Services
        </Button>
      </div>

      <Table
        array={data}
        search={"description"}
        keysToDisplay={["index", "name", "description", "price", "isActive"]}
        label={["#", "Service Name", "Description", "Price", "Is Active", "Actions"]}
        extraColumns={[
          () => {
            return (
              <div className="flex gap-[1rem]">
                <MdEdit className="text-[#ccccc] text-[1.3rem]" />
              </div>
            );
          }
        ]}
      />
    </>
  );
};

export default ServiceTable;
