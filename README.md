# 🛒 SGTech - E-commerce Website

SGTech là website thương mại điện tử cho phép người dùng mua sắm các sản phẩm công nghệ như điện thoại, đồng hồ, laptop…  
Dự án được xây dựng bằng **Node.js + Express + MongoDB + Pug**, cung cấp đầy đủ tính năng như quản lý sản phẩm, danh mục, người dùng, phân quyền, chat real-time và upload hình ảnh.

---

## 🚀 Preview

### 🏠 Trang chủ
![Home Page](https://github.com/HieuPhe/project-management/assets/homepage.png)

### 🛍️ Danh mục sản phẩm
![Category Page](https://github.com/HieuPhe/project-management/assets/category.png)

### 📱 Chi tiết sản phẩm
![Product Detail](https://github.com/HieuPhe/project-management/assets/product-detail.png)

### 👤 Đăng nhập
![Login Page](https://github.com/HieuPhe/project-management/assets/login.png)

### 🧾 Giỏ hàng
![Cart Page](https://github.com/HieuPhe/project-management/assets/cart.png)

### ⚙️ Trang quản trị
![Admin Dashboard](https://github.com/HieuPhe/project-management/assets/admin-dashboard.png)

---

## 🛠️ Công nghệ sử dụng

**Backend:**
- Node.js  
- Express.js  
- MongoDB (Mongoose)  

**Frontend:**
- Pug Template Engine  
- JavaScript  
- Bootstrap / CSS3  

**Khác:**
- Cloudinary (upload hình ảnh)  
- Socket.IO (chat real-time)  
- Gmail API (gửi mail tự động)  
- dotenv, multer, express-session  

---

## ✨ Tính năng chính

### 🧩 Người dùng
- Đăng ký, đăng nhập, đăng xuất  
- Quản lý thông tin cá nhân  
- Tìm kiếm và xem chi tiết sản phẩm  
- Thêm sản phẩm vào giỏ hàng, thanh toán  
- Chat real-time với admin hoặc hỗ trợ viên  

### 🛍️ Quản trị viên (Admin)
- Quản lý người dùng, danh mục, sản phẩm  
- Phân quyền người dùng  
- Thêm / sửa / xóa sản phẩm  
- Quản lý trạng thái sản phẩm (hoạt động / dừng hoạt động)  
- Dashboard thống kê tổng quan  
- Quản lý upload hình ảnh bằng Cloudinary  

---

## 📁 Cấu trúc thư mục

project-management/
│
├── config/ # Cấu hình hệ thống (DB, cloud, mail…)
├── controllers/ # Xử lý logic nghiệp vụ
│ ├── admin/
│ └── client/
├── helpers/ # Các hàm tiện ích
├── middlewares/ # Xử lý xác thực, upload, validate
├── models/ # Mongoose models
├── public/ # File tĩnh: CSS, JS, hình ảnh
├── routes/ # Định nghĩa các route chính
├── sockets/ # Cấu hình chat real-time
├── uploads/ # Upload tạm
├── validates/ # Validate dữ liệu form
├── views/ # Giao diện Pug templates
│
├── .env # Biến môi trường
├── index.js # Điểm khởi chạy server
├── package.json
└── vercel.json


---

## ⚙️ Cài đặt & Chạy dự án

### 1️⃣ Clone project
```bash
git clone https://github.com/HieuPhe/project-management.git
cd project-management

2️⃣ Cài đặt package
npm install

3️⃣ Cấu hình môi trường (.env)

Tạo file .env tại thư mục gốc và thêm thông tin:

PORT=4000
MONGO_URL=mongodb+srv://...
CLOUD_NAME=...
CLOUD_KEY=...
CLOUD_SECRET=...

EMAIL_USER=...
GMAIL_CLIENT_ID=...
GMAIL_CLIENT_SECRET=...
GMAIL_REFRESH_TOKEN=...

4️⃣ Chạy dự án
npm start

👨‍💻 Tác giả

Nguyễn Khắc Hiếu
📧 Email: phehieu2003@gmail.com

🔗 GitHub: github.com/HieuPhe
