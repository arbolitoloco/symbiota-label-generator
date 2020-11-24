/**
 *  Symbiota Label Builder Functions
 *  Author: Laura Rocha Prado
 *  Version: 2020
 */

//  Temporary array with fields
const fieldProps = [
  { name: 'Label Heading', id: 'heading' },
  { name: 'Family', id: 'family' },
  { name: 'Scientific Name', id: 'speciesname' },
  { name: 'Catalog Number', id: 'catalognumber' },
  { name: 'Collector', id: 'recordedby' },
];

// Creates draggable elements
const fieldDiv = document.getElementById('fields');
fieldProps.forEach((field) => {
  let li = document.createElement('li');
  // let fieldElement = document.createElement('BUTTON');
  // fieldElement.innerHTML = field.name;
  li.innerHTML = field.name;
  li.id = field.id;
  li.draggable = 'true';
  li.classList.add('draggable');
  // li.appendChild(fieldElement);
  fieldDiv.appendChild(li);
});

// Temporary array for buttons
const formatsArr = [
  { func: 'font-bold', icon: 'B' },
  { func: 'italic', icon: 'I' },
  { func: 'underline', icon: 'U' },
  { func: 'uppercase', icon: 'Up' },
];

// Creates formatting controls in page
const controlDiv = document.getElementById('controls');
formatsArr.forEach((format) => {
  let btn = document.createElement('button');
  btn.classList.add('control');
  btn.disabled = true;
  btn.innerText = format.icon;
  btn.dataset.func = format.func;
  controlDiv.appendChild(btn);
});

// Grabs elements
const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');
const build = document.getElementById('build-label');
const preview = document.getElementById('preview-label');
const controls = controlDiv.querySelectorAll('.control');

