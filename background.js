chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      console.log(`URL changed to: ${changeInfo.url}`);
      const visitTime = new Date().toISOString(); // Get current datetime in ISO format
      chrome.storage.local.get({visits: []}, (result) => {
        const updatedVisits = [...result.visits, {url: changeInfo.url, datetime: visitTime}];
        chrome.storage.local.set({visits: updatedVisits});
      });
    }
  });