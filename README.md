<p align="center">
  <img src="public/praxe.svg?sanitize=true" alt="Praxe logo" width="100">
</p>
<p align="center">
  <a href="https://github.com/0x6A6471/praxe/actions/workflows/ci.yml"><img src="https://github.com/0x6A6471/praxe/actions/workflows/ci.yml/badge.svg" alt="CI status"></a> <a href="https://www.praxe.io"><img src="https://img.shields.io/badge/deployed-Cloudflare-F38020?logo=cloudflare&logoColor=white" alt="deployed Cloudflare"></a> <a href="https://biomejs.dev"><img src="https://img.shields.io/badge/code_style-biome-60a5fa.svg?logo=biome&logoColor=white" alt="code style: biome"></a>
</p>

# Praxe

Praxe is a user-friendly interface for Bitcoin transaction exploration and analysis.

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

## Acknowledgements
This project is inspired by and built upon great open-source tools:

### Bitcoin resources & libraries
- [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) for core Bitcoin functionality
- [Bitcoin Core Tech](https://bitcoincore.tech/apps/bitcoinjs-ui/index.html) for inspiration
- [BIP174](https://github.com/bitcoinjs/bip174) for PSBT specification

### Framework, design & UI
- [Bitcoin Design](https://bitcoin.design) for icons and design standards
- [Base UI](https://base-ui.com) for accessible component primitives
- [TanStack](https://tanstack.com) for Router and full-stack React utilities
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for build tooling

## Roadmap
- [x] PSBT parsing and analysis
- [ ] PSBT construction, signing, etc.
- [ ] Transaction support
- [ ] Payment support

