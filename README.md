# Clarity-FE

Frontend for **Clarity**, an industrial-grade deck generator developed at **Swafinix Technologies** during an internship. Clarity automates professional presentation creation for industry users, streamlining the process from user intent to export-ready decks.

## Live Demo

Deployed URL: **[Click Here](https://clarityye.vercel.app/)**

## Features

- Automated deck generation with minimal user input
- Market research integration to enrich presentations
- AI-driven structuring for contextual slide outlines
- User query understanding and refinement
- Template and slide editing (preview, rearrange, customize)
- Export as PDF or PPTX
- Modular API integrations for extensibility
- Workflow automation support

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn-ui

## APIs & External Services

- **Gama**: Deck content generation engine for AI-created slides
- **Triva**: Market research and data feeds integration
- **Gemini**: Query understanding, prompt refinement, and deck structuring
- **n8n**: End-to-end workflow orchestration

## Directory Structure

```text
Clarity-FE/
├── public/             # Static assets, icons, and manifest
├── src/
│   ├── api/            # API and service integrators (Gama, Triva, Gemini, n8n)
│   ├── assets/         # Images, SVGs, logos
│   ├── components/     # Reusable React UI components
│   ├── pages/          # Route and view-level components
│   ├── styles/         # Tailwind and CSS config
│   ├── utils/          # Helpers and shared utilities
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Application entry file
├── index.html
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Install & Run

```sh
git clone https://github.com/prince7z/Clarity-FE.git
cd Clarity-FE
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Organization

Built at **Swafinix Technologies** as part of an engineering internship.

## License

Developed for Swafinix Technologies. License and usage rights may be subject to organization policies.

