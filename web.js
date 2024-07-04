const base_URL =
  "https://v6.exchangerate-api.com/v6/dccc7c35471b4b397281c9eb/latest";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (select of dropdown) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  let url = `https://v6.exchangerate-api.com/v6/dccc7c35471b4b397281c9eb/latest/${fromCurr.value}`;
  fetch(url).then((response) =>
    response.json().then((result) => {
      let rate = result.conversion_rates[toCurr.value];

      let finalAmt = amtVal * rate;

      msg.innerText = `${fromCurr.value} ${amtVal} = ${finalAmt} ${toCurr.value}`;
    })
  );
});
