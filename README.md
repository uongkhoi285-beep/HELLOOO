# 🐾 MÓN QUÀ SINH NHẬT TỪ MÈO MILE (BIRTHDAY CAT MILE) 🎂

Dự án trang web chúc mừng sinh nhật tương tác phong cách truyện tranh (Comic/Manga) với nhân vật chú mèo xám Mile giao quà.

---

## 🌟 ĐẶC ĐIỂM NỔI BẬT

1. **Chuỗi kịch bản tương tác (Storyline):**
   - **Cảnh 1:** Chiếc bánh sinh nhật với cánh cửa gỗ đang đóng. Chạm/gõ vào cửa phát ra âm thanh gõ cửa "cốc cốc" và tiếng kẽo kẹt mở cửa kèm pháo hoa nhỏ bung nở.
   - **Cảnh 2:** Chú mèo Mile đội nón sinh nhật vẫy tay chào xuất hiện với khung thoại truyện tranh (comic speech bubble): *"Chào cậu! Tớ là Mile, tớ được một người bạn nhờ để gửi cho cậu một vài thứ."*
   - **Cảnh 3:** Chú mèo Mile chuyển sang điệu bộ chống cằm suy nghĩ: *"Cho tớ hỏi, hôm nay là sinh nhật của cậu phải không?"*.
     - Nút `[Phải rồi! 🎉]` (bắt mắt, nhún nhảy).
     - Nút `[Không phải đâu 😜]` (nút nghịch ngợm chạy trốn khắp màn hình mỗi khi di chuột hoặc chạm ngón tay vào, sau 5 lần chối thì tan biến hài hước).
   - **Cảnh 4:** Mile cầm bó hoa tươi rực rỡ: *"Nếu đúng là như vậy thì đây là món quà mà cậu ấy nhờ tớ chuyển lại cho cậu! Cậu có đồng ý nhận món quà này không?"*. Nút `[Không nhận đâu]` cũng chạy trốn rồi biến mất!
   - **Cảnh 5:** Bó hoa phóng to nổi bật giữa màn hình. Chú mèo Mile thu nhỏ đứng ở góc dưới với khung thoại chỉ dẫn: *"Có vẻ như cậu ấy có để lại 1 bức thư được gài trên bó hoa cho cậu đấy! Cậu bấm vào bức thư xem thử đi! 💌"*.
   - **Cảnh 6:** Bức thư sinh nhật với con dấu sáp đỏ (`HBD`). Chạm vào con dấu sáp sẽ mở nắp phong bì trong không gian 3D, bức thư vintage trượt ra kèm pháo hoa giấy (confetti) tưng bừng và giai điệu hộp nhạc Happy Birthday ngân vang!

2. **Thiết kế & Tối ưu:**
   - **Màu nền:** Tone kem / vanilla ấm cúng (`#FAF6EE`), họa tiết chấm truyện tranh cổ điển nhẹ nhàng, **HOÀN TOÀN KHÔNG DÙNG NỀN HỒNG** theo đúng yêu cầu.
   - **Phong cách Comic/Manga:** Viền mực đen dày 3px, đổ bóng comic nổi khối (`box-shadow: 4px 4px 0px #2D2320`), phông chữ nét vẽ truyện tranh hỗ trợ 100% tiếng Việt (`Mali`, `Patrick Hand`, `Comfortaa`).
   - **Tối ưu Mobile:** Chuẩn `100dvh`, giao diện vuốt chạm mượt mà, căn chỉnh chuẩn màn hình điện thoại từ 360px đến 430px (iPhone, Samsung, v.v.), không bị tràn ngang.
   - **Âm thanh Web Audio API thuần:** Toàn bộ hiệu ứng âm thanh (tiếng gõ cửa, kẽo kẹt, tiếng mèo kêu, pop, tiếng trốn gió whoosh, kèn chúc mừng fanfare, nhạc nền hộp nhạc) đều được tổng hợp trực tiếp bằng Web Audio API, **chạy 100% offline**, không sợ mất file âm thanh hay lỗi tải.

---

## 📂 CẤU TRÚC THƯ MỤC

```text
birthday-cat-mile/
├── index.html                 # Giao diện chính và nội dung bức thư
├── style.css                  # Toàn bộ CSS Comic styling, hiệu ứng 3D & Responsive
├── script.js                  # Bộ điều khiển kịch bản, Web Audio SFX, Confetti
├── README.md                  # Hướng dẫn sử dụng & chỉnh sửa
└── assets/
    └── images/
        ├── banh-1.png         # Bánh sinh nhật cửa đóng (đã tách nền trong suốt)
        ├── banh-2.png         # Bánh sinh nhật cửa mở (đã tách nền trong suốt)
        ├── hello.png          # Mile vẫy tay chào
        ├── hoi-sinh-nhat.png   # Mile chống cằm suy nghĩ
        ├── meo-cam-hoa.png    # Mile cầm bó hoa (ghép tinh xảo)
        ├── bo-hoa.png         # Bó hoa phóng to có bức thư
        └── bieu-cam-1.png     # Mile mini chỉ dẫn góc màn hình
```

---

## ✏️ HƯỚNG DẪN CHỈNH SỬA LỜI CHÚC TRONG BỨC THƯ

Mở file `index.html`, tìm đến đoạn chú thích:
```html
<!-- ======================================================== -->
<!-- NỘI DUNG BỨC THƯ: Bạn có thể sửa trực tiếp câu từ dưới đây -->
<!-- ======================================================== -->
<div class="letter-body-text">
  <p class="letter-salutation">Gửi cậu,</p>
  
  <p>Chúc mừng ngày cậu cất tiếng khóc chào đời! Chúc cậu có một ngày sinh nhật thật nhiều niềm vui...</p>
  ...
</div>
```
Bạn chỉ cần thay đổi chữ trong các thẻ `<p>` thành lời chúc bạn muốn gửi đến người ấy là xong!

---

## 🚀 CÁCH MỞ VÀ TRẢI NGHIỆM

1. Nhấp đúp chuột vào file `index.html` để mở trực tiếp trên trình duyệt (Chrome, Safari, Edge, Cốc Cốc, v.v.).
2. Để xem chuẩn giao diện điện thoại trên máy tính: Nhấn phím `F12` -> Chọn biểu tượng điện thoại (Toggle Device Toolbar) -> Chọn iPhone hoặc Android.
3. Hoặc có thể upload toàn bộ thư mục này lên GitHub Pages, Vercel, Netlify hoặc gửi qua điện thoại để mở trực tiếp!
