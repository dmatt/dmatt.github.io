dmatt.github.io
===============

My site and blog built using GitHub Pages.

## Building locally

1. Install Bundler if you haven't already:
   
   ```bash
   gem install bundler
   ```

2. Install the project's gems:

   ```bash
   bundle install --path vendor/bundle
   ```

3. Build the site:

   ```bash
   ./bin/jekyll build
   ```

If the `jekyll` command is still reported as missing, you can invoke the
bundled wrapper directly:

```bash
./bin/jekyll build
```

This wrapper will prompt you to run `bundle install` if the gem has not been
installed yet.
