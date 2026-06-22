// =======================
// TÀI KHOẢN MẪU
// =======================

if (!localStorage.getItem("users")) {
    const users = [
        {
            email: "admin@gmail.com",
            password: "123456"
        }
    ];

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
}

// =======================
// REMEMBER ACCOUNT
// =======================

const rememberUser =
    JSON.parse(localStorage.getItem("rememberUser"));

if (
    rememberUser &&
    rememberUser.expiredAt > Date.now()
) {
    document.getElementById("email").value =
        rememberUser.email;
} else {
    localStorage.removeItem("rememberUser");
}

// =======================
// SHOW PASSWORD
// =======================

const togglePassword =
    document.getElementById("togglePassword");

const passwordInput =
    document.getElementById("password");

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }

});

// =======================
// LOGIN
// =======================

const form =
    document.getElementById("loginForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const email =
        document.getElementById("email")
        .value
        .trim();

    const password =
        document.getElementById("password")
        .value;

    const errorEmail =
        document.getElementById("errorEmail");

    const errorPassword =
        document.getElementById("errorPassword");

    errorEmail.innerText = "";
    errorPassword.innerText = "";

    // validate

    if (email === "") {
        errorEmail.innerText =
            "Email không được để trống";
        return;
    }

    if (password === "") {
        errorPassword.innerText =
            "Password không được để trống";
        return;
    }

    const users =
        JSON.parse(localStorage.getItem("users"))
        || [];

    const user = users.find(
        (u) =>
            u.email === email &&
            u.password === password
    );

    if (!user) {

        errorPassword.innerText =
            "Email hoặc Password không chính xác";

        return;
    }

    // remember 24h

    const rememberMe =
        document.getElementById("rememberMe");

    if (rememberMe.checked) {

        const rememberData = {
            email: email,
            expiredAt:
                Date.now() +
                24 * 60 * 60 * 1000
        };

        localStorage.setItem(
            "rememberUser",
            JSON.stringify(rememberData)
        );

    }

    alert("Đăng nhập thành công!");

    window.location.href = "home.html";

});