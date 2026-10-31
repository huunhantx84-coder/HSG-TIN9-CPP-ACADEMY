# Bài 10 — Phân tích ra thừa số nguyên tố

Website tự học 5 chặng cho HSG Tin 9. Được giáo viên duyệt ngày 31/10/2026.

- Input: 2 ≤ n ≤ 10^9; stdin/stdout.
- Phương pháp: thử ước tăng dần, chia lặp; O(sqrt(n)), O(1) bộ nhớ phụ.
- Lời giải C++ chỉ dùng biến đơn, for, while, if. Không mảng/vector.
- Mô phỏng 2 cột, highlight code, bước trước/tiếp, tự động/tạm dừng/reset, phóng to (Esc để đóng), lịch sử 5 bước.
- Các lượt thử ước liên tiếp không chia hết được gộp và ghi rõ; phép chia thành công được mô phỏng riêng.
- Câu hỏi mở khóa 5 chặng; tiến độ lưu cục bộ, không gửi giáo viên.
- Công cụ kiểm tra output không biên dịch C++.
- Không dùng thư viện web bên ngoài. Mở index.html để học ngoại tuyến, hoặc dùng GitHub Pages.

## Kiểm thử thực tế

- g++ -std=c++17 -O2 -Wall -Wextra -pedantic: PASS, không cảnh báo.
- 210 ca C++ đối chiếu tham chiếu độc lập: PASS (biên, lũy thừa, số nguyên tố, 200 ca ngẫu nhiên).
- 111 ca đối chiếu C++/JavaScript: PASS.
- 2.009 traces JavaScript: kết quả khớp hàm phân tích, chỉ số highlight hợp lệ; source và giải thích đều 23 dòng.
- Chromium headless: PASS mở khóa đúng/sai, reload tiến độ, khám phá, bước trước/tiếp, tự động/tạm dừng, reset, kiểm tra input/output, phóng to/Esc, không lỗi pageerror.
- Ảnh desktop 1440×900 và mobile 390×844 đã kiểm tra; mobile không tràn ngang toàn trang.

## Tệp

index.html (khung và code fallback), style.css, engine.js (UI/mô phỏng), lesson-data.js (câu hỏi/code/test), solution.cpp, README.md.
