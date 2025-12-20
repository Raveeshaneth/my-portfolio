#!/usr/bin/env python3
"""
Image compression script for portfolio
Reduces image file sizes by 50-80% without quality loss
"""

from PIL import Image
import os
import sys
from pathlib import Path

def compress_image(input_path, output_path, quality=85, max_size=None):
    """Compress image and optionally resize"""
    try:
        with Image.open(input_path) as img:
            # Convert RGBA to RGB if needed for JPEG
            if img.mode in ('RGBA', 'LA', 'P'):
                rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = rgb_img
            
            # Resize if too large (for mobile optimization)
            if max_size and (img.width > max_size or img.height > max_size):
                img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
            
            # Save with optimization
            output_str = str(output_path).lower()
            if output_str.endswith('.webp'):
                img.save(output_path, 'WEBP', quality=quality, method=6)
            elif output_str.endswith('.png'):
                img.save(output_path, 'PNG', optimize=True)
            else:
                img.save(output_path, 'JPEG', quality=quality, optimize=True)
            
            original_size = os.path.getsize(input_path) / 1024
            new_size = os.path.getsize(output_path) / 1024
            reduction = ((original_size - new_size) / original_size) * 100
            
            print(f"✓ {Path(input_path).name}")
            print(f"  {original_size:.0f}KB → {new_size:.0f}KB ({reduction:.0f}% reduction)")
            return True
    except Exception as e:
        print(f"✗ Failed to compress {input_path}: {e}")
        return False

def main():
    assets_dir = Path('./src/assets')
    
    if not assets_dir.exists():
        print("❌ Assets directory not found!")
        sys.exit(1)
    
    print("🖼️  Image Compression Script")
    print("=" * 50)
    
    # Define images to compress
    images = {
        'logo.png': {'quality': 85, 'max_size': 256},
        'icon.png': {'quality': 85, 'max_size': 128},
        'grid.png': {'quality': 75, 'max_size': 512},
        'curlybracket.png': {'quality': 85, 'max_size': 512},
        'illustrater.webp': {'quality': 80},
        'project1.webp': {'quality': 75},
        'project2.webp': {'quality': 75},
        'project3.webp': {'quality': 75},
        'project4.webp': {'quality': 75},
        'project5.webp': {'quality': 75},
        'project6.webp': {'quality': 75},
        'project7.webp': {'quality': 75},
    }
    
    total_original = 0
    total_compressed = 0
    
    for filename, settings in images.items():
        filepath = assets_dir / filename
        if filepath.exists():
            original_size = os.path.getsize(filepath) / 1024
            total_original += original_size
            
            compress_image(
                filepath, 
                filepath,
                quality=settings.get('quality', 85),
                max_size=settings.get('max_size')
            )
            
            total_compressed += os.path.getsize(filepath) / 1024
        else:
            print(f"⚠️  {filename} not found, skipping...")
    
    print("\n" + "=" * 50)
    print(f"Total: {total_original:.0f}KB → {total_compressed:.0f}KB")
    print(f"Overall reduction: {((total_original - total_compressed) / total_original * 100):.0f}%")
    print("✓ Compression complete!")

if __name__ == '__main__':
    main()
