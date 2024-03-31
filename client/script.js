document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submitBtn");
  const shareBtn = document.getElementById("shareBtn");
  const usernameInput = document.getElementById("usernameInput");
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");
  const messageBox = document.getElementById("messageBox");

  // Function to format date string
  function formatDateString(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  // Function to persist data in localStorage
  function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Function to retrieve data from localStorage
  function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  submitBtn.addEventListener("click", () => {
    const username = usernameInput.value;
    if (!username) {
      errorDiv.innerText = "Please enter a username.";
      return;
    } else if (username.length > 5) {
      errorDiv.innerText = "Username length should not exceed 5 characters.";
      return;
    }

    fetch(`http://localhost:5500/user/onboard/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.uniqueLink || data.uniqueLink == undefined) {
          errorDiv.innerText = data.error;
          resultDiv.innerText = ""; // Clear previous result if any
        } else {
          errorDiv.innerText = ""; // Clear previous error if any
          resultDiv.innerText = `Generated Link: http://localhost:5500/message/send/${data.uniqueLink}`;
          // Save the generated link to localStorage
          saveToLocalStorage("generatedLink", data.uniqueLink);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        errorDiv.innerText = "An error occurred while processing your request.";
        resultDiv.innerText = ""; // Clear previous result if any
      });
  });

  shareBtn.addEventListener("click", () => {
    const generatedLink = resultDiv.innerText;
    if (!generatedLink) {
      alert("No link to share. Please generate a link first.");
      return;
    }

    const url = generatedLink;

    const reelUrl = url.split(":")[1].trim();

    const dummyInput = document.createElement("input");
    document.body.appendChild(dummyInput);
    dummyInput.setAttribute("value", reelUrl);
    dummyInput.select();
    document.execCommand("copy");
    document.body.removeChild(dummyInput);
    alert("Link copied to clipboard!");
  });

  // Function to receive messages
  function receiveMessages() {
    const generatedLink = getFromLocalStorage("generatedLink");

    if (!generatedLink) {
      console.error("No generated link found.");
      return;
    }

    fetch(`http://localhost:5500/message/send/${generatedLink}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.uniqueLink !== generatedLink) {
          messageBox.innerHTML = "<p>No messages found for this link.</p>";
          return;
        }

        data.messages.map((message) => {
          const messageDiv = document.createElement("div");
          messageDiv.innerHTML = `<p><strong>${
            message.message
          }</strong></p><p>${formatDateString(message.createdAt)}</p>`;
          messageBox.appendChild(messageDiv);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Call receiveMessages function to populate the message box on page load
  receiveMessages();
});
