# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org).

## [Unreleased]
### Added
* Add tailwind-based `Checkbox` component.
* Add tailwind-based `ToggleSwitch` component.
* Add tailwind-based `NavPills` component.
* Add open/close CSS transitions to `CardModal` tailwind-based component.

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.8.2] - 2025-03-27
### Added
* *Nothing*

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* Add missing `CardModal` export in the `tailwind` entry point.


## [0.8.1] - 2025-03-27
### Added
* *Nothing*

### Changed
* Adjustments on existing tailwind-based components 

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.8.0] - 2025-03-26
### Added
* [#394](https://github.com/shlinkio/shlink-frontend-kit/issues/394) Add first tailwind-based components
* [#298](https://github.com/shlinkio/shlink-frontend-kit/issues/298) Add `@shlinkio/shlink-frontend-kit/tailwind` entry point to load tailwind-based components

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.7.3] - 2025-03-07
### Added
* Add new `determineOrder` helper function, which works like `determineOrderDir`, but returns the full `Order` object, rather than just the new dir.

### Changed
* Add `eslint-plugin-react-compiler`.

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.7.2] - 2025-01-27
### Added
* *Nothing*

### Changed
* Replace sass `@import`s with `@use`.
* Update dependencies.

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.7.1] - 2025-01-01
### Added
* Add support for React 19

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.7.0] - 2024-12-05
### Added
* *Nothing*

### Changed
* Update to react-router 7.

### Deprecated
* *Nothing*

### Removed
* Remove support for react-router 6.

### Fixed
* *Nothing*


## [0.6.0] - 2024-10-19
### Added
* *Nothing*

### Changed
* [#298](https://github.com/shlinkio/shlink-frontend-kit/issues/298) Publish package as ES module only.

### Deprecated
* *Nothing*

### Removed
* Removed deprecated `useDomId`, `parseQuery` and `stringifyQuery`.

### Fixed
* *Nothing*


## [0.5.3] - 2024-10-02
### Added
* *Nothing*

### Changed
* Drop dependency on `uuid`.

### Deprecated
* The `useDomId` hook is now deprecated. Use `useId` instead.

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.5.2] - 2024-07-22
### Added
* *Nothing*

### Changed
* Update to `@shlinkio/eslint-config-js-coding-standard` 3.0, and migrate to ESLint flat config.
* Drop dependency on `qs` and provide own query handling implementations.

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.5.1] - 2024-04-16
### Added
* *Nothing*

### Changed
* Update JS coding standard

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* Make sure dependencies are not bundled with the dist package.


## [0.5.0] - 2024-03-17
### Added
* Add theme overwrite styles for `.form-select`.
* Add `.btn-sm-block` utility class to make a button be displayed as block in small resolutions.
* Bring some styles from shlink-web-component.

### Changed
* Update dependencies

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.4.2] - 2024-01-20
### Added
* *Nothing*

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* Fix specificity for CSS selector to set color on active outline primary buttons


## [0.4.1] - 2023-12-15
### Added
* Add `useParsedQuery` hook
* Add `getSystemPreferredTheme` helper function

### Changed
* Replace `classnames` package with `clsx`
* Update to vitest 1.0

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.4.0] - 2023-09-24
### Added
* [#45](https://github.com/shlinkio/shlink-frontend-kit/issues/45) Add a11y tests with axe-core.

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.3.0] - 2023-09-05
### Added
* Add `useToggleTimeout` hook.

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.2.1] - 2023-09-02
### Added
* *Nothing*

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* Wrap callbacks returned by `useToggle` in `useCallback`, to avoid unnecessary re-renders.


## [0.2.0] - 2023-08-11
### Added
* [#5](https://github.com/shlinkio/shlink-frontend-kit/issues/5) Add dev sandbox where components can be tested.

### Changed
* [#6](https://github.com/shlinkio/shlink-frontend-kit/issues/6) Increase code coverage.

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.1.2] - 2023-08-10
### Added
* *Nothing*

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* Make sure all SCSS stylesheets are bundled.


## [0.1.1] - 2023-08-10
### Added
* *Nothing*

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* Make sure `base.scss` file is included in bundled package.


## [0.1.0] - 2023-08-10
### Added
* First release

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*
