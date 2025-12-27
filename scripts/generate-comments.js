/**
 * generate-comments.js
 * Run with: node generate-comments.js
 * Output: ../data/comments.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMMENTS_FOR_POST = 10;

const commenters = [
  { name: 'Alice Brown', email: 'alice.brown@example.com' },
  { name: 'Mark Wilson', email: 'mark.wilson@example.com' },
  { name: 'Sofia Lee', email: 'sofia.lee@example.com' },
  { name: 'Daniel Stone', email: 'daniel.stone@example.com' },
  { name: 'Priya Nair', email: 'priya.nair@example.com' },
  { name: 'Tom Harris', email: 'tom.harris@example.com' },
  { name: 'Elena Petrova', email: 'elena.petrova@example.com' },
  { name: 'James Miller', email: 'james.miller@example.com' },
  { name: 'Nina Gomez', email: 'nina.gomez@example.com' },
  { name: 'Robert King', email: 'robert.king@example.com' },
];

// Large deterministic pool of mixed positive / neutral / negative feedback (thank you LLM!)
const bodies = [
  'This was clear and easy to understand.',
  'I found this explanation very helpful.',
  'Good point, I had not considered that.',
  'This matches my experience so far.',
  'Short and informative, thanks.',
  'The idea is good but needs more detail.',
  'I disagree with this approach.',
  'This part was confusing to me.',
  'Not sure this works as described.',
  'The explanation feels incomplete.',
  'I ran into issues following these steps.',
  'This could be improved with examples.',
  'I like the overall direction here.',
  'This feels a bit rushed.',
  'The concept makes sense, execution not so much.',
  'Helpful, but missing edge cases.',
  'I had a different result when trying this.',
  'This didn’t solve the problem for me.',
  'The wording could be clearer.',
  'I appreciate the honesty in this post.',
  'This seems outdated already.',
  'Good idea, poor implementation.',
  'I don’t fully agree with the conclusion.',
  'This was harder to follow than expected.',
  'Nice effort, but still confusing.',
  'This helped clarify a few things.',
  'I expected more depth here.',
  'Some points feel unnecessary.',
  'The feedback here is very useful.',
  'This raised more questions than answers.',
  'I found a bug while trying this.',
  'The logic is sound, but explanation lacks clarity.',
  'This could benefit from a step-by-step guide.',
  'I struggled to reproduce this result.',
  'Not very helpful in my case.',
  'This works well under certain conditions.',
  'I think this oversimplifies the issue.',
  'The example does not fully apply.',
  'Clear intent, unclear execution.',
  'I like the transparency here.',
];

const comments = [];
let id = 1;

for (let postId = 1; postId <= 100; postId++) {
  for (let i = 0; i < COMMENTS_FOR_POST; i++) {
    const commenter = commenters[i % commenters.length];
    const body = bodies[(postId * COMMENTS_FOR_POST + i) % bodies.length];

    comments.push({
      postId,
      id,
      name: commenter.name,
      email: commenter.email,
      body,
    });

    id++;
  }
}

// Ensure output directory exists
const outputDir = path.join(__dirname, '../data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'comments.json');
fs.writeFileSync(outputPath, JSON.stringify({ comments }, null, 2), 'utf-8');

console.log(`✅ Generated ${comments.length} comments`);
console.log(`📄 Saved to ${outputPath}`);
