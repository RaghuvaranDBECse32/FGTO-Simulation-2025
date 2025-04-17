document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("tempValue") && document.getElementById("humValue")) {
    fetchData();
    setInterval(fetchData, 5000);
  }

  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = form.querySelectorAll("input");
      let valid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = "red";
        } else {
          input.style.borderColor = "#ccc";
        }
      });

      if (valid) {
        alert("Form submitted successfully!");
      } else {
        alert("Please fill out all fields.");
      }
    });
  }
});

async function fetchData() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();
    document.getElementById("tempValue").innerHTML = `${data.temperature} &deg;C`;
    document.getElementById("humValue").innerHTML = `${data.humidity} %`;
  } catch (err) {
    console.error("Failed to fetch data:", err);
    document.getElementById("tempValue").innerHTML = `-- &deg;C`;
    document.getElementById("humValue").innerHTML = `-- %`;
  }
}