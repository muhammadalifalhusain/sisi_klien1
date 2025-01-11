import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "../../Elements/Card";
import { NotifContext } from "../../../context/notifContext";

const CardBill = () => {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Local loading state

  useEffect(() => {
    const fetchUpcomingBills = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("refreshToken");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await axios.get("https://jwt-auth-eight-neon.vercel.app/bills", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Adjust the data handling to access the correct `data` key
        if (response.data && Array.isArray(response.data.data)) {
          setBills(response.data.data);
        } else {
          console.log("Unexpected data format:", response.data);
          setBills([]);
        }
      } catch (err) {
        console.log("API call failed:", err);
        setError(err.message || "Failed to fetch bills.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcomingBills();
  }, []);

  const billCard =
    Array.isArray(bills) && bills.length > 0 ? (
      bills.map((bill) => (
        <div key={bill.id} className="lg:flex justify-between pt-3 pb-3">
          <div className="flex">
            <div className="bg-special-bg me-3 px-4 rounded-lg flex place-content-center flex-col">
              <span className="text-xs">{bill.month}</span>
              <span className="text-2xl font-bold">{bill.date}</span>
            </div>
            <div>
              <img className="h-6" src={`/images/${bill.logo}`} alt="bill logo" />
              <span className="font-bold">{bill.name}</span>
              <br />
              <span className="text-xs">Last Charge - {bill.lastCharge}</span>
            </div>
          </div>
          <div className="flex place-content-center flex-col">
            <span className="p-2 border rounded-lg font-bold text-center">${bill.amount}</span>
          </div>
        </div>
      ))
    ) : (
      <p>No bills found.</p>
    );

  return (
    <Card
      title="Upcoming Bills"
      desc={
        isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader border-t-4 border-b-4 border-primary rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-around">{billCard}</div>
        )
      }
    />
  );
};

export default CardBill;