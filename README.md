# FSCSS VS Code Extension

Official Visual Studio Code support for **FSCSS** (Figured Shorthand Cascading Style Sheets).

This extension improves the development experience when writing `.fscss` files by adding syntax highlighting, snippets, and automatic compilation.

---

## Features

**Syntax Highlighting**

Provides dedicated syntax highlighting for FSCSS files including:

- `@define`
- `@import`
- `@arr`
- `@use`
- built-in functions like `exec()`, `find()`, `join()`
- shorthand functions like `%2(...)`
- variables such as `$color`
- FSCSS method helpers like `.randint`, `.list`

CSS syntax is also supported automatically, so standard CSS rules still highlight correctly.

---

**Code Snippets**

Quickly generate common FSCSS structures.

**Example snippet triggers:**

Trigger| Expands To
`def`| `@define name(args){}`
`arr`| `@arr name[values]`
`imp`| `@import((module) from "path")`
`use`| `@use(selector){}`
`pct`| `%2(property,value)`

---

**FSCSS Compilation**

Compile FSCSS directly inside VS Code.

Command:

`FSCSS: Compile`

The extension will:

1. Read the current `.fscss` file
2. Use the installed FSCSS compiler
3. Generate CSS output

---

**Auto Compile on Save**

When a `.fscss` file is saved, the extension automatically generates a CSS file.

Example:

`style.fscss`

becomes

`style.css`

This allows FSCSS to integrate easily with normal HTML projects.

---

**Requirements**

You must install the FSCSS compiler.

Global install:

`npm install -g fscss`

Or install in your project:

`npm install fscss`

---

**Example**

Example FSCSS:
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

Compiled CSS:
```
.box{
  display:flex;
  justify-content:center;
  align-items:center;
}
```
---

**Extension Commands**

Command| Description
`FSCSS: Compile`| Compile the current FSCSS file

---

**File Support**

The extension activates automatically for:

`.fscss`

files.

---

About FSCSS

https://fscss.devtem.org

---
