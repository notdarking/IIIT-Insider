const colleges = {
  "iiit allahabad": {
    "name": "IIIT Allahabad (IIITA)",
    "year": "1999",
    "area": "100 acres",
    "type": "MoE",
    "avg": "25.78 LPA",
    "med": "30 LPA",
    "mea": "1.21 Cr",
    "placement": "100%",
    "curr": "B.Tech, M.Tech, MBA, PhD",
    "las": "IT (Information Technology)",
    "pros": "Top-tier coding culture, excellent ROI",
    "cons": "High academic workload, intense competition"
  },

  "iiit gwalior": {
    "name": "ABV-IIIT Gwalior",
    "year": "1997",
    "area": "160 acres",
    "type": "MoE",
    "avg": "24.31 LPA",
    "med": "22 LPA",
    "mea": "65 LPA",
    "placement": "92%",
    "curr": "IPG (B.Tech+M.Tech/MBA), PhD",
    "las": "Integrated B.Tech + M.Tech (IT)",
    "pros": "Green campus, unique integrated courses",
    "cons": "Strict attendance, older infrastructure"
  },

  "iiit jabalpur": {
    "name": "PDPM IIIT Jabalpur",
    "year": "2005",
    "area": "250 acres",
    "type": "MoE",
    "avg": "21.6 LPA",
    "med": "16 LPA",
    "mea": "82 LPA",
    "placement": "99%",
    "curr": "B.Tech, M.Des, M.Tech, PhD",
    "las": "CSE and Smart Manufacturing",
    "pros": "Strong design curriculum, huge campus",
    "cons": "Remote location, connectivity issues"
  },

  "iiit kancheepuram": {
    "name": "IIITDM Kancheepuram",
    "year": "2007",
    "area": "51 acres",
    "type": "MoE",
    "avg": "13 LPA",
    "med": "11 LPA",
    "mea": "32 LPA",
    "placement": "90%",
    "curr": "B.Tech, M.Des, Dual Degree",
    "las": "Smart Manufacturing / CSE",
    "pros": "Proximity to Chennai, modern labs",
    "cons": "Strict rules, smaller campus size"
  },

  "iiit sri city": {
    "name": "IIIT Sri City",
    "year": "2013",
    "area": "80 acres",
    "type": "PPP",
    "avg": "20.3 LPA",
    "med": "14 LPA",
    "mea": "1.20 Cr",
    "placement": "98%",
    "curr": "B.Tech, M.Tech, PhD",
    "las": "CSE (Computer Science)",
    "pros": "Mentored by IIIT-H, great coding",
    "cons": "Remote location, construction ongoing"
  },

  "iiit vadodara": {
    "name": "IIIT Vadodara",
    "year": "2013",
    "area": "50 acres (Proposed)",
    "type": "PPP",
    "avg": "15.43 LPA",
    "med": "13.5 LPA",
    "mea": "43 LPA",
    "placement": "97%",
    "curr": "B.Tech, M.Tech, PhD",
    "las": "CSE",
    "pros": "Excellent curriculum, consistent placements",
    "cons": "No permanent campus yet, hostel distance"
  },

  "iiit kota": {
    "name": "IIIT Kota",
    "year": "2013",
    "area": "100 acres",
    "type": "PPP",
    "avg": "14.6 LPA",
    "med": "11 LPA",
    "mea": "53.6 LPA",
    "placement": "90%",
    "curr": "B.Tech, M.Tech, PhD",
    "las": "CSE",
    "pros": "MNIT Jaipur mentorship alumni base",
    "cons": "Shifting to new campus, settling in"
  },

  "iiit tiruchirappalli": {
    "name": "IIIT Tiruchirappalli",
    "year": "2013",
    "area": "60 acres",
    "type": "PPP",
    "avg": "9.9 LPA",
    "med": "8.5 LPA",
    "mea": "20 LPA",
    "placement": "85%",
    "curr": "B.Tech, PhD",
    "las": "CSE",
    "pros": "Mentored by NIT Trichy previously",
    "cons": "Infrastructure still under development"
  },

  "iiit guwahati": {
    "name": "IIIT Guwahati",
    "year": "2013",
    "area": "68 acres",
    "type": "PPP",
    "avg": "17 LPA",
    "med": "14.5 LPA",
    "mea": "1.20 Cr",
    "placement": "93%",
    "curr": "B.Tech, M.Tech, PhD",
    "las": "CSE",
    "pros": "Own permanent campus, good research",
    "cons": "Location far from main city"
  },

  "iiit pune": {
    "name": "IIIT Pune",
    "year": "2016",
    "area": "100 acres (Allotted)",
    "type": "PPP",
    "avg": "16.83 LPA",
    "med": "14 LPA",
    "mea": "53 LPA",
    "placement": "95%",
    "curr": "B.Tech, M.Tech, PhD",
    "las": "CSE",
    "pros": "Located in IT hub, high growth",
    "cons": "Operating from temporary campus"
  },

  "iiit kottayam": {
    "name": "IIIT Kottayam",
    "year": "2015",
    "area": "53 acres",
    "type": "PPP",
    "avg": "14.32 LPA",
    "med": "10 LPA",
    "mea": "58 LPA",
    "placement": "90%",
    "curr": "B.Tech, M.Tech, PhD",
    "las": "CSE (Cyber Security focus)",
    "pros": "Beautiful campus, fast growing stats",
    "cons": "Hilly terrain, rainy weather issues"
  },

  "iiit manipur": {
    "name": "IIIT Manipur",
    "year": "2015",
    "area": "150 acres",
    "type": "PPP",
    "avg": "9.9 LPA",
    "med": "7.5 LPA",
    "mea": "45 LPA",
    "placement": "80%",
    "curr": "B.Tech, PhD",
    "las": "CSE",
    "pros": "Good faculty-student ratio",
    "cons": "Political instability, internet issues"
  },

  "iiit dharwad": {
    "name": "IIIT Dharwad",
    "year": "2015",
    "area": "60 acres",
    "type": "PPP",
    "avg": "11.52 LPA",
    "med": "8 LPA",
    "mea": "35 LPA",
    "placement": "87%",
    "curr": "B.Tech, PhD",
    "las": "Data Science & AI",
    "pros": "Infosys Foundation support, new campus",
    "cons": "Away from major metro cities"
  },

  "iiit kurnool": {
    "name": "IIITDM Kurnool",
    "year": "2015",
    "area": "151 acres",
    "type": "MoE",
    "avg": "10.79 LPA",
    "med": "8.5 LPA",
    "mea": "28 LPA",
    "placement": "85%",
    "curr": "B.Tech, M.Tech, PhD",
    "las": "CSE / Artificial Intelligence",
    "pros": "Central funding, near Hyderabad highway",
    "cons": "Hot weather, developing infrastructure"
  },

  "iiit kalyani": {
    "name": "IIIT Kalyani",
    "year": "2014",
    "area": "50 acres",
    "type": "PPP",
    "avg": "13.5 LPA",
    "med": "12 LPA",
    "mea": "26 LPA",
    "placement": "89%",
    "curr": "B.Tech, PhD",
    "las": "CSE",
    "pros": "Near Kolkata IT hub, mentors",
    "cons": "Slow campus construction pace"
  },

  "iiit lucknow": {
    "name": "IIIT Lucknow",
    "year": "2015",
    "area": "50 acres",
    "type": "PPP",
    "avg": "30.52 LPA",
    "med": "25 LPA",
    "mea": "59 LPA",
    "placement": "100%",
    "curr": "B.Tech, M.Tech, MBA",
    "las": "CSE / AI",
    "pros": "Exceptional ROI, top coding culture",
    "cons": "Small campus, hostel shortage issues"
  },

  "iiit una": {
    "name": "IIIT Una",
    "year": "2014",
    "area": "80 acres",
    "type": "PPP",
    "avg": "15 LPA",
    "med": "10 LPA",
    "mea": "60 LPA",
    "placement": "90%",
    "curr": "B.Tech, PhD",
    "las": "CSE",
    "pros": "New permanent campus, pleasant weather",
    "cons": "Limited exposure compared to metros"
  },

  "iiit sonepat": {
    "name": "IIIT Sonepat",
    "year": "2014",
    "area": "50 acres (Proposed)",
    "type": "PPP",
    "avg": "16.51 LPA",
    "med": "13 LPA",
    "mea": "52 LPA",
    "placement": "92%",
    "curr": "B.Tech, PhD",
    "las": "CSE",
    "pros": "Proximity to Delhi-NCR region",
    "cons": "No permanent campus, transit issues"
  },

  "iiit raichur": {
    "name": "IIIT Raichur",
    "year": "2019",
    "area": "60 acres (Proposed)",
    "type": "PPP",
    "avg": "18 LPA",
    "med": "15 LPA",
    "mea": "45 LPA",
    "placement": "85%",
    "curr": "B.Tech",
    "las": "CSE (AI & DS)",
    "pros": "Mentored by IIT Hyderabad (strong)",
    "cons": "Very new, temporary campus setup"
  },

  "iiit ranchi": {
    "name": "IIIT Ranchi",
    "year": "2016",
    "area": "67 acres (Proposed)",
    "type": "PPP",
    "avg": "16.7 LPA",
    "med": "13.3 LPA",
    "mea": "83 LPA",
    "placement": "91%",
    "curr": "B.Tech, M.Tech, PhD",
    "las": "CSE",
    "pros": "Good industrial connectivity in region",
    "cons": "Operating from temporary rented campus"
  },

  "iiit nagpur": {
    "name": "IIIT Nagpur",
    "year": "2016",
    "area": "100 acres",
    "type": "PPP",
    "avg": "16.3 LPA",
    "med": "12 LPA",
    "mea": "86 LPA",
    "placement": "94%",
    "curr": "B.Tech, PhD",
    "las": "CSE / ECE (IoT focus)",
    "pros": "Fast growth, curriculum industry-aligned",
    "cons": "Campus far from main city"
  },

  "iiit bhagalpur": {
    "name": "IIIT Bhagalpur",
    "year": "2017",
    "area": "50 acres",
    "type": "PPP",
    "avg": "15.6 LPA",
    "med": "11 LPA",
    "mea": "46 LPA",
    "placement": "95%",
    "curr": "B.Tech, M.Tech, PhD",
    "las": "Mechatronics / CSE",
    "pros": "Unique Mechatronics branch, scenic campus",
    "cons": "Tier-3 city location disadvantages"
  },

  "iiit bhopal": {
    "name": "IIIT Bhopal",
    "year": "2017",
    "area": "50 acres (Proposed)",
    "type": "PPP",
    "avg": "21.94 LPA",
    "med": "16 LPA",
    "mea": "85 LPA",
    "placement": "96%",
    "curr": "B.Tech",
    "las": "CSE",
    "pros": "Located inside MANIT, great peers",
    "cons": "No own campus, limited hostel"
  },
  "iiit delhi": {
    name: "Indraprastha Institute of Information Technology, Delhi",
    year: "2008",
    area: "Delhi",
    type: "State University (Autonomous)",
    avg: "23 LPA",
    med: "20 LPA",
    mea: "47 LPA",
    placement: "99%",
    curr: "CSE, ECE, CSAM, CSB, CSSS, CSDS, CSML",
    las: "CSE, CSAM",
    pros: "Top faculty; Strong research; Delhi advantage; Exceptional placements; Global opportunities; Modern campus",
    cons: "High fees; Very competitive admissions"
},

  "iiit surat": {
    "name": "IIIT Surat",
    "year": "2017",
    "area": "50 acres (Proposed)",
    "type": "PPP",
    "avg": "16.85 LPA",
    "med": "12.5 LPA",
    "mea": "34 LPA",
    "placement": "92%",
    "curr": "B.Tech, PhD",
    "las": "CSE",
    "pros": "Located in Diamond City, SVNIT mentor",
    "cons": "No permanent campus, temporary facilities"
  },

  "iiit agartala": {
    "name": "IIIT Agartala",
    "year": "2018",
    "area": "52 acres",
    "type": "PPP",
    "avg": "22 LPA",
    "med": "14 LPA",
    "mea": "1.15 Cr",
    "placement": "90%",
    "curr": "B.Tech",
    "las": "CSE",
    "pros": "Shared resources with NIT Agartala",
    "cons": "Very remote location, travel difficult"
  },
  "iiit hyderabad": {
    name: "International Institute of Information Technology, Hyderabad",
    year: "1998",
    area: "66 acres",
    type: "Deemed (Not under IIIT Act)",
    avg: "32.5 LPA",
    med: "28 LPA",
    mea: "3.6 Cr",
    placement: "100%",
    curr: "B.Tech, Dual Degree, M.Tech, MS by Research, PhD",
    las: "CSE (B.Tech + MS by Research)",
    pros: "Best coding culture in India; insane research output; highest packages among IIITs",
    cons: "Extremely high workload; expensive fees"
   },
   "iiit bhubaneswar": {
    name: "International Institute of Information Technology, Bhubaneswar",
    year: "2006",
    area: "23 acres",
    type: "State Government",
    avg: "10.8 LPA",
    med: "8.2 LPA",
    mea: "35 LPA",
    placement: "85%",
    curr: "B.Tech, M.Tech",
    las: "CSE",
    pros: "Decent placements; good coding culture; affordable fees",
    cons: "State-level exposure; competition lower than top IIITs"
    },
    "iiit bangalore": {
    name: "International Institute of Information Technology, Bangalore",
    year: "1999",
    area: "9 acres",
    type: "PPP",
    avg: "24.7 LPA",
    med: "22 LPA",
    mea: "54 LPA",
    placement: "100%",
    curr: "Integrated M.Tech, M.Tech, MS by Research, PhD",
    las: "Integrated M.Tech (CSE / ECE)",
    pros: "Outstanding placements; Bengaluru tech ecosystem; Research-focused; Industry collaboration; Strong alumni network",
    cons: "Small campus; High fees compared to IIITs"
}
};
document.getElementById("search_result").addEventListener("click" , function(){
    const c1 =document.getElementById("college1").value.trim().toLowerCase();
    const c2= document.getElementById("college2").value.trim().toLowerCase();
    details(c1,"result_1");
    details(c2,"result_2");
});
function details(key,tableid){
    const college = colleges[key];
    const table =document.getElementById(tableid);
    if(!college){
        table.innerHTML=`
        <tr><th colspan="2">No Data Found</th></tr>
        `
    }
    else{
        table.innerHTML=`
        <tr><th>Name</th><td>${college.name}</td></tr>
        <tr><th>Established Year</th><td>${college.year}</td></tr>
        <tr><th>Area</th><td>${college.area}</td></tr>
        <tr><th>Institute Type</th><td>${college.type}</td></tr>
        <tr><th>Average Package</th><td>${college.avg}</td></tr>
        <tr><th>Median Package</th><td>${college.med}</td></tr>
        <tr><th>Max. Package</th><td>${college.mea}</td></tr>
        <tr><th>Placment</th><td>${college.placement}</td></tr>
        <tr><th>Current NIRF</th><td>${college.curr}</td></tr>
        <tr><th>Lastest NIRF</th><td>${college.las}</td></tr>
        <tr><th>Pros</th><td>${college.pros}</td></tr>
        <tr><th>Cons</th><td>${college.cons}</td></tr>
        `
    }
}