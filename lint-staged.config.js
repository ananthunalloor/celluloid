// lint-staged only ever runs against staged files, so these globs need the
// leading **/ to match anywhere in the repo, not just the root.
const path = require('node:path');

module.exports = {
  '**/*.{ts,tsx,js,jsx,mjs,cjs}': ['oxlint --fix', 'oxfmt --write'],
  '**/*.json': ['oxfmt --write'],

  // ruff needs to run from apps/backend (that's where pyproject.toml and
  // the .venv live), but the staged file paths lint-staged hands us are
  // relative to the repo root — rewrite them before building the command.
  //
  // pyrefly, unlike ruff, isn't run per-file: a type checker needs the
  // whole project's types in view to check even one file correctly (it
  // has to resolve what every import actually is), so it runs against the
  // whole backend every time any .py file is staged, using the
  // [tool.pyrefly] project-includes already set in pyproject.toml.
  'apps/backend/**/*.py': (filenames) => {
    const relative = filenames.map((f) => path.relative('apps/backend', f));
    return [
      `uv --directory apps/backend run ruff check --fix ${relative.join(' ')}`,
      `uv --directory apps/backend run ruff format ${relative.join(' ')}`,
      `uv --directory apps/backend run pyrefly check`,
    ];
  },
};
