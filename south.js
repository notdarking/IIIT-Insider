const college = {
    hyderabad: {
        url: "https://iiit.ac.in/",
        info: "IIIT Hyderabad details...",
    },
    bangalore: {
        url: "https://iiitb.ac.in/",
        info: "IIIT Bangalore details...",
    },
    sricity: {
        url: "https://iiits.ac.in/",
        info: "IIIT Sri City details...",
    },
    dharwad: {
        url: "https://iiitdwd.ac.in/",
        info: "IIIT Dharwad details...",
    },
    raichur: {
        url: "https://iiitr.ac.in/",
        info: "IIIT Raichur details...",
    },
    kottayam: {
        url: "https://iiitkottayam.ac.in/",
        info: "IIIT Kottayam details...",
    },
    tiruchirappalli: {
        url: "https://iiitt.ac.in/",
        info: "IIIT Tiruchirappalli details...",
    },
    kancheepuram: {
        url: "https://iiitdm.ac.in/",
        info: "IIIT Kancheepuram details...",
    },
    kurnool: {
        url: "https://iiitk.ac.in/",
        info: "IIIT Kurnool details...",
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