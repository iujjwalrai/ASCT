import React, { useEffect, useState } from "react";
import AdvocateList from "../Components/AdvocateList";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../Components/Footer";
import { useForm } from "react-hook-form";

const AdvocatesList = () => {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAd, setFilteredAd] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  async function getAdvocatesList(page = 1) {
    try {
      const response = await toast.promise(
        axios.get(
          `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/advocatesList/getAdvocatesList?page=${page}&limit=${itemsPerPage}`,
          {
            withCredentials: true,
          }
        ),
        {
          loading: "Fetching the data from the server",
          success: <b>Fetched Advocates List successfully</b>,
          error: <b>Could not fetch the data. Please try again</b>,
        }
      );

      const { users, totalPages } = response.data;
      if (users) {
        console.log(users);
        setAdvocates(users);
        setFilteredAd(users);
        setTotalPages(totalPages);
      } else {
        toast.error("No Users found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAdvocatesList(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === i
              ? "bg-blue-900 text-white"
              : "bg-blue-100 text-blue-900"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center gap-2 mt-4 mb-10">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-100 rounded-lg text-blue-900 disabled:opacity-50"
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-100 rounded-lg text-blue-900 disabled:opacity-50"
        >
          &lt;&lt;
        </button>
        {buttons}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-100 rounded-lg text-blue-900 disabled:opacity-50"
        >
          &gt;&gt;
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-100 rounded-lg text-blue-900 disabled:opacity-50"
        >
          Last
        </button>
      </div>
    );
  };

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const openPopUp = () => {
    setIsPopUpOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
    document.body.style.overflow = "auto"; // enable scrolling
  };

  const reset = () => {
    getAdvocatesList(currentPage);
  };

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    reset: reset1,
  } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
  } = useForm();

  const onSubmit = async (data) => {
    const newAdvocates = advocates.filter((advocate) => {
      console.log(data.COP);
      return advocate.COPNo === data.COP;
    });
    setFilteredAd(newAdvocates);
  };

  const onSubmit2 = async (data) => {
    const newAdvocates = advocates.filter((advocate) => {
      if (data.jila && data.adPractice) {
        return (
          advocate.Jila === data.jila && advocate.AdPractice === data.adPractice
        );
      } else if (data.jila && !data.adPractice) {
        return advocate.Jila === data.jila;
      } else if (!data.jila && data.adPractice) {
        return advocate.AdPractice === data.adPractice;
      }
    });
    closePopUp();
    setFilteredAd(newAdvocates);
  };

  return (
    <div>
      <form
        className="mt-6 w-[90vw] mx-auto"
        onSubmit={handleSubmit1(onSubmit)}
      >
        <input
          placeholder="Enter COP No"
          {...register1("COP")}
          required
          className="w-[80%] py-2 px-6 bg-blue-100 rounded-xl placeholder:text-blue-800 placeholder:font-bold border-blue-900 border-2"
        ></input>
        <button
          type="submit"
          className="bg-blue-900 py-2 px-3 rounded-xl ml-4 w-[15%] text-white"
        >
          Search
        </button>
      </form>
      <button
        className="mt-4 w-[90vw] mx-auto text-center bg-blue-900 text-white py-2 block rounded-xl"
        onClick={openPopUp}
      >
        Advanced Filter
      </button>
      <button
        className="mt-4 w-[90vw] mx-auto text-center bg-blue-900 text-white py-2 block rounded-xl"
        onClick={reset}
      >
        Reset
      </button>
      <div className="mt-12 min-h-[70vh] shadow-2xl rounded-2xl w-[90vw] mx-auto mb-12 border-t-[4vh] border-blue-950">
        <div className="flex justify-between px-8 py-4 bg-blue-100 rounded-t-2xl hidden md:flex">
          <div className="font-bold text-center w-[20%]">NAME</div>
          <div className="font-bold text-center w-[7%]">RegNo</div>
          <div className="font-bold text-center w-[7%]">COPNo</div>
          <div className="font-bold text-center w-[15%]">Jila</div>
          <div className="font-bold text-center w-[15%]">AdPractice</div>
          <div className="font-bold text-center w-[7%]">Gender</div>
          <div className="font-bold text-center w-[25%]">createdAt</div>
        </div>
        <div className="px-8 py-6">
          {filteredAd.length > 0 ? (
            filteredAd.map((user) => (
              <div
                key={user._id}
                className="flex flex-col md:flex-row justify-between items-center mb-4 bg-white shadow-md p-4 rounded-xl hover:bg-blue-50"
              >
                <div className="text-center md:w-[20%] text-blue-900 font-medium">
                  <span className="block md:hidden font-bold">NAME:</span>
                  {user.name || "N/A"}
                </div>
                <div className="text-center md:w-[7%] text-blue-800">
                  <span className="block md:hidden font-bold">RegNo:</span>
                  {user.RegNo || "N/A"}
                </div>
                <div className="text-center md:w-[7%] text-blue-700">
                  <span className="block md:hidden font-bold">COPNo:</span>
                  {user.COPNo || "N/A"}
                </div>
                <div className="text-center md:w-[15%] text-blue-700">
                  <span className="block md:hidden font-bold">Jila:</span>
                  {user.Jila || "N/A"}
                </div>
                <div className="text-center md:w-[15%] text-blue-700">
                  <span className="block md:hidden font-bold">AdPractice:</span>
                  {user.AdPractice || "N/A"}
                </div>
                <div className="text-center md:w-[7%] text-blue-700">
                  <span className="block md:hidden font-bold">Gender:</span>
                  {user.Gender || "N/A"}
                </div>
                <div className="text-center md:w-[25%] text-blue-700">
                  <span className="block md:hidden font-bold">CreatedAt:</span>
                  {new Date(user.createdAt).toLocaleDateString() || "N/A"}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-blue-900 font-semibold">
              No Advocates found.
            </div>
          )}
        </div>
      </div>

      {renderPagination()}
      {isPopUpOpen && (
        <div
          className={`popup-overlay fixed top-0 bottom-0 left-0 right-0 backdrop-blur-lg flex justify-center items-center z-10 transition-opacity duration-500 ease-in-out ${
            isPopUpOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={closePopUp}
        >
          <div
            className={`popup-content bg-white rounded-3xl py-12 px-12 shadow-2xl w-[500px] max-w-[90%] relative transition-all duration-500 ${
              isPopUpOpen ? "scale-100" : "scale-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <form
              className="flex flex-col gap-y-5"
              onSubmit={handleSubmit2(onSubmit2)}
            >
              <input
                placeholder="Enter Jila"
                {...register2("jila")}
                className="py-1 px-4 bg-blue-100 rounded-xl placeholder:text-blue-900"
              ></input>
              <label
                htmlFor="practice"
                className="py-1 px-4 bg-blue-100 text-blue-900 rounded-xl"
              >
                {" "}
                Select Advocate Practice Level
              </label>
              <select
                {...register2("adPractice")}
                id="practice"
                className="border-2 border-blue-800 rounded-xl text-blue-900 px-4 py-1"
              >
                <option value="">--Choose An Option--</option>
                <option value="Jila Nyayalay">Jila Nyayalay</option>
                <option value="Uchh Nyayalay">Uchh Nyayalay</option>
                <option value="Tehsil Nyayalay">Tehsil Nyayalay</option>
              </select>
              <button
                type="submit"
                className="w-[50%] bg-blue-900 py-1 rounded-xl text-white"
              >
                Search
              </button>
              <button
                onClick={closePopUp}
                className="w-[50%] bg-blue-900 py-1 rounded-xl text-white"
              >
                Close Pop-Up
              </button>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AdvocatesList;
