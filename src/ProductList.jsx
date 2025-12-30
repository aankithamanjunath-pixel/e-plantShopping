import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "./CartSlice.jsx";

const ProductList = () => {
  const dispatch = useDispatch();

  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      category: "Aromatic Plants",
      name: "Lavender",
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
      description: "Lavender is a fragrant herb used in aromatherapy.",
      cost: 10,
    },
    {
      category: "Medicinal Plants",
      name: "Aloe Vera",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
      description: "Aloe Vera is known for its healing properties.",
      cost: 12,
    },
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  return (
    <div className="product-grid">
      {plantsArray.map((plant, index) => (
        <div className="product-card" key={index}>
          <img src={plant.image} alt={plant.name} />
          <h3>{plant.name}</h3>
          <p>{plant.description}</p>
          <p>Cost: ${plant.cost}</p>
          <button
            onClick={() => handleAddToCart(plant)}
            disabled={addedToCart[plant.name]}
          >
            {addedToCart[plant.name] ? "Added" : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
