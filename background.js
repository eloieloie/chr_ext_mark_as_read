chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active) { // Check if the page is fully loaded and tab is active
        const fiveMinutesAgo = new Date().getTime() - (5 * 60 * 1000);
      
        // Fetch history results without limiting by startTime to get all history items
      chrome.history.search({text: '', maxResults: 1000, startTime: 0, endTime: fiveMinutesAgo}, (results) => {
        console.log("All Search Results:", results.map(result => ({
          url: result.url,
          lastVisitTime: new Date(result.lastVisitTime).toISOString()
        })));
        
        // Filter results to match the exact URL
        const exactMatches = results.filter(result => result.url === tab.url);
  
        console.log("Exact URL Search Results:", exactMatches.map(result => ({
          url: result.url,
          lastVisitTime: new Date(result.lastVisitTime).toISOString()
        })));
  
        // Handle the filtered exact matches
        if (exactMatches.length > 1) {
          // Assuming you want to log the second to last visit (since the last visit is the current one)
          const lastVisitTime = new Date(exactMatches[exactMatches.length - 2].lastVisitTime).toISOString();
          console.log(`Last visited: ${tab.url} on ${lastVisitTime}`);
        } else if (exactMatches.length === 1) {
          const visitTime = new Date(exactMatches[0].lastVisitTime);
          const currentTime = new Date();
          if ((currentTime - visitTime) > 1000 * 60) {
            console.log(`Last visited: ${tab.url} on ${visitTime.toISOString()}`);
          } else {
            console.log("This is your first visit or the page was visited very recently.");
          }
        } else {
          console.log("No visits recorded for the exact URL.");
        }
      });
    }
  });