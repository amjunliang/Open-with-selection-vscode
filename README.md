# Open with Selection

Open files in VS Code with precise text selection from external applications via URI protocol.

## Features

✅ **URI Protocol Handler** - Seamlessly integrate with external applications  
✅ **Precise Text Selection** - Open files at exact line and column positions  
✅ **Auto Scroll** - Automatically scroll to the selected region  
✅ **Zero Configuration** - Works out of the box, no server setup required  
✅ **Cross-Platform** - Compatible with macOS, Windows, and Linux  

## Installation

Install from the VS Code Marketplace:
1. Open VS Code
2. Go to Extensions (Cmd+Shift+X / Ctrl+Shift+X)
3. Search for "Open with Selection"
4. Click Install

## Usage

### URI Format

The extension registers a URI handler that accepts the following format:

```
vscode://PUBLISHER.open-with-selection/open?file=/path/to/file&sl=10&sc=5&el=10&ec=20
```

**Important**: Replace `PUBLISHER` with your actual publisher ID after publishing to the marketplace.

### Parameters

| Parameter | Description | Required |
|-----------|-------------|----------|
| `file` | Absolute path to the file | Yes |
| `sl` | Start line (1-based) | Yes |
| `sc` | Start column (1-based) | Yes |
| `el` | End line (1-based) | No (defaults to `sl`) |
| `ec` | End column (1-based) | No (defaults to `sc`) |

### Example

```bash
# macOS/Linux
open "vscode://PUBLISHER.open-with-selection/open?file=/path/to/file.txt&sl=10&sc=5&el=10&ec=20"

# Windows (PowerShell)
start "vscode://PUBLISHER.open-with-selection/open?file=C:/path/to/file.txt&sl=10&sc=5&el=10&ec=20"
```

This will open `file.txt` and select characters 5-20 on line 10.

## Integration Examples

### macOS (Swift)

```swift
let filePath = "/Users/username/project/file.swift"
let encodedPath = filePath.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? ""
let urlString = "vscode://PUBLISHER.open-with-selection/open?file=\(encodedPath)&sl=100&sc=10&el=100&ec=30"

if let url = URL(string: urlString) {
    NSWorkspace.shared.open(url)
}
```

### Node.js

```javascript
const { exec } = require('child_process');
const filePath = encodeURIComponent('/path/to/file.js');
const uri = `vscode://PUBLISHER.open-with-selection/open?file=${filePath}&sl=50&sc=1&el=55&ec=10`;
exec(`open "${uri}"`); // macOS
// exec(`start "${uri}"`); // Windows
// exec(`xdg-open "${uri}"`); // Linux
```

### Python

```python
import urllib.parse
import subprocess

file_path = urllib.parse.quote('/path/to/file.py')
uri = f'vscode://PUBLISHER.open-with-selection/open?file={file_path}&sl=20&sc=5&el=20&ec=15'
subprocess.run(['open', uri])  # macOS
# subprocess.run(['start', uri], shell=True)  # Windows
# subprocess.run(['xdg-open', uri])  # Linux
```

## Use Cases

- **IDE Integration**: Open files from Xcode, IntelliJ, or other IDEs with preserved selection
- **Build Tools**: Jump to specific lines from build output or test results
- **Documentation**: Create clickable links in documentation that open code with context
- **Code Review**: Link to specific code sections in review comments
- **Terminal Tools**: Integrate with CLI tools to open files at specific locations

## Notes

- **URL Encoding**: File paths must be URL-encoded
- **Line Numbers**: Use 1-based indexing (the extension converts to VS Code's 0-based internally)
- **Absolute Paths**: File paths must be absolute, not relative
- **VS Code Window**: Opens files in the most recently used VS Code window

## Development

To contribute or modify:

```bash
git clone <repository-url>
cd open-with-selection
npm install
npm run watch  # Watch mode
```

Press F5 in VS Code to launch the extension in debug mode.

## License

MIT

## Support

For issues and feature requests, please visit the [GitHub repository](https://github.com/YOUR_USERNAME/open-with-selection).
3. **权限**: 确保 VS Code 有权限访问指定的文件路径
