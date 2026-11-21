"""Make a preview of the store that runs from plain files in any folder.

    PREVIEW_EXPORT=1 NEXT_PUBLIC_ASSET_BASE="" npx next build
    python3 scripts/preview-export.py out <folder>

Turns the export in out/ into a flat folder: every page beside index.html,
assets under assets/, all paths relative. Used for the claude.ai preview.
"""
import os, re, shutil, sys
src, dst = sys.argv[1], sys.argv[2]
shutil.rmtree(dst, ignore_errors=True); os.makedirs(dst)
shutil.copytree(os.path.join(src,'_next'), os.path.join(dst,'_next'))
shutil.copytree(os.path.join(src,'flags'), os.path.join(dst,'flags'))
pages={'v2.html':'home.html'}
for f in os.listdir(os.path.join(src,'v2')):
    if f.endswith('.html'): pages['v2/'+f]=f
NAV='''<script>
// Preview build: pages are flat files, so turn site paths into file names.
(() => {
  const toFile = (href) => {
    const url = new URL(href, 'https://site.invalid/');
    if (url.origin !== 'https://site.invalid') return null;
    const match = url.pathname.match(/^\\/v2(?:\\/([a-z0-9-]+))?\\/?$/);
    if (!match) return null;
    return (match[1] ? match[1] + '.html' : 'home.html') + url.hash;
  };
  window.addEventListener('click', (event) => {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
    const raw = link.getAttribute('href');
    if (raw.startsWith('#')) return;
    const file = toFile(raw);
    if (!file) return;
    event.preventDefault(); event.stopImmediatePropagation();
    const here = (location.pathname.split('/').pop() || 'home.html');
    const [name, hash] = file.split('#');
    if (name === here && hash) { location.hash = hash; return; }
    location.href = file;
  }, true);
})();
</script>'''
for rel,name in pages.items():
    html=open(os.path.join(src,rel)).read()
    html=html.replace('/_next/','_next/')
    html=html.replace('<head>','<head>'+NAV,1)
    open(os.path.join(dst,name),'w').write(html)
for root,_,files in os.walk(os.path.join(dst,'_next')):
    for f in files:
        p=os.path.join(root,f)
        if f.endswith('.css'):
            s=open(p).read(); s=s.replace('/_next/static/media/','../media/'); open(p,'w').write(s)
        elif f.endswith('.js'):
            s=open(p).read(); n=s.count('/_next/'); s=s.replace('"/_next/','"_next/'); open(p,'w').write(s)
            if n: print(f, n, 'refs', s.count('/_next/'),'left')
print(sorted(os.listdir(dst)))

# The entry page only forwards to the real home page, which must be served
# as a complete document of its own.
open(os.path.join(dst,'index.html'),'w').write("""<title>Peanut Allergy Cards</title>
<style>
  :root { --bg: #faeddf; --fg: #000000; }
  body { background: var(--bg); color: var(--fg); font: 18px/1.5 system-ui, sans-serif; }
  p { padding: 2rem max(16px, env(safe-area-inset-left, 0px)); }
  a { color: inherit; }
</style>
<p>Opening the store… <a href="home.html">Continue</a></p>
<script>location.replace('home.html' + location.hash);</script>
""")
# The host reserves top-level names starting with "_": serve assets from assets/.
os.rename(os.path.join(dst,'_next'), os.path.join(dst,'assets'))
for root,_,files in os.walk(dst):
    for f in files:
        if f.endswith(('.html','.js')):
            p=os.path.join(root,f); s=open(p).read()
            s=s.replace('_next/static/','assets/static/').replace('"_next/"','"assets/"').replace("'_next/'","'assets/'")
            if '_next/' in s: print('left in',f,sorted(set(re.findall(r'.{25}_next/.{20}',s)))[:3])
            open(p,'w').write(s)
# The host refuses a literal U+FFFD in files; inside JS strings and regexes
# the escape means the same thing.
for root,_,files in os.walk(dst):
    for f in files:
        if f.endswith(('.js','.html')):
            p=os.path.join(root,f); s=open(p,encoding='utf-8').read()
            if '�' in s:
                print('U+FFFD in',f,[s[i-12:i+6] for i in [m.start() for m in re.finditer('�',s)][:4]])
                open(p,'w',encoding='utf-8').write(s.replace('�','\\uFFFD'))
