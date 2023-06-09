// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "pf-generated-string" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('pgs', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
		  const selection = editor.selection;
		  const selectedText = editor.document.getText(selection);
	
		  vscode.window.showInputBox({ prompt: '请输入重复字符串和次数（例如：#*10）' }).then((input) => {
			if (input) {
			  const parts = input.split('*');
			  if (parts.length === 2) {
				const char = parts[0].trim();
				const count = parseInt(parts[1].trim());
	
				if (isNaN(count)) {
				  vscode.window.showErrorMessage('请输入有效的重复次数。');
				  return;
				}
	
				const repeatedText = char.repeat(count);
	
				editor.edit((editBuilder) => {
				  editBuilder.replace(selection, repeatedText + selectedText);
				});
			  } else {
				vscode.window.showErrorMessage('输入的格式无效。请输入正确的格式（例如：#*10）。');
			  }
			}
		  });
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
