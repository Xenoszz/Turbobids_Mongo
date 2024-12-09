"use client";

import { useState } from "react";
import { CustomSelect } from "../Car_Home/CustomSelect";
import { carData } from "../../lib/carData";
import { Search } from "lucide-react";

export function CarSearchForm() {
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");

  const handleSearch = () => {
    console.log({ brand, type, model, color });
  };

  return (
    <div>
      <div className="bg-blue-200/50 rounded-3xl p-6 shadow-lg mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <CustomSelect
            value={brand}
            onChange={setBrand}
            options={carData.brands}
            placeholder="Brand"
          />
          <CustomSelect
            value={type}
            onChange={setType}
            options={carData.types}
            placeholder="Type"
          />
          <CustomSelect
            value={model}
            onChange={setModel}
            options={carData.models}
            placeholder="Model"
          />
          <CustomSelect
            value={color}
            onChange={setColor}
            options={carData.colors}
            placeholder="Color"
          />
        </div>
      </div>
    </div>
  );
}