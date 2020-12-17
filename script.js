/**
 *  Symbiota Label Builder Functions
 *  Author: Laura Rocha Prado
 *  Version: 2020
 */

/** TODO
 * [x] Fix Prefix/Suffix not being activated when item is selected
 * [*] When selecting field, disable clicking fieldblock (and vice-versa)
 * [x] Improve styles for control divs
 * [ ] Get state of line?
 * [ ] Replace "bar" button
 * */

/** Creating Page Elements/Controls
 ******************************
 */

// Defines formattable items in label (also used to create preview elements)
const fieldProps = [
  { block: 'labelBlock', name: 'Family', id: 'family' },
  { block: 'labelBlock', name: 'Scientific Name', id: 'speciesname' },
  { block: 'labelBlock', name: 'Catalog Number', id: 'catalognumber' },
  { block: 'labelBlock', name: 'Collector', id: 'recordedby' },
];

// Defines formatting buttons
const formatsArr = [
  { group: 'field', func: 'font-bold', icon: 'format_bold' },
  { group: 'field', func: 'italic', icon: 'format_italic' },
  { group: 'field', func: 'underline', icon: 'format_underlined' },
  { group: 'field', func: 'uppercase', icon: 'format_size' },
  { group: 'field-block', func: 'bar', icon: 'minimize' },
];

// Defines dropdown style groups
const dropdownsArr = [
  {
    id: 'text',
    name: 'font-size',
    group: 'field',
    options: [
      { value: '', text: 'Font Size' },
      { value: 'text-xs', text: 'X-Small' },
      { value: 'text-sm', text: 'Small' },
      { value: 'text-base', text: 'Normal' },
      { value: 'text-lg', text: 'Large' },
      { value: 'text-xl', text: 'X-Large' },
      { value: 'text-2xl', text: '2X-Large' },
      { value: 'text-3xl', text: '3X-Large' },
      { value: 'text-4xl', text: '4X-Large' },
      { value: 'text-5xl', text: '5X-Large' },
      { value: 'text-6xl', text: '6X-Large' },
    ],
  },
  {
    id: 'font-type',
    name: 'font-type',
    group: 'field',
    options: [
      { value: '', text: 'Font Type' },
      { value: 'font-type-sans', text: 'System Sans Serif' },
      { value: 'font-type-serif', text: 'System Serif' },
      { value: 'font-type-mono', text: 'System Mono' },
    ],
  },
  {
    id: 'text-align',
    name: 'text-align',
    group: 'field-block',
    options: [
      { value: '', text: 'Text Align' },
      { value: 'text-align-center', text: 'Center' },
      { value: 'text-align-right', text: 'Right' },
      { value: 'text-align-justify', text: 'Justify' },
    ],
  },
  {
    id: 'mt',
    name: 'spacing-top',
    group: 'field-block',
    options: [
      { value: '', text: 'Line Spacing Top' },
      { value: 'mt-0', text: 'Top: 0' },
      { value: 'mt-1', text: 'Top: 1' },
      { value: 'mt-2', text: 'Top: 2' },
      { value: 'mt-3', text: 'Top: 3' },
      { value: 'mt-4', text: 'Top: 4' },
      { value: 'mt-5', text: 'Top: 5' },
      { value: 'mt-6', text: 'Top: 6' },
      { value: 'mt-8', text: 'Top: 8' },
      { value: 'mt-10', text: 'Top: 10' },
      { value: 'mt-12', text: 'Top: 12' },
    ],
  },
  {
    id: 'mb',
    name: 'spacing-bottom',
    group: 'field-block',
    options: [
      { value: '', text: 'Line Spacing Bottom' },
      { value: 'mb-0', text: 'Bottom: 0' },
      { value: 'mb-1', text: 'Bottom: 1' },
      { value: 'mb-2', text: 'Bottom: 2' },
      { value: 'mb-3', text: 'Bottom: 3' },
      { value: 'mb-4', text: 'Bottom: 4' },
      { value: 'mb-5', text: 'Bottom: 5' },
      { value: 'mb-6', text: 'Bottom: 6' },
      { value: 'mb-8', text: 'Bottom: 8' },
      { value: 'mb-10', text: 'Bottom: 10' },
      { value: 'mb-12', text: 'Bottom: 12' },
    ],
  },
];

