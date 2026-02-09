# Frontend - Minh Anh (Hướng dẫn chạy)

**Mô tả ngắn:**
Ứng dụng frontend sử dụng Vite + React (+ TypeScript) và TailwindCSS. Tài liệu này tập trung vào cách cài đặt và chạy dự án trên máy phát triển.

---

## 🚀 Bắt đầu nhanh

### 1. Yêu cầu (Prerequisites)
- Node.js >= 18 (khuyến nghị). Kiểm tra: `node -v`
- npm (đi kèm Node) hoặc bạn có thể dùng `yarn` / `pnpm` (các lệnh tương đương)

### 2. Cài đặt phụ thuộc
Mở terminal ở thư mục dự án `Frontend` và chạy:
```bash
npm install
```

### 3. Chạy môi trường phát triển
```bash
npm run dev
```
Sau khi chạy, mở trình duyệt tại: `http://localhost:5173` (mặc định Vite).

### 4. Build production
```bash
npm run build
```
Lưu ý: script `build` tích hợp `tsc -b` để kiểm tra TypeScript trước khi chạy `vite build`.

### 5. Xem bản build (preview)
```bash
npm run preview
```

### 6. Kiểm tra mã (lint)
```bash
npm run lint
```

---

## 🔧 Vị trí file quan trọng
- `src/main.tsx` — entry point
- `src/App.jsx` và `src/components/` — nơi triển khai UI
- `package.json` — chứa các script (`dev`, `build`, `preview`, `lint`)

---

## 🧪 TypeScript
- Build đã chạy `tsc -b`. Bạn có thể chạy riêng nếu cần:
```bash
npx tsc -b
```

---

## 🌿 Biến môi trường
- Nếu dùng `.env`, Vite sẽ load các biến bắt đầu bằng `VITE_`.
- Tạo `.env.local` cho cấu hình cục bộ nếu cần.

---

## ❗ Vấn đề thường gặp & cách khắc phục
- Port 5173 bị chiếm: chạy `npm run dev -- --port 3000` hoặc đóng tiến trình đang chiếm.
- Lỗi node version: nâng cấp Node hoặc dùng `nvm` để chuyển phiên bản.
- Lỗi TypeScript: kiểm tra thông báo `tsc` và sửa type tương ứng.

---

## 💡 Gợi ý
- Dùng `npm run dev -- --host` để truy cập từ mạng nội bộ.
- Nếu muốn, mình có thể bổ sung mục hướng dẫn deploy (Vercel/Netlify) hoặc thêm badges/status.

---

Nếu cần mình có thể cập nhật `README.md` chính (thêm phần tiếng Việt ở đầu) hoặc tạo README chi tiết hơn cho CI/CD.