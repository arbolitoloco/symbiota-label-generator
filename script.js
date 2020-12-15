/**
 *  Symbiota Label Builder Functions
 *  Author: Laura Rocha Prado
 *  Version: 2020
 */

//  Temporary array with fields
//  Add JSON variable where the fields are coming from/to
const fieldProps = [
  { block: 'labelHeader', name: 'Heading Text', id: 'header' },
  { block: 'labelFooter', name: 'Footer Text', id: 'footer' },
  { block: 'labelBlock', name: 'Family', id: 'family' },
  { block: 'labelBlock', name: 'Scientific Name', id: 'speciesname' },
  { block: 'labelBlock', name: 'Catalog Number', id: 'catalognumber' },
  { block: 'labelBlock', name: 'Collector', id: 'recordedby' },
];

// Creates draggable elements
const fieldDiv = document.getElementById('fields');
fieldProps.forEach((field) => {
  let li = document.createElement('li');
  // let fieldElement = document.createElement('BUTTON');
  // fieldElement.innerHTML = field.name;
  li.innerHTML = field.name;
  li.id = field.id;
  if (field.block === 'labelBlock') {
    li.draggable = 'true';
    li.classList.add('draggable');
    // li.appendChild(fieldElement);
    fieldDiv.appendChild(li);
  } else {
    // let fixedDiv = document.getElementById(`label-${field.id}`);
    // console.log(field.id);
    // console.log(fixedDiv);
    // fixedDiv.appendChild(li);
  }
});

// Temporary array for buttons
const formatsArr = [
  { func: 'font-bold', icon: 'format_bold' },
  { func: 'italic', icon: 'format_italic' },
  { func: 'underline', icon: 'format_underlined' },
  { func: 'uppercase', icon: 'format_size' },
  { func: 'bar', icon: 'minimize' },
  // { func: 'text-center', icon: 'format_align_center' },--> has to be applied to containers and not items themselves
  // { func: 'text-right', icon: 'format_align_right' },
  // { func: 'text-left', icon: 'format_align_left' },
];

// Array for dropdown style groups
const dropdownsArr = [
  {
    id: 'text',
    name: 'font-size',
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
    options: [
      { value: '', text: 'Font Type' },
      { value: 'font-type-sans', text: 'System Sans Serif' },
      { value: 'font-type-serif', text: 'System Serif' },
      { value: 'font-type-mono', text: 'System Mono' },
    ],
  },
];

// Creates formatting (button) controls in page
const controlDiv = document.getElementById('controls');
formatsArr.forEach((format) => {
  let btn = document.createElement('button');
  btn.classList.add('control');
  btn.disabled = true;
  // btn.innerText = format.icon;
  btn.dataset.func = format.func;
  let icon = document.createElement('span');
  icon.classList.add('material-icons');
  icon.innerText = format.icon;
  btn.appendChild(icon);
  controlDiv.appendChild(btn);
});

// Creates formatting (dropdown) controls in page
dropdownsArr.forEach((dropObj) => {
  // console.log('inside dropdownsArr each');
  let slct = document.createElement('select');
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
  controlDiv.appendChild(slct);
  // console.log(dropObj);
});

// Grabs elements
const containers = document.querySelectorAll('.container');
const draggables = document.querySelectorAll('.draggable');
const build = document.getElementById('build-label');
const preview = document.getElementById('preview-label');
const controls = document.querySelectorAll('.control');
const inputs = document.querySelectorAll('input');

// Adds line (fieldBlock)
function addLine() {
  // console.log('clicked');
  let line = document.createElement('div');
  line.classList.add('field-block', 'container');
  let midBlocks = document.querySelectorAll('#label-middle > .field-block');
  // console.log(midBlocks);
  let lastBlock = midBlocks[midBlocks.length - 1];
  lastBlock.parentNode.insertBefore(line, lastBlock.nextSibling);
  line.addEventListener('dragover', (e) => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    line.appendChild(dragging);
  });
}

