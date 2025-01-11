import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../Elements/Card";
import { Icon } from "../../Elements/Icon";
import CompositionExample from "../../Elements/GaugeChart";

const CardGoal = () => {
  const [goals, setGoals] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No token found");

      const response = await axios.get("https://jwt-auth-eight-neon.vercel.app/goals", {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      setGoals({
        presentAmount: response.data.data[0].present_amount,
        targetAmount: response.data.data[0].target_amount,
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          // Handle session expiration logic here
          console.log("Session expired");
        } else {
          console.error(error.response);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <Card
        title="Goals"
        desc={
          <div className="flex justify-center items-center h-full">
            <div className="loader animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-primary"></div>
          </div>
        }
      />
    );
  }

  if (!goals) {
    return <Card title="Goals" desc={<p className="text-center text-red-500">Failed to load data.</p>} />;
  }

  const chartvalue = (goals.presentAmount * 100) / goals.targetAmount;

  return (
    <Card
      title="Goals"
      desc={
        <div className="p-2">
          <div className="flex justify-between">
            <div className="flex">
              <span className="text-2xl font-bold me-4 self-center">${goals.presentAmount}</span>
              <div className="p-2 bg-gray-05 rounded-md box-border">
                <Icon.Edit />
              </div>
            </div>
            <div>Nov, 2023</div>
          </div>
          <div className="border-b-2 my-4"></div>
          <div className="flex justify-between">
            <div>
              <div className="flex mt-3 mb-10">
                <div>
                  <Icon.Award />
                </div>
                <div className="ms-2">
                  <span className="text-gray-02">Target Achieved</span>
                  <br />
                  <span className="font-bold text-xl">${goals.targetAmount}</span>
                </div>
              </div>
              <div className="flex">
                <div>
                  <Icon.Target />
                </div>
                <div className="ms-2">
                  <span className="text-gray-02">This Month Target</span>
                  <br />
                  <span className="font-bold text-xl">${goals.presentAmount}</span>
                </div>
              </div>
            </div>
            <div className="ms-4 text-center">
              <CompositionExample desc={chartvalue} />
              <div className="flex justify-between">
                <span className="text-gray-03">$0</span>
                <span className="font-bold text-2xl">12K</span>
                <span className="text-gray-03">$20K</span>
              </div>
              <div className="mt-2">Target vs Achievement</div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default CardGoal;