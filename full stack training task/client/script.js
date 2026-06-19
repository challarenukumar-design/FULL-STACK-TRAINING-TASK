const API = "http://localhost:5000/api/auth";

async function register() {
  const user = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    mobile: document.getElementById("mobile").value,
    password: document.getElementById("password").value,
  };

  if (!user.fullName || !user.email || !user.mobile || !user.password) {
    alert("All fields are required");
    return;
  }

  if (user.password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  try {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    alert(data.message);

    if (res.status === 201 || res.ok) {
      window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error);
    alert("Server error during registration");
  }
}

async function login() {
  const user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  if (!user.email || !user.password) {
    alert("All fields are required");
    return;
  }

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "home.html";
    } else {
      alert(data.message || "Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
    alert("Server error during login");
  }
}
