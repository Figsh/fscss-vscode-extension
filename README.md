# FSCSS VS Code Extension

Official Visual Studio Code support for **FSCSS (Figured Shorthand Cascading Style Sheets)**.

This extension brings a powerful developer experience for writing `.fscss` with syntax highlighting, advanced snippets, and compilation support.

---

# Features

## Syntax Highlighting

**Full FSCSS-aware highlighting including:**

- `@define`, `@fun`, `@obj`
- `@import`, `@use`
- `@arr`, `@event`
- Built-in functions like `exec()`, `num()`, `rpt()`, `copy()`
- Shorthand helpers like `%2(...)`
- Variables like `$color`
- Method helpers like `.randint`, `.list`, `.join`

> Works alongside standard CSS — no conflicts.

---

## Advanced Code Snippets

Write FSCSS faster than ever using powerful snippets.

Core Snippets

Trigger| Description
`def`| Create `@define` function
`defc`| Call defined function
`fun`| Create `@fun` block
`obj`| Create `@obj` style object
`use`| Use selector inside define

---

Imports

Trigger| Description
`imp`| Import module
`impm`| Multi import
`impa`| Alias import
`impw`| Import all (`*`)
`impr`| Import from URL

---

Variables & Strings

Trigger| Description
`var`| Declare variable
`varu`| Use variable
`str`| Create string prompt
`stru`| Use string variable

---

Arrays & Randomization

Trigger| Description
`arr`| Create array
`arrl`| Loop through array
`arrr`| Random per element
`arrri`| Global random
`ajon`| Join array
`arls`| Output list
`rand`| Inline random
`randa`| Random from array

---

Utilities & Logic

Trigger| Description
`num`| Math evaluation
`cou`| Number range
`rpt`| Repeat values
`cpy`| Copy value
`ext`| Extract string
`even`| Conditional logic (`@event`)

---

Animation & Selectors

Trigger| Description
`key`| Keyframes (single selector)
`keym`| Keyframes (multi selector)
`attr`| Attribute selector

---

Debugging

Trigger| Description
`exe`| Console log
`exew`| Console warn

---

## FSCSS Compilation

**Compile FSCSS directly inside VS Code.**

Command:

`FSCSS: Compile`

**This will:**

1. Read the current `.fscss` file
2. Run the FSCSS compiler
3. Output CSS

---

##  Auto Compile on Save

When you save a `.fscss` file:

style.fscss → style.css

Perfect for real-time development.

---

##  Requirements

**Install FSCSS compiler:**

Global

`npm install -g fscss`

Project

`npm install fscss`

---

## Example

FSCSS
```
@define center(elem){
  @use(elem){
    display:flex;
    justify-content:center;
    align-items:center;
  }
}

@center(.box)
```
Output CSS
```
.box{
  display:flex;
  justify-content:center;
  align-items:center;
}
```
---

## 📂 Supported Files

- `.fscss`
- `.xfscss`

---

## 🛠 Commands

Command| Description
"FSCSS: Compile"| Compile current file

---

## About FSCSS

Learn more:

https://fscss.devtem.org

---

##  Roadmap

Planned improvements:

- IntelliSense (auto-complete FSCSS methods)
- Error diagnostics
- Live preview
- Inline compiler feedback
- Performance optimizations

---

## Contributing

Feel free to contribute, suggest features, or report issues.

GitHub:
https://github.com/Figsh/fscss-vscode-extension

---

## ❤️ Support

If you like FSCSS, consider:

- Starring the repo
- Sharing the extension
- Writing about it

---

**Happy coding with FSCSS**
