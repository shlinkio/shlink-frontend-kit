# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org).

## [1.0.1] - 2025-06-22
### Added
* *Nothing*

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* [#437](https://github.com/shlinkio/shlink-frontend-kit/issues/437) Drop support for React 18.

### Fixed
* Ensure `Menu.Item` has `type="button"` when rendered as a `button` tag.
* Fix closing of `Dropdown` menus when clicking away.


## [1.0.0] - 2025-06-17
### Added
* Add `brandColor()` and `brandColorAlpha()` functions, which resolve the right brand color depending on the active theme.

### Changed
* Used tailwind classes no longer expect the `tw` prefix.
* Generated tailwind styles no longer assume are set with important.

### Deprecated
* *Nothing*

### Removed
* Remove `/tailwind` entry point. All tailwind-based symbols are now exported from the main entry point.
* Remove dependencies in bootstrap, reactstrap and sass.
* Remove all symbols and signatures that were deprecated.
* Remove `MAIN_COLOR` and `MAIN_COLOR_ALPHA` constants. Use `brandColor()` and `brandColorAlpha()` instead.

### Fixed
* *Nothing*


## [0.9.13] - 2025-06-16
### Added
* *Nothing*

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* Improve accessibility in `NavBar` component.


## [0.9.12] - 2025-06-16
### Added
* Add tailwind-based `NavBar` component.

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.9.11] - 2025-06-14
### Added
* Add tailwind-based `TagsAutocomplete` component.

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.9.10] - 2025-06-11
### Added
* *Nothing*

### Changed
* Change 2xl breakpoint to 1320px.

### Deprecated
* Deprecated `determineOrder` and `determineOrderDir` when arguments are passed individually. The only supported signature going forward is the one where an `OrderDirChange` object is passed.

### Removed
* *Nothing*

### Fixed
* Fixes and adjustments to work when bootstrap styles are not present.


## [0.9.9] - 2025-06-10
### Added
* Add tailwind-based `Menu` component.
* Add tailwind-based `Dropdown` component.
* Add tailwind-based `OrderingDropdown` component.

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.9.8] - 2025-06-06
### Added
* Add tailwind-based `Tooltip` component.
* Forward refs to `Button`, `LinkButton` and `CloseButton` tailwind-based components.

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.9.7] - 2025-05-31
### Added
* *Nothing*

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* Remove children wrapper in cover modal.


## [0.9.6] - 2025-05-31
### Added
* Add `size` property to tailwind-based `Table` component.

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.9.5] - 2025-05-30
### Added
* *Nothing*

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* Allow `ref` to be passed to `Card` and its nested components.


## [0.9.4] - 2025-05-29
### Added
* Add `sticky-cell` tailwind utility.
* Wrap content of `CardModal` in `form`, so that it is possible to trigger confirm actions from inputs.

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.9.3] - 2025-05-09
### Added
* *Nothing*

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* Rollback change in links color, as it overrides too many other styles. Bootstrap color will have preference for now.


## [0.9.2] - 2025-05-09
### Added
* *Nothing*

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* Fix color set in links, to make sure it uses the right brand color for light and dark mode, and it does not get overwritten by bootstrap styles.


## [0.9.1] - 2025-05-08
### Added
* *Nothing*

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* Remove old SCSS-based theme, as everything is now defined in tailwind's preset.

### Fixed
* Fix `--brand-color` CSS var alias in dark mode.


## [0.9.0] - 2025-05-08
### Added
* Add tailwind-based `CopyToClipboardButton` component.
* Allow `CardModal`'s `title` to be any `ReactNode` not just a `string`.

### Changed
* Define accessible brand colors for light and dark mode.

  The one used for dark mode is the same previously used, but for light mode we use a slightly darker shade of blue that ensures proper color contrast.

  As a consequence, the `--color-brand` and `--color-brand-dark` CSS variables have been removed, and specific ones have been defined for light and dark modes.

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.8.13] - 2025-04-27
### Added
* Allow help text to be passed to labelled form control tailwind-based components.

### Changed
* Define bootstrap breakpoints in tailwind preset, so that migration can be done progressively.

### Deprecated
* Deprecate `LabeledFormGroup`.

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.8.12] - 2025-04-20
### Added
* *Nothing*

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* Add missing export for `Details` component.


## [0.8.11] - 2025-04-20
### Added
* Add default tailwind styles for `code` elements.
* Add tailwind-based `Details` component.

### Changed
* `useToggle` can now return its result as a tuple or as an object, with the former being deprecated.
* Change focus ring for secondary tailwind-based buttons, to match the button color.
* Add `cursor-pointer` to `Label` component.
* Add `cursor-[inherit]` to tailwind-based `Checkbox` and `ToggleSwitch` components.

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.8.10] - 2025-04-11
### Added
* *Nothing*

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* Ensure `DropdownBtn` and `OrderingDropdown` do not render the menu children while it's closed, for performance and accessibility reasons.


## [0.8.9] - 2025-04-09
### Added
* *Nothing*

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* Applied some accessibility fixes in `Listbox` and `SearchCombobox`, including
  * Add `autocomplete="off"` and `autocorrect="off"` to `SearchCombobox`.
  * Add `aria-activedescendant` attribute to `SearchCombobox`, indicating which is the active search result.
  * Prevent default on the`Listbox` anchor keypress, if keys are `Enter`, `ArrowUp` or `ArrowDown`.


## [0.8.8] - 2025-04-08
### Added
* Add `useGoBack` hook, which returns a stable callback that navigates one level back in the history.
* Add tailwind-based `Listbox` and `SearchCombobox` components.

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.8.7] - 2024-04-05
### Added
* *Nothing*

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* Add missing `type="button"` in `button` used to reveal password in `RevealablePasswordInput`.
* Make `Button`, `LinkButton` and `CloseButton` default their `type` to `'button'` instead of `undefined`.


## [0.8.6] - 2024-04-05
### Added
* Add tailwind-based `RevealablePasswordInput` component.

### Changed
* All tailwind-based form controls can now be forwarded a ref.
* Update dependencies

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.8.5] - 2025-04-03
### Added
* Add `onClosed` callback to `CardModal`, which is invoked when the close transition ends.
* Add `cancelText` to `CardModal`, which allows the cancel button text to be customized.

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* Fix transition management in modal, so that child element transitions with a different duration do not affect the transition handler.
* Fix `useTimeoutToggle` and `useTimeout` re-rendering too often due to setTimeout and clearTimeout test util references.


## [0.8.4] - 2025-04-03
### Added
* *Nothing*

### Changed
* Render `ModalDialog` in body element via portals.
* Consolidate hooks and export `useTimeout` from main entry point.

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.8.3] - 2025-04-01
### Added
* Add tailwind-based `Checkbox` component.
* Add tailwind-based `ToggleSwitch` component.
* Add tailwind-based `NavPills` component.
* Add open/close CSS transitions to `CardModal` tailwind-based component.
* Add tailwind-based `Result` component.
* Add tailwind-based `Message` component.

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
