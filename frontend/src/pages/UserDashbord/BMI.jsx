import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/userProfileSlice";
import ReactSpeedometer from "react-d3-speedometer";

function BMI() {
  const dispatch = useDispatch();

  const { data: userInfo } = useSelector((state) => state.profile);

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const [profileBmi, setProfileBmi] = useState(null);
  const [profileCategory, setProfileCategory] = useState("");

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo?.height && userInfo?.weight) {
      const heightInMeters = userInfo.height / 100;
      const result = (
        userInfo.weight /
        (heightInMeters * heightInMeters)
      ).toFixed(1);

      if (result < 18.5) setProfileCategory("Underweight");
      else if (result >= 18.5 && result <= 24.9)
        setProfileCategory("Normal weight");
      else if (result >= 25 && result <= 29.9) setProfileCategory("Overweight");
      else setProfileCategory("Obesity");

      setProfileBmi(parseFloat(result));
    }
  }, [userInfo]);

  const calculateBMI = () => {
    if (!weight || !height) return;

    const heightInMeters = height / 100;
    const result = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(parseFloat(result));

    if (result < 18.5) setCategory("Underweight");
    else if (result >= 18.5 && result <= 24.9) setCategory("Normal weight");
    else if (result >= 25 && result <= 29.9) setCategory("Overweight");
    else setCategory("Obesity");
  };

  return (
    <div className="ml-45 min-h-screen ">
      <h1 className="text-3xl font-bold text-[#cc2405] mb-6">
        Your BMI Information{" "}
      </h1>

      {userInfo && (
        <div className="flex items-start gap-6 mb-10">
          <div className="max-w-md bg-white shadow-md h-77 rounded-xl p-5 border border-gray-200 flex-1">
            <div className=" text-center mt-15">
              <h2 className="text-xl font-semibold text-[#cc2405] mb-3">
                Your Current Health Info
              </h2>

              <p className="text-gray-700 text-lg">
                <strong>Height:</strong> {userInfo.height || "-"} cm
              </p>
              <p className="text-gray-700 text-lg">
                <strong>Weight:</strong> {userInfo.weight || "-"} kg
              </p>

              {profileBmi && (
                <p className="text-gray-800 text-lg mt-2">
                  <strong>BMI:</strong> {profileBmi} ({profileCategory})
                </p>
              )}
            </div>
          </div>

          {profileBmi && (
            <div className="flex justify-center h-77 w-100 items-center bg-white shadow-md rounded-xl border border-gray-200">
              <ReactSpeedometer
                value={Number(profileBmi)}
                minValue={0}
                maxValue={40}
                segments={4}
                customSegmentStops={[0, 18.5, 24.9, 29.9, 40]}
                segmentColors={["#87CEEB", "#3CB371", "#FFD700", "#FF4500"]}
                customSegmentLabels={[
                  { text: "Underweight", position: "INSIDE", fontSize: "10px" },
                  { text: "Normal", position: "INSIDE", fontSize: "10px" },
                  { text: "Overweight", position: "INSIDE", fontSize: "10px" },
                  { text: "Obesity", position: "INSIDE", fontSize: "10px" },
                ]}
                needleColor="#cc2405"
                needleTransitionDuration={4500}
                needleTransition="easeElastic"
                height={220}
                width={320}
              />
            </div>
          )}
        </div>
      )}

      <h1 className="text-3xl font-bold text-[#cc2405] mb-6">
        BMI Calculator{" "}
      </h1>
      <div className="flex items-start gap-6">
        <div className="max-w-md bg-white shadow-lg rounded-xl p-6 space-y-5 flex-1">

           <div>
            <label className="text-lg font-medium text-gray-700">
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#cc2405] outline-none"
              placeholder="Enter height"
            />
          </div>

          <div>
            <label className="text-lg font-medium text-gray-700">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#cc2405] outline-none"
              placeholder="Enter weight"
            />
          </div>

         
          <button
            onClick={calculateBMI}
            className="w-full bg-[#cc2405] text-white py-3 rounded-lg font-semibold hover:bg-[#a31d04] transition-all duration-200"
          >
            Calculate BMI
          </button>

          {bmi && (
            <p className="text-xl font-bold text-[#cc2405] mt-4">
              BMI: {bmi} ({category})
            </p>
          )}
        </div>

        <div className="flex justify-center w-100 h-77 items-center bg-white shadow-md rounded-xl border border-gray-200">
          <ReactSpeedometer
            value={Number(bmi)}
            minValue={0}
            maxValue={40}
            segments={4}
             customSegmentStops={[0, 18.5, 24.9, 29.9, 40]}
            segmentColors={["#87CEEB", "#3CB371", "#FFD700", "#FF4500"]}
            customSegmentLabels={[
              { text: "Underweight", position: "INSIDE", fontSize: "10px" },
              { text: "Normal", position: "INSIDE", fontSize: "10px" },
              { text: "Overweight", position: "INSIDE", fontSize: "10px" },
              { text: "Obesity", position: "INSIDE", fontSize: "10px" },
            ]}
            needleColor="#cc2405"
            needleTransitionDuration={4500}
            needleTransition="easeElastic"
            height={220}
            width={320}
          />
        </div>
      </div>
    </div>
  );
}

export default BMI;
