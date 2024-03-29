# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 0.2.0 - 2023-03-14
### Added
- Autoplay events
- Full screen events
- Game loading event
- Open Home event
- Not part of the library per se, but a test site is available in [./test-site](./test-site/) sub folder. Published using github pages on [https://valkyrie-fnd.github.io/valkyrie-event-adapter](https://valkyrie-fnd.github.io/valkyrie-event-adapter)

### Changed
- gameLoaded now sends `status: "done"`
- gameLoadError sends `reason` instead of `error`

## 0.1.0 - 2022-12-01
### Added
- Support more events on `ValkyrieWrapper`
- Listens to more events
- More extensive documentation
- Add unit tests

## 0.0.10 - 2022-11-23
### Added
- CommonJs build as well

### Changed
- remove tsconfig from distribution

## 0.0.9 - 2022-11-17
### Added
- Changelog
- Initial commit
- Github action
