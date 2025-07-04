# 🚀 Panduan Deploy KlixGenix.ID ke WordPress Hosting

## 📋 **PERSIAPAN SEBELUM DEPLOY**

### **Requirements:**

- ✅ WordPress hosting dengan akses cPanel/File Manager
- ✅ Domain sudah pointing ke hosting
- ✅ FTP/SFTP access (optional)

---

## 🛠️ **STEP 1: BUILD APLIKASI REACT**

### **1.1 Install Dependencies**

```bash
# Masuk ke folder client
cd client

# Install dependencies
npm install
```

### **1.2 Build Production**

```bash
# Build untuk production
npm run build
```

**Output:** Folder `dist` akan berisi file static siap deploy

---

## 📁 **STEP 2: PERSIAPAN FILE UNTUK UPLOAD**

### **2.1 Struktur File yang Dibutuhkan**

```
dist/
├── index.html          # Main HTML file
├── assets/             # CSS, JS, dan assets lainnya
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [images/fonts]
└── extension/          # Extension files
    ├── popup.html
    ├── popup.js
    ├── popup.css
    ├── manifest.json
    └── background.js
```

### **2.2 Copy Extension Files**

```bash
# Copy extension folder ke dalam dist
cp -r client/public/extension client/dist/
```

### **2.3 Create .htaccess File**

Buat file `.htaccess` di dalam folder `dist`:

