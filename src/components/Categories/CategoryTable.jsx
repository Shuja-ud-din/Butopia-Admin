import React, { useState } from "react";
import Button from "../Button/Button";
import Table from "../Table/Table";
import Modal from '../Modal/Modal'
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Input from '../Input/Input'
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

    const data = [
        { "categoryName": 1, "description": "Westbrook", "pricing": "Chatenet", "duration": "wchatenet0@hao123.com", "specialOffers": "Genderfluid" },
        { "categoryName": 2, "description": "Jecho", "pricing": "Syvret", "duration": "jsyvret1@fda.gov", "specialOffers": "Male" },
        { "categoryName": 3, "description": "Leslie", "pricing": "Gecks", "duration": "lgecks2@webnode.com", "specialOffers": "Male" },
        { "categoryName": 4, "description": "Betty", "pricing": "Addionizio", "duration": "baddionizio3@wikia.com", "specialOffers": "Female" },
        { "categoryName": 5, "description": "Neill", "pricing": "Burkwood", "duration": "nburkwood4@shutterfly.com", "specialOffers": "Male" },
        { "categoryName": 6, "description": "Benyamin", "pricing": "Backshill", "duration": "bbackshill5@imdb.com", "specialOffers": "Male" },
        { "categoryName": 7, "description": "Cloe", "pricing": "Laskey", "duration": "claskey6@wikimedia.org", "specialOffers": "Female" },
        { "categoryName": 8, "description": "Winnah", "pricing": "Sorbie", "duration": "wsorbie7@studiopress.com", "specialOffers": "Genderfluid" },
        { "categoryName": 9, "description": "Mireielle", "pricing": "Readmire", "duration": "mreadmire8@ed.gov", "specialOffers": "Female" },
        { "categoryName": 10, "description": "Arlene", "pricing": "Marciek", "duration": "amarciek9@shop-pro.jp", "specialOffers": "Non-binary" },
        { "categoryName": 11, "description": "Rozelle", "pricing": "Penketh", "duration": "rpenketha@wired.com", "specialOffers": "Female" },
        { "categoryName": 12, "description": "Allayne", "pricing": "Stearndale", "duration": "astearndaleb@yolasite.com", "specialOffers": "Male" },
        { "categoryName": 13, "description": "Rene", "pricing": "Royal", "duration": "rroyalc@devhub.com", "specialOffers": "Male" },
        { "categoryName": 14, "description": "Malanie", "pricing": "Oxtiby", "duration": "moxtibyd@godaddy.com", "specialOffers": "Female" },
        { "categoryName": 15, "description": "Everett", "pricing": "Tape", "duration": "etapee@sakura.ne.jp", "specialOffers": "Genderfluid" },
        { "categoryName": 16, "description": "Darill", "pricing": "Kores", "duration": "dkoresf@aboutads.info", "specialOffers": "Male" },
        { "categoryName": 17, "description": "Dorrie", "pricing": "Sherrett", "duration": "dsherrettg@canalblog.com", "specialOffers": "Female" },
        { "categoryName": 18, "description": "Elfreda", "pricing": "Cotgrove", "duration": "ecotgroveh@geocities.jp", "specialOffers": "Female" },
        { "categoryName": 19, "description": "Trace", "pricing": "Windous", "duration": "twindousi@pagesperso-orange.fr", "specialOffers": "Male" },
        { "categoryName": 20, "description": "Rhona", "pricing": "Jost", "duration": "rjostj@marriott.com", "specialOffers": "Female" },
        { "categoryName": 21, "description": "Mallissa", "pricing": "Fahey", "duration": "mfaheyk@usda.gov", "specialOffers": "Bigender" },
        { "categoryName": 22, "description": "Olivia", "pricing": "Guerro", "duration": "oguerrol@angelfire.com", "specialOffers": "Female" },
        { "categoryName": 23, "description": "Adeline", "pricing": "Schubert", "duration": "aschubertm@uol.com.br", "specialOffers": "Female" },
        { "categoryName": 24, "description": "Gardie", "pricing": "St Clair", "duration": "gstclairn@posterous.com", "specialOffers": "Male" },
        { "categoryName": 25, "description": "Deny", "pricing": "Shepland", "duration": "dsheplando@spiegel.de", "specialOffers": "Female" },
        { "categoryName": 26, "description": "Lenci", "pricing": "Adamovich", "duration": "ladamovichp@spiegel.de", "specialOffers": "Male" },
        { "categoryName": 27, "description": "Reyna", "pricing": "Francis", "duration": "rfrancisq@infoseek.co.jp", "specialOffers": "Female" },
        { "categoryName": 28, "description": "Whittaker", "pricing": "Grix", "duration": "wgrixr@mediafire.com", "specialOffers": "Male" },
        { "categoryName": 29, "description": "Waylen", "pricing": "Barnshaw", "duration": "wbarnshaws@nymag.com", "specialOffers": "Male" },
        { "categoryName": 30, "description": "Jania", "pricing": "Pashba", "duration": "jpashbat@walmart.com", "specialOffers": "Agender" },
        { "categoryName": 31, "description": "Melitta", "pricing": "Filipov", "duration": "mfilipovu@webnode.com", "specialOffers": "Female" },
        { "categoryName": 32, "description": "Roslyn", "pricing": "Mergue", "duration": "rmerguev@storify.com", "specialOffers": "Female" },
        { "categoryName": 33, "description": "Russ", "pricing": "Riccione", "duration": "rriccionew@digg.com", "specialOffers": "Male" },
        { "categoryName": 34, "description": "Benedicta", "pricing": "Bigg", "duration": "bbiggx@microsoft.com", "specialOffers": "Female" },
        { "categoryName": 35, "description": "Helenka", "pricing": "Kiebes", "duration": "hkiebesy@ehow.com", "specialOffers": "Female" },
        { "categoryName": 36, "description": "Gene", "pricing": "Kuban", "duration": "gkubanz@yelp.com", "specialOffers": "Female" },
        { "categoryName": 37, "description": "Selma", "pricing": "Croft", "duration": "scroft10@google.fr", "specialOffers": "Female" },
        { "categoryName": 38, "description": "Roseanna", "pricing": "McKeevers", "duration": "rmckeevers11@goo.gl", "specialOffers": "Female" },
        { "categoryName": 39, "description": "Sheffield", "pricing": "Stephen", "duration": "sstephen12@technorati.com", "specialOffers": "Male" },
        { "categoryName": 40, "description": "Sheff", "pricing": "Tipple", "duration": "stipple13@msu.edu", "specialOffers": "Male" },
        { "categoryName": 41, "description": "Ivor", "pricing": "Adamik", "duration": "iadamik14@about.com", "specialOffers": "Male" },
        { "categoryName": 42, "description": "Frasco", "pricing": "Shurmore", "duration": "fshurmore15@php.net", "specialOffers": "Male" },
        { "categoryName": 43, "description": "Elden", "pricing": "Wordesworth", "duration": "ewordesworth16@furl.net", "specialOffers": "Male" },
        { "categoryName": 44, "description": "Selestina", "pricing": "McCauley", "duration": "smccauley17@un.org", "specialOffers": "Female" },
        { "categoryName": 45, "description": "Adi", "pricing": "Aylmore", "duration": "aaylmore18@cnet.com", "specialOffers": "Female" },
        { "categoryName": 46, "description": "Gwendolin", "pricing": "Petrelluzzi", "duration": "gpetrelluzzi19@engadget.com", "specialOffers": "Female" },
        { "categoryName": 47, "description": "Aldon", "pricing": "Gernier", "duration": "agernier1a@scribd.com", "specialOffers": "Male" },
        { "categoryName": 48, "description": "Graig", "pricing": "McGrail", "duration": "gmcgrail1b@joomla.org", "specialOffers": "Male" },
        { "categoryName": 49, "description": "Jeri", "pricing": "O' Concannon", "duration": "joconcannon1c@prnewswire.com", "specialOffers": "Female" },
        { "categoryName": 50, "description": "Bryn", "pricing": "Woolway", "duration": "bwoolway1d@deliciousdays.com", "specialOffers": "Male" },
        { "categoryName": 51, "description": "Carine", "pricing": "Dmisek", "duration": "cdmisek1e@unblog.fr", "specialOffers": "Female" },
        { "categoryName": 52, "description": "Neddie", "pricing": "Aldin", "duration": "naldin1f@themeforest.net", "specialOffers": "Male" },
        { "categoryName": 53, "description": "Hercules", "pricing": "Norquay", "duration": "hnorquay1g@cocolog-nifty.com", "specialOffers": "Male" },
        { "categoryName": 54, "description": "Adelice", "pricing": "Robarts", "duration": "arobarts1h@addtoany.com", "specialOffers": "Female" },
        { "categoryName": 55, "description": "Sal", "pricing": "Frudd", "duration": "sfrudd1i@cafepress.com", "specialOffers": "Female" },
        { "categoryName": 56, "description": "Nate", "pricing": "Turn", "duration": "nturn1j@360.cn", "specialOffers": "Non-binary" },
        { "categoryName": 57, "description": "Gerty", "pricing": "Llorente", "duration": "gllorente1k@fastcompany.com", "specialOffers": "Female" },
        { "categoryName": 58, "description": "Olia", "pricing": "Shelton", "duration": "oshelton1l@soup.io", "specialOffers": "Bigender" },
        { "categoryName": 59, "description": "Gilles", "pricing": "Whalley", "duration": "gwhalley1m@wiley.com", "specialOffers": "Male" },
        { "categoryName": 60, "description": "Nico", "pricing": "Satyford", "duration": "nsatyford1n@e-recht24.de", "specialOffers": "Male" },
        { "categoryName": 61, "description": "Caro", "pricing": "Deegan", "duration": "cdeegan1o@squarespace.com", "specialOffers": "Agender" },
        { "categoryName": 62, "description": "Izak", "pricing": "Daal", "duration": "idaal1p@nasa.gov", "specialOffers": "Male" },
        { "categoryName": 63, "description": "Ethelred", "pricing": "Shave", "duration": "eshave1q@netscape.com", "specialOffers": "Male" },
        { "categoryName": 64, "description": "Reginauld", "pricing": "Matyasik", "duration": "rmatyasik1r@yahoo.com", "specialOffers": "Male" },
        { "categoryName": 65, "description": "Leon", "pricing": "Rose", "duration": "lrose1s@diigo.com", "specialOffers": "Non-binary" },
        { "categoryName": 66, "description": "Hollis", "pricing": "Badrick", "duration": "hbadrick1t@tuttocitta.it", "specialOffers": "Male" },
        { "categoryName": 67, "description": "Noelle", "pricing": "Elliff", "duration": "nelliff1u@technorati.com", "specialOffers": "Female" },
        { "categoryName": 68, "description": "Emmerich", "pricing": "Pionter", "duration": "epionter1v@uiuc.edu", "specialOffers": "Male" },
        { "categoryName": 69, "description": "Oby", "pricing": "Beckley", "duration": "obeckley1w@tinyurl.com", "specialOffers": "Agender" },
        { "categoryName": 70, "description": "Pammy", "pricing": "Shillito", "duration": "pshillito1x@meetup.com", "specialOffers": "Female" },
        { "categoryName": 71, "description": "Dalia", "pricing": "Kinane", "duration": "dkinane1y@google.ru", "specialOffers": "Female" },
        { "categoryName": 72, "description": "Jillie", "pricing": "Kase", "duration": "jkase1z@ibm.com", "specialOffers": "Female" },
        { "categoryName": 73, "description": "Ninon", "pricing": "Surby", "duration": "nsurby20@ftc.gov", "specialOffers": "Female" },
        { "categoryName": 74, "description": "Ulick", "pricing": "Driffill", "duration": "udriffill21@ucsd.edu", "specialOffers": "Male" },
        { "categoryName": 75, "description": "Katie", "pricing": "Readmire", "duration": "kreadmire22@ihg.com", "specialOffers": "Female" },
        { "categoryName": 76, "description": "Mahalia", "pricing": "Halfacree", "duration": "mhalfacree23@free.fr", "specialOffers": "Female" },
        { "categoryName": 77, "description": "Aurelea", "pricing": "Ahrendsen", "duration": "aahrendsen24@hud.gov", "specialOffers": "Female" },
        { "categoryName": 78, "description": "Zach", "pricing": "Burbridge", "duration": "zburbridge25@usgs.gov", "specialOffers": "Male" },
        { "categoryName": 79, "description": "Murvyn", "pricing": "Rice", "duration": "mrice26@virginia.edu", "specialOffers": "Male" },
        { "categoryName": 80, "description": "Patrizio", "pricing": "Blaza", "duration": "pblaza27@dmoz.org", "specialOffers": "Male" },
        { "categoryName": 81, "description": "Jaquenetta", "pricing": "Reany", "duration": "jreany28@mtv.com", "specialOffers": "Female" },
        { "categoryName": 82, "description": "Tiffani", "pricing": "Coldbathe", "duration": "tcoldbathe29@seesaa.net", "specialOffers": "Female" },
        { "categoryName": 83, "description": "Blondie", "pricing": "Youngs", "duration": "byoungs2a@twitter.com", "specialOffers": "Female" },
        { "categoryName": 84, "description": "Betsey", "pricing": "Greaser", "duration": "bgreaser2b@pen.io", "specialOffers": "Female" },
        { "categoryName": 85, "description": "Beck", "pricing": "Kemish", "duration": "bkemish2c@domainmarket.com", "specialOffers": "Male" },
        { "categoryName": 86, "description": "Harrison", "pricing": "Alebrooke", "duration": "halebrooke2d@mlb.com", "specialOffers": "Non-binary" },
        { "categoryName": 87, "description": "Alexa", "pricing": "Ortells", "duration": "aortells2e@earthlink.net", "specialOffers": "Female" },
        { "categoryName": 88, "description": "Caron", "pricing": "Conkling", "duration": "cconkling2f@cocolog-nifty.com", "specialOffers": "Female" },
        { "categoryName": 89, "description": "Nicol", "pricing": "Rabb", "duration": "nrabb2g@indiatimes.com", "specialOffers": "Male" },
        { "categoryName": 90, "description": "Graham", "pricing": "Gaucher", "duration": "ggaucher2h@discovery.com", "specialOffers": "Male" },
        { "categoryName": 91, "description": "Nikola", "pricing": "Ryle", "duration": "nryle2i@cdc.gov", "specialOffers": "Male" },
        { "categoryName": 92, "description": "Wynny", "pricing": "Klosterman", "duration": "wklosterman2j@geocities.jp", "specialOffers": "Female" },
        { "categoryName": 93, "description": "Alic", "pricing": "Hammell", "duration": "ahammell2k@businessinsider.com", "specialOffers": "Male" },
        { "categoryName": 94, "description": "Maggee", "pricing": "Somersett", "duration": "msomersett2l@wikispaces.com", "specialOffers": "Female" },
        { "categoryName": 95, "description": "Gaile", "pricing": "Wrighton", "duration": "gwrighton2m@ning.com", "specialOffers": "Male" },
        { "categoryName": 96, "description": "Trstram", "pricing": "Flescher", "duration": "tflescher2n@sohu.com", "specialOffers": "Male" },
        { "categoryName": 97, "description": "Junina", "pricing": "Sture", "duration": "jsture2o@networkadvertising.org", "specialOffers": "Female" },
        { "categoryName": 98, "description": "Roderic", "pricing": "Well", "duration": "rwell2p@tiny.cc", "specialOffers": "Male" },
        { "categoryName": 99, "description": "Rodrique", "pricing": "Gounin", "duration": "rgounin2q@altervista.org", "specialOffers": "Male" },
        { "categoryName": 100, "description": "Sherie", "pricing": "Toft", "duration": "stoft2r@booking.com", "specialOffers": "Female" }
    ]
    console.log(isModalVisible);
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
                array={data}
                search={"description"}
                keysToDisplay={["categoryName", "description", "pricing", "specialOffers"]}
                label={["Category Name", "Descrription", "Prices", "Special Offers", "Actions"]}
                extraColumns={[
                    () => {
                        return (
                            <div className="flex gap-[1rem]">
                                <Button onClick={() => setIsEditModalVisible(!isEditModalVisible)} type="danger" className="w-[80px]" outlined>
                                    Edit
                                </Button>
                                <Button onClick={() => setIsModalVisible(!isModalVisible)} type="danger" className="w-[80px]" outlined>
                                    Delete
                                </Button>
                            </div>
                        );
                    },
                ]}
            />
        </>
    );
};

export default CustomersTable;
