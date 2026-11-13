# Bài 11 — Kiểm tra mã niêm phong

> Bản mô tả nội dung và thiết kế bài học. Đây là đặc tả để triển khai; chưa phải trang mô phỏng đã lập trình.

## 1. Mục tiêu
Dành cho học sinh bồi dưỡng HSG Tin học 9. Học sinh biết chuyển điều kiện “không có chữ số xuất hiện từ hai lần trở lên” thành thuật toán mảng đếm; kiểm tra từng mã độc lập; lưu đúng vị trí kiện hàng theo thứ tự ban đầu.

Kiến thức sử dụng: string, mảng đếm, for, if, bool, break, vector và đọc/ghi tệp. Lời giải đặt trong main, không bắt buộc chương trình con.

## 2. Đề bài và dữ liệu
Mỗi kiện hàng có mã là số nguyên dương, viết trong hệ thập phân thông thường, không thêm số 0 ở đầu. Mã được chấp nhận nếu không có chữ số nào xuất hiện từ hai lần trở lên. Chữ số 0 được xét như các chữ số khác.

Yêu cầu: đếm số kiện có mã được chấp nhận và in vị trí của chúng theo thứ tự ban đầu, vị trí tính từ 1.

- Tệp vào: LUYEN11.INP. Dòng 1 chứa N; dòng 2 chứa N mã X_1, ..., X_N.
- Giới hạn: 1 ≤ N ≤ 100000; 1 ≤ X_i ≤ 10^18.
- 40% số điểm: N ≤ 100 và X_i ≤ 10^6. 60% còn lại không có ràng buộc bổ sung.
- Tệp ra: LUYEN11.OUT. Dòng 1 ghi số kiện được chấp nhận. Dòng 2 ghi các vị trí tương ứng; nếu không có, ghi số 0 ở dòng 2.

### Ví dụ
Input:
```text
6
2031 2022 7 100 9876543210 121
```

Output:
```text
3
1 3 5
```

| Vị trí | Mã | Kết luận | Lý do |
|---|---|---|---|
| 1 | 2031 | Chấp nhận | Không có chữ số lặp |
| 2 | 2022 | Loại | Chữ số 2 lặp |
| 3 | 7 | Chấp nhận | Chỉ có một chữ số |
| 4 | 100 | Loại | Chữ số 0 lặp |
| 5 | 9876543210 | Chấp nhận | 10 chữ số khác nhau |
| 6 | 121 | Loại | Chữ số 1 lặp |

## 3. Cách hình thành thuật toán
1. Thu nhỏ bài toán: trước hết kiểm tra một mã.
2. Đọc từng chữ số và đặt câu hỏi: “Chữ số này đã xuất hiện chưa?”
3. Vì chỉ có 10 chữ số từ 0 đến 9, dùng mảng dem[10], ban đầu toàn 0.
4. Đọc mã bằng string vì chỉ cần xét chữ số, không cần tính toán với giá trị của mã.
5. Với ký tự ma[j], chuyển thành chữ số bằng d = ma[j] - '0'.
6. Tăng dem[d]. Nếu dem[d] > 1, mã bị loại; đặt hopLe = false và break.
7. Nếu duyệt hết mã mà không lặp, lưu vị trí kiện hàng.
8. Lặp lại cho N mã; mỗi mã phải có mảng đếm mới và hopLe = true.

Câu chốt: **Đọc từng chữ số, đếm số lần xuất hiện; gặp lần thứ hai thì loại mã, hết mã mà không lặp thì lưu vị trí.**

Phân biệt: i là vị trí kiện hàng, bắt đầu từ 1; j là chỉ số ký tự trong xâu, bắt đầu từ 0. break chỉ thoát vòng lặp xét chữ số, vẫn xét kiện tiếp theo.

