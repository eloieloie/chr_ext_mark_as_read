document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab) {
        // Calculate start time as 5 minutes before the current time
        const fiveMinutesAgo = new Date().getTime() - (5 * 60 * 1000);
        console.log("testing");
        // Increase maxResults to fetch more than one result, and set startTime to fiveMinutesAgo
        chrome.history.search({text: currentTab.url, maxResults: 3, startTime: fiveMinutesAgo}, (results) => {
          console.log("Search Results:", results.map(result => ({
            url: result.url,
            lastVisitTime: new Date(result.lastVisitTime).toISOString()
          })));
  
          // Continue with the rest of the logic...
          if (results.length > 1) {
            const lastVisitTime = new Date(results[1].lastVisitTime).toISOString();
            document.getElementById('lastVisit').textContent = `Last visited: ${currentTab.url} on ${lastVisitTime}`;
          } else if (results.length === 1) {
            const visitTime = new Date(results[0].lastVisitTime);
            const currentTime = new Date();
            if ((currentTime - visitTime) > 1000 * 60) {
              document.getElementById('lastVisit').textContent = `Last visited: ${currentTab.url} on ${visitTime.toISOString()}`;
            } else {
              document.getElementById('lastVisit').textContent = "This is your first visit or the page was visited very recently.";
            }
          } else {
            document.getElementById('lastVisit').textContent = "No visits recorded.";
          }
        });
      }
    });
  });