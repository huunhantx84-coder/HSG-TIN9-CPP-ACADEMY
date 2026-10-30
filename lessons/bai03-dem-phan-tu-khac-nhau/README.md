# Bài 03 – Đếm số lượng phần tử khác nhau trong mảng lớn

Nội dung bài trên tài liệu nguồn ghi “Bài 5”; trong khóa học tương tác được đánh số **Bài 03** theo yêu cầu giáo viên.

## Hướng giải

Sắp xếp mảng tăng dần bằng `sort(a, a + n)`, đặt `dem = 1`, duyệt `i = 1..n-1`, nếu `a[i] != a[i-1]` thì tăng đếm. In `dem`. Không dùng Frequency Array, `set` hay `unordered_set`.

## Các tệp

- `index.html`: trang bài học 5 chặng.
- `style.css`: giao diện và code editor.
- `lesson-data.js`: dữ liệu, code C++, giải thích từng dòng bằng tiếng Việt và bộ test mẫu.
- `engine.js`: xử lý mở khóa, mô phỏng hai cột, kiểm tra, kiểm thử tương tác.
- `BAI03.cpp`: lời giải C++ chạy độc lập.

## Giới hạn

`1 ≤ n ≤ 100000`, `1 ≤ a[i] ≤ 10^9`.

## Kiểm tra nghiệm thu

1. Chặng 1 trả lời 2 câu và mở chặng 2.
2. Chặng 2 xem mảng trước và sau sắp xếp, thử ít nhất 3 cặp để phát hiện quy luật.
3. Chặng 3 trả lời câu hỏi, giải thích ít nhất 10 từ, mở chặng 4.
4. Chặng 4 code hiển thị đầy đủ; Bước trước, Bước tiếp, Chạy tự động, Reset và phóng to hoạt động; giá trị đếm đúng.
5. Chặng 5 giải thích từng dòng tiếng Việt, kiểm thử được dữ liệu nhập của người học.
6. Chạy các bộ test C++ ở `BAI03.cpp` và so khớp output.

Trang này độc lập trong `lessons/bai03-dem-phan-tu-khac-nhau/`; không thay đổi trang chủ hay Bài 01 và Bài 02.