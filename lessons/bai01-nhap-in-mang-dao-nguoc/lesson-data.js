window.LESSON={
  "id": "bai01-nhap-in-mang-dao-nguoc",
  "title": "Bài 1: Nhập và in mảng theo thứ tự đảo ngược",
  "source": [
    "#include <bits/stdc++.h>",
    "using namespace std;",
    "",
    "int main() {",
    "    int n;",
    "    int a[1000];",
    "",
    "    cin >> n;",
    "    for (int i = 0; i < n; i++) {",
    "        cin >> a[i];",
    "    }",
    "",
    "    for (int i = n - 1; i >= 0; i--) {",
    "        cout << a[i];",
    "        if (i > 0) cout << \" \";",
    "    }",
    "    cout << '\\n';",
    "    return 0;",
    "}"
  ],
  "explain": [
    "Nạp thư viện tổng hợp theo quy ước của lớp.",
    "Sử dụng cin, cout mà không phải viết std::.",
    "",
    "Chương trình bắt đầu.",
    "Khai báo số lượng phần tử n.",
    "Tạo mảng có tối đa 1000 ô, chỉ số hợp lệ 0..999.",
    "",
    "Nhập n trong khoảng 1 đến 1000.",
    "Chạy chỉ số i từ 0 tới n-1 để nhập đủ n phần tử.",
    "Lưu phần tử vừa nhập vào ô a[i].",
    "Kết thúc vòng lặp nhập.",
    "",
    "Đặt i ở ô cuối n-1, rồi giảm i tới 0.",
    "In giá trị tại ô a[i], không thay đổi mảng.",
    "Nếu chưa phải phần tử cuối cùng được in (i > 0), in thêm khoảng trắng.",
    "Kết thúc vòng lặp in ngược.",
    "In ký tự xuống dòng để kết thúc kết quả.",
    "Kết thúc hàm main.",
    "Kết thúc chương trình."
  ],
  "questions": [
    {
      "q": "Với n = 5, chỉ số của phần tử cuối cùng là bao nhiêu?",
      "opts": [
        "5",
        "4",
        "1"
      ],
      "correct": 1,
      "reason": "Chỉ số bắt đầu từ 0, nên ô cuối là a[n-1] = a[4]."
    },
    {
      "q": "Dãy 3 8 1 9 4 khi in từ cuối về đầu sẽ thành?",
      "opts": [
        "3 8 1 9 4",
        "4 9 1 8 3",
        "1 3 4 8 9"
      ],
      "correct": 1,
      "reason": "Lần lượt đọc a[4], a[3], a[2], a[1], a[0]."
    },
    {
      "q": "Vòng lặp in ngược nào đúng?",
      "opts": [
        "for (int i=n; i>=0; i--)",
        "for (int i=n-1; i>=0; i--)",
        "for (int i=0; i<n; i++)"
      ],
      "correct": 1,
      "reason": "Bắt đầu i=n-1, tiếp tục khi i>=0 và i-- sau mỗi bước."
    },
    {
      "q": "Với n=1 thì vòng lặp in ngược thực hiện bao nhiêu lần?",
      "opts": [
        "0 lần",
        "1 lần",
        "2 lần"
      ],
      "correct": 1,
      "reason": "i bắt đầu từ 0, in a[0] một lần rồi dừng khi i=-1."
    }
  ],
  "tests": [
    {
      "input": "5\n3 8 1 9 4",
      "output": "4 9 1 8 3"
    },
    {
      "input": "1\n7",
      "output": "7"
    },
    {
      "input": "3\n5 5 5",
      "output": "5 5 5"
    },
    {
      "input": "4\n-2 0 7 -9",
      "output": "-9 7 0 -2"
    },
    {
      "input": "6\n1 2 3 4 5 6",
      "output": "6 5 4 3 2 1"
    },
    {
      "input": "5\n0 -10 0 10 -10",
      "output": "-10 10 0 -10 0"
    }
  ]
};
