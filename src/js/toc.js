// NOTE (SAVIZ):
// This JavaScript file builds a table of contents (TOC) from every heading
// (h1 to h6) that has an id, then uses Bootstrap's "ScrollSpy" to highlight the
// section currently being read.
//
// Rationale: Eleventy's "Id Attribute" plugin does not generate a TOC
// automatically.
// Community plugins exist, but many are not well maintained. Building this
// in-house is straightforward and gives more control over future changes.

// The amount of indentation applied to each nesting level, in "rem" units.
const INDENTATION_REM = 0.35;

// Helper function:
// Returns the numeric level of a heading element (e.g., 3 for an <h3>).
const levelOf = (heading) => Number(heading.tagName[1]);

export function buildToc() {
  // Collect the container element that the generated TOC links will be added
  // to.
  // This element is also passed to "ScrollSpy" as its target.
  const navigation = document.querySelector('#toc-nav');

  // Collect the element to search for headings.
  // Only headings inside this element are included, so headings elsewhere on
  // the page are never picked up.
  const content = document.querySelector('#article-content');

  // If either element is missing (unlikely), the script exits silently instead
  // of throwing an error.
  if (!navigation || !content) {
    return;
  }

  // Collect any heading from "h1" to "h6" that has an "id" attribute.
  const headings = [
    ...content.querySelectorAll(':is(h1, h2, h3, h4, h5, h6)[id]'),
  ];

  // If the article has no headings, hide the entire table of contents.
  if (!headings.length) {
    // Collect the element that contains the entire TOC so the whole section can
    // be hidden.
    const section = document.querySelector('#toc-section');

    if (section) {
      section.hidden = true;
    }

    return;
  }

  //  Indent relative to the shallowest heading used in the article.
  const topLevel = Math.min(...headings.map(levelOf));

  // NOTE (SAVIZ):
  // This section may change in the future, depending on how I decide to
  // structure and style the page.
  for (const heading of headings) {
    const listItem = document.createElement('li');
    listItem.className = 'nav-item';
    listItem.style.marginLeft = `${(levelOf(heading) - topLevel) * INDENTATION_REM}rem`;

    const link = document.createElement('a');
    link.className = 'nav-link';
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;

    listItem.append(link);

    navigation.append(listItem);
  }

  // Enable Bootstrap's "ScrollSpy" on the body. As the user scrolls, it adds
  // the "active" class to the TOC link that corresponds to the section
  // currently in view.
  if (window.bootstrap?.ScrollSpy) {
    new window.bootstrap.ScrollSpy(document.body, { target: navigation });
  }
}

buildToc();
