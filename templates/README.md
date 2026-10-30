# HSG Tin 9 – Interactive Lesson Template V1.0

Mẫu website tự học 5 chặng, độc lập ở thư mục `templates/`. Không chỉnh sửa trang chủ của repository.

## Tệp
- `index.html`: khung HTML.
- `style.css`: giao diện 2 cột, code tô sáng, phóng to.
- `engine.js`: mở khóa chặng, mô phỏng theo từng trạng thái, tô sáng code, quay lại, chạy tự động, kiểm tra đáp án.
- `lesson-data.js`: dữ liệu bài Túi quà đồng đều, bao gồm đề, câu hỏi, trạng thái mô phỏng, mã C++ và test.

## Tạo bài khác
Sao chép nguyên thư mục `templates/` sang `lessons/bai02/`, rồi chỉnh `lesson-data.js`: thay id, title, problem, questions, simulation.source và simulation.steps, solution.source và explanations.

**Giới hạn V1:** Các phép thử chia và kiểm tra đầu ra trong `engine.js` vẫn dành riêng cho dạng UCLN/Túi quà. Với mảng, xâu, tìm kiếm, v.v., phải phát triển bộ chấm và hoạt động khám phá riêng; không được dùng kiểm thử UCLN để chấm dạng khác.

## Kiểm thử
- Đã kiểm tra cú pháp JavaScript khi chuẩn bị phiên bản.
- Đã kiểm tra tính nhất quán dữ liệu và 5 bộ test UCLN bằng Node.js.
- Chưa kiểm tra hoàn chỉnh các thao tác click trên trình duyệt do môi trường thử nghiệm chặn truy cập localhost/file; cần kiểm tra tay 5 chặng trước khi phát cho học sinh.
- Kiểm tra các nút Bước trước, Bước tiếp, Chạy tự động, Phóng to, giải thích từng dòng và kết quả số lớn.

Mẫu truy cập qua GitHub Pages: `https://huunhantx84-coder.github.io/HSG-TIN9-CPP-ACADEMY/templates/`.
