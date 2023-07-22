# LandMarked3D
LandMarked3D is an open source software application that simplifies the retrieval of geographic data and the generation of geographical maps and three-dimensional (3D) terrain models. It provides a user-friendly workflow for collecting satellite imagery and elevation data from the Google Maps API using coordinates. Users can define polygonal areas within a location to represent different layers and import foliage objects that can be customized using parametric equations. As the application evolves, it has the potential to incorporate terrain data from various sources and model different types of terrain for a wide range of applications.


# Table of Contents
1. [Development Setup](#development-setup)
1. [Roadmap](#roadmap)
1. [License](#license)


# Development Setup <a name="development-setup"></a>
## Required Installations
`Node.js` is not only bundled with the electron package, but it is used for developing the project as well.
Visit the official [Node.js website](https://nodejs.org) and follow the installation instructions for your operating system.

`Yarn (1.X)` is used as a package manager in place of `npm`. Visit the official [Yarn installation website](https://classic.yarnpkg.com/en/docs/install) and follow the installation instructions for your operating system.


## Configurations
The project uses a `.env` file to manage configuration settings. Please note that the `.env` file is not synced across devices. To configure the project locally:

1. Create a `.env` file in the root directory of the project.
1. Define the required environment variables in the `.env` file using the format variableName=value.
1. Replace the placeholder values with the actual values for your local environment.
1. Do not commit the `.env` file to version control by editing the `.gitignore` file.
1. The project will automatically load the environment variables from the `.env` file during runtime.

Current variables that are accessed from `.env` include:
> 
> **googleMapsAPI**: API key from Google Maps platform to request satellite imagery and elevation data.

Keep the .env file secure as it may contain sensitive information like API keys or database credentials.

# Roadmap <a name="roadmap"></a>

# License <a name="license"></a>
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 

The MIT License is a permissive open source license that allows reuse within proprietary software provided all copies of the licensed software include a copy of the MIT License terms. Such proprietary software retains its proprietary nature even though it incorporates MIT licensed software.

Some key aspects of the MIT License are:

- Permission is granted, free of charge, to reuse, modify, and distribute the software.

- The above copyright notice and license text must be included with copies or substantial portions of the software.

- The software is provided "as is", without warranty of any kind.

- The authors cannot be held liable for damages arising from use of the software.