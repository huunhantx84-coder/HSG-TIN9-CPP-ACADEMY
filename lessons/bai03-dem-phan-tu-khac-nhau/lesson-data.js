window.HSG_LESSON = {
  "id": "bai03-dem-khac-nhau-v1",
  "sample": [
    15,
    3,
    15,
    1000000000,
    3,
    15
  ],
  "sorted": [
    3,
    3,
    15,
    15,
    15,
    1000000000
  ],
  "source": [
    "#include <bits/stdc++.h>",
    "using namespace std;",
    "",
    "int main() {",
    "    ios::sync_with_stdio(false);",
    "    cin.tie(nullptr);",
    "",
    "    int n;",
    "    cin >> n;",
    "    int a[100005];",
    "",
    "    for (int i = 0; i < n; i++) {",
    "        cin >> a[i];",
    "    }",
    "",
    "    sort(a, a + n);",
    "",
    "    int dem = 1;",
    "    for (int i = 1; i < n; i++) {",
    "        if (a[i] != a[i - 1]) {",
    "            dem++;",
    "        }",
    "    }",
    "",
    "    cout << dem;",
    "    return 0;",
    "}"
  ],
  "explain": [
    "Nạp thư viện C++ cần dùng để nhập xuất và sắp xếp.",
    "Cho phép dùng cin, cout, sort mà không cần viết std:: phía trước.",
    "Dòng trống để phân chia các phần.",
    "Hàm main là nơi bắt đầu chương trình.",
    "Tăng tốc nhập xuất cho dữ liệu lớn.",
    "Tách cin khỏi cout để đọc nhanh hơn.",
    "Dòng trống để dễ theo dõi.",
    "Khai báo n là số phần tử của mảng.",
    "Đọc n từ dữ liệu đầu vào.",
    "Tạo mảng a đủ chỗ chứa tới 100.000 số; số không vượt 10⁹ nên int là đủ.",
    "Dòng trống để dễ theo dõi.",
    "Lặp i từ 0 đến n-1 để nhập lần lượt các phần tử.",
    "Nhập giá trị vào ô a[i] của mảng.",
    "Kết thúc vòng lặp nhập mảng.",
    "Dòng trống để dễ theo dõi.",
    "Sắp xếp toàn bộ mảng tăng dần. Các số giống nhau sẽ đứng cạnh nhau.",
    "Dòng trống để dễ theo dõi.",
    "Bắt đầu dem = 1 vì mảng không rỗng, giá trị đầu tiên được đếm một lần.",
    "Duyệt từ phần tử thứ hai đến phần tử cuối để so sánh với ô đứng trước.",
    "Nếu a[i] khác a[i-1] thì vừa xuất hiện một giá trị mới.",
    "Tăng dem thêm một vì tìm được giá trị mới.",
    "Đóng khối điều kiện if.",
    "Kết thúc vòng lặp duyệt mảng.",
    "Dòng trống để dễ theo dõi.",
    "In số lượng giá trị khác nhau.",
    "Thông báo chương trình kết thúc thành công.",
    "Đóng hàm main."
  ],
  "questions": {
    "read": [
      [
        "Bài toán đếm gì?",
        [
          "Số phần tử",
          "Số giá trị khác nhau",
          "Giá trị lớn nhất"
        ],
        1
      ],
      [
        "Số 15 xuất hiện 3 lần thì đếm mấy lần?",
        [
          "Một lần",
          "Ba lần",
          "Không lần nào"
        ],
        0
      ]
    ],
    "explore": [
      [
        "Sau sắp xếp, số bằng nhau nằm ở đâu?",
        [
          "Cạnh nhau",
          "Ở hai đầu mảng"
        ],
        0
      ]
    ],
    "algorithm": [
      [
        "Khi nào tăng biến dem?",
        [
          "a[i] == a[i-1]",
          "a[i] != a[i-1]"
        ],
        1
      ]
    ],
    "simulation": [
      [
        "Nếu hai phần tử kề nhau bằng nhau thì?",
        [
          "Tăng dem",
          "Giữ dem"
        ],
        1
      ]
    ],
    "coding": [
      [
        "Tại sao dem bắt đầu bằng 1?",
        [
          "Vì n luôn bằng 1",
          "Vì có ít nhất một phần tử"
        ],
        1
      ],
      [
        "Chọn cách phù hợp n=100000?",
        [
          "So sánh mọi cặp O(n²)",
          "sort rồi duyệt O(n log n)"
        ],
        1
      ]
    ]
  },
  "cases": [
    [
      6,
      15,
      3,
      15,
      1000000000,
      3,
      15
    ],
    [
      5,
      4,
      4,
      4,
      4,
      4
    ],
    [
      1,
      999999999
    ],
    [
      5,
      1,
      2,
      3,
      4,
      5
    ],
    [
      8,
      2,
      7,
      2,
      7,
      2,
      7,
      2,
      7
    ]
  ]
};