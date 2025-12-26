# McpMocker - A MCP server for AI Development
## Overview

**McpMocker** is a lightweight **Model Context Protocol (MCP) server** designed to help build, test, and experiment with AI tool integrations, inspired by [JSONPlaceholder](https://jsonplaceholder.typicode.com/) and [apimocker](https://apimocker.com/) projects.

---

## Design Decisions

* LLM tokens cost money so McpMocker uses [TOON Token-Oriented Object Notation](https://github.com/toon-format/toon) format to minimize tokens and still be human-readable.

---

## Quick Start

```bash
git clone git@github.com:AntMarras/mcpmocker.git
cd mcpmocker
npm install
npm run build
npm run start
```

The MCP server will start locally with stdio transport.

---

## Usage with stdio transport
The `docs/` folder contains [messages.jsonl](docs/messages.jsonl), a [JSONL](https://jsonlines.org/) file with example messages. These can be copy/pasted into your console as standard input for manual server interaction via stdio transport.

---

## Not Intended for Production

This project is **not designed for production use**.

---

## Intended Use Cases

* Developing AI agents that rely on tool calling

---

## License

MIT - Use this as inspiration for your own MCP servers 🙂