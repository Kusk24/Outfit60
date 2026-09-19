/** Smooth-scrolls to the "How it works" band, leaving room for the sticky header. */
export function scrollToHow() {
  const el = document.getElementById("how");
  if (!el) return;
  // Sum offsets up the chain: while the page fades in, its <main> is transformed and becomes
  // the offsetParent, so el.offsetTop alone would be relative to <main>, not the document.
  let top = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) {
    top += node.offsetTop;
  }
  window.scrollTo({ top: top - 60, behavior: "smooth" });
}
