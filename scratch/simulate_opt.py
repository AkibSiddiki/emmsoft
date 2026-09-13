import os, glob
from PIL import Image, ImageOps

assets = glob.glob("assets/**/*.*", recursive=True) + glob.glob("favicon/**/*.*", recursive=True)

total_orig = 0
total_new = 0
total_webp = 0

print(f"{'Path':<42} | {'Original':<10} | {'Optimized':<10} | {'WebP':<10}")
print("-" * 80)

for path in sorted(assets):
    ext = os.path.splitext(path)[1].lower()
    if ext not in (".png", ".jpg", ".jpeg"):
        continue
    
    orig_sz = os.path.getsize(path)
    total_orig += orig_sz
    
    tmp_opt = f"/tmp/opt_{os.path.basename(path)}"
    tmp_webp = f"/tmp/webp_{os.path.basename(path)}.webp"
    
    try:
        with Image.open(path) as im:
            # Handle orientation from EXIF if present
            im = ImageOps.exif_transpose(im)
            
            # 1. WebP version
            if ext in (".jpg", ".jpeg") or im.mode == "RGB":
                im.save(tmp_webp, "WEBP", quality=82, method=6)
            else:
                im.save(tmp_webp, "WEBP", quality=85, method=6)
            webp_sz = os.path.getsize(tmp_webp)
            total_webp += webp_sz
            
            # 2. Optimized original format
            if ext in (".jpg", ".jpeg"):
                # Downscale if excessively large
                w, h = im.size
                if max(w, h) > 1600:
                    im.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
                im.convert("RGB").save(tmp_opt, "JPEG", quality=82, optimize=True, progressive=True)
            elif ext == ".png":
                w, h = im.size
                # If photographic RGB PNG without alpha, downscale if > 1600
                if im.mode == "RGB" and max(w, h) > 1600:
                    im.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
                elif im.mode == "RGBA":
                    # Check if alpha is actually used
                    alpha = im.split()[-1]
                    if alpha.getextrema() == (255, 255):
                        im = im.convert("RGB")
                
                # If large photographic PNG (> 500KB and RGB)
                if im.mode == "RGB" and orig_sz > 500 * 1024:
                    # Quantize to adaptive 256 palette for PNG fallback
                    p_im = im.convert("P", palette=Image.Palette.ADAPTIVE, colors=256)
                    p_im.save(tmp_opt, "PNG", optimize=True)
                else:
                    im.save(tmp_opt, "PNG", optimize=True)
            
            opt_sz = os.path.getsize(tmp_opt)
            total_new += opt_sz
            
            o_str = f"{orig_sz/1024:.1f} KB"
            n_str = f"{opt_sz/1024:.1f} KB"
            w_str = f"{webp_sz/1024:.1f} KB"
            print(f"{path:<42} | {o_str:<10} | {n_str:<10} | {w_str:<10}")
            
    except Exception as e:
        print(f"Error on {path}: {e}")

print("-" * 80)
print(f"Total Original:  {total_orig / (1024*1024):.2f} MB")
print(f"Total Optimized: {total_new / (1024*1024):.2f} MB  ({(1 - total_new/total_orig)*100:.1f}% reduction)")
print(f"Total WebP:      {total_webp / (1024*1024):.2f} MB  ({(1 - total_webp/total_orig)*100:.1f}% reduction)")
