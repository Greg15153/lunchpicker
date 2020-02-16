# About

This is a test project to learn new things

# Development

## [VS Code dev container](https://code.visualstudio.com/docs/remote/containers)

This project is setup to fully work from inside a docker container via VS Code. It is highly recommended to use this process in order to be fully setup instantly.

_Requirements_

-   [Docker](https://www.docker.com/get-started)
-   [VS Code](https://code.visualstudio.com/)
-   [VS Code Remote Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

Once installed, you should be able to open VS Code at the repository root and it will prompt you to open it in a container. If not you should be able to open the command panel (ctrl+shift p) and type `Remote Containers: Open folder in container` which will trigger the process.

# Gotchas

1. "Module not found"

This repository is using yarn 2.0 and its workspaces feature. Due to this node_modules are installed differently then before and some IDEs have issues figuring out where they are. This repository is already configured for VS Code. You can find more information here for other IDEs.

https://yarnpkg.com/advanced/editor-sdks
