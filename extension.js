const vscode = require('vscode');
const fs = require('fs');

async function activate(context) {
    
    // Compile command
    const compileCommand = vscode.commands.registerCommand('fscss.compile', async () => {
        
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        
        if (editor.document.languageId !== 'fscss') {
            vscode.window.showErrorMessage("This command only works with .fscss files.");
            return;
        }
        
        const text = editor.document.getText();
        
        try {
            
            const fscssPath = require.resolve('fscss');
            const fscss = require(fscssPath);
            
            const css = await fscss.processFscss(text);
            
            const doc = await vscode.workspace.openTextDocument({
                content: css,
                language: 'css'
            });
            
            vscode.window.showTextDocument(doc);
            
        } catch (err) {
            
            vscode.window.showErrorMessage(
                "fscss not found! Run: npm install -g fscss"
            );
            
            console.error(err);
        }
    });
    
    context.subscriptions.push(compileCommand);
    
    // Auto compile on save
    const saveListener = vscode.workspace.onDidSaveTextDocument(async (doc) => {
        
        if (doc.languageId !== 'fscss') return;
        
        try {
            
            const text = doc.getText();
            
            const fscssPath = require.resolve('fscss');
            const fscss = require(fscssPath);
            
            const css = await fscss.processFscss(text);
            
            const cssPath = doc.uri.fsPath.replace(/\.fscss$/, '.css');
            
            fs.writeFileSync(cssPath, css);
            
            vscode.window.setStatusBarMessage("FSCSS compiled ✔", 2000);
            
        } catch (err) {
            
            vscode.window.showErrorMessage(
                "FSCSS compile failed. Make sure fscss is installed."
            );
            
            console.error(err);
        }
        
    });
    
    context.subscriptions.push(saveListener);
}

function deactivate() {}

module.exports = { activate, deactivate };


