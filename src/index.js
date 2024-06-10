window.loadSlider = function (json) {
  console.log("🚀 ~ json:", json);
  const obj = JSON.parse(json);
  const { data } = obj;
  console.log("🚀 ~ data:", data);

  const div = document.getElementById("slider");

  data.forEach(({ fieldData }) => {
    console.log("🚀 ~ data.forEach ~ fieldData:", fieldData);
    // Create the heading element (using the question variable)
    const heading = document.createElement("h3");
    heading.innerHTML = fieldData.Question; // Assuming fieldData.Question contains the heading text

    // Create the span element
    const span = document.createElement("span");
    span.className = "badge ml-5 bg-success";
    span.innerHTML = fieldData.Value;

    heading.appendChild(span);
    div.appendChild(heading);

    const slider = document.createElement("input");
    if (Number.isInteger(fieldData.Value)) {
      slider.type = "range";
      slider.className = "form-range pb-5 pt-2 px-2";
      slider.id = `slider-${fieldData.PrimaryKey}`;
      slider.min = fieldData.minValue || 0;
      slider.max = fieldData.maxValue || 100;
      slider.value = fieldData.Value || 50;
      slider.oninput = function () {
        span.innerHTML = this.value;
      };
      slider.onchange = function () {
        FileMaker.PerformScript(
          "Set Slider Value",
          JSON.stringify({
            value: this.value,
            id: fieldData.PrimaryKey,
          })
        );
        console.log(this.value, `slider-${fieldData.PrimaryKey}`);
      };
      div.appendChild(slider);
    } else {
      // Create the input group div
      const inputGroup = document.createElement("div");
      inputGroup.className = "input-group";

      // Create the input field
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.className = "form-control disabled w-64";
      inputField.setAttribute("disabled", "");
      inputField.value = fieldData.Value;

      // Append the prepend div and input field to the input group div
      inputGroup.appendChild(inputField);

      // Append the input group to the parent div
      div.appendChild(inputGroup);
    }
  });
};
