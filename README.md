# Log Spam Filter

## Introduction

This repository contains the Log Spam Filter plugin. It removes `Connection timed out` errors from ARK Core 3.0 debug logs, which can become very spammy very quickly on networks with many nodes operating with their P2P port closed, e.g. when using the [Core Chameleon](https://github.com/alessiodf/core-chameleon) plugin.

The plugin requires no configuration after the initial installation.

## Installation

If you have installed ARK Core using the standard installation script, you can install the plugin with the following command:
```
yarn global add https://github.com/alessiodf/log-spam-filter
```

In the case of a Git-based installation or where ARK Core has been installed using another tool such as Core Control, enter the directory where ARK Core was installed and run:
```
yarn add -W https://github.com/alessiodf/log-spam-filter
```

Once the plugin is installed, we must activate it by modifying `app.json`. This file is found in `~/.config/ark-core/{mainnet|devnet|testnet|unitnet}/app.json` depending on network.

Add a new entry to the end of the `plugins` section within either the `relay` or `core` blocks, depending on whether you wish to use the separate relay/forger processes or the unified Core respectively. Of course, you can also add the plugin to both blocks if you wish to have the freedom to swap between the separate processes and the unified Core. Your entry or entries should look like the following:

```
    "relay": {
        "plugins": [
            ...
            {
                "package": "@alessiodf/log-spam-filter"
            }
        ]
    },
```

Or:

```
    "core": {
        "plugins": [
            ...
            {
                "package": "@alessiodf/log-spam-filter"
            }
        ]
    },
```
## Running

After installation, make sure the `app.json` file is correctly configured and restart Core. If you are using the CLI, this will probably be `ark core:restart` (or `ark relay:restart` if you wish to use the separate processes rather than the unified Core), although `ark` may be different in the case of bridgechains. If using Core Control, run `ccontrol restart relay`.

All `Connection timed out` messages should now be suppressed.

## Credits

-   [All Contributors](../../contributors)
-   [alessiodf](https://github.com/alessiodf)

## License

[GPLv3](LICENSE) © [alessiodf](https://github.com/alessiodf)

