const HIGHLIGHTER_ID = "bw-highlighter";
const DIV_ID = "bw-sticky-botton-div";
const MENU_ID = "bw-ext-floating-menu";
const INPUT_ID = "bw-ext-input";
const BUTTON_ID = "bw-ext-button";
const TOUR_STEPS_CONTAINER_ID = "bw-ext-tour-steps";
const TOUR_STEP_CLASS = "bw-ext-tour-step";
const AVAILABLE_MODES = ["hint", "tour"];
let domSelected = false;
let lastHighlightTarget;
let selectedMode = "hint";
let selectedElements = [];

function terminate() {
  // The `click` listener is automatically removed after it has been called once
  window.removeEventListener("mousemove", throttle(updateHighlight));
  window.removeEventListener("keydown", checkTerminateKeys);
  removeHighlight();
}

function createFloatingMenu() {
  const checkElement = document.getElementById(MENU_ID);
  if (checkElement) {
    return;
  }
  const div = document.createElement("div");
  div.id = MENU_ID;
  div.style.position = "fixed";
  div.style.top = "20px";
  div.style.left = "20px";
  div.style.zIndex = "9999";
  div.style.display = "flex";
  div.style.flexDirection = "column";
  div.style.alignItems = "flex-start";
  div.style.gap = "10px";
  div.style.borderRadius = "4px";
  div.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
  div.style.backgroundColor = "#f8f9fa";
  div.style.padding = "10px";
  div.style.cursor = "pointer";
  div.style.minWidth = "160px";
  div.style.alignItems = "center";
  document.body.appendChild(div);

  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.alignItems = "center";
  buttonContainer.style.borderRadius = "30px";
  buttonContainer.style.overflow = "hidden";
  buttonContainer.style.backgroundColor = "#ccc";

  const cardContainer = document.createElement("div");
  cardContainer.id = TOUR_STEPS_CONTAINER_ID;
  cardContainer.style.display = "flex";
  cardContainer.style.flexDirection = "column";
  cardContainer.style.gap = "10px";
  cardContainer.style.width = "100%";
  cardContainer.style.maxHeight = "300px";
  cardContainer.style.overflowY = "auto";

  div.appendChild(buttonContainer);
  div.appendChild(cardContainer);

  addDragEvent();

  AVAILABLE_MODES.forEach((mode) => {
    const button = document.createElement("button");
    button.textContent = mode;
    button.style.padding = "8px 16px";
    button.style.fontSize = "16px";
    button.style.backgroundColor = "#7F56D9";
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.borderRadius = "30px";
    button.style.cursor = "pointer";
    button.style.transition = "background-color 0.3s ease";

    if (mode !== selectedMode) {
      button.style.backgroundColor = "#ccc";
      button.style.color = "#333";
    }

    button.addEventListener("click", () => {
      selectedMode = mode;
      buttonContainer.childNodes.forEach((button) => {
        if (button.textContent !== selectedMode) {
          button.style.backgroundColor = "#ccc";
          button.style.color = "#333";
        } else {
          button.style.backgroundColor = "#7F56D9";
          button.style.color = "#fff";
        }
      });
      if (mode === "tour") {
        generateList();
      } else {
        cardContainer.innerHTML = "";
      }
    });
    buttonContainer.appendChild(button);
  });

  // add event listener to drag the menu around
  div.addEventListener("mousedown", (e) => {
    if (e.target.id !== MENU_ID) {
      return;
    }
    const initialX = e.clientX - div.getBoundingClientRect().left;
    const initialY = e.clientY - div.getBoundingClientRect().top;

    const onMouseMove = (e) => {
      div.style.left = `${e.clientX - initialX}px`;
      div.style.top = `${e.clientY - initialY}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
}

function addDragEvent() {
  const list = document.getElementById(TOUR_STEPS_CONTAINER_ID);
  let draggingItem = null;

  list.addEventListener("dragstart", (e) => {
    draggingItem = e.target;
    e.target.classList.add("dragging");
  });

  list.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
    document
      .querySelectorAll(`.${TOUR_STEP_CLASS}`)
      .forEach((item) => item.classList.remove("over"));
    draggingItem = null;
    // update the step according to the new order
    const newList = Array.from(list.children).map((item, index) => {
      const step = item.id.replace("step-", "");
      const element = selectedElements.find((el) => el.step === +step);
      return { ...element, step: index + 1 };
    });
    selectedElements = newList;
    generateList();
  });

  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingOverItem = getDragAfterElement(list, e.clientY);

    // Remove .over from all items
    document
      .querySelectorAll(`.${TOUR_STEP_CLASS}`)
      .forEach((item) => item.classList.remove("over"));

    if (draggingOverItem) {
      draggingOverItem.classList.add("over"); // Add .over to the hovered item
      list.insertBefore(draggingItem, draggingOverItem);
    } else {
      list.appendChild(draggingItem); // Append to the end if no item below
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll(`.${TOUR_STEP_CLASS}:not(.dragging)`),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
}

function createStickyDiv() {
  let checkElement = document.getElementById("bw-sticky-botton-div");
  if (checkElement) {
    return;
  }

  const stickyDiv = document.createElement("div");
  stickyDiv.id = DIV_ID;
  stickyDiv.style.position = "fixed";
  stickyDiv.style.bottom = "0";
  stickyDiv.style.left = "0";
  stickyDiv.style.width = "100%";
  stickyDiv.style.backgroundColor = "#f8f9fa";
  stickyDiv.style.padding = "10px";
  stickyDiv.style.boxShadow = "0 -2px 10px rgba(0, 0, 0, 0.1)";
  stickyDiv.style.display = "flex";
  stickyDiv.style.alignItems = "center";
  stickyDiv.style.justifyContent = "center";
  stickyDiv.style.gap = "10px";
  stickyDiv.style.zIndex = "1000"; // Ensure it stays on top

  // Create the label
  const label = document.createElement("label");
  label.textContent = "Target Element :";
  label.style.fontSize = "16px";
  label.style.color = "#333";
  stickyDiv.appendChild(label);

  // Create the input field
  const input = document.createElement("input");
  input.id = INPUT_ID;
  input.type = "text";
  input.disabled = true;
  input.placeholder = "selector";
  input.style.padding = "8px";
  input.style.fontSize = "16px";
  input.style.border = "1px solid #ccc";
  input.style.borderRadius = "4px";
  input.style.outline = "none";
  input.style.flex = "1";
  input.style.maxWidth = "300px";
  input.addEventListener("focus", () => {
    input.style.borderColor = "#7F56D9";
    input.style.boxShadow = "0 0 5px rgba(127, 86, 217, 0.5)";
  });
  input.addEventListener("blur", () => {
    input.style.borderColor = "#ccc";
    input.style.boxShadow = "none";
  });
  stickyDiv.appendChild(input);

  // Create the button
  const button = document.createElement("button");
  button.id = BUTTON_ID;
  button.textContent = "Copy";
  button.style.padding = "8px 16px";
  button.style.fontSize = "16px";
  button.style.backgroundColor = "#7F56D9";
  button.style.color = "#fff";
  button.style.border = "none";
  button.style.borderRadius = "4px";
  button.style.cursor = "pointer";
  button.style.transition = "background-color 0.3s ease";

  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "#6941C6";
  });
  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "#7F56D9";
  });
  button.addEventListener("click", async () => {
    try {
      await navigator?.clipboard?.writeText(input.value);
      button.textContent = "Copied!";
      setTimeout(() => (button.textContent = "Copy"), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      button.textContent = "Failed!";
      setTimeout(() => (button.textContent = "Copy"), 2000);
    }
    //alert(`You entered: ${input.value}`);
  });
  stickyDiv.appendChild(button);

  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "#6941C6";
  });
  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "#7F56D9";
  });
  button.addEventListener("click", async () => {
    await navigator?.clipboard?.writeText(input.value);
    //alert(`You entered: ${input.value}`);
  });
  stickyDiv.appendChild(button);

  // Append the sticky div to the body
  document.body.appendChild(stickyDiv);
}

function addHighlight() {
  const div = document.createElement("div");
  div.id = HIGHLIGHTER_ID;
  const { style } = div;
  style.backgroundColor = "#1d234280";
  style.boxSizing = "border-box";
  style.border = "solid 4px #f0bb8980";
  style.position = "fixed";
  style.zIndex = "9999";
  style.pointerEvents = "none";
  document.body.appendChild(div);
}

function updateHighlight({ target }) {
  if (
    !(target instanceof HTMLElement) ||
    target === lastHighlightTarget ||
    target.id.startsWith("bw-")
  ) {
    return;
  }
  lastHighlightTarget = target;
  const { top, left, width, height } = target.getBoundingClientRect();
  const highlighter = document.getElementById(HIGHLIGHTER_ID);
  if (!domSelected) {
    document.getElementById("bw-ext-input").value = generateSelector(target);
  }

  if (!highlighter) return;
  const { style } = highlighter;
  style.top = top - 4 + "px";
  style.left = left - 4 + "px";
  style.width = width + 8 + "px";
  style.height = height + 8 + "px";
}

function removeHighlight() {
  const highlighter = document.getElementById(HIGHLIGHTER_ID);
  if (highlighter) {
    document.body.removeChild(highlighter);
  }
  domSelected = true;
}

function generateList() {
  const trashClass = "fa";
  const dragClass = "drag-icon";
  const cardTemplate = `<i class="${dragClass}">&equiv;</i><span>{{step}}</span><i class="${trashClass}"><img src="https://cdn-icons-png.flaticon.com/512/860/860829.png" ald="Delete" width="16px" height="16px" /></i>`;
  const cardContainer = document.getElementById(TOUR_STEPS_CONTAINER_ID);
  cardContainer.innerHTML = "";

  selectedElements.forEach(({ element, step }, index) => {
    const card = document.createElement("div");
    card.classList.add("bw-ext-tour-step");
    card.id = `step-${step}`;

    // add card style
    card.draggable = true;
    card.innerHTML = cardTemplate.replace("{{step}}", element);
    card.style.display = "flex";
    card.style.alignItems = "center";
    card.style.gap = "10px";
    card.style.color = "#344054";
    card.style.border = "1px solid #D0D5DD";
    card.style.borderRadius = "8px";
    card.style.padding = "8px";

    const content = card.querySelector("span");
    content.style.flexGrow = "1";
    content.style.maxWidth = "150px";
    content.style.overflowX = "auto";
    content.style.whiteSpace = "nowrap";

    const dragIcon = card.querySelector(`.${dragClass}`);
    dragIcon.style.cursor = "grab";
    dragIcon.style.fontSize = "1.3rem";
    dragIcon.style.color = "#98A2B3";

    const trashIcon = card.querySelector(`.${trashClass.replace(/\s/g, ".")}`);
    trashIcon.style.cursor = "pointer";
    trashIcon.style.fontSize = "1.3rem";
    trashIcon.style.color = "#667085";
    trashIcon.addEventListener("click", () => {
      selectedElements.splice(index, 1);
      generateList();
      const target = document.querySelector(element);
      if (target) {
        target.style.outline = "none";
      }
    });

    cardContainer.appendChild(card);

    card.addEventListener("mouseenter", () => {
      card.style.borderColor = "#7F56D9";
      addHighlight();
      const target = document.querySelector(element);
      if (target) {
        target.style.outline = "2px solid #7F56D9";
      }
    });
    card.addEventListener("mouseleave", () => {
      card.style.borderColor = "#D0D5DD";
      const target = document.querySelector(element);
      if (target) {
        target.style.outline = "none";
      }
    });
  });
}

async function grabSelector(event) {
  event.preventDefault();
  const { target } = event;
  const isBw = target.closest("[id^=bw-]");
  if (isBw) {
    return;
  }
  if (selectedMode === "tour") {
    const selector = generateSelector(target);
    selectedElements.push({
      element: selector,
      step: selectedElements.length + 1,
    });
    generateList();
    return;
  }
  if (!(target instanceof HTMLElement)) {
    terminate();
    return;
  }
  terminate();
}

function generateSelector(element) {
  if (!element) return "";

  let selector = getSelector(element);
  while (!isUnique(selector) && element) {
    element = element.parentElement;
    const newSelector = getSelector(element);
    if (newSelector) selector = newSelector + ">" + selector;
  }

  return selector;
}

function getSelector(element) {
  if (!element) return "";

  const { tagName, id } = element;
  const tag = tagName.toLowerCase();
  if (id.startsWith("bw-")) return "";
  if (tag === "body" || tag === "html") return tag;

  let selector = tag;
  if (!isUnique(selector)) selector += id ? "#" + id : "";

  return appendPseudoSelector(element, selector);
}

function appendPseudoSelector(element, selector) {
  return isUnique(selector)
    ? selector
    : `${selector}:nth-child(${getChildIndex(element)})`;
}

function getChildIndex({ previousElementSibling: sibling }) {
  return sibling ? getChildIndex(sibling) + 1 : 1;
}

function getQueryLength(selector) {
  return document.querySelectorAll(selector).length;
}

function isUnique(selector) {
  return getQueryLength(selector) <= 1;
}

function checkTerminateKeys(event) {
  const { key } = event;
  if (key === "Escape" || key === "Esc") {
    event.preventDefault();
    terminate();
  }
}

function throttle(func, limit = 100) {
  createStickyDiv();
  createFloatingMenu();
  let inThrottle;
  let lastResult;
  domSelected = false;
  return function () {
    const args = arguments;
    const context = this;

    if (!inThrottle) {
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
      lastResult = func.apply(context, args);
    }

    return lastResult;
  };
}
