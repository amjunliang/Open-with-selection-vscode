# Changelog

All notable changes to the "Open with Selection" extension will be documented in this file.

## [0.1.0] - 2025-01-17

### Added
- Initial release
- URI protocol handler for opening files with text selection
- Support for precise line and column positioning
- Automatic scrolling to selected region
- Cross-platform support (macOS, Windows, Linux)
- 1-based to 0-based index conversion

### Features
- Register URI handler: `vscode://publisher.open-with-selection/open`
- Parameters: `file`, `sl`, `sc`, `el`, `ec`
- Command: `open-with-selection.selectRange` for programmatic use
