// pages/FoodDetail.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchFoodById, clearFoodDetail } from "../../redux/foodDetailSlice";
import vegIcon from "../../images/veg.png";
import nonVegIcon from "../../images/nveg.png";

const FoodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: food, loading, error } = useSelector((state) => state.foodDetail || {});

  useEffect(() => {
    if (id) dispatch(fetchFoodById(id));

    return () => {
      dispatch(clearFoodDetail());
    };
  }, [dispatch, id]);

  const resolveImage = (imgPath) => {
    if (!imgPath) return null;
    return imgPath.startsWith("http")
      ? imgPath
      : `${import.meta.env.VITE_BASE_URL}/${imgPath}`;
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-bold text-red-600">Food Details</h1>

          <div /> {/* spacer to keep title centered */}
        </div>

        {loading && (
          <div className="text-center py-8">Loading...</div>
        )}

        {error && (
          <div className="text-center py-4 text-red-600">{error}</div>
        )}

        {food && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h">
            {/* Left: Image */}
            <div className="col-span-1 flex flex-col items-center ">
              <div className="w-full max-w-md ">
                <img
                  src={
                    resolveImage(food.image) ||
                    "/images/default_food_image.png"
                  }
                  alt={food.name}
                  className="w-full h-72 object-cover rounded-2xl shadow-md bg-[#FBEBEB] hover:bg-[#CB3432]"
                />
              </div>

              <div className="mt-4 flex items-center gap-3">
                <span className="text-lg font-semibold">{food.name}</span>
                
                <img
                  src={food.type === "Veg" ? vegIcon : nonVegIcon}
                  alt={food.type}
                  className="w-6 h-6"
                />
              </div>

              <div className="mt-2 text-gray-600">{food.category}</div>

              <div className="mt-4 text-xl font-bold text-red-600">
                ₹ {food.price}
              </div>
            </div>

            {/* Right top: Details */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{food.description}</p>
              </div>

              {/* Nutrients */}
              {food.nutrients && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Nutrients</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {typeof food.nutrients === "object" &&
                      Object.entries(food.nutrients).map(([k, v]) => (
                        <div
                          key={k}
                          className="p-3 bg-gray-50 rounded-lg border border-gray-100"
                        >
                          <div className="text-sm text-gray-500 capitalize">
                            {k.replace(/_/g, " ")}
                          </div>
                          <div className="text-lg font-medium">{v}</div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Vitamins, Minerals, Best time, Diseases */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Vitamins</h4>
                  {Array.isArray(food.vitamins) && food.vitamins.length > 0 ? (
                    <ul className="list-disc pl-5 text-gray-700">
                      {food.vitamins.map((vit, idx) => (
                        <li key={idx}>{typeof vit === "string" ? vit : vit.name || JSON.stringify(vit)}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-gray-500">No data</div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Minerals</h4>
                  {Array.isArray(food.minerals) && food.minerals.length > 0 ? (
                    <ul className="list-disc pl-5 text-gray-700">
                      {food.minerals.map((min, idx) => (
                        <li key={idx}>{typeof min === "string" ? min : min.name || JSON.stringify(min)}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-gray-500">No data</div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Best Time</h4>
                  {Array.isArray(food.best_time) && food.best_time.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {food.best_time.map((t, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{t}</span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500">No data</div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Associated Diseases</h4>
                  {Array.isArray(food.diseases) && food.diseases.length > 0 ? (
                    <ul className="list-disc pl-5 text-gray-700">
                      {food.diseases.map((d, idx) => (
                        // if populated as object with name, handle both
                        <li key={idx}>
                          {typeof d === "string" ? d : d.name || JSON.stringify(d)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-gray-500">No data</div>
                  )}
                </div>
              </div>

              {/* location / timestamps */}
              <div className="mt-6 border-t pt-4 text-sm text-gray-600">
                <div><span className="font-semibold text-gray-800">Location: </span>{food.location || "—"}</div>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDetail;
