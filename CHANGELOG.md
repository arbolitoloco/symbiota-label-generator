# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

<!-- ## [v] - 2020-MM-DD
### Added
- - [PROJECTNAME-UUUU](http://tickets.projectname.com/browse/PROJECTNAME-UUUU)
  MINOR Fix module foo tests
### Changed
### Fixed -->

## [v2.3](https://github.com/arbolitoloco/symbiota-label-generator/releases/tag/v2.2) - 2021-03-18

## Added

- Button to add a bar above line.

### Changed

- Added position "none" for field in line.

### Fixed

- There was a bug where the default delimiter space couldn't be removed.
- The preview label sometimes would display the fields in weird positions when they were positioned in the line.

## [v2.2](https://github.com/arbolitoloco/symbiota-label-generator/releases/tag/v2.2) - 2021-02-02

### Added

- Formats labels to improve user readability
- This changelog.

### Fixed

- There was a bug where fields that were positioned at the right side of the line were not being placed in their correct position.

## [v2.1](https://github.com/arbolitoloco/symbiota-label-generator/releases/tag/v2.1) - 2021-01-21

### Added

- Workaround to divide single line in two columns: if one field has option set to "Position in Line: Right", visually the line will be divided in two sections, with the selected field floated to the right side of the line.

## [v2.0](https://github.com/arbolitoloco/symbiota-label-generator/releases/tag/v2.0) - 2021-01-20

### Added

- Ability to reorder lines
- Ability to delete lines
- Ability to delete fields
- JSON format loader with validator: you can now paste your existing definitions in the text area below the preview and click "Load JSON" to see the visual builder display your options. Caveat: only translates simplified definitions (like those created by this generator) that include only `fieldBlocks` (no custom `divBlocks` allowed for the moment)
- Font families integrated: replace "font-type" selector, with current web safe fonts installed:
  - Sans-Serif: Arial, Verdana, Helvetica, Tahoma, Trebuchet MS
  - Serif: Times New Roman, Georgia, Garamond
  - Monospace: Courier New
  - Cursive: Brush Script MT

### Changed

- Only one item can be selected/formatted at once
- List of currently available fields refreshes automatically
- Field names don't have whitespace in label preview (to allow for better visualization of where the actual spaces are defined)
- Delimiters are added by default between multiple fields (space)
- Some font-related classes changed names to allow for dynamic selecting
- Label builder area does not get styles applied to them anymore
- JSON export now adds a wrapper

### Fixed

- When multiple fields were selected, unusable inputs were still enabled for editing
- Delimiter state was not being passed to input when line was selected

## [v1.0](https://github.com/arbolitoloco/symbiota-label-generator/releases/tag/v1.0) - 2020-12-18

### Added

- Standalone front-end; to be integrated with Symbiota Framework.
- Generates JSON format for label content (doesn't include label header/footer or general label settings).

## [v0.2-beta](https://github.com/arbolitoloco/symbiota-label-generator/releases/tag/v0.2-beta) - 2020-12-02

### Added

- Adds option to select "Font-Family"

### Fixed

- Fixes "Font-Size" behavior.

## [v0.1-beta](https://github.com/arbolitoloco/symbiota-label-generator/releases/tag/v0.1-beta) - 2020-11-24

### Added

- Initial working prototype that uses static array to pull fields that can be dragged into set containers in label building area. Formatting is limited to "bold" and "italic" fonts. Each dragging and formatting event refreshes the label preview area and the set JSON format.
