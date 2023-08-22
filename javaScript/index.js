import FetchWrapper from "./fetch-wrapper.js";

const API = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/OnlyCzesio"
);

const form = document.querySelector("#create-form");
const carbs = document.querySelector("#create-carbs");
const protein = document.querySelector("#create-protein");
const fat = document.querySelector("#create-fat");
const name = document.querySelector("#create-name");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  API.post("/", {
    fields: {
      name: { stringValue: name.value },
      carbs: { integerValue: carbs.value },
      protein: { integerValue: protein.value },
      fat: { integerValue: fat.value },
    },
  }).then((data) => {
    console.log(data);
    if (data.error) {
      console.log(data);
      return;
    }
    name.value = "";
    carbs.value = "";
    protein.value = "";
    fat.value = "";
  });
});