const fieldDiv = document.getElementById('fields');
const controlDiv = document.getElementById('controls');

// Creates draggable elements
fieldProps.forEach((field) => {
  let li = document.createElement('li');
  li.innerHTML = field.name;
  li.id = field.id;
  if (field.block === 'labelBlock') {
    li.draggable = 'true';
    li.classList.add('draggable');
    fieldDiv.appendChild(li);
  }
});

// Creates formatting (button) controls in page
formatsArr.forEach((format) => {
  let targetDiv = document.getElementById(`${format.group}-options`);
  let btn = document.createElement('button');
  btn.classList.add('control');
  btn.disabled = true;
  btn.dataset.func = format.func;
  btn.dataset.group = format.group;
  let icon = document.createElement('span');
  icon.classList.add('material-icons');
  icon.innerText = format.icon;
  btn.appendChild(icon);
  // console.log(format.group);
  targetDiv.appendChild(btn);
  // controlDiv.appendChild(targetDiv);
});

// Creates formatting (dropdown) controls in page
dropdownsArr.forEach((dropObj) => {
  let targetDiv = document.getElementById(`${dropObj.group}-options`);
  let slct = document.createElement('select');
  slct.dataset.group = dropObj.group;
  slct.classList.add('control');
  slct.name = dropObj.name;
  slct.id = dropObj.id;
  slct.disabled = true;
  dropObj.options.forEach((choice) => {
    let opt = document.createElement('option');
    opt.value = choice.value;
    opt.innerText = choice.text;
    slct.appendChild(opt);
  });
  targetDiv.appendChild(slct);
});

// Grabs elements
const containers = document.querySelectorAll('.container');
const draggables = document.querySelectorAll('.draggable');
const build = document.getElementById('build-label');
const preview = document.getElementById('preview-label');
const controls = document.querySelectorAll('.control');
const inputs = document.querySelectorAll('input');

/** Methods
 ******************************
 */

/**
 * Appends line (fieldBlock) to label builder
 * Binded to button, adds editable div
 */
function addLine() {
  let line = document.createElement('div');
  line.classList.add('field-block', 'container');
  let midBlocks = document.querySelectorAll('#label-middle > .field-block');
  let lastBlock = midBlocks[midBlocks.length - 1];
  lastBlock.parentNode.insertBefore(line, lastBlock.nextSibling);
  line.addEventListener('dragover', (e) => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    line.appendChild(dragging);
  });
}

/**
 * Refreshes label preview
 * Triggered every time items are updated
 */
function refreshPreview() {
  let labelList = [];
  let fieldBlocks = document.querySelectorAll('#build-label .field-block');
  fieldBlocks.forEach((block) => {
    let itemsArr = [];
    let items = block.querySelectorAll('li');
    items.forEach((item) => {
      let itemObj = {};
      let className = Array.from(item.classList).filter(isPrintStyle);
      itemObj.field = item.id;
      itemObj.className = className;
      itemObj.prefix = item.dataset.prefix;
      itemObj.suffix = item.dataset.suffix;
      itemsArr.push(itemObj);
    });
    labelList.push(itemsArr);
    let fieldBlockStyles = Array.from(block.classList).filter(isPrintStyle);
    fieldBlockStyles ? (itemsArr.className = fieldBlockStyles) : '';
    console.log(itemsArr);
  });
  console.log(labelList);
  // Clears preview div before appending elements
  preview.innerHTML = '';
  // Creates HTML elements and appends to preview div
  labelList.forEach((labelItem) => {
    let fieldBlock = document.createElement('div');
    fieldBlock.classList.add('field-block');
    let labelItemStyles = labelItem.className;
    labelItemStyles.forEach((style) => {
      fieldBlock.classList.add(style);
    });
    // let fieldBlockStyleList = labelItem
    preview.appendChild(fieldBlock);
    labelItem.forEach((field) => {
      createPreviewEl(field, fieldBlock);
    });
  });
  generateJson(labelList);
}

