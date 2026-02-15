const college = {
    una: {
        url: "https://www.iiituna.ac.in/",
        info: "IIIT Una details...",
    },
    sonepat: {
        url: "https://iiitsonepat.ac.in/",
        info: "IIIT Sonepat details...",
    },
    kota: {
        url: "https://iiitkota.ac.in/",
        info: "IIIT Kota details...",
    },
    allahbad: {
        url: "https://www.iiita.ac.in/",
        info: "IIIT Allahabad details...",
    },
    lucknow: {
        url: "https://www.iiitl.ac.in/",
        info: "IIIT Lucknow details...",
    },
    delhi: {
        url: "https://www.iiitd.ac.in/",
        info: "IIIT Delhi details...",
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