// Refactor this so that elements are created based on array of elements
// function createPreviewEl(element, parent) {
//   console.log(element);
//   // console.log(element.field);
//   // console.log(parent);
//   let field = fieldProps[fieldProps.findIndex((x) => x.id === element.field)];
//   // console.log(field);
//   // Create parents first (if not available), then children inside
//   let hasEl = preview.querySelector(`.${element.field}`) != null;
//   // console.log(hasEl);
//   if (!hasEl) {
//     let newParentEl = document.createElement('div');
//     newParentEl.classList.add(parent);
//     preview.appendChild(newParentEl);
//     let div = document.createElement('div');
//     div.innerHTML = field.name;
//     div.classList.add(field.id);
//     div.classList.add(...element.className);
//     newParentEl.appendChild(div);
//   } else {
//     // Check if child already exists div
//     let hasItem =
//       preview.querySelector(`.${parent} > .${element.field}`) != null;
//     if (!hasItem) {
//       let div = document.createElement('div');
//       div.innerHTML = field.name;
//       div.classList.add(field.id);
//       div.classList.add(...element.className);
//       preview.querySelector(`.${parent}`).appendChild(div);
//     } else {
//       // Clear div and append new
//       preview.querySelector(`.${parent}`).innerHTML = '';
//       let div = document.createElement('div');
//       div.innerHTML = field.name;
//       div.classList.add(field.id);
//       div.classList.add(...element.className);
//       preview.querySelector(`.${parent}`).appendChild(div);
//     }
//   }
// }
// Iterate throught every field block and add fields
function createPreviewEl(element, parent) {
  // console.log(element);
  // console.log(document.querySelector(`#${element.field}`).parentNode);
  // console.log(parent);
  // Grabs information from fieldProps array to create elements matching on id
  let fieldInfo =
    fieldProps[fieldProps.findIndex((x) => x.id === element.field)];
  // console.log(fieldInfo);
  //     let newParentEl = document.createElement('div');
  //     newParentEl.classList.add(parent);
  //     preview.appendChild(newParentEl);
  let div = document.createElement('div');
  div.innerHTML = fieldInfo.name;
  div.classList.add(fieldInfo.id);
  div.classList.add(...element.className);
  parent.appendChild(div);
  let hasPrefix = element.prefix != undefined;
  let hasSuffix = element.suffix != undefined;
  if (hasPrefix) {
    let currText = div.innerText;
    // let prefSpan = document.createElement('span');
    // prefSpan.innerText = element.prefix;
    let prefSpan = `<span>${element.prefix}</span>`;
    div.innerHTML = prefSpan + currText;
  }
  if (hasSuffix) {
    let sufSpan = document.createElement('span');
    sufSpan.innerText = element.suffix;
    div.appendChild(sufSpan);
  }
}

// const labelList = {
//   'label-header': [],
//   'label-middle': [],
//   'label-footer': [],
// };

function isPrintStyle(className) {
  const functionalStyles = ['draggable', 'selected'];
  return !functionalStyles.includes(className);
}

// Add header and footer elements and format them (element is either head or foot)
// function refreshFixedEl(elementName) {
//   // Go through header area
//   // get element
//   let element = build.querySelector(`#label-${elementName} li`);
//   // console.log(element);
//   // get parent element
//   let parent = build.querySelector(`#label-${elementName}`);
//   // console.log(parent);
//   // call create element
//   // createPreviewEl(element, parent);
//   // refreshPreview();
//   // call update json
//   // later need to allow heading elements to be clicked and formatted
// }