```apache
# .htaccess untuk React Router (SPA)
RewriteEngine On
RewriteBase /

# Handle Angular and React Router
RewriteRule ^(?!.*\.(?:js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json|xml|txt|pdf|zip|mp4|webm|mp3|wav|ogg)$).*$ /index.html [L,R=200]

# Security Headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options SAMEORIGIN
    Header always set X-Content-Type-Options nosniff
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache Control
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

---

## 🌐 **STEP 3: UPLOAD KE WORDPRESS HOSTING**

### **Option A: Via cPanel File Manager**

#### **3.1 Login ke cPanel**

- Buka https://your-domain.com/cpanel
- Login dengan credentials hosting

#### **3.2 Buka File Manager**

- Klik "File Manager" di cPanel
- Navigate ke `public_html` folder

#### **3.3 Backup WordPress (Jika Ada)**

```bash
# Jika sudah ada WordPress di public_html, backup dulu
mkdir backup_wp
mv * backup_wp/
```

#### **3.4 Upload React App**

- Klik "Upload" di File Manager
- Select semua file dari folder `dist`
- Upload ke `public_html`

### **Option B: Via FTP/SFTP**

#### **3.1 Connect via FTP**

```bash
# Via FTP client (FileZilla, WinSCP, dll)
Host: ftp.your-domain.com
Username: cpanel_username
Password: cpanel_password
Port: 21 (FTP) atau 22 (SFTP)
```

#### **3.2 Upload Files**

- Connect ke hosting
- Navigate ke `/public_html/`
- Upload semua file dari folder `dist`

---

## ⚙️ **STEP 4: KONFIGURASI HOSTING**

### **4.1 Set Index File**

Di cPanel → "Index Manager":

- Set `index.html` sebagai default index file

### **4.2 Configure Domain**

Di cPanel → "Subdomains" (jika perlu):

- Pastikan domain pointing ke folder yang benar

### **4.3 SSL Certificate**

Di cPanel → "SSL/TLS":

- Enable SSL certificate (Let's Encrypt gratis)

---

## 🔧 **STEP 5: TESTING & TROUBLESHOOTING**

### **5.1 Test Website**

- Buka https://your-domain.com
- Check semua halaman (routing)
- Test extension download

### **5.2 Common Issues & Solutions**

#### **Issue: 404 Error pada Router**

**Solution:** Pastikan `.htaccess` sudah upload dan mod_rewrite enabled

#### **Issue: Assets tidak load**

**Solution:** Check path di `vite.config.ts`:

```typescript
export default defineConfig({
  base: "/", // Pastikan base path benar
  build: {
    outDir: "dist",
  },
});
```

#### **Issue: Extension tidak bisa download**

**Solution:** Check permission folder extension:

```bash
chmod 755 public_html/extension/
chmod 644 public_html/extension/*
```

---

## 📦 **STEP 6: SETUP EXTENSION DOWNLOAD**

### **6.1 Buat Download Link**

Di website, update link download extension:

```html
<!-- Update di component yang relevant -->
<a href="/extension/klixgenix-extension.zip" download> Download Extension </a>
```

### **6.2 Create Extension Package**

```bash
# Di local, buat zip file extension
cd client/dist/extension
zip -r klixgenix-extension.zip *
```

Upload `klixgenix-extension.zip` ke `/public_html/extension/`

---

## 🔐 **STEP 7: SECURITY & OPTIMIZATION**

### **7.1 Security Hardening**

```apache
# Tambah ke .htaccess
# Disable directory browsing
Options -Indexes

# Protect system files
<Files ~ "^\.">
    Order allow,deny
    Deny from all
</Files>

# Block suspicious requests
<IfModule mod_rewrite.c>
    RewriteCond %{QUERY_STRING} (\<|%3C).*script.*(\>|%3E) [NC,OR]
    RewriteCond %{QUERY_STRING} GLOBALS(=|\[|\%[0-9A-Z]{0,2}) [OR]
    RewriteCond %{QUERY_STRING} _REQUEST(=|\[|\%[0-9A-Z]{0,2}) [OR]
    RewriteCond %{QUERY_STRING} proc/self/environ [OR]
    RewriteCond %{QUERY_STRING} mosConfig_[a-zA-Z_]{1,21}(=|\%3D) [OR]
    RewriteCond %{QUERY_STRING} base64_(en|de)code[^(]*\([^)]*\) [OR]
    RewriteRule ^(.*)$ - [F,L]
</IfModule>
```

### **7.2 Performance Optimization**

```apache
# Browser Caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresDefault "access plus 1 month"
    ExpiresByType text/html "access plus 1 hour"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType text/css "access plus 1 year"
</IfModule>
```

---

## 📊 **STEP 8: MONITORING & MAINTENANCE**

### **8.1 Setup Analytics**

- Add Google Analytics ke `index.html`
- Monitor traffic dan user behavior

### **8.2 Backup Strategy**

```bash
# Scheduled backup (via cPanel cron)
# Backup files weekly
tar -czf backup_$(date +%Y%m%d).tar.gz public_html/

# Backup database (jika ada)
mysqldump -u username -p database_name > backup_$(date +%Y%m%d).sql
```

### **8.3 Updates**

```bash
# Untuk update website:
1. Build ulang di local: npm run build
2. Backup current version
3. Upload file baru
4. Test functionality
```

---

## ✅ **CHECKLIST DEPLOYMENT**

### **Pre-Deployment:**

- [ ] React app berhasil build (`npm run build`)
- [ ] Extension files ready
- [ ] `.htaccess` file created
- [ ] Domain/hosting ready

### **During Deployment:**

- [ ] Backup existing files (jika ada)
- [ ] Upload all files from `dist` folder
- [ ] Upload extension files
- [ ] Set correct file permissions
- [ ] Configure SSL certificate

### **Post-Deployment:**

- [ ] Test website functionality
- [ ] Test all navigation/routing
- [ ] Test extension download
- [ ] Check mobile responsiveness
- [ ] Verify SSL working
- [ ] Setup monitoring/analytics

---

## 🚨 **IMPORTANT NOTES**

### **WordPress Hosting Limitations:**

- Tidak ada Node.js runtime (React hanya static files)
- Beberapa shared hosting batasi mod_rewrite
- Memory/CPU limits untuk shared hosting

### **Alternative Solutions:**

Jika ada masalah dengan WordPress hosting:

1. **Subdomain approach**: Deploy di subdomain (app.your-domain.com)
2. **Hybrid approach**: WordPress di root, React app di subfolder
3. **CDN approach**: Upload ke CDN, point domain kesana

### **Support:**

Jika ada issues:

1. Check cPanel error logs
2. Contact hosting support untuk mod_rewrite
3. Test di local environment dulu

---

## 🎯 **FINAL RESULT**

Setelah selesai, Anda akan memiliki:

- ✅ Website KlixGenix.ID live di domain Anda
- ✅ Extension tersedia untuk download
- ✅ Semua fitur berfungsi normal
- ✅ SSL certificate active
- ✅ SEO-friendly routing
- ✅ Optimized performance

**Domain:** https://your-domain.com  
**Extension:** https://your-domain.com/extension/klixgenix-extension.zip

Website siap untuk production dan user bisa langsung akses! 🚀
