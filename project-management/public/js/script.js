// Show Alert
const ShowAlert = document.querySelector("[show-alert]");
if (ShowAlert) {

  const time = parseInt(ShowAlert.getAttribute("data-time")) || 3000;
  const closeAlert = ShowAlert.querySelector("[close-alert]");
  setTimeout(() => {
    ShowAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    ShowAlert.classList.add("alert-hidden");
  })
}