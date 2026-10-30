# Bài 07 — Báo cáo trung bình

Đề LUYEN07.INP -> LUYEN07.OUT, N<=100000, 0<=B_i<=10^9, đảm bảo tồn tại doanh thu nguyên không âm.
Ý tưởng: lưu trung bình vào mảng B, tính A[1] = B[1], A[i] = i*B[i] - (i-1)*B[i-1] (i>=2), rồi in A. Hai mảng long long B[100001], A[100001], chỉ số 1..N. O(N) thời gian và O(N) bộ nhớ.

Website gồm 5 chặng: đọc hiểu, khám phá, hình thành thuật toán, mô phỏng C++ 2 cột, tự lập trình và kiểm tra. Chặng 4 chỉ mô phỏng tối đa 12 ngày để dễ theo dõi; kiểm tra dữ liệu hỗ trợ N đến 100000. JavaScript dùng BigInt để không mất chính xác khi tính tới 10^14.

Các tệp: index.html, style.css, lesson-data.js, engine.js, solution.cpp, README.md.
Chương trình C++ đọc file tên chính xác LUYEN07.INP và ghi LUYEN07.OUT.
Mọi câu tự luận đều tự đối chiếu, không chấm ngữ nghĩa tự động. Test trên trang tính đầu ra bằng JS, không biên dịch mã C++.
Tiến độ lưu localStorage trên trình duyệt; không tự gửi về giáo viên.
