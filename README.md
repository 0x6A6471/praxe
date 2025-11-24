<p align="center">
  <img src="public/praxe.svg?sanitize=true" alt="Praxe logo" width="100">
</p>
<p align="center">
  [![CI status](https://github.com/0x6A6471/praxe/actions/workflows/ci.yml/badge.svg)](https://github.com/0x6A6471/praxe/actions/workflows/ci.yml)
  [![deployed Cloudflare](https://img.shields.io/badge/deployed-Cloudflare-F38020?logo=cloudflare&logoColor=white)](https://www.praxe.io)
  [![code style: biome](https://img.shields.io/badge/code_style-biome-60a5fa.svg?style=flat-square)](https://biomejs.dev)
</p>

# Praxe

Praxe is a user-friendly interface for Bitcoin transaction exploration and analysis. It provides a modern, intuitive way to inspect and understand Partially Signed Bitcoin Transactions (PSBTs) using [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) for core Bitcoin functionality.

Whether you're debugging transaction construction, verifying transaction details before signing, or learning how Bitcoin transactions work, Praxe makes it easy to explore every aspect of a PSBT in real-time.

> [!WARNING]
> Praxe is a work in progress.

## Getting started
### Installation
```
git clone https://github.com/0x6A6471/praxe.git
cd praxe
bun install
```

### Development
`bun run dev`

The application will be available at [http://localhost:5173](http://localhost:5173)

## Development scripts
- `bun run dev`: start development server
- `bun run build`: build for production
- `bun run test`: run test suite
- `bun run lint`: lint code with Biome
- `bun run format`: format code with Biome
- `bun run check`: run lint & format checks
- `bun run icongen`: generate type-safe icons from `public/sprite.svg`

## Acknowledgements
This project is inspired by and built upon great open-source tools:

### Bitcoin resources & libraries
- [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) for core Bitcoin functionality
- [Bitcoin Core Tech](https://bitcoincore.tech/apps/bitcoinjs-ui/index.html) for inspiration
- [BIP174](https://github.com/bitcoinjs/bip174) for PSBT specification

### Framework, design & UI
- [Bitcoin Design](https://bitcoin.design) for icons and design standards
- [Base UI](https://base-ui.com) for accessible component primitives
- [TanStack Start](https://tanstack.com/start) for Router and React utilities
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for build tooling

## Roadmap
- [x] PSBT parsing and analysis
- [ ] Raw transaction explorer
- [ ] Payment protocol support

