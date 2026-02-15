const college = {
    guwahati: {
        url: "https://www.iiitg.ac.in/",
        info: "IIIT Guwahati details...",
    },
    kalyani: {
        url: "https://iiitkalyani.ac.in/",
        info: "IIIT Kalyani details...",
    },
    manipur: {
        url: "https://ditmanipur.gov.in/iiit-manipur/",
        info: "IIIT Manipur details...",
    },
    agartala: {
        url: "https://iiitagartala.ac.in/",
        info: "IIIT Agartala details...",
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