/**
 * Creates elements in preview div, based on controls in build
 * @param {Object} element Field, constructed in `refreshPreview()`
 * @param {DOM Node} parent DOM Node where element will be inserted
 */
function createPreviewEl(element, parent) {
  // Grabs information from fieldProps array to create elements matching on id
  let fieldInfo =
    fieldProps[fieldProps.findIndex((x) => x.id === element.field)];
  let div = document.createElement('div');
  div.innerHTML = fieldInfo.name;
  div.classList.add(fieldInfo.id);
  div.classList.add(...element.className);
  parent.appendChild(div);
  let hasPrefix = element.prefix != undefined;
  let hasSuffix = element.suffix != undefined;
  if (hasPrefix) {
    let currText = div.innerText;
    let prefSpan = `<span>${element.prefix}</span>`;
    div.innerHTML = prefSpan + currText;
  }
  if (hasSuffix) {
    let sufSpan = document.createElement('span');
    sufSpan.innerText = element.suffix;
    div.appendChild(sufSpan);
  }
}

/**
 * Checks if class should be output in JSON
 * @param {String} className found in item
 */
function isPrintStyle(className) {
  const functionalStyles = [
    'draggable',
    'selected',
    'field-block',
    'container',
  ];
  return !functionalStyles.includes(className);
}

/**
 * Generate JSON string for current configurations
 * @param {Array} list Array of fields, built by `refreshPreview()`
 */
function generateJson(list) {
  let labelBlocks = [];
  // Parse nested array
  Object.keys(list).forEach((index) => {
    let fieldBlockObj = {};
    // Joins array of className items for fields
    let fieldItem = list[index];
    fieldItem.map((prop) => {
      prop.className.length > 0
        ? (prop.className = prop.className.join(' '))
        : delete prop.className;
    });
    fieldBlockObj.fieldBlock = fieldItem;
    let fieldBlockStyles = fieldItem.className;
    fieldBlockStyles.length > 0
      ? (fieldBlockObj.className = fieldItem.className.join(' '))
      : delete fieldBlockObj.className;
    labelBlocks.push(fieldBlockObj);
  });
  let json = JSON.stringify(labelBlocks);
  console.log(json);
}

/**
 * Toggles select/deselect clicked element
 * @param {DOM Node} element
 */
function toggleSelect(element) {
  element.classList.toggle('selected');
  let isSelected = element.classList.contains('selected');
  return isSelected;
}

/**
 * Activates/Deactivates formatting controls
 * @param {String} filter Class of formatting control (field or field-block)
 * @param {Boolean} bool
 */
function activateControls(filter, bool) {
  // console.log(filter);
  // console.log(bool);
  let filtered = document.querySelectorAll(`[data-group=${filter}]`);
  filtered.forEach((control) => {
    bool ? (control.disabled = false) : (control.disabled = true);
  });
}

/**
 * Gets selected item state (formatted classes)
 * @param {DOM Node} item Field in build label area
 */
