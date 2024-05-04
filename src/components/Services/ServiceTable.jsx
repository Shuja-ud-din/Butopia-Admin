import React from "react";
import Button from "../Button/Button";
import Table from "../Table/Table";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

const ServiceTable = () => {
  const navigate = useNavigate("")
  const data = [
    {
      serviceName: 1,
      description: "Issie",
      duration: "Skilling",
      price: "iskilling0@hugedomains.com",
      category: "Female",
    },
    {
      serviceName: 2,
      description: "Vick",
      duration: "Bolden",
      price: "vbolden1@photobucket.com",
      category: "Male",
    },
    {
      serviceName: 3,
      description: "Coralie",
      duration: "Mityushkin",
      price: "cmityushkin2@cam.ac.uk",
      category: "Female",
    },
    {
      serviceName: 4,
      description: "Jocelin",
      duration: "Meeron",
      price: "jmeeron3@utexas.edu",
      category: "Female",
    },
    {
      serviceName: 5,
      description: "Kristina",
      duration: "Graybeal",
      price: "kgraybeal4@google.co.jp",
      category: "Female",
    },
    {
      serviceName: 6,
      description: "Erskine",
      duration: "Scraggs",
      price: "escraggs5@topsy.com",
      category: "Male",
    },
    {
      serviceName: 7,
      description: "Gail",
      duration: "Gault",
      price: "ggault6@ocn.ne.jp",
      category: "Female",
    },
    {
      serviceName: 8,
      description: "Elijah",
      duration: "Collman",
      price: "ecollman7@hhs.gov",
      category: "Male",
    },
    {
      serviceName: 9,
      description: "Lucilia",
      duration: "Detloff",
      price: "ldetloff8@shop-pro.jp",
      category: "Female",
    },
    {
      serviceName: 10,
      description: "Rriocard",
      duration: "Gullis",
      price: "rgullis9@disqus.com",
      category: "Male",
    },
    {
      serviceName: 11,
      description: "Caleb",
      duration: "Geering",
      price: "cgeeringa@irs.gov",
      category: "Male",
    },
    {
      serviceName: 12,
      description: "Marylou",
      duration: "Proudman",
      price: "mproudmanb@linkedin.com",
      category: "Female",
    },
    {
      serviceName: 13,
      description: "Calida",
      duration: "Chern",
      price: "cchernc@aboutads.info",
      category: "Female",
    },
    {
      serviceName: 14,
      description: "Angeline",
      duration: "Cuppitt",
      price: "acuppittd@dedecms.com",
      category: "Female",
    },
    {
      serviceName: 15,
      description: "Ynes",
      duration: "Deehan",
      price: "ydeehane@va.gov",
      category: "Female",
    },
    {
      serviceName: 16,
      description: "Urson",
      duration: "Tuftin",
      price: "utuftinf@oaic.gov.au",
      category: "Male",
    },
    {
      serviceName: 17,
      description: "Jerrilee",
      duration: "Flatte",
      price: "jflatteg@blogtalkradio.com",
      category: "Female",
    },
    {
      serviceName: 18,
      description: "Germaine",
      duration: "Steinson",
      price: "gsteinsonh@google.co.uk",
      category: "Non-binary",
    },
    {
      serviceName: 19,
      description: "Chevy",
      duration: "Jolliffe",
      price: "cjolliffei@reference.com",
      category: "Male",
    },
    {
      serviceName: 20,
      description: "Erasmus",
      duration: "Elphinston",
      price: "eelphinstonj@nymag.com",
      category: "Male",
    },
    {
      serviceName: 21,
      description: "Oralee",
      duration: "Billison",
      price: "obillisonk@networksolutions.com",
      category: "Female",
    },
    {
      serviceName: 22,
      description: "Valle",
      duration: "Tomkinson",
      price: "vtomkinsonl@rakuten.co.jp",
      category: "Male",
    },
    {
      serviceName: 23,
      description: "Ira",
      duration: "McGreary",
      price: "imcgrearym@mysql.com",
      category: "Male",
    },
    {
      serviceName: 24,
      description: "Ag",
      duration: "Enrrico",
      price: "aenrricon@tumblr.com",
      category: "Female",
    },
    {
      serviceName: 25,
      description: "Harald",
      duration: "Smerdon",
      price: "hsmerdono@ning.com",
      category: "Male",
    },
    {
      serviceName: 26,
      description: "Miran",
      duration: "McVaugh",
      price: "mmcvaughp@house.gov",
      category: "Female",
    },
    {
      serviceName: 27,
      description: "Natka",
      duration: "Biernat",
      price: "nbiernatq@blogspot.com",
      category: "Female",
    },
    {
      serviceName: 28,
      description: "Cilka",
      duration: "Ashborn",
      price: "cashbornr@tripadvisor.com",
      category: "Female",
    },
    {
      serviceName: 29,
      description: "Aaron",
      duration: "Eglington",
      price: "aeglingtons@seattletimes.com",
      category: "Male",
    },
    {
      serviceName: 30,
      description: "Hephzibah",
      duration: "Caffrey",
      price: "hcaffreyt@shop-pro.jp",
      category: "Female",
    },
    {
      serviceName: 31,
      description: "Melloney",
      duration: "Kenningham",
      price: "mkenninghamu@blogs.com",
      category: "Female",
    },
    {
      serviceName: 32,
      description: "Jarred",
      duration: "Kelcey",
      price: "jkelceyv@youku.com",
      category: "Male",
    },
    {
      serviceName: 33,
      description: "Conney",
      duration: "Tunno",
      price: "ctunnow@about.me",
      category: "Male",
    },
    {
      serviceName: 34,
      description: "Adoree",
      duration: "Licari",
      price: "alicarix@oaic.gov.au",
      category: "Female",
    },
    {
      serviceName: 35,
      description: "Annabella",
      duration: "Plaistowe",
      price: "aplaistowey@indiatimes.com",
      category: "Female",
    },
    {
      serviceName: 36,
      description: "Shaun",
      duration: "Bennington",
      price: "sbenningtonz@taobao.com",
      category: "Male",
    },
    {
      serviceName: 37,
      description: "Livvie",
      duration: "Spera",
      price: "lspera10@independent.co.uk",
      category: "Female",
    },
    {
      serviceName: 38,
      description: "Horacio",
      duration: "Packington",
      price: "hpackington11@hexun.com",
      category: "Male",
    },
    {
      serviceName: 39,
      description: "Abbye",
      duration: "Bowker",
      price: "abowker12@harvard.edu",
      category: "Female",
    },
    {
      serviceName: 40,
      description: "Davide",
      duration: "Hold",
      price: "dhold13@hibu.com",
      category: "Male",
    },
    {
      serviceName: 41,
      description: "Diahann",
      duration: "Demougeot",
      price: "ddemougeot14@zdnet.com",
      category: "Genderqueer",
    },
    {
      serviceName: 42,
      description: "Kory",
      duration: "Ainsby",
      price: "kainsby15@washingtonpost.com",
      category: "Male",
    },
    {
      serviceName: 43,
      description: "Carling",
      duration: "Kohtler",
      price: "ckohtler16@csmonitor.com",
      category: "Male",
    },
    {
      serviceName: 44,
      description: "Zora",
      duration: "Redmille",
      price: "zredmille17@yale.edu",
      category: "Female",
    },
    {
      serviceName: 45,
      description: "Taddeusz",
      duration: "Whysall",
      price: "twhysall18@rakuten.co.jp",
      category: "Male",
    },
    {
      serviceName: 46,
      description: "Carolyn",
      duration: "Alger",
      price: "calger19@sciencedaily.com",
      category: "Female",
    },
    {
      serviceName: 47,
      description: "Rhianon",
      duration: "Quogan",
      price: "rquogan1a@unc.edu",
      category: "Female",
    },
    {
      serviceName: 48,
      description: "Say",
      duration: "Kesterton",
      price: "skesterton1b@wordpress.com",
      category: "Bigender",
    },
    {
      serviceName: 49,
      description: "Pamela",
      duration: "Duckit",
      price: "pduckit1c@usa.gov",
      category: "Bigender",
    },
    {
      serviceName: 50,
      description: "Vincenty",
      duration: "Devlin",
      price: "vdevlin1d@geocities.jp",
      category: "Male",
    },
  ];

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
        keysToDisplay={["serviceName", "description", "price", "category"]}
        label={["Service Name", "Description", "Price", "Category", "Actions"]}
        extraColumns={[
          () => {
            return (
              <div className="flex gap-[1rem]">
                <MdEdit className="text-[#ccccc] text-[1.3rem]" />
                <MdDelete className="text-[#FF6666] text-[1.3rem]" />
              </div>
            );
          },
        ]}
      />
    </>
  );
};

export default ServiceTable;
