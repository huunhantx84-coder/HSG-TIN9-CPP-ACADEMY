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
    "    long long B[100001], A[100001];",
    "",
    "    for (int i = 1; i <= N; i++) {",
    "        cin >> B[i];",
    "    }",
    "",
    "    for (int i = 1; i <= N; i++) {",
    "        if (i == 1)",
    "            A[i] = B[i];",
    "        else",
    "            A[i] = i * B[i] - (i - 1) * B[i - 1];",
    "    }",
    "",
    "    for (int i = 1; i <= N; i++) {",
    "        cout << A[i];",
    "        if (i < N) cout << \" \";",
    "    }",
    "    cout << '\\n';",
    "    return 0;",
    "}"
  ],
  "explain": [
    "Nạp thư viện theo quy ước lớp học.",
    "Sử dụng không gian tên chuẩn.",
    "",
    "Bắt đầu hàm main.",
    "Mở tệp đầu vào LUYEN07.INP.",
    "Mở tệp kết quả LUYEN07.OUT.",
    "",
    "Khai báo số ngày N.",
    "Đọc số ngày.",
    "Hai mảng một chiều long long: B lưu trung bình, A lưu doanh thu; chỉ số từ 1 đến N.",
    "",
    "Vòng lặp duyệt để nhập mảng B.",
    "Nhập B[i], trung bình đến ngày i.",
    "Kết thúc vòng nhập.",
    "",
    "Vòng lặp duyệt để tính từng phần tử mảng A.",
    "Kiểm tra có phải ngày đầu tiên không.",
    "Nếu ngày 1, doanh thu A[1] bằng B[1].",
    "Nếu không phải ngày đầu tiên.",
    "Lấy tổng tích lũy ngày i trừ tổng của i−1 ngày trước.",
    "Kết thúc vòng tính toán.",
    "",
    "Vòng lặp duyệt lần lượt mảng kết quả A.",
    "In doanh thu A[i].",
    "Chèn dấu cách giữa các kết quả.",
    "Kết thúc vòng in.",
    "Kết thúc kết quả bằng xuống dòng.",
    "Trả về trạng thái thành công.",
    "Kết thúc main."
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
      "q": "Với N đến 100000, nên khai báo mảng thế nào?",
      "opts": [
        "int B[100] và int A[100]",
        "long long B[100001], A[100001]",
        "vector và sort"
      ],
      "correct": 1,
      "reason": "Dùng hai mảng một chiều long long đủ chỉ số 1..100000; phép nhân i*B[i] có thể lớn đến 10^14."
    },
    {
      "q": "Công thức đúng cho ngày i từ 2 trở đi?",
      "opts": [
        "A[i] = B[i] - B[i-1]",
        "A[i] = i * B[i] - (i-1) * B[i-1]",
        "A[i] = B[i] / i"
      ],
      "correct": 1,
      "reason": "Hiệu tổng doanh thu từ ngày 1 tới i và tổng đến i-1 là doanh thu riêng ngày i."
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
