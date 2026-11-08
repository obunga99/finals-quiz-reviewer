# Exam Reviewer Quiz

A static quiz site. Pick a subject, pick a style (Multiple Choice or Identification), and review.
No build step and no dependencies.

## Put it on GitHub Pages

1. Create a new repository on GitHub.
2. Upload everything in this folder so `index.html` sits at the top level of the repo.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose `main` and `/ (root)`, then **Save**.
5. After a minute, your site is live at `https://<your-username>.github.io/<repo-name>/`.

You can also double-click `index.html` to try it on your computer first.

## Files

```
index.html            page shell, lists which subject files to load
css/style.css         look and feel (light and dark mode)
js/app.js             quiz logic
data/
  art-appreciation.js
  sts.js
  dsa.js
  sipp.js
```

## Add or edit questions

Each subject is its own file in `data/`. Questions live inside topics:

```js
{ q: "Who wrote 'Why the Future Does Not Need Us'?",
  a: "Bill Joy",                              // correct answer (both styles)
  alt: ["Joy"],                               // optional: other accepted answers for Identification
  d: ["Bill Gates", "Ray Kurzweil", "Ted Kaczynski"] }  // 3+ wrong choices for Multiple Choice
```

- Add `only: "mc"` or `only: "id"` to limit a question to one style.
- Identification ignores capitalization, punctuation, accents and "the/a/an", and forgives small typos on longer text answers.
- Answers with numbers must match exactly.

## Add a new subject

1. Copy any file in `data/` and change the `id`, `title`, `description` and topics.
2. Add a `<script src="data/your-file.js"></script>` line in `index.html` above the `js/app.js` line.

## Note on Art Appreciation

Those questions were written from the topic names only, because no slides were provided.
Check them against your own notes. If you send the slides, they can be rebuilt from them.
