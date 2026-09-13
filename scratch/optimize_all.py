import os, glob
from PIL import Image, ImageOps

assets = glob.glob("assets/**/*.*", recursive=True) + glob.glob("favicon/**/*.*", recursive=True)

processed = 0
webp_generated = 0
total_saved_bytes = 0

for path in sorted(assets):
    ext = os.path.splitext(path)[1].lower()
    if ext not in (".png", ".jpg", ".jpeg"):
        continue
    
    orig_sz = os.path.getsize(path)
    base, _ = os.path.splitext(path)
    webp_path = f"{base}.webp"
    
    try:
        with Image.open(path) as im:
            im = ImageOps.exif_transpose(im)
            
            # --- 1. GENERATE WEBP ---
            is_photo = ext in (".jpg", ".jpeg") or im.mode == "RGB"
            q = 82 if is_photo else 88
            
            # Save WebP
            im.save(webp_path, "WEBP", quality=q, method=6)
            webp_sz = os.path.getsize(webp_path)
            webp_generated += 1
            
            # --- 2. OPTIMIZE ORIGINAL IN PLACE ---
            if ext in (".jpg", ".jpeg"):
                w, h = im.size
                if max(w, h) > 1600:
                    im.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
                
                # Save optimized JPEG to temp then replace
                tmp = f"{path}.tmp.jpg"
                im.convert("RGB").save(tmp, "JPEG", quality=82, optimize=True, progressive=True)
                opt_sz = os.path.getsize(tmp)
                
                # Only overwrite if smaller
                if opt_sz < orig_sz:
                    os.replace(tmp, path)
                    total_saved_bytes += (orig_sz - opt_sz)
                else:
                    if os.path.exists(tmp): os.remove(tmp)
                    
            elif ext == ".png":
                tmp = f"{path}.tmp.png"
                w, h = im.size
                
                # Check for unnecessary RGBA
                if im.mode == "RGBA":
                    alpha = im.split()[-1]
                    if alpha.getextrema() == (255, 255):
                        im = im.convert("RGB")
                
                if im.mode == "RGB":
                    if max(w, h) > 1600:
                        im.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
                    # For huge photographic PNGs, save high-quality adaptive palette fallback
                    if orig_sz > 400 * 1024:
                        p_im = im.convert("P", palette=Image.Palette.ADAPTIVE, colors=256)
                        p_im.save(tmp, "PNG", optimize=True)
                    else:
                        im.save(tmp, "PNG", optimize=True)
                else:
                    im.save(tmp, "PNG", optimize=True)
                    
                opt_sz = os.path.getsize(tmp)
                if opt_sz < orig_sz:
                    os.replace(tmp, path)
                    total_saved_bytes += (orig_sz - opt_sz)
                else:
                    if os.path.exists(tmp): os.remove(tmp)

            processed += 1
            cur_sz = os.path.getsize(path)
            print(f"✓ {path}: {orig_sz/1024:.1f}KB -> {cur_sz/1024:.1f}KB (WebP: {webp_sz/1024:.1f}KB)")
            
    except Exception as e:
        print(f"✗ Error on {path}: {e}")

print("=" * 60)
print(f"Processed: {processed} images")
print(f"Generated WebP: {webp_generated} images")
print(f"Total Saved (in-place originals): {total_saved_bytes / (1024*1024):.2f} MB")
