"""Render the original reservoir into a 1080p animated opening, without blur filters on the scene."""
from pathlib import Path
import sys, math, random
sys.path.insert(0,str(Path('work/python-libs').resolve()))
import av
from PIL import Image, ImageDraw, ImageFilter
asset=Path('outputs/LeakEvidence-Website/dist/assets')
src=Image.open('outputs/LeakEvidence-Brand-Kit/imagery/intro-reservoir-poster.png').convert('RGB')
w,h,fps,seconds=1920,1080,30,8
# Soft, irregular translucent mist layers; landscape and structures stay untouched.
def fog(seed):
 r=random.Random(seed);layer=Image.new('RGBA',(2400,420));d=ImageDraw.Draw(layer)
 for i in range(45):
  x=r.randrange(0,2400);y=r.randrange(120,260);rx=r.randrange(70,230);ry=r.randrange(12,48)
  d.ellipse((x-rx,y-ry,x+rx,y+ry),fill=(242,235,213,r.randrange(7,23)))
 return layer.filter(ImageFilter.GaussianBlur(22))
fog1,fog2=fog(36),fog(72)
out=av.open(str(asset/'intro-v2.mp4'),'w',options={'movflags':'+faststart'})
s=out.add_stream('libx264',rate=fps);s.width=w;s.height=h;s.pix_fmt='yuv420p';s.options={'crf':'17','preset':'medium'}
for i in range(fps*seconds):
 t=i/fps;p=t/seconds;e=(1-math.cos(p*math.pi))/2
 # A small dolly-out reveals the valley, without excessive enlargement.
 z=1.045-.035*e;sw,sh=src.size;cw=sw/z;ch=cw*h/w;cx=sw*.5;cy=sh*.5
 im=src.crop((cx-cw/2,cy-ch/2,cx+cw/2,cy+ch/2)).resize((w,h),Image.Resampling.LANCZOS).convert('RGBA')
 im.alpha_composite(fog1,(int(-310+160*p),285))
 im.alpha_composite(fog2,(int(-40-110*p),360))
 if i==0:im.convert('RGB').save(asset/'intro-v2-poster.webp',quality=95)
 frame=av.VideoFrame.from_image(im.convert('RGB'))
 for packet in s.encode(frame):out.mux(packet)
for packet in s.encode():out.mux(packet)
out.close()
print('Rendered 1920×1080 / 30fps / 8s, CRF17, original 1672×941 scene, animated mist and camera move')