// Refactor this so that elements are created based on array of elements
function createPreviewEl(element, parent) {
  // console.log(element);
  // console.log(element.field);
  // console.log(parent);
  let field = fieldProps[fieldProps.findIndex((x) => x.id === element.field)];
  // console.log(field);
  // Create parents first (if not available), then children inside
  let hasEl = preview.querySelector(`.${parent}`) != null;
  // console.log(hasEl);
  if (!hasEl) {
    let newParentEl = document.createElement('div');
    newParentEl.classList.add(parent);
    preview.appendChild(newParentEl);
    let div = document.createElement('div');
    div.innerHTML = field.name;
    div.classList.add(field.id);
    div.classList.add(...element.className);
    newParentEl.appendChild(div);
  } else {
    // Check if child already exists div
    let hasItem =
      preview.querySelector(`.${parent} > .${element.field}`) != null;
    if (!hasItem) {
      let div = document.createElement('div');
      div.innerHTML = field.name;
      div.classList.add(field.id);
      div.classList.add(...element.className);
      preview.querySelector(`.${parent}`).appendChild(div);
    } else {
      // Clear div and append new
      preview.querySelector(`.${parent}`).innerHTML = '';
      let div = document.createElement('div');
      div.innerHTML = field.name;
      div.classList.add(field.id);
      div.classList.add(...element.className);
      preview.querySelector(`.${parent}`).appendChild(div);
    }
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

// Everytime label section is updated, refresh entire preview
function refreshPreview() {
  let labelList = {};
  console.log('---------------');
  console.log(`build has ${build.querySelectorAll('.draggable').length} items`);
  // Go through every section
  const sections = build.querySelectorAll('.container');
  sections.forEach((section) => {
    console.log(`now in section ${section.id}`);

    // Get items per section
    let itemsArr = [];
    let items = section.querySelectorAll('.draggable');
    console.log(`${section.id} has ${items.length}`);
    items.forEach((item) => {
      let itemObj = {};
      let className = Array.from(item.classList).filter(isPrintStyle);
      itemObj.field = item.id;
      itemObj.className = className;
      itemsArr.push(itemObj);
    });

    // Builds array based on sections
    labelList[section.id] = itemsArr;
  });
  console.log(labelList);

  // Clears preview div before appending elements
  preview.innerHTML = '';

  // // Creates HTML elements and appends to preview div
  Object.keys(labelList).forEach((section) => {
    labelList[section].forEach((item) => {
      createPreviewEl(item, section);
    });
  });

  generateJson(labelList);
}
// Generate JSON string for current configurations
function generateJson(list) {
  // console.log(labelList);
  // let json = JSON.stringify(labelList);
  let labelFormat = {};
  labelFormat.name = 'Label Format Name';
  labelFormat.displaySpeciesAuthor = 0;
  labelFormat.displayBarcode = 0;
  labelFormat.columnCount = '2';
  labelFormat.defaultStyles = 'font-size:8pt';
  labelFormat.defaultCss = '../../css/symb/labelhelpers.css';
  labelFormat.customCss = '';
  labelFormat.labelDiv = { className: 'label-md' };
  // labelFormat.labelBlocks = [labelList['label-header']];
  // Each section in labelList should be translated into a
  // divBlock, where the className should include the id
  let divBlocks = [];
  Object.keys(list).forEach((section) => {
    let hasItems = list[section].length > 0;
    if (hasItems) {
      let fieldBlock = {};
      let fields = [];
      divBlocks.push({
        divBlock: { className: section, blocks: [fieldBlock] },
      });
      console.log(divBlocks);
      console.log(section);
      list[section].forEach((item) => {
        console.log(item);
        // console.log(item);
        let field = {};
        field.field = item.field;
        field.className = item.className.join(' ');
        // console.log(field);
        fields.push(field);
        fieldBlock.fieldBlock = fields;

        // console.log(fields);
      });
    }
  });
  labelFormat.labelBlocks = divBlocks;
  let json = JSON.stringify(labelFormat);
  console.log(json);
}

function toggleSelect(element) {
  // console.log('element ' + element.target);
  // console.log('is selected before? ' + element.classList.contains('selected'));
  element.classList.toggle('selected');
  // console.log('is selected now? ' + element.classList.contains('selected'));
  return element.classList.contains('selected');
}

// Activates formatting controls
function activateControls(bool) {
  controls.forEach((control) => {
    bool ? (control.disabled = false) : (control.disabled = true);
  });
}

// Gets selected item state (formatted classes)
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
    // Render state of each formatting button
    formatList.forEach((formatItem) => {
      // console.log('formatItem: ' + formatItem);
      controls.forEach((control) => {
        // Select that format and activate it
        if (formatItem === control.dataset.func) {
          control.classList.add('selected');
        }
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
}

// Applies styles
function toggleStyle(control, items, bool) {
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
  items.forEach((item) => {
    if (item.classList.contains('selected')) {
      // console.log('item ' + item.id + ' is selected');
      // if formatting button is selected, add class, else remove
      bool
        ? item.classList.add(control.dataset.func)
        : item.classList.remove(control.dataset.func);
      //
    }
    refreshPreview();
    // console.log('inside toggleStyle');
  });
}

function resetControls() {
  controls.forEach((control) => {
    control.classList.remove('selected');
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
  let formatItems = build.querySelectorAll('.selected');

  // if (e.target && e.target.matches('.control')) {
  //   // formatMenu(e);
  let isFormatSelected = toggleSelect(e.target);
  // Apply styles in item
  // console.log(
  //   'botão ' +
  //     e.target.dataset.func +
  //     ' e item selecionado ' +
  //     document.querySelector('.draggable.selected').id
  // );
  toggleStyle(e.target, formatItems, isFormatSelected);
  // getState(e.target);
  // }
  // Get state of control for selected item(s)
  // let itemHasStyles = getState(e.target).length > 0;
  // console.log(itemHasStyles);
});

// ************** TO DO ************
// - [x] Need to reset controls for when more than one item is selected
// - [x] Load state to controls depending on selected item styles
// - [x] Update preview styles
// - [x] Capture styles in object array
// - [x] Translate object array into JSON in the appropriate format
// - [] Add more format buttons
// --[] Underline?
// --[] Font-type
// --[] Font-size
// --[] Spacing
// --[] Bar option?
