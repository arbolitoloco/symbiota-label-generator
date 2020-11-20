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

const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');
const build = document.getElementById('build-label');
const controlDiv = document.getElementById('controls');
const preview = document.getElementById('preview-label');
const controls = controlDiv.querySelectorAll('.control');

// Refactor this so that elements are created based on array of elements
function createPreviewEl(element, parent) {
  // console.log(element);
  // console.log(parent);
  let field = fieldProps[fieldProps.findIndex((x) => x.id === element)];
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
    newParentEl.appendChild(div);
  } else {
    // Check if child already exists div
    let hasItem = preview.querySelector(`.${parent} > .${element}`) != null;
    if (!hasItem) {
      let div = document.createElement('div');
      div.innerHTML = field.name;
      div.classList.add(field.id);
      preview.querySelector(`.${parent}`).appendChild(div);
    } else {
      // Clear div and append new
      preview.querySelector(`.${parent}`).innerHTML = '';
      let div = document.createElement('div');
      div.innerHTML = field.name;
      div.classList.add(field.id);
      preview.querySelector(`.${parent}`).appendChild(div);
    }
  }
}

const labelList = {
  'label-header': [],
  'label-middle': [],
  'label-footer': [],
};
// Testing adding classes
const labelList2 = {
  'label-header': [],
  'label-middle': [],
  'label-footer': [],
};

// Everytime label section is updated, refresh preview
function refreshPreview() {
  Object.keys(labelList).forEach((selector) => {
    // Go through section div and grab all ids
    let children = document.querySelectorAll(`#${selector} li`);
    let hasChildren = children.length > 0;
    if (hasChildren) {
      // selectorArr = [];
      // childrenArr = [];
      childrenObj = {};
      children.forEach((child) => {
        // childrenArr.push(child.id);
        let classString = Array.from(child.classList).join(' ');
        childrenObj.field = child.id;
        childrenObj.classString = classString;
      });
      // Forms ordered array with ids
      // labelList[selector] = childrenArr;
      // childrenArr.push(childrenObj);
      // labelList2[selector].push(childrenArr);
      labelList2[selector].push(childrenObj);
      // console.log(childrenArr);
    }
  });
  console.log(labelList2);
  // Clears div before refreshing
  preview.innerHTML = '';
  // Create ordered divs and append to preview
  // Object.keys(labelList).forEach((selector) => {
  //   labelList[selector].forEach((item) => {
  //     // console.log(item);
  //     createPreviewEl(item, selector);
  //   });
  // });
  Object.keys(labelList2).forEach((section) => {
    labelList2[section].forEach((object) => {
      // createPreviewEl(item, selector);
      console.log(object.field, section);
      createPreviewEl(object.field, section);
    });
  });
  // console.log(labelList);
  // console.log('updated labelList');
}

function toggleSelect(element) {
  // console.log('element ' + element.target);
  // console.log('is selected before? ' + element.classList.contains('selected'));
  element.classList.toggle('selected');
  // console.log('is selected now? ' + element.classList.contains('selected'));
  return element.classList.contains('selected');
}

// Refactor this
// function formatMenu(e) {
//   // Activate formatting buttons only when item is selected
//   // console.log(e.target);
//   let isSelected = e.target.classList.contains('selected');
//   // console.log(isSelected);
//   // isSelected ? console.log(e.target.dataset.func) : '';
//   let isItem = e.target.classList.contains('draggable');
//   let isFormat = e.target.classList.contains('control');
//   // Gets selected items and adds class
//   let formatItems = build.querySelectorAll('.draggable.selected');
//   // If item is inside '#label-build' then toggle active
//   let inBuild = build.querySelectorAll('.draggable') != null;
//   // console.log('items in build area? ' + inBuild);
//   // e.target.classList.toggle('selected');
//   // Activates format buttons only when item is selected
//   if (isItem) {
//     if (isSelected) {
//       console.log('ready to format item ' + e.target.id);
//       // console.log(formats);
//       formats.forEach((format) => {
//         format.disabled = false;
//       });
//     } else if (formatItems.length == 0) {
//       // console.log(isSelected);
//       formats.forEach((format) => {
//         format.disabled = true;
//         // format.classList.remove('selected');
//       });
//     }
//   }
//   // If more than on item selected for formatting, reset controls state
//   if (formatItems.length > 1) {
//     console.log('several items selected');
//     formats.forEach((format) => {
//       format.classList.remove('selected');
//     });
//   } else if (formatItems.length == 1) {
//     // console.log('only one item selected');
//     // Show formats selected if any
//     formatItem = build.querySelector('.draggable.selected');
//     // console.log(item.classList);
//     formatList = Array.from(formatItem.classList);
//     // Removes '.draggable' and '.selected' from array
//     formatList.splice(formatList.indexOf('draggable'), 1);
//     formatList.splice(formatList.indexOf('selected'), 1);
//     // console.log(formatList);
//     // Applies remaining styles to state of formats
//     if (formatList.length >= 1) {
//       console.log('one or more formats applied');
//       console.log(formatList.length);
//       formatList.forEach((formatItem) => {
//         // console.log('formatItem: ' + formatItem);
//         formats.forEach((format) => {
//           // Select that format and activate it
//           if (formatItem === format.dataset.func) {
//             format.classList.add('selected');
//           }
//           // console.log(formatItem + ' is active');
//         });
//       });
//     } else {
//       formats.forEach((format) => {
//         format.classList.remove('selected');
//       });
//     }
//   }

//   if (isFormat) {
//     // console.log(formatItems);
//     if (isSelected) {
//       formatItems.forEach((item) => {
//         item.classList.add(e.target.dataset.func);
//         // console.log('added to classList: ' + e.target.dataset.func);
//       });
//     } else {
//       formatItems.forEach((item) => {
//         item.classList.remove(e.target.dataset.func);
//         // console.log('removed from classList: ' + e.target.dataset.func);
//       });
//     }
//   }
//   return false;
// }

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
function toggleStyle(control, bool) {
  // Gets selected items
  let formatItems = build.querySelectorAll('.draggable.selected');

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
  formatItems.forEach((item) => {
    // if formatting button is selected, add class, else remove
    bool
      ? item.classList.add(control.dataset.func)
      : item.classList.remove(control.dataset.func);
    //
    refreshPreview();
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
  return false;
}

function handleDragEnd(e) {
  this.classList.remove('dragging');
  // refreshPreview(e.target.parentNode.id);
  refreshPreview();
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
    const draggable = document.querySelector('.dragging');
    container.appendChild(draggable);
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
    let anySelected = build.querySelectorAll('.draggable.selected').length > 0;
    activateControls(anySelected);
    let numSelected = build.querySelectorAll('.draggable.selected');
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
  // if (e.target && e.target.matches('.control')) {
  //   // formatMenu(e);
  let isFormatSelected = toggleSelect(e.target);
  // Apply styles in item
  toggleStyle(e.target, isFormatSelected);

  // getState(e.target);
  // }
  // Get state of control for selected item(s)
  // let itemHasStyles = getState(e.target).length > 0;
  // console.log(itemHasStyles);
});

// ************** TO DO ************
// Need to reset controls for when more than one item is selected
// Load state to controls depending on selected item styles
// Update preview styles
// Capture styles in object array
// Translate object array into JSON in the appropriate format
