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
    let sum = Number(carbs.value) + Number(protein.value) + Number(fat.value);
    foodList.insertAdjacentHTML(
      "beforeend",
      `<li class="card">
  <div>
    <h3 class="name">${name.value}</h3>
    <div class="calories">${sum} calories</div>
    <ul class="macros">
      <li class="carbs"><div>Carbs</div><div class="value">${carbs.value}g</div></li>
      <li class="protein"><div>Protein</div><div class="value">${protein.value}g</div></li>
      <li class="fat"><div>Fat</div><div class="value">${fat.value}g</div></li>
    </ul>
  </div>
</li>`
    );

    name.value = "";
    carbs.value = "";
    protein.value = "";
    fat.value = "";
  });
});
