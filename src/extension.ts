import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Open with Selection extension activated');

    // Register URI Handler
    const uriHandler = vscode.window.registerUriHandler({
        handleUri(uri: vscode.Uri) {
            console.log('Received URI:', uri.toString());
            
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
        // VS Code uses 0-based indexing, but we receive 1-based
        const start = new vscode.Position(
            Math.max(0, startLine - 1),
            Math.max(0, startColumn - 1)
        );
        const end = new vscode.Position(
            Math.max(0, endLine - 1),
            Math.max(0, endColumn - 1)
        );

        // Open document
        const document = await vscode.workspace.openTextDocument(filePath);
        const editor = await vscode.window.showTextDocument(document);

        // Set selection
        editor.selection = new vscode.Selection(start, end);

        // Scroll to visible area
        editor.revealRange(
            new vscode.Range(start, end),
            vscode.TextEditorRevealType.InCenterIfOutsideViewport
        );

        console.log(`✅ Successfully opened file with selection: ${filePath} (${startLine}:${startColumn}) -> (${endLine}:${endColumn})`);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`Failed to open file: ${message}`);
        console.error('Failed to open file:', error);
    }
}

export function deactivate() {
    console.log('Open with Selection extension deactivated');
}
