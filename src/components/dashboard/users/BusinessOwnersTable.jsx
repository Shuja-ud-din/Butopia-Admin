import React, { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";


function UsersTable({ users,load }) {
  const [id, setId] = useState();

  const navigate = useNavigate()

  return (
    <div className="h-[70%] overflow-y-scroll">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-5 ">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">
                Business Name
              </th>
              <th scope="col" class="px-6 py-3">
                Business Type
              </th>
              <th scope="col" class="px-6 py-3">
                Vat Number
              </th>
              <th scope="col" class="px-6 py-3">
                Owner
              </th>
              <th scope="col" class="px-6 py-3">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
          {users ? (
    users.map((user, index) => (
        <tr class="bg-white border-b border-secondary dark:bg-gray-800 hover:bg-secondary cursor-pointer" onClick={() => {
            navigate(`/ownerprofile/${user._id}`);
        }}>
            <td class="px-6 py-4">{user.businessName}</td>
            <td class="px-6 py-4">{user.businessType}</td>
            <td class="px-6 py-4">{user.vatNumber}</td>

            <td
                scope="row"
                class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
            >
                <div class="ps-3">
                    <div class="text-base font-semibold">{`${user.owner.firstName} ${user.owner.lastName}`}</div>
                    <div class="font-normal text-gray-500">
                        {user.owner.email}
                    </div>
                </div>
            </td>
            <td class="px-6 py-4">{user.owner.role}</td>
        </tr>
    ))
) : (
        <td colSpan={5} className="px-6 py-4">
            <Skeleton count={5} height={45} style={{ marginBottom: '10px' }} />
        </td>
    )}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTable;
