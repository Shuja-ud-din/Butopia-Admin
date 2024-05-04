import React from "react";
import Button from "../Button/Button";
import Table from "../Table/Table";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const CustomersTable = () => {
    const navigate = useNavigate();

    const data = [{ "providerName": "dlifton0", "qualification": "Yorkton Municipal Airport", "experience": "Northland", "workSamples": "Expo LRV" },
    { "providerName": "dberggren1", "qualification": "Pukatawagan Airport", "experience": "Declaration", "workSamples": "GTO" },
    { "providerName": "cgooding2", "qualification": "Shinyanga Airport", "experience": "Mayfield", "workSamples": "RX" },
    { "providerName": "bgirard3", "qualification": "Simara Airport", "experience": "Ohio", "workSamples": "Galaxie" },
    { "providerName": "bwhapple4", "qualification": "Phanom Sarakham Airport", "experience": "Arrowood", "workSamples": "E-Class" },
    { "providerName": "bmcdugal5", "qualification": "Telluride Regional Airport", "experience": "Kensington", "workSamples": "S10" },
    { "providerName": "wfellos6", "qualification": "River Cess Airport/Heliport", "experience": "Sullivan", "workSamples": "Camry Hybrid" },
    { "providerName": "bnorquoy7", "qualification": "April River Airport", "experience": "Morning", "workSamples": "LS" },
    { "providerName": "efoy8", "qualification": "Kamileroi Airport", "experience": "Sycamore", "workSamples": "Outback Sport" },
    { "providerName": "jackenson9", "qualification": "Rotterdam The Hague Airport", "experience": "Farragut", "workSamples": "M3" },
    { "providerName": "kstrowthera", "qualification": "Baindoung Airport", "experience": "Waxwing", "workSamples": "Electra" },
    { "providerName": "bedgsonb", "qualification": "Kashan Airport", "experience": "Claremont", "workSamples": "Daewoo Kalos" },
    { "providerName": "aairesc", "qualification": "Jasper Airport", "experience": "Heffernan", "workSamples": "Firebird" },
    { "providerName": "ddunsterd", "qualification": "K. D. Matanzima Airport", "experience": "Sachs", "workSamples": "Murano" },
    { "providerName": "hhallexe", "qualification": "Mati National Airport", "experience": "Novick", "workSamples": "Escalade EXT" },
    { "providerName": "ksummerlyf", "qualification": "Antonio Nery Juarbe Pol Airport", "experience": "Lindbergh", "workSamples": "Intrepid" },
    { "providerName": "ekeelingg", "qualification": "Enrique Adolfo Jimenez Airport", "experience": "Ridge Oak", "workSamples": "X5 M" },
    { "providerName": "sstearnh", "qualification": "Ceres Airport", "experience": "Mallard", "workSamples": "Topaz" },
    { "providerName": "tklehyni", "qualification": "Dallas Fort Worth International Airport", "experience": "Waxwing", "workSamples": "Cutlass Supreme" },
    { "providerName": "fhearlej", "qualification": "Jagdalpur Airport", "experience": "Nova", "workSamples": "Santa Fe" },
    { "providerName": "tocainek", "qualification": "Mariana Grajales Airport", "experience": "Hanson", "workSamples": "LS" },
    { "providerName": "smcconnultyl", "qualification": "Leaf Rapids Airport", "experience": "Towne", "workSamples": "Colt" },
    { "providerName": "rfumagallom", "qualification": "Île des Pins Airport", "experience": "Westridge", "workSamples": "Canyon" },
    { "providerName": "kbernardellin", "qualification": "Satu Mare Airport", "experience": "Michigan", "workSamples": "SC" },
    { "providerName": "nkeilloho", "qualification": "Kramatorsk Airport", "experience": "Fallview", "workSamples": "Sable" },
    { "providerName": "cprobettsp", "qualification": "Leron Plains Airport", "experience": "Hooker", "workSamples": "Veyron" },
    { "providerName": "ltewnionq", "qualification": "Phitsanulok Airport", "experience": "Kropf", "workSamples": "Villager" },
    { "providerName": "tmaccir", "qualification": "Baitadi Airport", "experience": "Rusk", "workSamples": "L-Series" },
    { "providerName": "jivantsovs", "qualification": "Nampula Airport", "experience": "John Wall", "workSamples": "Vision" },
    { "providerName": "cgreediert", "qualification": "Juan Manuel Galvez International Airport", "experience": "Hayes", "workSamples": "Frontier" },
    { "providerName": "slawloru", "qualification": "Gomez Nino Apiay Air Base", "experience": "Dixon", "workSamples": "Elise" },
    { "providerName": "apeatmanv", "qualification": "Mc Clellan-Palomar Airport", "experience": "Leroy", "workSamples": "Elise" },
    { "providerName": "gadrianellow", "qualification": "Spangdahlem Air Base", "experience": "Longview", "workSamples": "Grand Vitara" },
    { "providerName": "bsimsonx", "qualification": "Sabha Airport", "experience": "Waxwing", "workSamples": "RAV4" },
    { "providerName": "kcoolsony", "qualification": "Chatham Seaplane Base", "experience": "Riverside", "workSamples": "Ram 2500" },
    { "providerName": "llosseljongz", "qualification": "Balıkesir Merkez Airport", "experience": "Lakewood", "workSamples": "Arnage" },
    { "providerName": "mfollan10", "qualification": "Sado Airport", "experience": "Cardinal", "workSamples": "Prelude" },
    { "providerName": "pthrift11", "qualification": "Punta Colorada Airport", "experience": "Morning", "workSamples": "Focus" },
    { "providerName": "umccarter12", "qualification": "Fresno Yosemite International Airport", "experience": "Lakewood", "workSamples": "Town & Country" },
    { "providerName": "gbirnie13", "qualification": "Tinson Pen Airport", "experience": "Oriole", "workSamples": "Silverado 1500" },
    { "providerName": "cmeachan14", "qualification": "Sparta Fort Mc Coy Airport", "experience": "Shelley", "workSamples": "MPV" },
    { "providerName": "iphalp15", "qualification": "Bamarni Airport", "experience": "Clove", "workSamples": "850" },
    { "providerName": "mvivian16", "qualification": "Dean River Airport", "experience": "Pennsylvania", "workSamples": "Yukon XL 2500" },
    { "providerName": "gfraczak17", "qualification": "West Bend Municipal Airport", "experience": "Fuller", "workSamples": "Hombre Space" },
    { "providerName": "wmitrikhin18", "qualification": "Susanville Municipal Airport", "experience": "Daystar", "workSamples": "Cherokee" },
    { "providerName": "lgorke19", "qualification": "Yangyang International Airport", "experience": "North", "workSamples": "Skylark" },
    { "providerName": "sflahive1a", "qualification": "Santa Ynez Airport", "experience": "Evergreen", "workSamples": "350Z" },
    { "providerName": "lcabrera1b", "qualification": "Macaé Airport", "experience": "Kipling", "workSamples": "Cube" },
    { "providerName": "astatham1c", "qualification": "Charlotte County Airport", "experience": "Thackeray", "workSamples": "Paseo" },
    { "providerName": "mnavarre1d", "qualification": "Kuala Lumpur International Airport", "experience": "Anthes", "workSamples": "G-Series 3500" }]

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
                recordClickRoute="/admin/providers/providerdetails"
                array={data}
                search={"providerName"}
                keysToDisplay={["providerName", "qualification", "experience", "workSamples"]}
                label={["Providers", "Qualification", "Experience", "Samples", "Actions"]}
                extraColumns={[
                    () => {
                        return (
                            <MdDelete
                                className="text-[#FF6666] mr-[1rem] text-[1.3rem]" />
                        );
                    },
                ]}
            />
        </>
    );
};

export default CustomersTable;