### Truy vết mã 2032
| Bước | j | ma[j] | d | Thay đổi | Kết luận |
|---|---|---|---|---|---|
| 1 | 0 | '2' | 2 | dem[2]: 0 → 1 | Tiếp tục |
| 2 | 1 | '0' | 0 | dem[0]: 0 → 1 | Tiếp tục |
| 3 | 2 | '3' | 3 | dem[3]: 0 → 1 | Tiếp tục |
| 4 | 3 | '2' | 2 | dem[2]: 1 → 2 | hopLe = false; dừng kiểm tra mã |

## 4. Thuật toán bằng lời
- Nhập N, tạo vector viTri rỗng.
- Với i từ 1 đến N:
  - Nhập ma.
  - Khởi tạo dem[10] toàn 0 và hopLe = true.
  - Duyệt j từ 0 đến ma.size() - 1:
    - d = ma[j] - '0'.
    - Tăng dem[d].
    - Nếu dem[d] > 1: đặt hopLe = false và thoát vòng lặp trong.
  - Nếu hopLe: thêm i vào viTri.
- In viTri.size().
- Nếu viTri rỗng, in 0 ở dòng 2; ngược lại in các phần tử của viTri.

## 5. Code C++ tham chiếu
```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    freopen("LUYEN11.INP", "r", stdin);
    freopen("LUYEN11.OUT", "w", stdout);

    int n;
    cin >> n;
    vector<int> viTri;

    for (int i = 1; i <= n; i++)
    {
        string ma;
        cin >> ma;
        int dem[10] = {};
        bool hopLe = true;

        for (int j = 0; j < (int)ma.size(); j++)
        {
            int d = ma[j] - '0';
            dem[d]++;
            if (dem[d] > 1)
            {
                hopLe = false;
                break;
            }
        }

        if (hopLe)
            viTri.push_back(i);
    }

    cout << viTri.size() << '\n';
    if (viTri.empty())
        cout << 0;
    else
    {
        for (int j = 0; j < (int)viTri.size(); j++)
        {
            if (j > 0) cout << ' ';
            cout << viTri[j];
        }
    }
    cout << '\n';
    return 0;
}
```

## 6. Tính đúng và độ phức tạp
Sau mỗi lần tăng dem[d], giá trị đó là số lần gặp d trong phần mã đã đọc. Nếu vượt 1, mã chắc chắn chứa chữ số lặp. Nếu duyệt hết mà không có giá trị vượt 1, tất cả chữ số khác nhau. Các kiện được xét từ 1 đến N nên vector kết quả giữ đúng thứ tự vị trí.

Gọi L là độ dài mã lớn nhất: thời gian O(N × L), bộ nhớ O(N) để lưu vị trí, mảng đếm có kích thước cố định 10. Với X_i ≤ 10^18, L ≤ 19. Mã dài hơn 10 chữ số chắc chắn bị loại, nhưng không cần thêm nhánh tối ưu trong bài giảng cơ bản.

## 7. Mô tả bài học tương tác 5 chặng
Giữ cách tổ chức bài học trong repository; nội dung sau là yêu cầu triển khai.

### Chặng 1 — Hiểu đề
- Hiển thị 6 kiện hàng của ví dụ, có nhãn vị trí và mã riêng biệt.
- Học sinh chọn các kiện hợp lệ rồi giải thích chữ số lặp.
- Câu hỏi mở khóa: “Đầu ra cần mã hay vị trí?” Đáp án: vị trí.

### Chặng 2 — Khám phá cách ghi nhớ
- Cho học sinh lần lượt đọc mã 2032.
- Hiển thị 10 ô có nhãn 0–9, ban đầu giá trị 0.
- Khi gặp chữ số, tăng đúng ô; lần thứ hai đổi màu cảnh báo.
- Câu hỏi: “Vì sao chỉ cần 10 ô?” Đáp án: có 10 chữ số 0–9.
- Ví dụ đối chiếu 12 và 23: cả hai hợp lệ vì kiểm tra độc lập.

