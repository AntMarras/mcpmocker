# McpMocker - A MCP server for AI Development

⚠️ Early development. This project is in an eary phase and under active development.

## Overview

**McpMocker** is a lightweight **Model Context Protocol (MCP) server** designed to help build, test, and experiment with AI tool integrations, inspired by [JSONPlaceholder](https://jsonplaceholder.typicode.com/) and [apimocker](https://apimocker.com/) projects.

---

## Implementation Rationale

### Token Efficiency

LLM tokens cost money, so McpMocker uses [TOON (Token-Oriented Object Notation)](https://github.com/toon-format/toon) to minimize token usage while remaining human-readable. This allows large datasets to be processed efficiently without sacrificing clarity.

### Deterministic Data Generation

[Data generation](docs/data.md) for large datasets (such as comments) is deterministic and reproducible, so all data is generated via script.

---

## Quick Start

```bash
git clone git@github.com:AntMarras/mcpmocker.git
cd mcpmocker
npm install
npm run build
npm run start -- stdio
```

The MCP server will start locally with stdio transport.

For Streamable HTTP transport (served by Express app) use `npm run start -- http` instead.

---

## Usage with stdio transport

The `docs/` folder contains [messages.jsonl](docs/messages.jsonl), a [JSONL](https://jsonlines.org/) file with example MCP messages.

You can:

* Copy individual lines from this file
* Paste them directly into your terminal
* Use them as standard input when manually interacting with the server over STDIO

This is useful for testing, debugging, or understanding the expected message formats.

### Running the Server with MCP Inspector

You can start the server using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which provides a convenient UI for interacting with MCP servers.
Run:
```bash
npm run inspector
```
Then configure the Inspector with the following settings:

* **Transport Type:** `STDIO`
* **Command:** `node`
* **Arguments:** `dist/index.js`

### Editor and Tooling Configuration

The repository includes example configuration files for common tools:

* `.vscode/` - Visual Studio Code configuration for connecting to the server
* `.gemini/` - configuration for Gemini-compatible tooling

---

## Not Intended for Production

This project is **not designed for production use**.

---

## Intended Use Cases

- Developing AI agents that rely on tool calling

---

## License

MIT - Use this as inspiration for your own MCP servers 🙂
