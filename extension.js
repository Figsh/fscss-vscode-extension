const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * from the workspace node_modules
 * or the global environment.
 */
async function getFscssProcessor(doc) {
    try {
        // 1. node_modules (most reliable)
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(doc.uri);
        if (workspaceFolder) {
            const localPath = path.join(workspaceFolder.uri.fsPath, 'node_modules', 'fscss', 'lib', 'index.js');
            if (fs.existsSync(localPath)) {
                return await import(`file://${localPath}`);
            }
        }
        
        // 2. Fallback to standard import if not found in workspace
        return await import('fscss');
    } catch (e) {
        throw new Error("fscss module not found. Please run 'npm install fscss' in your project.");
    }
}

async function activate(context) {
    
    // --- Command: Compile to New Document ---
    const compileCommand = vscode.commands.registerCommand('fscss.compile', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        
        if (editor.document.languageId !== 'fscss') {
            vscode.window.showErrorMessage("This command only works with .fscss files.");
            return;
        }
        
        const text = editor.document.getText();
        
        try {
            const fscss = await getFscssProcessor(editor.document);
            
            // Note: Since it's a named export, we destructure or call directly
            const css = await fscss.processFscss(text);
            
            const doc = await vscode.workspace.openTextDocument({
                content: css,
                language: 'css'
            });
            
            await vscode.window.showTextDocument(doc);
            
        } catch (err) {
            vscode.window.showErrorMessage(err.message);
            console.error(err);
        }
    });
    
    // --- Event: Auto compile on save ---
    const saveListener = vscode.workspace.onDidSaveTextDocument(async (doc) => {
        if (doc.languageId !== 'fscss') return;
        
        try {
            const text = doc.getText();
            const fscss = await getFscssProcessor(doc);
            
            const css = await fscss.processFscss(text);
            const cssPath = doc.uri.fsPath.replace(/\.fscss$/, '.css');
            
            fs.writeFileSync(cssPath, css);
            vscode.window.setStatusBarMessage("FSCSS compiled ✔", 2000);
            
        } catch (err) {
            // We use a quieter warning for auto-save failures
            console.error("FSCSS Auto-compile failed:", err);
        }
    });
    
    context.subscriptions.push(compileCommand, saveListener);
}

function deactivate() {}

module.exports = { activate, deactivate };
