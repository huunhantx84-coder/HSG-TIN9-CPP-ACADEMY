window.LESSON={
  "id": "bai07-bao-cao-trung-binh",
  "title": "BÀI 07 — BÁO CÁO TRUNG BÌNH",
  "source": [
    "#include <bits/stdc++.h>",
    "using namespace std;",
    "",
    "int main() {",
    "    freopen(\"LUYEN07.INP\", \"r\", stdin);",
    "    freopen(\"LUYEN07.OUT\", \"w\", stdout);",
    "",
    "    int N;",
    "    cin >> N;",
    "    long long B;",
    "    long long tongTruoc = 0;",
    "    for (int i = 1; i <= N; i++) {",
    "        cin >> B;",
    "        long long tongHienTai = B * i;",
    "        long long doanhThu = tongHienTai - tongTruoc;",
    "        cout << doanhThu;",
    "        if (i < N) cout << \" \";",
    "        tongTruoc = tongHienTai;",
    "    }",
    "    cout << '\\n';",
    "    return 0;",
    "}"
  ],
  "explain": [
    "Nạp thư viện chuẩn GCC theo quy ước lớp học.",
    "Cho phép sử dụng trực tiếp cin, cout.",
    "",
    "Bắt đầu chương trình.",
    "Mở chính xác file LUYEN07.INP.",
    "Tạo file LUYEN07.OUT để xuất doanh thu.",
    "",
    "Số ngày, tối đa 100000.",
    "Đọc số ngày N.",
    "Số trung bình B có thể tới 10^9; dùng long long.",
    "Tổng doanh thu trước ngày hiện tại bắt đầu bằng 0.",
    "Duyệt tuần tự các ngày từ 1 đến N.",
    "Đọc trung bình cộng đến ngày i.",
    "Khôi phục tổng từ ngày 1 đến ngày i bằng trung bình nhân số ngày.",
    "Lấy tổng mới trừ tổng cũ, được doanh thu riêng ngày i.",
    "Ghi doanh thu ngày hiện tại.",
    "Chèn khoảng trắng giữa hai số, không chèn sau số cuối.",
    "Ghi nhớ tổng hiện tại để xử lý ngày tiếp theo.",
    "Đóng vòng lặp xử lý ngày.",
    "In ký tự xuống dòng.",
    "Trả về trạng thái kết thúc thành công.",
    "Kết thúc chương trình."
  ],
  "questions": [
    {
      "q": "B₃ = 25 cho biết điều gì?",
      "opts": [
        "Doanh thu riêng ngày 3 là 25",
        "Trung bình doanh thu 3 ngày đầu là 25",
        "Tổng 3 ngày đầu là 25"
      ],
      "correct": 1,
      "reason": "Bᵢ là doanh thu trung bình từ ngày 1 tới ngày i, không phải doanh thu riêng ngày i."
    },
    {
      "q": "Ngày 3 có B₃ = 25, ngày 2 có B₂ = 30. Doanh thu ngày 3 bằng bao nhiêu?",
      "opts": [
        "15",
        "25",
        "75"
      ],
      "correct": 0,
      "reason": "Tổng 3 ngày = 3×25=75; tổng 2 ngày = 2×30=60; chênh lệch là 15."
    },
    {
      "q": "Để xử lý N đến 100000 và Bᵢ tới 10^9, nên chọn gì?",
      "opts": [
        "int cho mọi phép tính",
        "long long và chỉ lưu tổng trước",
        "Duyệt lồng nhau để cộng lại mọi ngày"
      ],
      "correct": 1,
      "reason": "N×Bᵢ tới 10^14 nên cần long long. Lưu tổng trước giúp O(N), O(1)."
    },
    {
      "q": "Dòng lệnh nào tính đúng doanh thu ngày i?",
      "opts": [
        "doanhThu = B - tongTruoc",
        "doanhThu = B * i - tongTruoc",
        "doanhThu = B / i"
      ],
      "correct": 1,
      "reason": "B×i là tổng doanh thu đến ngày i; trừ tổng trước để nhận doanh thu riêng."
    }
  ],
  "tests": [
    {
      "input": "5\n20 30 25 35 40",
      "output": "20 40 15 65 60"
    },
    {
      "input": "1\n20",
      "output": "20"
    },
    {
      "input": "3\n0 0 0",
      "output": "0 0 0"
    },
    {
      "input": "4\n5 5 5 5",
      "output": "5 5 5 5"
    },
    {
      "input": "2\n100 50",
      "output": "100 0"
    },
    {
      "input": "3\n0 500000000 1000000000",
      "output": "0 1000000000 2000000000"
    },
    {
      "input": "3\n1000000000 1000000000 1000000000",
      "output": "1000000000 1000000000 1000000000"
    }
  ]
};
