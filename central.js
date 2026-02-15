const college = {
    gwalior: {
        url: "https://iiitm.ac.in/",
        info: "IIIT Gwalior details...",
    },
    jabalpur: {
        url: "https://iiitdmj.ac.in/",
        info: "IIIT Jabalpur details...",
    },
    bhopal: {
        url: "https://iiitbhopal.ac.in/",
        info: "IIIT Bhopal details...",
    },
    ranchi: {
        url: "https://iiitranchi.ac.in/",
        info: "IIIT Ranchi details...",
    },
    bhagalpur: {
        url: "https://iiitbh.ac.in/",
        info: "IIIT Bhagalpur details...",
    },
};

document.getElementById("iiit").addEventListener("change", function () {
    const key = this.value;
    const details = college[key];
    const infoBox = document.getElementById("infobox");

    if (key === "..") {

        infoBox.innerHTML = "";
        return;
    }

    if (details && details.url) {

        window.location.href = details.url;

    } else {

        infoBox.innerHTML = `No details available for ${key}.`;
    }
});