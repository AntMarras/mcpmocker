# McpMocker - A MCP server for AI Development

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

- Developing AI agents that rely on tool calling

---

## License

MIT - Use this as inspiration for your own MCP servers 🙂