function getState(item) {
  let formatList = Array.from(item.classList);
  // Removes '.draggable' and '.selected' from array
  formatList.splice(formatList.indexOf('selected'), 1);
  formatList.splice(formatList.indexOf('draggable'), 1);
  if (formatList.length > 0) {
    // Render state of each formatting button
    formatList.forEach((formatItem) => {
      // Check if class is a choice in a dropdown by matching first part of class
      let strArr = formatItem.split('-');
      let str = strArr[0];
      // Loop through each item in array
      dropdownsArr.forEach((dropdown) => {
        let isDropdownStyle = str === dropdown.id;
        if (isDropdownStyle) {
          let selDropdown = document.getElementById(str);
          selDropdown.value = formatItem;
        }
      });
      controls.forEach((control) => {
        // Select that format and activate it
        if (formatItem === control.dataset.func) {
          control.classList.add('selected');
        }
      });
    });
  }

  // Get state of prefix/suffix for fields
  let hasPrefix = item.dataset.prefix != null;
  let prefixInput = document.getElementById('prefix');
  hasPrefix ? (prefixInput.value = item.dataset.prefix) : '';
  let hasSuffix = item.dataset.suffix != null;
  let suffixInput = document.getElementById('suffix');
  hasSuffix ? (suffixInput.value = item.dataset.suffix) : '';
}

/**
 * Applies selected control styles to selected items
 * @param {String} control ID of formatting control (button or select)
 * @param {Array} selectedItems Items to be formatted (selected)
 * @param {Boolean} bool If style will be added or removed, depends on state of control (important for buttons)
 */
function toggleStyle(control, selectedItems, bool) {
  // Toggles class in item - causes errors when multiple are selected
  // with conflicting styles...
  selectedItems.forEach((item) => {
    // Double-checking if item is selected
    if (item.classList.contains('selected')) {
      // Deals with buttons
      // if formatting button is selected, add class, else remove
      bool
        ? item.classList.add(control.dataset.func)
        : item.classList.remove(control.dataset.func);
      //
    } else {
      return false;
    }
    refreshPreview();
  });
}

/**
 * Applies selected dropdown styles to selected items
 * @param {String} dropdown ID of dropdown
 * @param {Array} selectedItems Items to be formatted (selected)
 */
function addReplaceStyle(dropdown, selectedItems) {
  // Deals with selection
  dropdown.addEventListener('input', function () {
    selectedItems.forEach((item) => {
      let option = dropdown.value;
      if (option !== '') {
        // Check if item already has styles in this group
        let group = new RegExp(`${dropdown.id}-*`);
        let hasGroup = item.className.split(' ').some(function (c) {
          return group.test(c);
        });
        if (item.classList.contains('selected')) {
          if (!hasGroup) {
            // If not, add it
            item.classList.add(option);
            console.log(`added ${option} to ${item.id}`);
          } else {
            // If yes, replace it
            item.classList.forEach((className) => {
              if (className.startsWith(dropdown.id)) {
                item.classList.remove(className);
              }
            });
            item.classList.add(option);
          }
        }
      }
    });
  });
  refreshPreview();
}

/**
 * Clears/resets controls state
 */
function resetControls() {
  controls.forEach((control) => {
    // Deal with select input
    let isDropdown = control.tagName === 'SELECT';
    isDropdown ? (control.value = '') : '';
    control.classList.remove('selected');
    let isInput = control.tagName === 'INPUT';
    isInput ? (control.value = '') : '';
  });
}

/**
 * Tags dragging elements and copies their content
 * @param {Event} e
 */
function handleDragStart(e) {
  dragSrcEl = this;
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

/**
 * Moves content of dragged element when done moving
 * @param {Event} e
 */
function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

/**
 * Reorders element based on position when dropped
 * @param {Event} e
 */
let dragSrcEl = null;
function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcEl != this) {
    this.parentNode.insertBefore(dragSrcEl, this);
  }
  return false;
}

/**
 * Removes tag from dragging element
 * @param {Event} e
 */
function handleDragEnd(e) {
  this.classList.remove('dragging');
  refreshPreview();
  return false;
}

/** Event Listeners
 ******************************
 */
[].forEach.call(draggables, function (draggable) {
  draggable.addEventListener('dragstart', handleDragStart, false);
  draggable.addEventListener('dragover', handleDragOver, false);
  draggable.addEventListener('drop', handleDrop, false);
  draggable.addEventListener('dragend', handleDragEnd, false);
});

