To get the `private-key.pem` and `certificate.pem` files for enabling TLS on your SMTP server, you'll need to generate or obtain an SSL/TLS certificate. This can be done in several ways, depending on whether you want to use a self-signed certificate (for development/testing) or a trusted certificate (for production use).

### Option 1: **Generate a Self-Signed Certificate (For Development)**

Self-signed certificates are suitable for development or testing purposes. You can generate a private key and certificate using the `openssl` command-line tool.

#### 1. **Install OpenSSL**
   - If OpenSSL is not installed on your machine, install it using a package manager:
     - **Linux (Ubuntu/Debian)**: `sudo apt-get install openssl`
     - **macOS**: `brew install openssl`
     - **Windows**: Download from [OpenSSL for Windows](https://slproweb.com/products/Win32OpenSSL.html).

#### 2. **Generate a Private Key and Certificate**
Run the following commands to generate the private key and certificate.

```bash
# Generate a private key
openssl genrsa -out private-key.pem 2048

# Generate a self-signed certificate
openssl req -new -x509 -key private-key.pem -out certificate.pem -days 365
```

##### Explanation:
- `private-key.pem`: This is your private key that you keep secret.
- `certificate.pem`: This is your self-signed certificate.
- `-days 365`: The certificate is valid for 365 days. You can change this to suit your needs.

During the process, you’ll be prompted to enter some information, such as your country, organization name, and email address.

#### 3. **Using the Certificate and Key**
Once generated, you can use these files in your Node.js SMTP server:

```javascript
const fs = require('fs');
const { SMTPServer } = require('smtp-server');

const server = new SMTPServer({
    secure: true, // Enable TLS
    key: fs.readFileSync('path/to/private-key.pem'),
    cert: fs.readFileSync('path/to/certificate.pem'),
    // other SMTP server options
});

server.listen(465, () => {
    console.log('SMTP server is listening on port 465 with TLS');
});
```

### Option 2: **Obtain a Trusted SSL/TLS Certificate (For Production)**

For production use, it's recommended to use a trusted Certificate Authority (CA), such as Let's Encrypt, to avoid browser/email client warnings about untrusted certificates.

#### 1. **Using Let’s Encrypt (Free)**

Let's Encrypt provides free SSL certificates that are trusted by most browsers and email clients. You can use the **Certbot** tool to obtain a certificate for your domain.

##### 1. Install Certbot:
   - On Ubuntu, you can install Certbot with the following commands:
   
   ```bash
   sudo apt-get update
   sudo apt-get install certbot
   ```

##### 2. Generate the Certificate:
   Run the following command, replacing `yourdomain.com` with your actual domain name:

   ```bash
   sudo certbot certonly --standalone -d yourdomain.com
   ```

   Certbot will handle generating the private key and certificate, and place them in `/etc/letsencrypt/live/yourdomain.com/`.

   - **private key**: `/etc/letsencrypt/live/yourdomain.com/privkey.pem`
   - **certificate**: `/etc/letsencrypt/live/yourdomain.com/fullchain.pem`

##### 3. Use the Certificate and Private Key in Node.js:

```javascript
const fs = require('fs');
const { SMTPServer } = require('smtp-server');

const server = new SMTPServer({
    secure: true, // Enable TLS
    key: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/fullchain.pem'),
    // other SMTP server options
});

server.listen(465, () => {
    console.log('SMTP server is listening on port 465 with TLS');
});
```

##### 4. Auto-Renew Let's Encrypt Certificates
Let's Encrypt certificates are valid for 90 days, but Certbot can automatically renew them. You can set up a cron job to handle this:

```bash
crontab -e
```

Add the following line to the crontab file:

```bash
0 0 * * * certbot renew --quiet
```

This will check and renew your certificates daily, and you won't need to worry about them expiring.

---

### Option 3: **Purchase a Certificate from a Trusted CA**

If you prefer not to use Let’s Encrypt, you can purchase an SSL/TLS certificate from trusted Certificate Authorities (CAs) like:

- **DigiCert**
- **GlobalSign**
- **Comodo**
- **GoDaddy**

After purchasing, you’ll typically receive the certificate and private key files via email or a download. You can then use them in your Node.js SMTP server configuration.

### Summary
- **For development**: Use a self-signed certificate generated using `openssl`.
- **For production**: Use a trusted SSL/TLS certificate from Let's Encrypt (free) or purchase one from a commercial CA.

Make sure to store your private key securely, and for production, always use trusted certificates to avoid security warnings.