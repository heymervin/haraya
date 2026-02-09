#!/usr/bin/env python3
"""
Scrape wedding vendor logos from their Facebook pages, websites, or Google Images.
Strategy:
1. Try Facebook page profile picture (og:image)
2. Try Instagram profile picture (og:image)
3. Try Google Images search for "{vendor_name} logo"
4. Fall back to existing logo URL
"""

import csv
import os
import re
import time
import json
import hashlib
import requests
from bs4 import BeautifulSoup
from urllib.parse import quote_plus, urlparse, urljoin

# Config
CSV_PATH = "/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/wedding_vendors.csv"
OUTPUT_DIR = "/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/public/vendor-logos"
OUTPUT_CSV = "/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/wedding_vendors_with_logos.csv"
PROGRESS_FILE = "/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/logo_scrape_progress.json"

# Create output directory
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Headers to mimic a real browser
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}

def sanitize_filename(name):
    """Create a safe filename from vendor name."""
    name = re.sub(r'[^\w\s-]', '', name.lower())
    name = re.sub(r'[\s]+', '-', name.strip())
    return name[:80]

def download_image(url, vendor_name):
    """Download an image and save it locally. Returns local path or None."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15, allow_redirects=True)
        if resp.status_code != 200:
            return None

        content_type = resp.headers.get('content-type', '')
        if 'image' not in content_type and not url.endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg')):
            return None

        # Determine extension
        if 'png' in content_type or url.endswith('.png'):
            ext = '.png'
        elif 'gif' in content_type or url.endswith('.gif'):
            ext = '.gif'
        elif 'webp' in content_type or url.endswith('.webp'):
            ext = '.webp'
        elif 'svg' in content_type or url.endswith('.svg'):
            ext = '.svg'
        else:
            ext = '.jpg'

        filename = sanitize_filename(vendor_name) + ext
        filepath = os.path.join(OUTPUT_DIR, filename)

        with open(filepath, 'wb') as f:
            f.write(resp.content)

        # Check file size - skip if too small (likely a 1x1 pixel or error)
        if os.path.getsize(filepath) < 1000:
            os.remove(filepath)
            return None

        return f"/vendor-logos/{filename}"
    except Exception as e:
        print(f"  [DL ERROR] {e}")
        return None

def try_facebook_logo(fb_url):
    """Try to get logo/profile picture from Facebook page."""
    if not fb_url:
        return None
    try:
        resp = requests.get(fb_url, headers=HEADERS, timeout=15, allow_redirects=True)
        if resp.status_code != 200:
            return None
        soup = BeautifulSoup(resp.text, 'html.parser')

        # Try og:image meta tag
        og_image = soup.find('meta', property='og:image')
        if og_image and og_image.get('content'):
            img_url = og_image['content']
            # Skip default/placeholder Facebook images
            if 'scontent' in img_url or 'fbcdn' in img_url:
                return img_url

        return None
    except Exception as e:
        print(f"  [FB ERROR] {e}")
        return None

def try_instagram_logo(ig_url):
    """Try to get profile picture from Instagram."""
    if not ig_url:
        return None
    try:
        resp = requests.get(ig_url, headers=HEADERS, timeout=15, allow_redirects=True)
        if resp.status_code != 200:
            return None
        soup = BeautifulSoup(resp.text, 'html.parser')

        # Try og:image meta tag
        og_image = soup.find('meta', property='og:image')
        if og_image and og_image.get('content'):
            return og_image['content']

        return None
    except Exception as e:
        print(f"  [IG ERROR] {e}")
        return None

def try_google_image_search(vendor_name):
    """Search Google Images for vendor logo and return the first result URL."""
    try:
        query = quote_plus(f"{vendor_name} philippines logo")
        url = f"https://www.google.com/search?q={query}&tbm=isch&safe=active"

        resp = requests.get(url, headers=HEADERS, timeout=15)
        if resp.status_code != 200:
            return None

        # Parse image URLs from Google Images HTML
        # Google embeds image URLs in the page source
        soup = BeautifulSoup(resp.text, 'html.parser')

        # Find image URLs in script tags or img tags
        img_urls = []

        # Method 1: Look for img tags with src
        for img in soup.find_all('img'):
            src = img.get('src', '')
            if src.startswith('http') and 'gstatic' not in src and 'google' not in src:
                img_urls.append(src)

        # Method 2: Search for image URLs in page source
        text = resp.text
        # Pattern for image URLs in Google's response
        pattern = r'"(https?://[^"]+\.(?:jpg|jpeg|png|gif|webp)(?:\?[^"]*)?)"'
        found = re.findall(pattern, text)
        for u in found:
            if 'gstatic' not in u and 'google' not in u and 'googleapis' not in u:
                img_urls.append(u)

        # Return first viable image URL
        for img_url in img_urls[:3]:
            if len(img_url) < 500:  # Skip overly long URLs
                return img_url

        return None
    except Exception as e:
        print(f"  [GOOGLE ERROR] {e}")
        return None

def try_duckduckgo_image_search(vendor_name):
    """Search DuckDuckGo for vendor logo."""
    try:
        query = quote_plus(f"{vendor_name} philippines wedding vendor logo")
        url = f"https://duckduckgo.com/?q={query}&iax=images&ia=images"

        resp = requests.get(url, headers=HEADERS, timeout=15)
        if resp.status_code != 200:
            return None

        # Try to find vqd token for API
        vqd_match = re.search(r'vqd=["\']([^"\']+)', resp.text)
        if not vqd_match:
            return None

        vqd = vqd_match.group(1)
        api_url = f"https://duckduckgo.com/i.js?l=us-en&o=json&q={query}&vqd={vqd}&f=,,,,,&p=1"

        api_resp = requests.get(api_url, headers=HEADERS, timeout=15)
        if api_resp.status_code != 200:
            return None

        data = api_resp.json()
        results = data.get('results', [])
        if results:
            return results[0].get('image')

        return None
    except Exception as e:
        print(f"  [DDG ERROR] {e}")
        return None

def load_progress():
    """Load progress from previous runs."""
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_progress(progress):
    """Save progress to file."""
    with open(PROGRESS_FILE, 'w') as f:
        json.dump(progress, f, indent=2)

def main():
    # Load CSV
    vendors = []
    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            vendors.append(row)

    print(f"Loaded {len(vendors)} vendors from CSV")

    # Load previous progress
    progress = load_progress()

    results = []
    success_count = 0
    skip_count = 0
    fail_count = 0

    for i, vendor in enumerate(vendors):
        name = vendor.get('name', '').strip()
        fb = vendor.get('facebook', '').strip()
        ig = vendor.get('instagram', '').strip()
        existing_logo = vendor.get('logo', '').strip()

        print(f"\n[{i+1}/{len(vendors)}] {name}")

        # Check if already processed
        if name in progress and progress[name].get('logo_path'):
            print(f"  ✓ Already processed: {progress[name]['logo_path']}")
            vendor['new_logo'] = progress[name]['logo_path']
            results.append(vendor)
            skip_count += 1
            continue

        logo_url = None
        logo_source = None

        # Strategy 1: Facebook og:image
        if fb:
            print(f"  Trying Facebook: {fb[:60]}...")
            logo_url = try_facebook_logo(fb)
            if logo_url:
                logo_source = "facebook"
                print(f"  ✓ Found via Facebook")

        # Strategy 2: Instagram og:image
        if not logo_url and ig:
            print(f"  Trying Instagram: {ig[:60]}...")
            logo_url = try_instagram_logo(ig)
            if logo_url:
                logo_source = "instagram"
                print(f"  ✓ Found via Instagram")

        # Strategy 3: Google Images
        if not logo_url:
            print(f"  Trying Google Images...")
            logo_url = try_google_image_search(name)
            if logo_url:
                logo_source = "google"
                print(f"  ✓ Found via Google Images")

        # Strategy 4: DuckDuckGo Images
        if not logo_url:
            print(f"  Trying DuckDuckGo...")
            logo_url = try_duckduckgo_image_search(name)
            if logo_url:
                logo_source = "duckduckgo"
                print(f"  ✓ Found via DuckDuckGo")

        # Download the image
        if logo_url:
            print(f"  Downloading from {logo_source}...")
            local_path = download_image(logo_url, name)
            if local_path:
                vendor['new_logo'] = local_path
                progress[name] = {
                    'logo_path': local_path,
                    'source': logo_source,
                    'source_url': logo_url
                }
                success_count += 1
                print(f"  ✓ Saved: {local_path}")
            else:
                vendor['new_logo'] = existing_logo
                progress[name] = {'logo_path': None, 'source': 'failed'}
                fail_count += 1
                print(f"  ✗ Download failed, keeping existing")
        else:
            vendor['new_logo'] = existing_logo
            progress[name] = {'logo_path': None, 'source': 'not_found'}
            fail_count += 1
            print(f"  ✗ No logo found, keeping existing")

        results.append(vendor)

        # Save progress every 10 vendors
        if (i + 1) % 10 == 0:
            save_progress(progress)
            print(f"\n--- Progress: {success_count} found, {fail_count} failed, {skip_count} skipped ---\n")

        # Rate limiting - be polite
        time.sleep(1.5)

    # Save final progress
    save_progress(progress)

    # Write updated CSV
    fieldnames = list(vendors[0].keys()) + (['new_logo'] if 'new_logo' not in vendors[0] else [])
    with open(OUTPUT_CSV, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['category', 'name', 'email', 'phone', 'facebook', 'instagram', 'logo', 'new_logo'])
        writer.writeheader()
        for row in results:
            writer.writerow({
                'category': row.get('category', ''),
                'name': row.get('name', ''),
                'email': row.get('email', ''),
                'phone': row.get('phone', ''),
                'facebook': row.get('facebook', ''),
                'instagram': row.get('instagram', ''),
                'logo': row.get('logo', ''),
                'new_logo': row.get('new_logo', ''),
            })

    print(f"\n{'='*60}")
    print(f"DONE!")
    print(f"  ✓ Logos found: {success_count}")
    print(f"  ✗ Failed: {fail_count}")
    print(f"  ↷ Skipped (already done): {skip_count}")
    print(f"  Total: {len(vendors)}")
    print(f"\nUpdated CSV: {OUTPUT_CSV}")
    print(f"Logos saved to: {OUTPUT_DIR}")

if __name__ == '__main__':
    main()