// Everytime label section is updated, refresh entire preview
// Refactor to go only inside label-middle (eventually remove label-middle altogether)
function refreshPreview() {
  // let labelList = {};
  // labelList is an array of fieldBlocks
  let labelList = [];
  // console.log('---------------');
  // console.log(`build has ${build.querySelectorAll('.draggable').length} items`);
  // Go through every section in Label Middle
  // const sections = build.querySelectorAll('.container');
  // const sections = build.querySelectorAll('div');

  // Instead of sections, go through label-middle and gather fieldBlocks (lines)
  // itemsArr is an array of fields
  let fieldBlocks = document.querySelectorAll('#build-label .field-block');
  fieldBlocks.forEach((block) => {
    let itemsArr = [];
    // Get items per section
    let items = block.querySelectorAll('li');
    items.forEach((item) => {
      // console.log(item);
      let itemObj = {};
      let className = Array.from(item.classList).filter(isPrintStyle);
      itemObj.field = item.id;
      itemObj.className = className;
      itemObj.prefix = item.dataset.prefix;
      itemObj.suffix = item.dataset.suffix;
      itemsArr.push(itemObj);
    });

    labelList.push(itemsArr);
    // console.log(labelList);
  });

  // sections.forEach((section) => {
  // console.log(`now in section ${section.id}`);

  // let items = section.querySelectorAll('.draggable');
  // let items = section.querySelectorAll('li');
  // console.log(`${section.id} has ${items.length}`);

  // Builds array based on sections
  // labelList[section.id] = itemsArr;
  // });
  // console.log(labelList);

  // Clears preview div before appending elements
  preview.innerHTML = '';

  // // Creates HTML elements and appends to preview div
  // Object.keys(labelList).forEach((section) => {
  //   labelList[section].forEach((item) => {
  //     // createPreviewEl(item, section);
  //     createPreviewEl(item);
  //   });
  // });
  labelList.forEach((labelItem) => {
    // console.log(labelItem);
    // create fieldBlock div
    let fieldBlock = document.createElement('div');
    fieldBlock.classList.add('field-block');
    preview.appendChild(fieldBlock);
    // create elements inside fieldBlock
    labelItem.forEach((field) => {
      createPreviewEl(field, fieldBlock);
    });
    // createPreviewEl(fieldBlock);
  });

  generateJson(labelList);
}
// Generate JSON string for current configurations
function generateJson(list) {
  // console.log(labelList);
  // let json = JSON.stringify(labelList);
  // let labelFormat = {};
  // labelFormat.title = 'Label Format Title';
  // labelFormat.displaySpeciesAuthor = 0;
  // labelFormat.displayBarcode = 0;
  // labelFormat.labelType = '2';
  // labelFormat.defaultStyles = 'font-size:8pt';
  // labelFormat.defaultCss = '../../css/symb/labelhelpers.css';
  // labelFormat.customCss = '';
  // labelFormat.labelDiv = { className: 'label-md' };
  // labelFormat.labelBlocks = [labelList['label-header']];

  // "list" is an array of fields --> fieldBlock
  // place each "list" inside a fieldBlock
  // then place all fieldBlocks in an array

  // Each section in labelList should be translated into a
  // divBlock, where the className should include the id
  // let divBlocks = [];
  let labelBlocks = [];
  // Parse nested array
  Object.keys(list).forEach((index) => {
    // console.log(list[index]);
    // console.log(index);
    let fieldBlockObj = {};
    // Joins array of className items
    let fieldItem = list[index];
    fieldItem.map((prop) => {
      prop.className.length > 0
        ? (prop.className = prop.className.join(' '))
        : delete prop.className;
      console.log(prop.className);
    });

    fieldBlockObj.fieldBlock = fieldItem;
    labelBlocks.push(fieldBlockObj);
    console.log(fieldBlockObj);
    // let fields = [];
    // fields.push(list[index]);
  });
  console.dir(labelBlocks);

  // Object.keys(list).forEach((section) => {
  //   let hasItems = list[section].length > 0;
  //   if (hasItems) {
  //     let fieldBlock = {};
  //     let fields = [];
  //     divBlocks.push({
  //       // divBlock: { className: section, blocks: [fieldBlock] },
  //       divBlock: { blocks: [fieldBlock] },
  //     });
  //     // console.log(divBlocks);
  //     // console.log(section);
  //     list[section].forEach((item) => {
  //       // console.log(item);
  //       let field = {};
  //       field.field = item.field;
  //       item.className ? (field.className = item.className.join(' ')) : '';
  //       // console.log(field);
  //       item.prefix ? (field.prefix = item.prefix) : '';
  //       item.suffix ? (field.suffix = item.suffix) : '';
  //       fields.push(field);
  //       fieldBlock.fieldBlock = fields;
  //       // console.log(fields);
  //     });
  //   }
  // });
  // labelFormat.labelBlocks = divBlocks;
  // let json = JSON.stringify(labelFormat);
  // let json = JSON.stringify(divBlocks);
  let json = JSON.stringify(labelBlocks);
  console.log(json);
}

function toggleSelect(element) {
  // console.log('element ' + element.target);
  // console.log('is selected before? ' + element.classList.contains('selected'));
  element.classList.toggle('selected');
  // console.log('is selected now? ' + element.classList.contains('selected'));
  return element.classList.contains('selected');
}

// Activates formatting controls (for fields)
function activateControls(bool) {
  controls.forEach((control) => {
    bool ? (control.disabled = false) : (control.disabled = true);
  });
}

