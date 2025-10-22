import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Register URI Handler
    const uriHandler = vscode.window.registerUriHandler({
        handleUri(uri: vscode.Uri) {
            
            // Parse URI parameters
            // Format: vscode://publisher.open-with-selection/open?file=/path/to/file&sl=10&sc=5&el=10&ec=20
            if (uri.path === '/open') {
                const query = new URLSearchParams(uri.query);
                const filePath = query.get('file');
                const startLine = parseInt(query.get('sl') || '0');
                const startColumn = parseInt(query.get('sc') || '0');
                const endLine = parseInt(query.get('el') || startLine.toString());
                const endColumn = parseInt(query.get('ec') || startColumn.toString());

                if (!filePath) {
                    vscode.window.showErrorMessage('No file path provided');
                    return;
                }

                // Open file and set selection
                openFileWithSelection(filePath, startLine, startColumn, endLine, endColumn);
            }
        }
    });

    // Register command (alternative method)
    const selectRangeCommand = vscode.commands.registerCommand(
        'open-with-selection.selectRange',
        (args: { file: string; startLine: number; startColumn: number; endLine: number; endColumn: number }) => {
            openFileWithSelection(args.file, args.startLine, args.startColumn, args.endLine, args.endColumn);
        }
    );

    context.subscriptions.push(uriHandler, selectRangeCommand);
}

async function openFileWithSelection(
    filePath: string,
    startLine: number,
    startColumn: number,
    endLine: number,
    endColumn: number
) {
    try {
        // VS Code uses 0-based indexing internally; clamp negatives just in case
        const start = new vscode.Position(
            Math.max(0, startLine - 1),
            Math.max(0, startColumn - 1)
        );
        const end = new vscode.Position(
            Math.max(0, endLine - 1),
            Math.max(0, endColumn - 1)
        );
        const selectionRange = new vscode.Range(
            start.isBeforeOrEqual(end) ? start : end,
            start.isBeforeOrEqual(end) ? end : start
        );

        // Let VS Code open the document directly from the URI so we avoid double-loading it
        const editor = await vscode.window.showTextDocument(vscode.Uri.file(filePath), {
            preview: false,
            selection: selectionRange
        });

        // Preserve the intended anchor/active ordering after the editor is ready
        editor.selection = new vscode.Selection(start, end);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`Failed to open file: ${message}`);
    }
}

export function deactivate() {}
