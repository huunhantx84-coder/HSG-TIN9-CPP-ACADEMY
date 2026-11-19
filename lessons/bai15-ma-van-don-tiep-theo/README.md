# Bài 15 — Cách 2

Thử lần lượt Y > X; kiểm tra chữ số bằng hopLe và mảng bool 10 ô. Mô phỏng đúng ví dụ X=2022, 9 ứng viên 2023…2031; không gộp ẩn lời gọi.

Kiến thức: hàm, truyền theo giá trị, bool, if, while, %, chia nguyên và mảng đánh dấu. Không dùng đệ quy. Thời gian O(KD), có thể phải thử hàng chục triệu ứng viên; chưa khẳng định đạt toàn bộ điểm.

5 chặng, mô phỏng 2 cột, code có sẵn khi JS chưa chạy, câu hỏi và giải thích từng dòng. Giáo viên đã duyệt xuất bản lên GitHub Pages.

## Kiểm tra trước xuất bản

- C++17 với -O2 -Wall -Wextra -pedantic: 86 ca đúng, gồm biên 10 chữ số và đối chiếu tham chiếu miền nhỏ.
- Trace: 9 mảng đánh dấu mới, 8 lần trả false, 1 lần trả true; Output chỉ xuất hiện ở cout.
- 233 kiểm tra tương tác và trạng thái bằng DOM mô phỏng đạt.
- Chưa kiểm tra bố cục bằng trình duyệt thực vì môi trường chặn khởi chạy. Giáo viên đã duyệt bản với giới hạn này.