/**
 * Gets selected item state (formatted classes)
 * @param {*} item item to show applied formats
 */
function getState(item) {
  // console.log('item is selected: ' + item.classList.contains('selected'));
  let formatList = Array.from(item.classList);
  // console.log(item.id + ' has ' + formatList);
  // Removes '.draggable' and '.selected' from array
  formatList.splice(formatList.indexOf('selected'), 1);
  formatList.splice(formatList.indexOf('draggable'), 1);
  // console.log(item.id + ' has ' + formatList);
  // console.log(formatList.length);
  if (formatList.length > 0) {
    // let group = new RegExp(`${control.id}-*`);
    // let hasGroup = formatItem.className.split(' ').some(function (c) {
    //   return group.test(c);
    // });

    // Render state of each formatting button
    formatList.forEach((formatItem) => {
      // console.log('formatItem: ' + formatItem);
      // Check if class is a choice in a dropdown by matching first part of class
      let strArr = formatItem.split('-');
      let str = strArr[0];
      // Loop through each item in array
      dropdownsArr.forEach((dropdown) => {
        let isDropdownStyle = str === dropdown.id;
        // console.log(strArr[0]);
        // console.log(dropdowns.id);
        // console.log('is style in a dropdown? ' + isDropdownStyle);
        if (isDropdownStyle) {
          let selDropdown = document.getElementById(str);
          selDropdown.value = formatItem;
        }
      });
      // else if (fomatItem === dropdowns.id)
      controls.forEach((control) => {
        // Select that format and activate it
        if (formatItem === control.dataset.func) {
          control.classList.add('selected');
        }
        // else if (formatItem === control.value) {
        //   console.log('select');
        //   control.value = formatItem;
        // }
        // console.log(formatItem + ' is active');
      });
    });
  }
  // else {
  //   // controls.forEach((control) => {
  //   //   control.classList.remove('selected');
  //   // });
  // resetControls();
  // }

  // Get state of prefix/suffix for fields
  let hasPrefix = item.dataset.prefix != null;
  let prefixInput = document.getElementById('prefix');
  // console.log(hasPrefix);
  hasPrefix ? (prefixInput.value = item.dataset.prefix) : '';
  let hasSuffix = item.dataset.suffix != null;
  let suffixInput = document.getElementById('suffix');
  // console.log(hasPrefix);
  hasSuffix ? (suffixInput.value = item.dataset.suffix) : '';
}

/**
 * Applies selected control styles to selected items
 * @param {*} control id of style control (button or select)
 * @param {*} selectedItems array of items to be formatted (selected)
 * @param {*} bool if style will be added or removed, depends on state of control (important for buttons)
 */
function toggleStyle(control, selectedItems, bool) {
  // Toggles class in item - causes errors when multiple are selected
  // with conflicting styles...
  // formatItems.forEach((item) => {
  //   item.classList.toggle(control.dataset.func);
  //   // item.dataset.classes.toggle(control.dataset.func);
  // });
  // console.log(formatItems);
  // if (isSelected) {
  //   formatItems.forEach((item) => {
  //     item.classList.add(control.dataset.func);
  //     // console.log('added to classList: ' + control.dataset.func);
  //   });
  // } else {
  //   formatItems.forEach((item) => {
  //     item.classList.remove(control.dataset.func);
  //     // console.log('removed from classList: ' + control.dataset.func);
  //   });
  // }
  // make sure we're getting only selected items
  // console.log(selectedItems);
  selectedItems.forEach((item) => {
    // console.log(`item ${item.id} will be formatted? ${bool}`);
    // console.log(bool);
    // console.log(item);
    // Double-checking if item is selected
    if (item.classList.contains('selected')) {
      // console.log(
      //   `item ${item.id} is selected ${item.classList.contains('selected')}`
      // );

      // Deals with buttons

      // console.log('item ' + item.id + ' is selected');
      // if formatting button is selected, add class, else remove
      bool
        ? item.classList.add(control.dataset.func)
        : item.classList.remove(control.dataset.func);
      //
    } else {
      return false;
    }
    refreshPreview();
    // console.log('inside toggleStyle');
  });
}

/**
 * Applies selected dropdown styles to selected items
 * @param {*} dropdown id of dropdown
 * @param {*} selectedItems array of items to be formatted (selected)
 */
