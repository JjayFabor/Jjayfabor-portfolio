---
title: "Cincinnati Hotel AI Concierge"
slug: "cincinnati-hotel-ai-concierge"
description: "A hotel chatbot that answers guests only from an uploaded PDF, emails staff when it can't, and streams live stats to an admin dashboard. All of it runs on one n8n workflow."
category: "Automation"
contextLabel: "Live demo · n8n + LLM automation"
status: "completed"
featured: false
date: "2026-10-25"
image: "projects/cincinnati-hotel.png"
screenshots:
  - "projects/cincinnati-hotel-n8n-ingest-chat.png"
  - "projects/cincinnati-hotel-n8n-handoff-stats.png"
  - "projects/cincinnati-hotel-chat.png"
  - "projects/cincinnati-hotel-landing.png"
link: "https://github.com/JjayFabor/cincinnati-hotel-ai-concierge"
preview: "https://cincinnati-hotel-ai-concierge.onrender.com/"
techStack: ["n8n", "OpenAI", "React", "Vite", "Node.js", "Express", "Server-Sent Events", "Gmail API", "Render"]
---

Cincinnati Hotel AI Concierge is a guest-facing chatbot that answers questions only from the hotel's uploaded information PDF. When the document doesn't have the answer, the bot says so instead of guessing. It then offers a contact form and emails the hotel team a summary of the conversation. Admins upload or replace the PDF and watch a statistics dashboard that updates in real time.

## How is it built?

All AI reasoning, storage and email live in a single n8n workflow. The workflow has four webhook pipelines (ingest, chat, contact hand-off and stats) plus a manual demo-reset trigger. This keeps the automation visible and testable on the n8n canvas. The Node.js/Express backend is deliberately thin. It validates input, rate-limits, keeps the n8n webhook secret away from the browser, serves the React app and turns n8n results into real-time pushes. Every webhook checks a shared `x-hotel-secret` header, so only the backend can call it.

## How does it answer from the PDF?

- **Ingest:** the backend checks the upload's size and `%PDF-` magic bytes. n8n then extracts the text, wipes the previous knowledge base (one active document at a time) and splits the text into roughly 1,400-character chunks with a 200-character overlap.
- **Retrieve:** small documents (under ~48k characters, typical for a hotel fact sheet) are passed to the model whole, so retrieval can't miss anything. Larger documents fall back to BM25 keyword ranking over the chunks.
- **Answer:** a strict prompt with a structured output parser returns `{ answer, answered, category }`. The model may use only facts stated in the document, resolves follow-ups from chat history, ignores prompt-injection attempts and sorts each question into one of 10 fixed topics.
- **Safety net:** a normalization step marks any apology as unanswered and maps unknown topics to General, so the dashboard numbers stay consistent.

## What happens when it can't answer?

The guest sees an apology and a "Leave my contact details" button. The form is validated in the browser and again on the server, then sent to n8n with the full transcript. n8n has the LLM write a short hand-off summary and builds an HTML email with the guest's details, the highlighted unanswered question and the transcript. It sends the email through Gmail with Reply-To set to the guest, and stores the lead for the dashboard.

## The live admin dashboard

The dashboard shows chat sessions, questions asked, answer rate, contact requests, questions per topic (answered vs. not in the document), 14-day activity and a live feed. After every chat, contact form or upload, the backend calls the stats pipeline and pushes the result to open dashboards over Server-Sent Events. Refreshes are coalesced (one request in flight plus one queued), so a burst of messages never floods n8n but the final state is always delivered. All state lives in n8n Data Tables, so the free Render instance can sleep without losing anything.

## What I learned

Treating "I don't know" as a first-class output made the bot trustworthy. With the `answered` flag enforced by both the schema and a normalization step, the chat UI, the hand-off email and the dashboard all agree on what counts as an answered question. Putting the logic in n8n rather than in application code made every run inspectable from the Executions tab, including the exact context and LLM output, which made prompt debugging much faster.
