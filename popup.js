document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get({visits: []}, (result) => {
      const visits = result.visits;
      if (visits.length > 0) {
        const lastVisit = visits[visits.length - 1]; // Get the last visit
        document.getElementById('lastVisit').textContent = `Last visited: ${lastVisit.url} on ${lastVisit.datetime}`;
      } else {
        document.getElementById('lastVisit').textContent = "No visits recorded.";
      }
    });
  });