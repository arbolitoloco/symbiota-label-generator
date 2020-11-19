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
const control = document.getElementById('controls');
const preview = document.getElementById('preview-label');

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
// // Everytime label section is updated, refresh preview
// function refreshPreview(selector) {
//   // Go through section div and grab all ids
//   let children = document.querySelectorAll(`#${selector} li`);
//   // selectorArr = [];
//   childrenArr = [];
//   children.forEach((child) => {
//     childrenArr.push(child.id);
//   });
//   // selectorArr.push({ container: selector, children: childrenArr });
//   // console.log(selectorArr);
//   // return selectorArr;
//   // Forms ordered array with ids
//   labelList[selector] = childrenArr;
//   console.log(labelList);
//   // console.log(childrenArr);
//   // Clears div before refreshing
//   preview.innerHTML = '';
//   // Create ordered divs and append to preview
//   labelList[selector].forEach((labelItem) => {
//     // console.log(selector, labelItem);
//     createPreviewEl(labelItem, selector);
//   });
//   console.log('updated labelList');
// }
// Everytime label section is updated, refresh preview
function refreshPreview() {
  Object.keys(labelList).forEach((selector) => {
    // Go through section div and grab all ids
    let children = document.querySelectorAll(`#${selector} li`);
    // selectorArr = [];
    childrenArr = [];
    children.forEach((child) => {
      childrenArr.push(child.id);
    });
    // Forms ordered array with ids
    labelList[selector] = childrenArr;
    // console.log(childrenArr);
  });
  // Clears div before refreshing
  preview.innerHTML = '';
  // Create ordered divs and append to preview
  Object.keys(labelList).forEach((selector) => {
    labelList[selector].forEach((item) => {
      // console.log(item);
      createPreviewEl(item, selector);
    });
  });
  // console.log(labelList);
  // console.log('updated labelList');
}

function formatMenu(e) {
  // Activate formatting buttons only when item is selected
  let formats = controls.querySelectorAll('.control');
  e.target.classList.toggle('selected');
  // console.log(e.target);
  let isSelected = e.target.classList.contains('selected');
  // console.log(isSelected);
  // isSelected ? console.log(e.target.dataset.func) : '';
  let isItem = e.target.classList.contains('draggable');
  let isFormat = e.target.classList.contains('control');
  // Gets selected items and adds class
  let formatItems = build.querySelectorAll('.draggable.selected');
  // Only apply style to selected item
  if (isItem) {
    if (isSelected) {
      console.log('ready to format item ' + e.target.id);
      // console.log(formats);
      formats.forEach((format) => {
        format.disabled = false;
      });
    } else if (formatItems.length == 0) {
      console.log(isSelected);
      formats.forEach((format) => {
        format.disabled = true;
      });
    }
  }

  if (isFormat) {
    // console.log(formatItems);
    if (isSelected) {
      formatItems.forEach((item) => {
        item.classList.add(e.target.dataset.func);
        // console.log('added to classList: ' + e.target.dataset.func);
      });
    } else {
      formatItems.forEach((item) => {
        item.classList.remove(e.target.dataset.func);
        // console.log('removed from classList: ' + e.target.dataset.func);
      });
    }
  }
  return false;
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

var dragSrcEl = null;

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

build.addEventListener('click', (e) => {
  if (e.target && e.target.matches('.draggable')) {
    formatMenu(e);
  }
});

control.addEventListener('click', (e) => {
  if (e.target && e.target.matches('.control')) {
    formatMenu(e);
  }
});
// Selecting on preview-label
// preview.addEventListener('click', (e) => {
//   if (e.target && e.target.matches('div')) {
//     formatMenu(e);
//   }
// });

// Reorders vertically (block elements)
// function getDragAfterElement(container, y) {
//   const draggableElements = [
//     ...container.querySelectorAll('.draggable:not(.dragging)'),
//   ];

//   return draggableElements.reduce(
//     (nearest, child) => {
//       const boundingBox = child.getBoundingClientRect();
//       const offset = y - boundingBox.top - boundingBox.height / 2;
//       if (offset < 0 && offset > nearest.offset) {
//         return { offset: offset, element: child };
//       } else {
//         return nearest;
//       }
//     },
//     { offset: Number.NEGATIVE_INFINITY }
//   ).element;
// }
