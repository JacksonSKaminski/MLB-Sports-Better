const gameDateInput = document.getElementById("gameDate");

export function setTodayAsDefault() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2,"0");

    const formatted = `${year}-${month}-${day}`;
    gameDateInput.value = formatted;
}