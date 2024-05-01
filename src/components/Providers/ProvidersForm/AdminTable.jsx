import React from "react";
import Button from "../../Button/Button";
import Table from "../../Table/Table";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const CustomersTable = () => {
    const navigate = useNavigate();

    const data = [{ "providerName": "dlifton0", "qualification": "Yorkton Municipal Airport", "experience": "Northland", "workSamples": "Expo LRV" },
    { "providerName": "dberggren1", "qualification": "Pukatawagan Airport", "experience": "Declaration", "workSamples": "GTO" },
    { "providerName": "cgooding2", "qualification": "Shinyanga Airport", "experience": "Mayfield", "workSamples": "RX" },
    { "providerName": "bgirard3", "qualification": "Simara Airport", "experience": "Ohio", "workSamples": "Galaxie" },
    { "providerName": "bwhapple4", "qualification": "Phanom Sarakham Airport", "experience": "Arrowood", "workSamples": "E-Class" },



    ]

    return (
        <>
            <div className="w-full flex justify-between mb-5">
                <h3 className="text-[25px] font-[500] ">Add Admins</h3>
                <Button
                    className=""
                    onClick={() => navigate("/admin/providers/addproviders")}
                >
                    <FaPlus size={14} className="mr-2" />
                    Add Admin
                </Button>
            </div>

            {/* <div className="flex justify-end my-3">
        <Button
          className=""
          onClick={() => navigate("/admin/customers/addCustomer")}
        >
          <FaPlus size={14} className="mr-2" />
          Add Customer
        </Button>
      </div> */}

            <Table
                array={data}
                search={"providerName"}
                keysToDisplay={["providerName", "qualification", "experience", "workSamples"]}
                label={["Admins", "Qualification", "Experience", "Samples", "Actions"]}
                extraColumns={[
                    () => {
                        return (
                            <Button type="danger" className="w-[80px]" outlined>
                                Delete
                            </Button>
                        );
                    },
                ]}
            />
        </>
    );
};

export default CustomersTable;
