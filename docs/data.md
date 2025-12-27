## Generating Mock Data

### Generate Comments

To generate mock **comments**, run the following command:

```bash
node scripts/generate-comments.js
```

* The comments are generated in a deterministic way
  (running the script multiple times produces the same output).
* The generated file is saved to:

```
data/comments.json
```

---

## Encoding JSON with Toon

To encode the generated JSON using **Toon**, run:

```bash
npx @toon-format/cli data/comments.json -o data/comments.toon
```

This will convert the JSON file into TOON format.

---

## Visualizing Statistics

To visualize statistics for the generated data, run:

```bash
npx @toon-format/cli data/comments.json --stats
```

This command outputs statistics about the estimated and saved tokens.