containers.forEach((container) => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    container.appendChild(dragging);
  });
});

/**
 * REFACTOR THIS!!!!
 *
 * Pass item type of SELECTED items to activate controls
 */
// Elements in '#label-middle'
let formattable = document.getElementById('label-middle');
formattable.addEventListener('click', (e) => {
  let isSelected = toggleSelect(e.target);
  // Resets formatting buttons state when item is deselected
  !isSelected ? resetControls() : '';

  // Everytime item is clicked, display list of selected items:
  let selectedItems = build.querySelectorAll('.selected');
  // console.log(selectedItems);

  // When element is selected, activate formatting buttons
  // depends on number of elements in page (at least one selected).
  let isAnySelected = selectedItems.length > 0;
  // console.log(anySelected + ' anySelected');

  if (isAnySelected) {
    let itemType = '';
    // get the item type of the SELECTED item instead!!!
    // do matching for every selected item instead on focusing on target
    if (e.target && e.target.matches('.selected')) {
      if (e.target && e.target.matches('.draggable')) {
        itemType = 'field';
        // deactivate 'field-block' items
      } else if (e.target && e.target.matches('.field-block')) {
        itemType = 'field-block';
        // deactivate 'field' items
      }
      // it's passing the itemType of the element clicked, not the one selected!
      // console.log(itemType);
      // console.log(anySelected);
      activateControls(itemType, isAnySelected);
    }

    let numSelected = build.querySelectorAll('.selected');
    // console.log('num selected: ' + numSelected.length);
    // Gets formatting information for individually selected item
    if (numSelected.length > 1) {
      // If there is more than one type of selected items, deactivate controls
      let selected = build.querySelectorAll('.selected');
      let typeArr = [];
      selected.forEach((item) => {
        typeArr.push(Array.from(item.classList).join(' '));
      });
      // console.log(typeArr);
      let uniqueTypeSet = new Set(typeArr);
      console.log(uniqueTypeSet);
      if (uniqueTypeSet.size > 1) {
        // deactivate controls
        deactivateControls();
      } else {
        (' ');
      }
      resetControls();
    } else if (numSelected.length == 1) {
      // Refreshes buttons according to applied styles in selected item
      let item = build.querySelector('.selected');
      // console.log(
      //   'passing itemType' + itemType + ' and anySelected ' + anySelected
      // );
      if (item.matches('.draggable')) {
        itemType = 'field';
        // deactivate 'field-block' items
      } else if (item.matches('.field-block')) {
        itemType = 'field-block';
        // deactivate 'field' items
      }
      activateControls(itemType, isAnySelected);
      getState(item);
    } else {
      return false;
    }
  } else {
    deactivateControls();
  }
});

function deactivateControls() {
  controls.forEach((control) => {
    control.disabled = true;
  });
}

// Formatting controls
controlDiv.addEventListener('click', (e) => {
  // Gets selected items to format
  let formatItems = build.querySelectorAll('.selected');
  let isFormatSelected = toggleSelect(e.target);
  let isButton = e.target.tagName === 'BUTTON';
  let isDropdown = e.target.tagName === 'SELECT';
  // Buttons
  if (isButton) {
    toggleStyle(e.target, formatItems, isFormatSelected);
  } else if (isDropdown) {
    addReplaceStyle(e.target, formatItems);
  }
});

// Field and Block options (prefix/suffix, delimiters)
// Listen to input changes
inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    let formatItem = build.querySelector('li.selected');
    updateFieldContent(e.target, formatItem);
    // Needs to call refresh to pass values to labelList
    refreshPreview();
  });
});

/**
 * Updates optional field content (prefix/suffix)
 * @param {DOM Node} content Optional content input
 * @param {DOM Node} item Field to be modified
 */
function updateFieldContent(content, item) {
  let option = content.id;
  item.setAttribute('data-' + option, content.value);
}
