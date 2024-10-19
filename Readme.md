
# Build Own Mail Server
## Steps
- Configure DNS
- Add MX record in DNS 
![MX](./ScreenShots/MX.png)

- Add mail.domain.com with A type point to the VM machine
![A](./ScreenShots/A-name.png)

- Launch Ec2 on AWS
- configure Inbound add SMTP port 25
- Add code which is given run index file 