# Bài 3 – Phân loại chẵn và lẻ vào hai vector

Bài học tự học C++ cho đội tuyển HSG Tin 9. 5 chặng: đọc hiểu đề, khám phá, hình thành thuật toán, mô phỏng từng bước với code tô sáng, lập trình và kiểm tra.

## Phương pháp
Dùng `for` đọc lần lượt n số; `if (x % 2 == 0)` đưa vào `chan.push_back(x)`, ngược lại đưa vào `le.push_back(x)`. Hai vector giữ nguyên thứ tự. Thời gian O(n), bộ nhớ O(n). Không dùng sort/set/map hay đệ quy.

## Các tệp
- index.html: trang 5 chặng.
- style.css: giao diện responsive.
- lesson-data.js: câu hỏi, đáp án, code, giải thích và bộ test.
- engine.js: tương tác, mở khóa, mô phỏng, kiểm tra.
- solution.cpp: mã C++ độc lập.

## Kiểm tra
Biên dịch: `g++ -std=c++17 -O2 -Wall -Wextra -pedantic solution.cpp -o solution`.
Ví dụ: n=6, dãy 3 8 2 7 9 4 → Chan (3): 8 2 4; Le (3): 3 7 9.
Các trường hợp bổ sung: n=1; số 0; tất cả chẵn; tất cả lẻ; số âm; giá trị trùng; n=100000.

Bộ kiểm tra trên trang là mô phỏng bằng JavaScript, không phải trình biên dịch C++. Số nguyên trong bài C++ sử dụng int 32-bit vì đề gốc chưa nêu miền giá trị từng phần tử. Trang không gửi dữ liệu học sinh về máy chủ.
