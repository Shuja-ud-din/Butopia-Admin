import React from "react";
import Button from "../Button/Button";
import Table from "../Table/Table";

const CustomersTable = () => {
  const data = [
    {
      id: 1,
      fullName: "Margi Kinghorne",
      phNo: "824-977-4772",
    },
    {
      id: 2,
      fullName: "Willdon Tumini",
      phNo: "531-169-1976",
    },
    {
      id: 3,
      fullName: "Earvin Opdenorth",
      phNo: "766-144-8031",
    },
    {
      id: 4,
      fullName: "Demetris Lawty",
      phNo: "899-678-2309",
    },
    {
      id: 5,
      fullName: "Bernette Gouldthorpe",
      phNo: "863-718-3734",
    },
    {
      id: 6,
      fullName: "Rikki Jouhandeau",
      phNo: "922-368-0012",
    },
    {
      id: 7,
      fullName: "Chrisse Krystek",
      phNo: "871-151-1247",
    },
    {
      id: 8,
      fullName: "Gabrielle Beach",
      phNo: "856-463-6281",
    },
    {
      id: 9,
      fullName: "Antonetta Bernli",
      phNo: "108-402-9559",
    },
    {
      id: 10,
      fullName: "Gonzales Slayny",
      phNo: "458-371-2353",
    },
    {
      id: 11,
      fullName: "Obidiah Pendred",
      phNo: "112-679-7002",
    },
    {
      id: 12,
      fullName: "Lizbeth Douglas",
      phNo: "552-673-4902",
    },
    {
      id: 13,
      fullName: "Lurline Snazle",
      phNo: "503-755-0939",
    },
    {
      id: 14,
      fullName: "Ken Habercham",
      phNo: "602-265-9494",
    },
    {
      id: 15,
      fullName: "Hyatt Lourens",
      phNo: "648-362-6833",
    },
    {
      id: 16,
      fullName: "Lottie Poe",
      phNo: "507-734-6156",
    },
    {
      id: 17,
      fullName: "Viola Payze",
      phNo: "997-816-5325",
    },
    {
      id: 18,
      fullName: "Zenia McNellis",
      phNo: "652-653-0689",
    },
    {
      id: 19,
      fullName: "Waylon Gomersal",
      phNo: "864-953-3110",
    },
    {
      id: 20,
      fullName: "Emmalynn Guido",
      phNo: "513-665-2860",
    },
    {
      id: 21,
      fullName: "Lynette Koop",
      phNo: "737-782-3115",
    },
    {
      id: 22,
      fullName: "Delinda Curnick",
      phNo: "446-620-6972",
    },
    {
      id: 23,
      fullName: "Inge Gres",
      phNo: "562-928-9344",
    },
    {
      id: 24,
      fullName: "Katrine Pococke",
      phNo: "579-641-5243",
    },
    {
      id: 25,
      fullName: "Hewet Brewers",
      phNo: "397-616-4866",
    },
    {
      id: 26,
      fullName: "Farleigh Dogg",
      phNo: "338-905-1030",
    },
    {
      id: 27,
      fullName: "Carmen Fay",
      phNo: "308-478-0982",
    },
    {
      id: 28,
      fullName: "Duke Dinkin",
      phNo: "123-372-8319",
    },
    {
      id: 29,
      fullName: "Demetre Naisby",
      phNo: "271-189-5241",
    },
    {
      id: 30,
      fullName: "Ted Melan",
      phNo: "276-431-9254",
    },
    {
      id: 31,
      fullName: "Ruby Cheng",
      phNo: "444-228-8467",
    },
    {
      id: 32,
      fullName: "Shae Shercliff",
      phNo: "830-597-2219",
    },
    {
      id: 33,
      fullName: "Ronalda Dougill",
      phNo: "120-369-4605",
    },
    {
      id: 34,
      fullName: "Legra Grindrod",
      phNo: "822-717-4157",
    },
    {
      id: 35,
      fullName: "Somerset Gert",
      phNo: "270-805-0044",
    },
    {
      id: 36,
      fullName: "Doloritas Dowding",
      phNo: "591-462-8527",
    },
    {
      id: 37,
      fullName: "Shae Kleis",
      phNo: "726-820-7412",
    },
    {
      id: 38,
      fullName: "Jeanine Zecchi",
      phNo: "850-672-1903",
    },
    {
      id: 39,
      fullName: "Germaine Grishankov",
      phNo: "536-976-9446",
    },
    {
      id: 40,
      fullName: "Florie Beedham",
      phNo: "244-977-4604",
    },
    {
      id: 41,
      fullName: "Elvera Briand",
      phNo: "172-147-6971",
    },
    {
      id: 42,
      fullName: "Erda Rubenovic",
      phNo: "249-222-7405",
    },
    {
      id: 43,
      fullName: "Maggie Jorez",
      phNo: "344-511-4863",
    },
    {
      id: 44,
      fullName: "Janeta Lathwood",
      phNo: "833-140-9698",
    },
    {
      id: 45,
      fullName: "Mamie Maier",
      phNo: "259-350-8248",
    },
    {
      id: 46,
      fullName: "Urbain Keith",
      phNo: "844-724-2572",
    },
    {
      id: 47,
      fullName: "Correy Berndtssen",
      phNo: "862-360-0561",
    },
    {
      id: 48,
      fullName: "Christean Bourdice",
      phNo: "756-281-5965",
    },
    {
      id: 49,
      fullName: "Stormy Mayman",
      phNo: "677-827-4086",
    },
    {
      id: 50,
      fullName: "Kaspar Pebworth",
      phNo: "318-299-3035",
    },
  ];

  return (
    <>
      <div className="w-full">
        <h3 className="text-[25px] font-[500] ">Customers</h3>
      </div>

      <Table
        array={data}
        filters={["fullName"]}
        keysToDisplay={["id", "fullName", "phNo"]}
        label={["#", "customer Name", "phone No", "Actions"]}
        extraColumns={[
          () => {
            return (
              <Button type="danger" outlined>
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
