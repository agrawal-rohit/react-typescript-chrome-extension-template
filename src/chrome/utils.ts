import { ChromeMessage } from "./types";

export const getCurrentTabInformation = (
  callback: (tabInfo: chrome.tabs.Tab) => void
): void => {
  const queryInfo = { active: true, lastFocusedWindow: true };

  chrome.tabs &&
    chrome.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0]);
    });
};

export const sendMessage = (
  tabId: number,
  message: ChromeMessage,
  callback: (response: any) => void
) => {
  if (tabId) {
    chrome.tabs.sendMessage(tabId, message, (response: any) => {
      if (chrome.runtime.lastError) {
        console.log("error contracted");
        setTimeout(sendMessage, 1000);
      } else {
        callback(response);
      }
    });
  }
};
