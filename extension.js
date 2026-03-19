const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

/**
 * Runs the FSCSS CLI command directly.
 * This ensures @import and file pathing work exactly like the terminal.
 */
function runFscssCli(inputPath, outputPath, projectFolder) {
    return new Promise((resolve, reject) => {
        const command = `fscss "${inputPath}" "${outputPath}"`;

        exec(command, { 
            cwd: projectFolder, 
            shell: true // Crucial for finding global npm modules on Windows
        }, (error, stdout, stderr) => {
            if (error) {
                // If the CLI returns an error, then capture stderr
                reject(stderr || error.message);
            } else {
                resolve(stdout);
            }
        });
    });
}

async function activate(context) {
    
    // --- Command: Compile and Show Result ---
    const compileCommand = vscode.commands.registerCommand('fscss.compile', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        
        if (editor.document.languageId !== 'fscss'||editor.document.languageId !== 'xfscss') {
            vscode.window.showErrorMessage("This command only works with .fscss files.");
            return;
        }

        const inputPath = editor.document.uri.fsPath;
        const projectFolder = path.dirname(inputPath);
        // Create a output path for the preview
        const outputPath = inputPath.replace(/\.fscss$/, '.fscss.css');

        try {
            await runFscssCli(inputPath, outputPath, projectFolder);
            
            // Read the generated file to show it in the editor
            const cssContent = fs.readFileSync(outputPath, 'utf8');
            const doc = await vscode.workspace.openTextDocument({
                content: cssContent,
                language: 'css'
            });
            
            await vscode.window.showTextDocument(doc);
            
            // Clean up the temporary file if don't want it sticking around
            if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
            
        } catch (err) {
            vscode.window.showErrorMessage(`FSCSS Compile Error: ${err}`);
        }
    });
    
    // --- Event: Auto compile on save ---
    const saveListener = vscode.workspace.onDidSaveTextDocument(async (doc) => {
        if (doc.languageId !== 'fscss') return;
        
        const inputPath = doc.uri.fsPath;
        const projectFolder = path.dirname(inputPath);
        const outputPath = inputPath.replace(/\.fscss$/, '.fscss.css');

        try {
            await runFscssCli(inputPath, outputPath, projectFolder);
            vscode.window.setStatusBarMessage("FSCSS compiled via CLI ✔", 2000);
        } catch (err) {
            console.error("FSCSS CLI Auto-compile failed:", err);
            // Optional: Show a warning if it's a critical import error
            vscode.window.showWarningMessage("FSCSS Auto-compile failed. Check @import paths.");
        }
    });
    
    context.subscriptions.push(compileCommand, saveListener);
}

function deactivate() {}

module.exports = { activate, deactivate };

