import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import defaultImage from "../assets/default.png";

export const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const inputRef = useRef(null);
  const { REACT_APP_OPENAI_API_KEY } = process.env;
  const [loading, setLoading] = useState(false);

  const Generator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${REACT_APP_OPENAI_API_KEY}`,
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );

    let data = await response.json();
    console.log(data);
    let data_array = data.data;
    setImageUrl(data_array[0].url);
    setLoading(false);
  };

  return (
    <div className="ig-page">
      <div className="ig-title">
        AI Image <span>Generator</span>
      </div>
      <div className="ig-image">
        <img src={imageUrl === "/" ? defaultImage : imageUrl} alt="img" />
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>
            {" "}
            LOADING ...
          </div>
        </div>
      </div>
      <div className="ig-search">
        <input
          className="search"
          ref={inputRef}
          placeholder="Describe what you want to see ..."
        />
        <button
          className="search-button"
          onClick={() => {
            Generator();
          }}
        >
          {" "}
          Generate
        </button>
      </div>
    </div>
  );
};
