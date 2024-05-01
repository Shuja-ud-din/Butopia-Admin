import React, { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import SearchBar from "./SearchBar/SearchBar";
import filtersImg from "../../../assets/filters.svg";
import deleteIcon from "../../../assets/delete.svg";
import editIcon from "../../../assets/edit.svg";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "./Table.css";

const Table = ({
  tableName = "",
  routes = [],
  array,
  label = [],
  keysToDisplay = [],
  filters = [],
  customBlocks = [],
  extraColumns = [],
  setRecord,
  deleteRecord,
  tableCategory = "",
  className = "",
  setSearchValue = () => {},
}) => {
  const [searchedData, setSearchedData] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    setRecordsPerPage(array);
  }, [array]);

  const renderComponent = (index, data) => {
    const temp = data
      .map((block) => {
        return block.index === index ? block : false;
      })
      .filter((item) => item !== false)[0];

    return temp || false;
  };

  // useEffect(() => {
  //   setSearchValue(searchedData);
  // }, [searchedData]);

  return (
    <>
      <div className={` mb-2  my-5 ${className}`}>
        <div className={`bg-[white] rounded-[10px] border border-[#E6E6E6] `}>
          <div className="flex justify-between items-center py-3 px-5 border-b border-[#E6E6E6]">
            <h4 className="font-[600] text-[24px] text-primary">
              {tableName} Details
            </h4>

            <div className="flex justify-between items-center">
              <select className="flex justify-between text-primary px-4 mr-4 py-3 bg-[transparent]">
                <option value="">Sort By</option>
              </select>
              {filters.map((element) => {
                return element;
              })}
              <img className="cursor-pointer" src={filtersImg} alt="" />
            </div>
          </div>
          <div className="flex justify-between items-center py-3 px-5 ">
            <h4 className="font-[600] text-[20px] ">{tableName} List</h4>
            <div className="flex justify-end items-center">
              <SearchBar setSearchValue={setSearchValue} />
              {routes[0] && (
                <Link
                  to={routes[0]}
                  className="bg-primary text-[white] text-[14px] font-[700] rounded-[4px] ml-4 py-[12px] px-[16px]"
                >
                  <p className="">Add New {tableName}</p>
                </Link>
              )}
            </div>
          </div>

          <div className="h-[50vh]  overflow-auto">
            <table className="w-full">
              <thead>
                <tr className=" bg-[#F9FAFB] ">
                  {label.map((text, index) => {
                    return (
                      <th
                        className={`py-4 font-[600] text-[16px] text-[#1D2939] whitespace-nowrap 
                       ${
                         index === label.length - 1
                           ? "text-right pr-9"
                           : "text-left pl-9"
                       }
                      `}
                      >
                        {text}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {recordsPerPage ? (
                  recordsPerPage.map((obj, item) => {
                    return (
                      <tr
                        onClick={() => {
                          if (setRecord) setRecord(obj);
                        }}
                        className="cursor-pointer hover:bg-[#D0D5DD] border-b border-[#F2F2F2]"
                      >
                        {keysToDisplay.map((key, index) => {
                          const blocksList = renderComponent(
                            index,
                            customBlocks
                          );
                          return (
                            <td
                              className={`py-4 font-[400] text-[14px] text-[#858992] text-left pl-9 whitespace-nowrap`}
                              onClick={() => {
                                navigate(`${routes[1]}/${obj._id}`);
                              }}
                            >
                              <u>
                                {blocksList
                                  ? blocksList.component(key ? obj[key] : obj)
                                  : obj[key]}
                              </u>
                            </td>
                          );
                        })}

                        {extraColumns.length > 0 ? (
                          extraColumns.map((item) => {
                            return <td className="table_data">{item(obj)}</td>;
                          })
                        ) : (
                          <td className="text-right pr-9 ">
                            <div className="flex flex justify-end  gap-2 ">
                              <img
                                src={editIcon}
                                alt="edit"
                                onClick={() => {
                                  navigate(`${routes[2]}/${obj._id}`);
                                }}
                              />
                              <img
                                src={deleteIcon}
                                alt="delete"
                                onClick={() => {
                                  deleteRecord(obj._id);
                                }}
                              />
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={label.length} className="px-6 py-4">
                      <Skeleton
                        count={5}
                        height={45}
                        style={{ marginBottom: "10px" }}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Table;
