import React, { useEffect, useState } from "react";
import Header from "../components/dashboard/users/Header";
import SideNav from "../components/dashboard/sidenav/SideNav";
import AddManualToolCompoent from "../components/dashboard/manualTool/AddManualToolCompoent";
import { ToastContainer, toast } from "react-toastify";
import request from "../utils/request";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Spinner from "../components/utils/Spinner";

const AddManualTool = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { tid } = useParams();
  const [actionLoading, setActionLoading] = useState(false);

  // edit query param
  const [editAllowed, setEditAllowed] = useState(
    searchParams.get("edit") == "true" || (searchParams.get("create") && true)
  );

  const [manualTool, setManualTool] = useState({
    name: "",
    material: "",
    usage: "",
    image: "",
    category: "",
    weight: null,
  });

  // create and update combine handler
  const submitHandler = async () => {
    setActionLoading(true);
    const requiredFields = [
      "name",
      "material",
      "usage",
      "image",
      "category",
      "weight",
    ];

    // Iterate over the required fields
    for (const field of requiredFields) {
      // Check if the current field is missing or empty
      if (
        !manualTool[field] ||
        (typeof manualTool[field] === "string" &&
          manualTool[field].trim() === "")
      ) {
        toast.warning(`${field}" cannot be empty.`);
        setActionLoading(false);
        return;
      }
    }

    if (searchParams.get("create") == "true") {
      try {
        const { data } = await request.post("/manualTool", manualTool);

        if (data.success) {
          toast.success("Manual Tool Created Successfully.");
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Error occured in creating manual tool"
        );
      }
    } else if (searchParams.get("edit")) {
      try {
        const { data } = await request.patch(`/manualTool/${tid}`, manualTool);

        if (data.success) {
          toast.success("Manual Tool Updated Successfully.");
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Error occured in updating manual tool"
        );
      }
    }
    setActionLoading(false);

    // navigating to main screen
    setTimeout(() => {
      navigate("/tools");
    }, 2000);
  };

  useEffect(() => {
    if (searchParams.get("edit")) {
      console.log("hello");
      toast.success(editAllowed ? "Edit Mode On" : "Edit Mode off");
    }
  }, [editAllowed]);

  return (
    <div className="">
      <div className="py-7 flex justify-between w-full px-2">
        <h1 className="text-xl text-primary font-bold">Manual Tools</h1>
        <div className="flex gap-2">
          {!searchParams.get("create") && (
            <button
              className={`${
                editAllowed
                  ? "border border-primary text-primary"
                  : "bg-primary text-white"
              }  py-2 px-4 font-semibold rounded`}
              onClick={() => setEditAllowed(!editAllowed)}
            >
              Edit
            </button>
          )}
          <button
            className="bg-primary py-2 px-4 font-semibold text-white rounded w-fit min-w-[190px]"
            onClick={() => submitHandler()}
          >
            {actionLoading ? <Spinner /> : <p>Save Tool information</p>}
          </button>
        </div>
      </div>

      <AddManualToolCompoent
        manualTool={manualTool}
        setManualTool={setManualTool}
        editAllowed={editAllowed}
      />
    </div>
  );
};

export default AddManualTool;
