from PIL import Image, ImageChops
import os

files = [
    'bdnews24.png',
    'channel24.png',
    'samakal.png',
    'janakantha.jpg',
    'banglavision.jpg',
    'risingbd.png',
    'step_footwear.jpg',
    'roma_tiles.png',
    'jatra.png',
    'jatra_biroti.jpg',
    'lucky_idea.png',
    'itn_buet.png',
    'sanirepo.png',
    'dhaka_university_mca.png',
    'hrc_shipping.png',
    'angel_group.png'
]

dest_dir = 'assets/clients'

for f in files:
    path = os.path.join(dest_dir, f)
    im = Image.open(path)
    w, h = im.size
    
    # Determine bounding box
    if im.mode == 'RGBA':
        # Check alpha channel bounding box
        alpha = im.split()[-1]
        bbox = alpha.getbbox()
    elif im.mode == 'P':
        im_rgba = im.convert('RGBA')
        alpha = im_rgba.split()[-1]
        bbox = alpha.getbbox()
        if not bbox or (bbox[2]-bbox[0] > w*0.95 and bbox[3]-bbox[1] > h*0.95):
            # Check white background
            bg = Image.new('RGB', im_rgba.size, (255, 255, 255))
            diff = ImageChops.difference(im_rgba.convert('RGB'), bg)
            diff = ImageChops.add(diff, diff, 2.0, -10)
            bbox = diff.getbbox()
        im = im_rgba
    else:
        # RGB image with white or near white background
        bg = Image.new('RGB', im.size, (255, 255, 255))
        diff = ImageChops.difference(im.convert('RGB'), bg)
        diff = ImageChops.add(diff, diff, 2.0, -10)
        bbox = diff.getbbox()
        
    if bbox:
        # Add 4px padding around bounding box, bounded by original dimensions
        pad = 4
        x0 = max(0, bbox[0] - pad)
        y0 = max(0, bbox[1] - pad)
        x1 = min(w, bbox[2] + pad)
        y1 = min(h, bbox[3] + pad)
        
        # Crop
        cropped = im.crop((x0, y0, x1, y1))
        cw, ch = cropped.size
        print(f'{f:25} ({w}x{h}) -> CROPPED to ({cw}x{ch})')
        
        # Save back
        if f.endswith('.jpg') or f.endswith('.jpeg'):
            # If cropped has alpha, convert to RGB with white background
            if cropped.mode in ('RGBA', 'LA', 'P'):
                white_bg = Image.new('RGB', cropped.size, (255, 255, 255))
                white_bg.paste(cropped, mask=cropped.split()[-1] if cropped.mode == 'RGBA' else None)
                cropped = white_bg
            cropped.save(path, 'JPEG', quality=95)
        else:
            cropped.save(path, 'PNG', optimize=True)
            
        # Also update the .webp
        base, _ = os.path.splitext(f)
        webp_path = os.path.join(dest_dir, f'{base}.webp')
        cropped.save(webp_path, 'WEBP', quality=95)
    else:
        print(f'{f:25} no crop needed ({w}x{h})')

print("\nCropping complete!")