### Chặng 3 — Hình thành thuật toán
- Học sinh sắp xếp các bước: nhập mã → reset mảng đếm → duyệt chữ số → tăng đếm → phát hiện lặp → lưu vị trí nếu hợp lệ.
- Giải thích rõ ma[j] - '0', bool, break và vị trí reset dem.
- Câu hỏi: “Phát hiện lặp có cần đọc tiếp mã này không?” Đáp án: không.

### Chặng 4 — Mô phỏng và đọc code
- Bố cục trình chiếu rõ ràng: code bên trái; trạng thái và lịch sử bên phải; vùng output riêng.
- Tô sáng đúng dòng C++ tương ứng bước đang chạy.
- Hiển thị i, ma, j, ma[j], d, hopLe, dem[0..9], viTri.
- Có Bước trước, Bước tiếp, Tự chạy, Tạm dừng, Làm lại, chỉnh tốc độ và phóng to.
- Khi đổi kiện: hiển thị rõ cả 10 ô đếm về 0 và hopLe trở lại true.
- Khi dem[d] lên 2: hiển thị lần lượt phát hiện lặp, đổi cờ, break, chuyển kiện.
- Khi mã hợp lệ: thêm i vào danh sách, không thêm giá trị ma.
- Dữ liệu mặc định dùng đúng ví dụ đề; truy vết phải dẫn đến output 3 và 1 3 5.
- Chạy tự động mặc định khoảng 1,5–2 giây mỗi bước; nút bước trước khôi phục đầy đủ trạng thái.
- Lịch sử giải thích bằng tiếng Việt, ví dụ: “Gặp chữ số 2 lần thứ hai → loại kiện 2”.
- Nếu triển khai bằng JavaScript, giữ mã dạng chuỗi từ đầu đến cuối; không chuyển toàn mã sang Number vì có thể mất chính xác ở số lớn.

### Chặng 5 — Luyện tập và tự kiểm tra
- Học sinh dự đoán output, tìm lỗi quên reset, phân biệt chữ số '0' và giá trị 0.
- So sánh output theo các số và thứ tự, cho phép khác khoảng trắng.
- Công cụ so sánh output phải ghi rõ chức năng; không tuyên bố đã biên dịch code C++ nếu không có trình biên dịch.
- Câu hỏi mở rộng: “Mã dài 11 chữ số có thể hợp lệ không?” Đáp án: không.

## 8. Bộ kiểm tra nghiệm thu
Dấu / trong cột output biểu thị xuống dòng.

| Trường hợp | N | Các mã | Output |
|---|---:|---|---|
| Ví dụ đề | 6 | 2031 2022 7 100 9876543210 121 | 3 / 1 3 5 |
| Một chữ số | 1 | 7 | 1 / 1 |
| Không có mã hợp lệ | 3 | 11 100 121 | 0 / 0 |
| Reset giữa các mã | 2 | 12 23 | 2 / 1 2 |
| Số 0 bình thường | 3 | 10 102 100 | 2 / 1 2 |
| Lặp ở cuối | 2 | 12341 12345 | 1 / 2 |
| Biên lớn | 2 | 1000000000000000000 9876543210 | 1 / 2 |
| Hai kiện cùng mã hợp lệ | 2 | 123 123 | 2 / 1 2 |
| Hơn 10 chữ số | 1 | 12345678901 | 0 / 0 |

Khi triển khai cần kiểm tra: chạy/nhấn từng bước cho cùng kết quả; bước trước và reset đúng; dừng tự chạy ở cuối; thay input hủy lượt chạy cũ; không dùng bộ kiểm tra UCLN của template cho bài này. Kiểm thử hiệu năng với N = 100000 riêng với lời giải; mô phỏng trên màn hình nên dùng tập nhỏ và thông báo giới hạn hiển thị.

## 9. Phạm vi bản đăng này
Bổ sung bản mô tả Bài 11 vào lessons/bai11-kiem-tra-ma-niem-phong/README.md. Trang HTML, engine mô phỏng và liên kết từ trang chủ là công việc triển khai tiếp theo; bản mô tả không xác nhận các phần đó đã hoàn thành.
