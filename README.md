![banner](https://user-images.githubusercontent.com/20131841/175810666-031e4fe9-998f-450f-be04-e1da9583d0ab.png)

# ⚡ Mentor DAO (Beta)

**Boilerplate:**

- Application ([RainbowKit](https://www.rainbowkit.com/) + Tailwind + Next)
- Smart Contract ([Hardhat](https://hardhat.org/) + [Foundry](https://getfoundry.sh/))
- Zero-config TypeScript Modules: ([TSDX](https://tsdx.io/))


### Installation & Usage

```sh
git clone git@github.com:turbo-eth/turbo-eth.git
```

The `pnpm` package manager is **required** for node module management.

Please reference the `pnpm` [documentation](https://pnpm.io/) for installation instructions.

```sh
pnpm install
```

Packages use [direnv](https://direnv.net/) to manage environment variables. You'll likely need to install it.

```sh
cp .envrc.example .envrc
```

### Task Pipelines

Build flows are handled via tasks pipelines: schedule, execute, and cache.

Edit the `turbo.json` file in the root directory to define new [pieplines](https://turborepo.org/docs/core-concepts/pipelines)

**Start Building**

```sh
pnpm lab
```

The fastest way to start hacking is to run the `lab` task pipeline: starts local blockchain, creates frontend development server and watches for `packages` files for changes.

## Modules

The monorepo includes 3 primary folders

- [apps](https://github.com/turbo-eth/turbo-eth/tree/main/apps)
- [contracts](https://github.com/turbo-eth/turbo-eth/tree/main/contracts)
- [packages](https://github.com/turbo-eth/turbo-eth/tree/main/packages)

## Developer Experience

- [Turborepo](https://turborepo.org/docs)
- [pNPM](https://pnpm.io/)
- [TSDX](https://tsdx.io/)

<hr />

