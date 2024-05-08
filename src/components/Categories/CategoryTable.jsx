import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Table from "../Table/Table";
import Modal from '../Modal/Modal'
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Input from '../Input/Input'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import useCategories from "../../Hooks/useCategories";


const CustomersTable = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [modalType, setModalType] = useState("");
    const navigate = useNavigate("")
    const toggleModal = () => {
        setIsModalVisible((prevState) => !prevState);
    };
    const toggleEditModal = () => {
        setIsEditModalVisible((prevState) => !prevState);
    };


    console.log(isModalVisible);
    const { getCategoryTable, getAllCategories } = useCategories();
    useEffect(() => {
        getCategoryTable()
    })
    return (
        <>
            <div className="w-full flex justify-between mb-5">
                <h3 className="text-[25px] font-[500] ">Categories</h3>
                <Button
                    className=""
                    onClick={() => navigate("/admin/categories/addcategory")}
                >
                    <FaPlus size={14} className="mr-2" />
                    Add Categories
                </Button>
            </div>
            {isEditModalVisible && <Modal toggleModal={toggleEditModal}>
                <>
                    <div className="w-full mb-3">
                        <h3 className="text-[23px] font-[500] ">Edit Category</h3>
                    </div>
                    <div>
                        <label
                            htmlFor="harvestingPeriod"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <Input
                            type='text'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="harvestingPeriod"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Price
                        </label>
                        <Input
                            type='text'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="harvestingPeriod"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Special Offer
                        </label>
                        <Input
                            type='text'
                        />
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Additional Comments
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows={4}
                            className="mt-1 block w-full px-3 py-2 border border border-primary rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="w-full flex justify-end">
                        <Button className='m-2 w-[6rem]' type="primary">Edit</Button>
                        <Button className='m-2' onClick={toggleEditModal} type="secondary">Cancel</Button>
                    </div>
                </>
            </Modal>}
            {isModalVisible && <Modal toggleModal={toggleModal}>
                <>
                    <div className="w-full mb-3">
                        <h3 className="text-[23px] font-[500] ">Delete Category</h3>
                    </div>
                    <div>
                        <label
                            htmlFor="harvestingPeriod"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <Input
                            type='text'
                        />
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Additional Comments
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows={4}
                            className="mt-1 block w-full px-3 py-2 border border border-primary rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="w-full flex justify-end">
                        <Button className='m-2' type="primary">Delete</Button>
                        <Button className='m-2' onClick={toggleModal} type="secondary">Cancel</Button>
                    </div>
                </>
            </Modal>}
            <Table
                array={getAllCategories}
                search={"description"}
                keysToDisplay={["categoryName", "description", "pricing", "specialOffers"]}
                label={["Category Name", "Descrription", "Prices", "Special Offers", "Actions"]}
                extraColumns={[
                    () => {
                        return (
                            <div className="flex gap-[1rem]">
                                <MdEdit className="text-[#ccccc] text-[1.3rem]" onClick={() => setIsEditModalVisible(!isEditModalVisible)} />
                                <MdDelete className="text-[#FF6666] text-[1.3rem]" onClick={() => setIsModalVisible(!isModalVisible)} />

                            </div>
                        );
                    },
                ]}
            />
        </>
    );
};

export default CustomersTable;
