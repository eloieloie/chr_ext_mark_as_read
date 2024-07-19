chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active) { // Check if the page is fully loaded and tab is active
      const visitTime = new Date().toISOString();
      chrome.storage.local.get({visits: []}, (result) => {
        // Check if the URL is already in the list
        const exists = result.visits.some(visit => visit.url === tab.url);
        if (!exists) {
          // If not, add it to the list
          const updatedVisits = [...result.visits, {url: tab.url, datetime: visitTime}];
          chrome.storage.local.set({visits: updatedVisits});
        }
      });
    }
  });