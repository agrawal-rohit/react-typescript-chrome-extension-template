import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ChromeMessage, Sender } from "./chrome/types";
import { getCurrentTabInformation, sendMessage } from "./chrome/utils";

function App() {
  const [tabTitle, setTabTitle] = useState<string>("");
  const [tabId, setTabId] = useState<number>(-1);
  const [responseFromContent, setResponseFromContent] = useState<string>("");

  // Get current tab info
  useEffect(() => {
    getCurrentTabInformation((tabInfo) => {
      setTabTitle(tabInfo.title || "undefined");
      setTabId(tabInfo.id || -1);
    });
  }, []);

  const sendTestMessage = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "Hello from React",
    };

    sendMessage(tabId, message, (responseFromContentScript) => {
      setResponseFromContent(responseFromContentScript);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Current Tab Title:</p>
        <p>{tabTitle}</p>

        <button onClick={sendTestMessage}>SEND MESSAGE</button>
        <p>Response from content:</p>
        <p>{responseFromContent}</p>
      </header>
    </div>
  );
}

export default App;
