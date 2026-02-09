const gameDateInput = document.getElementById("game-date");

export function setTodayAsDefault() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2,"0");

    const formatted = `${year}-${month}-${day}`;
    gameDateInput.value = formatted;
}

export function ISOtoTime(ISOTimestamp){
    const date = new Date(ISOTimestamp);

    const localTime = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12 : true
    });

    return localTime
}