function addReplaceStyle(dropdown, selectedItems) {
  // Deals with selection
  // console.log('selected items ' + selectedItems);
  // console.dir(selectedItems);
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
            // item.classList.add('added-if-no-group');
            console.log(`added ${option} to ${item.id}`);
            // console.log(selectedItems);
          } else {
            // If yes, replace it
            item.classList.forEach((className) => {
              if (className.startsWith(dropdown.id)) {
                item.classList.remove(className);
              }
            });
            item.classList.add(option);
            // console.log('added-after-removing-group');
          }
        }
      }
    });
  });
  //
  // console.dir(selectedItems);
  refreshPreview();
}

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

function handleDragStart(e) {
  dragSrcEl = this;
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcEl != this) {
    this.parentNode.insertBefore(dragSrcEl, this);
  }
  // refreshPreview();
  return false;
}

function handleDragEnd(e) {
  // e.preventDefault();
  this.classList.remove('dragging');
  // refreshPreview(e.target.parentNode.id);
  refreshPreview();
  // console.log('inside handleDragEnd');
  // createPreviewEl(e.target.id, e.target.parentNode.id);
  return false;
}

// Event Listeners
let dragSrcEl = null;

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

// Elements in '#build-label' that are formattable
build.addEventListener('click', (e) => {
  if (e.target && e.target.matches('.draggable')) {
    // console.log(e.target.id);
    // getState(e.target);
    // formatMenu(e);
    let isSelected = toggleSelect(e.target);
    // Resets formatting buttons state when item is deselected
    !isSelected ? resetControls() : '';
    // console.log(isSelected);
    // When element is selected, activate formatting buttons
    // depends on number of elements in page (at least one selected).
    let anySelected = build.querySelectorAll('.selected').length > 0;
    activateControls(anySelected);
    let numSelected = build.querySelectorAll('.selected');
    // console.log(numSelected.length + ' items selected');
    // Gets formatting information for individually selected item
    if (numSelected.length > 1) {
      resetControls();
    } else if (numSelected.length == 1) {
      // console.log(numSelected.length);
      // Refreshes buttons according to applied styles in selected item
      let item = build.querySelector('.selected');
      getState(item);
    } else {
      return false;
    }
  }
});

// Formatting controls
controlDiv.addEventListener('click', (e) => {
  // Gets selected items to format
  let formatItems = build.querySelectorAll('li.selected');
  // console.log(formatItems);
  // if (e.target && e.target.matches('.control')) {
  //   // formatMenu(e);
  let isFormatSelected = toggleSelect(e.target);
  let isButton = e.target.tagName === 'BUTTON';
  let isDropdown = e.target.tagName === 'SELECT';
  // let isInput = e.target.tagName === 'INPUT';
  // console.log(e.target.tagName);
  // console.log(isButton, isDropdown);
  // Apply styles in item
  // console.log(
  //   'botão ' +
  //     e.target.dataset.func +
  //     ' e item selecionado ' +
  //     document.querySelector('.draggable.selected').id
  // );
  // Buttons
  if (isButton) {
    // console.log('is a buton');
    toggleStyle(e.target, formatItems, isFormatSelected);
  } else if (isDropdown) {
    // console.log('is a dropdown');
    addReplaceStyle(e.target, formatItems);
  }
});

// Field and Block options (prefix/suffix, delimiters)
// Listen to input changes
inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    let formatItem = build.querySelector('li.selected');
    updateInputVal(e.target, formatItem);
    // Needs to call refresh to pass values to labelList
    refreshPreview();
  });
});

// getState(e.target);
// }
// Get state of control for selected item(s)
// let itemHasStyles = getState(e.target).length > 0;
// console.log(itemHasStyles);

function updateInputVal(el, item) {
  let option = el.id;
  // console.log(option);
  // console.log(item);
  item.setAttribute('data-' + option, el.value);
}

//  On load
// refreshFixedEl('header');

// ************** TO DO ************
// - [x] Need to reset controls for when more than one item is selected
// - [x] Load state to controls depending on selected item styles
// - [x] Update preview styles
// - [x] Capture styles in object array
// - [x] Translate object array into JSON in the appropriate format
// - [] Add more format buttons
// --[x] Underline
// --[x] Uppercase
// --[] Font-type
// --[] Font-size
// --[] Spacing
// --[] Bar option?
