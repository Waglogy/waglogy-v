const enrollmentForm = document.getElementById("internship-form")
const submitBtn = document.getElementById("submit-btn")

let nameInput = document.getElementById("name")
let phoneInput = document.getElementById("phone")
let emailInput = document.getElementById("email")

nameInput.style = "padding: 8px; border-radius: 5px; border: 1px solid #ccc;"
nameInput.placeholder = ""
nameInput.classList.remove("red-placeholder")

phoneInput.style = "padding: 8px; border-radius: 5px; border: 1px solid #ccc;"
phoneInput.placeholder = ""
phoneInput.classList.remove("red-placeholder")

emailInput.style = "padding: 8px; border-radius: 5px; border: 1px solid #ccc;"
emailInput.placeholder = ""
emailInput.classList.remove("red-placeholder")

enrollmentForm.addEventListener("submit", async (ev) => {
    ev.preventDefault()
    try {
        submitBtn.disabled = true
        submitBtn.innerHTML = "Submitting..."

        const formData = new FormData(ev.target)

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            courses: formData.getAll("courses"),
            college: formData.get("college"),
        }

        let isValid = true

        if (data.name === "") {
            isValid = false
            nameInput.style =
                "padding: 8px; border-radius: 5px; border: 1px solid red;"
            nameInput.placeholder = "Please enter your name."
            nameInput.classList.add("red-placeholder")
        }

        if (data.phone === "" && data.phone.length != 10) {
            isValid = false
            phoneInput.style =
                "padding: 8px; border-radius: 5px; border: 1px solid red;"
            phoneInput.placeholder = "Please enter your phone."
            phoneInput.classList.add("red-placeholder")
        }

        if (data.email === "" && data.email.length < 5) {
            isValid = false
            emailInput.style =
                "padding: 8px; border-radius: 5px; border: 1px solid red;"
            emailInput.placeholder = "Please enter your email."
            emailInput.classList.add("red-placeholder")
        }

        if (data.courses <= 0) {
            isValid = false
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Please select a course.",
                allowOutsideClick: false,
            })
        }

        if (isValid) {
            const response = await fetch("https://api.waglogy.in/api/enroll", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const resData = await response.json()

            console.log(resData)

            if (!resData.success) {
                return Swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: resData?.error || resData?.message,
                    allowOutsideClick: false,
                })
            }

            Swal.fire({
                icon: "success",
                title: "Thanks for enrolling!",
                text: resData?.message,
                allowOutsideClick: false,
            })

            enrollmentForm.reset()
        }
    } catch (error) {
        console.log(error)

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            allowOutsideClick: false,
        })
    } finally {
        submitBtn.disabled = false
        submitBtn.innerText = "Submit"
        /* nameInput.style =
            "padding: 8px; border-radius: 5px; border: 1px solid #ccc;"
        nameInput.placeholder = ""
        nameInput.classList.remove("red-placeholder")

        phoneInput.style =
            "padding: 8px; border-radius: 5px; border: 1px solid #ccc;"
        phoneInput.placeholder = ""
        phoneInput.classList.remove("red-placeholder")

        emailInput.style =
            "padding: 8px; border-radius: 5px; border: 1px solid #ccc;"
        emailInput.placeholder = ""
        emailInput.classList.remove("red-placeholder") */
    }
})

function countdownTimer() {
    const endDate = new Date("August 10, 2024 00:00:00").getTime()
    const now = new Date().getTime()
    const timeLeft = endDate - now

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

    document.getElementById("countdown").innerHTML =
        days + "d " + hours + "h " + minutes + "m " + seconds + "s "

    if (timeLeft < 0) {
        clearInterval(timerInterval)
        document.getElementById("countdown").innerHTML = "Registration Closed"
        document.getElementById("info-text").innerText = ""
        submitBtn.disabled = true
        submitBtn.innerHTML = "Registration Closed"
    }
}

const timerInterval = setInterval(countdownTimer, 1000)
countdownTimer()
