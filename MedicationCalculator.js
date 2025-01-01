"use strict";

function setPageUnits(e){
    e.preventDefault();

    var formulation = document.getElementById("formulation").value;
    var microgramsConc = document.getElementById("microgramsConc");

    if (formulation === "solution") {
        document.getElementById("milligramsConc").textContent = "mg/ml"
        document.getElementById("microgramsConc").textContent = "ug/ml"
        document.getElementById("resultsSuffixID").textContent = "ml";
        microgramsConc.hidden = false;
    } else if (formulation === "sachets") {
        document.getElementById("milligramsConc").textContent = "mg/sachet"
        document.getElementById("microgramsConc").textContent = "ug/sachet"
        document.getElementById("resultsSuffixID").textContent = "sachets";
        microgramsConc.hidden = false;
    } else if (formulation === "tubs") {
        document.getElementById("milligramsConc").textContent = "mg/scoop"
        document.getElementById("microgramsConc").textContent = "ug/scoop"
        document.getElementById("resultsSuffixID").textContent = "scoops";
        microgramsConc.hidden = false;
    } else if (formulation === "select") {
        document.getElementById("milligramsConc").textContent = ""
        document.getElementById("resultsSuffixID").textContent = "";
        microgramsConc.hidden = true;
    }
}

// todo clear inputs if reselect "select"

function getConcentrationInMilligrams(rawConcentration, concentrationUnit) {
    if (concentrationUnit === "milligramsConc") {
        return rawConcentration * 1;
    } else if (concentrationUnit === "microgramsConc") {
        return rawConcentration / 1000;
    }
}

function getDoseUnitInMilligrams(rawDose, doseUnit) {
    if (doseUnit === "milligramsDose") {
        return rawDose * 1;
    } else if (doseUnit === "microgramsDose") {
        return rawDose / 1000;
    }
}

function calculateMedication(e) {
    e.preventDefault();
    var bodyWeight = document.getElementById("bodyWeight").value;

    var rawConcentration = document.getElementById("concentration").value;
    var concentrationUnit = document.getElementById("concentrationUnit").value;
    var concentrationMilligrams = getConcentrationInMilligrams(
        rawConcentration,
        concentrationUnit,
    );

    var rawDose = document.getElementById("dose").value;
    var doseUnit = document.getElementById("doseUnit").value;
    var doseMilligrams = getDoseUnitInMilligrams(rawDose, doseUnit);

    var result = (bodyWeight * doseMilligrams) / concentrationMilligrams;

    if (isNaN(result)) {
        document.getElementById("result").textContent = "error";
    } else if (!isFinite(result)) {
        document.getElementById("result").textContent = "error";
    } else {
        document.getElementById("result").textContent = result.toFixed(1);
    }
}
