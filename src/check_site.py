from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json
D=Path(__file__).resolve().parents[1]/'dist';errors=[];count=0
class Check(HTMLParser):
 def __init__(self,path):super().__init__();self.path=path;self.h1=0;self.title=False
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='h1':self.h1+=1
  if t=='title':self.title=True
  if t=='img' and 'alt' not in a:errors.append((str(self.path),'image has no alt'))
  for key in ('href','src'):
   v=a.get(key,'')
   if v.startswith('/'):
    u=unquote(urlsplit(v).path);target=D/u.lstrip('/')
    if target.is_dir():target=target/'index.html'
    if not target.exists():errors.append((str(self.path),'missing '+v))
for p in D.rglob('*.html'):
 c=Check(p);c.feed(p.read_text());count+=1
 if not c.title:errors.append((str(p),'missing title'))
 if 'http-equiv="refresh"' not in p.read_text() and c.h1!=1:errors.append((str(p),f'{c.h1} h1s'))
if errors:print(json.dumps(errors,indent=2));raise SystemExit(1)
print(f'PASS: {count} HTML pages; local destinations, titles, main headings and image alternatives')
