# Bài 02 – Tìm phần tử lớn thứ nhì khác biệt

Bài tự học 5 chặng dành cho học sinh lớp 9 đã học mảng, vòng lặp, điều kiện, sắp xếp.

## Thuật toán
Dùng sort() tăng dần O(n log n), lấy maxValue = a[n-1], duyệt từ n-2 về 0 tìm a[i] < maxValue. Nếu không tìm được, in NOT FOUND.

## Tệp
- index.html: trang bài học
- style.css: giao diện hai cột, code và trạng thái
- lesson-data.js: nội dung, câu hỏi, C++ minh họa
- engine.js: logic mô phỏng và kiểm tra 5 chặng
- BAI02.cpp: code C++ độc lập đã biên dịch và kiểm tra

## Kiểm thử
BAI02.cpp biên dịch g++ -std=c++17 -O2 -Wall -Wextra -pedantic và vượt 2010 bộ test (bao gồm 2000 ngẫu nhiên, 100000 phần tử, số âm, trùng lặp, n=2). JavaScript kiểm tra cú pháp bằng new Function() trên nội dung lưu tại GitHub. Chưa xác nhận mọi thao tác click bằng trình duyệt thực.

Website: https://huunhantx84-coder.github.io/HSG-TIN9-CPP-ACADEMY/lessons/bai02-gia-tri-lon-thu-nhi/
