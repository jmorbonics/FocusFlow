// GPT.jsx

import React, { useState } from "react";
import axios from "axios";

import * as marked from "marked";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.css";
import "./GPT.css";
import Stars from "./Stars.jsx";
// import pinimg from "../assets/favicon.ico";

const GPT = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(""); //Hi there! How can I assist you?
  const [value, setValue] = useState("");

  const onChange = (e) => setValue(e.target.value);

  // The endpoint is the URL of the chatbot server on docker swarm
  // https://chatbot.clearguide-dev.iteriscloud.com/chatbot
  // local development
  // http://localhost:3005/chatbot

  const handleSubmit = async () => {
    if (isLoading) {
      return;
    }

    if (!value.trim()) {
      // Input is empty or only contains whitespace
      alert("Please enter a message before submitting.");
      return; // Exit the function to prevent the API call
    }

    // setResponse("Loading...");

    setIsLoading(true);
    console.log("GPT button was clicked");
    const response = await axios.post("http://localhost:3005/chatbot", {
      question: value,
    });
    const html = await marked.marked(response.data);
    setResponse(html);
    setIsLoading(false);
  };

  return (
    <div><Stars /> 
      <br/><br/><br/><br/><br/>
      <div className="gpt-container">
        <div>
          {/* <input className="gpt-input" type="text" value={value} onChange={onChange}></input> */}
          <textarea className="gpt-textarea"
            placeholder="Enter your question here..."
            value={value}
            onChange={onChange}
          ></textarea>
        </div>
        <div>
          <button
            className="submitButton"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Submit Question!
          </button>
        </div>
        <div>
          <div className="output-div" dangerouslySetInnerHTML={{ __html: response }} />
        </div>
      </div>
    </div>
  );
};

export default GPT;