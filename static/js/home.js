// home.js

document.getElementById("questionForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission
  
  // Get the question input value
  var question = document.getElementById("question").value;
  
  // Call API function from the backend
  fetch('/api/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ question: question }) // Ensure question is sent as a string in JSON format
  })
  .then(response => response.json())
  .then(data => {
    // Display response from the backend
    //document.getElementById("response").innerHTML = data.response;
    // Display response from the backend
    var responseList = document.createElement("ul"); // Create <ul> element
    data.response.forEach(function(item) {
      var listItem = document.createElement("li"); // Create <li> element
      listItem.textContent = item; // Set content of <li>
      responseList.appendChild(listItem); // Append <li> to <ul>
    });
    var responseDiv = document.getElementById("response");
    responseDiv.innerHTML = ''; // Clear previous content
    responseDiv.appendChild(responseList); // Append <ul> to response div
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById("response").innerHTML = "An error occurred.";
  });
});

document.getElementById("attachButton").addEventListener("click", function() {
  document.getElementById("fileInput").click(); // Click on hidden file input
});

document.getElementById("fileInput").addEventListener("change", function() {
  var file = this.files[0];
  if (file) {
      var reader = new FileReader();
      reader.onload = function(e) {
          // Do something with the file data
          console.log("Selected file:", file.name);
      };
      reader.readAsDataURL(file);
  }
});