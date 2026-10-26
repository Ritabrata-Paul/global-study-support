"""Create image-only, watermarked PDFs and web previews. No DOCX is published.

First convert private sample/*.docx with Word or LibreOffice into tmp/word-pdf/.
Run with Python 3, PyMuPDF, Pillow and ReportLab. Output PDFs stay local; only
watermarked WebP page renders and a non-sensitive manifest enter the website.
"""
from pathlib import Path
import io,json,re,secrets,hashlib,shutil
import pymupdf as fitz
from PIL import Image,ImageDraw,ImageFont

ROOT=Path(__file__).resolve().parents[1]
PDF_OUT=ROOT/'output'/'pdf'
WEB=ROOT/'public'/'previews'
QA=ROOT/'tmp'/'preview-qa'
for d in [PDF_OUT,WEB,QA]:d.mkdir(parents=True,exist_ok=True)
FONT=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',54)
SMALL=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',21)
SOURCE_MAP={
 'Excel_sample':'financial-accounting-report',
 'IT_ Machine-learning_Python':'python-sales-analysis-report',
 'IT_Autocad_Civil':'cultural-design-study',
 'IT_Digital_Forncics_Cybersecurityy':'digital-forensics-report',
 'IT_Revit_IT':'revit-bim-coordination-report',
 'Management 2':'talent-management-report',
 'Management':'sme-innovation-report',
}

def watermark(im,index,total):
 im=im.convert('RGBA')
 text='GLOBAL STUDY SUPPORT'
 layer=Image.new('RGBA',im.size,(255,255,255,0))
 stamp=Image.new('RGBA',(1100,120),(0,0,0,0))
 d=ImageDraw.Draw(stamp);d.text((24,20),text,font=FONT,fill=(20,43,73,46))
 stamp=stamp.rotate(29,expand=True,resample=Image.Resampling.BICUBIC)
 # Multiple baked-in marks survive ordinary cropping of a page corner.
 for y in range(-150,im.height+300,500):
  layer.alpha_composite(stamp,((im.width-stamp.width)//2,y))
 im=Image.alpha_composite(im,layer)
 d=ImageDraw.Draw(im)
 footer='GLOBAL STUDY SUPPORT  |  SAMPLE PREVIEW  |  '+str(index)+' / '+str(total)
 d.rectangle((0,im.height-47,im.width,im.height),fill=(255,255,255,240))
 d.text((32,im.height-35),footer,font=SMALL,fill=(20,43,73,255))
 return im.convert('RGB')

def redact_identifiers(doc):
 # Remove explicit identifier fields and contact emails from the viewing copy.
 # Metadata is stripped later; Word originals remain untouched.
 for page in doc:
  rects=[]
  data=page.get_text('dict')
  for block in data.get('blocks',[]):
   for line in block.get('lines',[]):
    text=''.join(s.get('text','') for s in line.get('spans',[]))
    if re.search(r'(?i)\b(student\s*(name|id|code|number)|candidate\s*(name|id)|roll\s*(no|number)|submitted\s*by)\s*:',text):
     r=fitz.Rect(line['bbox']);rects.append(fitz.Rect(r.x0-2,r.y0-1,r.x1+2,r.y1+2))
    for email in re.findall(r'[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}',text):rects.extend(page.search_for(email))
  for r in rects:page.add_redact_annot(r,fill=(1,1,1))
  if rects:page.apply_redactions()

manifest={}
sources=[]
for p in sorted((ROOT/'tmp'/'word-pdf').glob('*.pdf')):
 if p.stem in SOURCE_MAP:sources.append((SOURCE_MAP[p.stem],p,'owner-supplied'))
private_demo=ROOT/'private'/'reference-source'
private_demo.mkdir(parents=True,exist_ok=True)
public_samples=ROOT/'public'/'samples'
if public_samples.exists():
 for p in public_samples.iterdir():
  if p.is_file():shutil.move(str(p),str(private_demo/p.name))
for slug in ['python-data-analysis','cad-assembly-design','building-structural-model','financial-dashboard']:
 sources.append((slug,private_demo/(slug+'.pdf'),'demonstration'))

expected=set(SOURCE_MAP.values())
found={s[0] for s in sources}
if not expected.issubset(found):raise RuntimeError('Missing converted sources: '+str(expected-found))

for slug,source,kind in sources:
 original=fitz.open(source)
 redact_identifiers(original)
 pdf=fitz.open()
 target=WEB/slug;target.mkdir(parents=True,exist_ok=True)
 for i,page in enumerate(original):
  pix=page.get_pixmap(matrix=fitz.Matrix(1.8,1.8),alpha=False)
  im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
  marked=watermark(im,i+1,len(original))
  preview=marked.resize((900,round(marked.height*900/marked.width)),Image.Resampling.LANCZOS)
  preview.save(target/('page-'+str(i+1)+'.webp'),'WEBP',quality=50,method=6)
  # The PDF contains raster pages only; there is no selectable/OCR text layer.
  b=io.BytesIO();marked.save(b,format='JPEG',quality=88,optimize=True)
  new=pdf.new_page(width=page.rect.width,height=page.rect.height)
  new.insert_image(new.rect,stream=b.getvalue())
  if i==0 or i==len(original)-1:preview.save(QA/(slug+'-'+str(i+1)+'.png'))
 pdf.set_metadata({'title':'Global Study Support - Watermarked Sample Preview','author':'Global Study Support','subject':'Reference preview only'})
 destination=PDF_OUT/(slug+'-watermarked.pdf')
 pdf.save(destination,garbage=4,deflate=True,encryption=fitz.PDF_ENCRYPT_AES_256,owner_pw=secrets.token_urlsafe(24),user_pw='',permissions=0)
 check=fitz.open(destination)
 assert len(check)==len(original)
 assert all(not p.get_text().strip() for p in check)
 assert not (check.permissions & fitz.PDF_PERM_COPY)
 assert not (check.permissions & fitz.PDF_PERM_PRINT)
 manifest[slug]={'pages':len(original),'kind':kind,'width':900,'height':preview.height}
 print(slug+': '+str(len(original))+' watermarked pages',flush=True)
 (QA/(slug+'-source-hash.txt')).write_text(hashlib.sha256(source.read_bytes()).hexdigest())
 (ROOT/'lib'/'preview-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
 print('  PDF: image-only, copy and print permissions disabled',flush=True)
print('Generated '+str(len(manifest))+' protected viewing copies. Originals were not changed.')
