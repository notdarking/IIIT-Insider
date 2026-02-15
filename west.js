const college = {
    vadodara: {
        url: "https://www.iiitvadodara.ac.in/",
        info: "IIIT Vadodara details...",
    },
    kota: {
        url: "https://iiitkota.ac.in/",
        info: "IIIT Kota details...",
    },
    nagpur: {
        url: "https://iiitn.ac.in/",
        info: "IIIT Nagpur details...",
    },
    pune: {
        url: "https://iiitp.ac.in/",
        info: "IIIT Pune details...",
    },
    surat: {
        url: "https://iiitsurat.ac.in/",
        info: "IIIT Surat details...",
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