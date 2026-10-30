window.LESSON = {
  "title": "Bài 3: Phân loại chẵn và lẻ vào hai vector riêng biệt",
  "id": "bai03-phan-loai-chan-le",
  "sample": [
    3,
    8,
    2,
    7,
    9,
    4
  ],
  "source": [
    "#include <iostream>",
    "#include <vector>",
    "using namespace std;",
    "",
    "int main() {",
    "    int n, x;",
    "    cin >> n;",
    "    vector<int> chan, le;",
    "    for (int i = 0; i < n; i++) {",
    "        cin >> x;",
    "        if (x % 2 == 0) {",
    "            chan.push_back(x);",
    "        } else {",
    "            le.push_back(x);",
    "        }",
    "    }",
    "    cout << \"Chan (\" << chan.size() << \"): \";",
    "    for (int i = 0; i < (int)chan.size(); i++) cout << chan[i] << \" \";",
    "    cout << \"\\nLe (\" << le.size() << \"): \";",
    "    for (int i = 0; i < (int)le.size(); i++) cout << le[i] << \" \";",
    "    return 0;",
    "}"
  ],
  "explain": [
    "Nạp thư viện nhập và xuất dữ liệu.",
    "Nạp thư viện vector.",
    "Dùng tên chuẩn std trực tiếp.",
    "Dòng trống giúp code dễ đọc.",
    "Bắt đầu chương trình.",
    "Khai báo n và x.",
    "Đọc số lượng phần tử n.",
    "Tạo hai vector rỗng.",
    "Duyệt n số từ i=0 tới n-1.",
    "Đọc từng x mà không cần lưu mảng gốc.",
    "Kiểm tra x chia hết cho 2.",
    "Thêm số chẵn vào cuối vector chan.",
    "Nhánh còn lại khi điều kiện sai.",
    "Thêm số lẻ vào cuối vector le.",
    "Kết thúc rẽ nhánh.",
    "Kết thúc vòng for.",
    "In nhãn và số lượng số chẵn.",
    "Duyệt và in các phần tử chẵn.",
    "In nhãn và số lượng số lẻ.",
    "Duyệt và in các phần tử lẻ.",
    "Kết thúc chương trình thành công.",
    "Đóng hàm main."
  ],
  "questions": [
    {
      "question": "Đề yêu cầu phân loại theo tiêu chí nào?",
      "choices": [
        "Số lớn / số bé",
        "Số chẵn / số lẻ",
        "Số nguyên tố / hợp số"
      ],
      "answer": 1,
      "reason": "Phân nhóm theo tính chẵn lẻ, không cần sắp xếp."
    },
    {
      "question": "Số 0 thuộc nhóm nào?",
      "choices": [
        "Chẵn",
        "Lẻ",
        "Không thuộc nhóm"
      ],
      "answer": 0,
      "reason": "0 % 2 = 0, nên 0 là số chẵn."
    },
    {
      "question": "Nhóm chẵn trong dãy 3 8 2 7 9 4 có thứ tự nào?",
      "choices": [
        "2 4 8",
        "8 2 4",
        "3 7 9"
      ],
      "answer": 1,
      "reason": "Phải giữ nguyên thứ tự xuất hiện."
    },
    {
      "question": "Thêm x vào cuối vector chan bằng lệnh nào?",
      "choices": [
        "chan.push_back(x);",
        "chan.size(x);",
        "chan = x;"
      ],
      "answer": 0,
      "reason": "push_back(x) thêm giá trị vào cuối vector."
    },
    {
      "question": "Cách nào phân loại n số chỉ với một lượt duyệt?",
      "choices": [
        "for đọc x, sau đó if/else",
        "Sắp xếp cả dãy trước",
        "Lặp vô hạn"
      ],
      "answer": 0,
      "reason": "for duyệt n lần và if/else chọn nhóm."
    },
    {
      "question": "Lấy số phần tử vector le bằng cách nào?",
      "choices": [
        "le.push_back()",
        "le.size()",
        "le[0]"
      ],
      "answer": 1,
      "reason": "size() trả về kích thước vector."
    },
    {
      "question": "Nếu tất cả số đều lẻ thì chan.size() bằng bao nhiêu?",
      "choices": [
        "1",
        "n",
        "0"
      ],
      "answer": 2,
      "reason": "Không có số chẵn, vector chan rỗng."
    },
    {
      "question": "Vì sao thuật toán có thời gian O(n)?",
      "choices": [
        "Mỗi số được phân loại một lần",
        "So sánh mọi cặp số",
        "Dùng hai vòng lặp lồng nhau"
      ],
      "answer": 0,
      "reason": "Duyệt nhập một lần, tổng hai lượt in là n phần tử."
    },
    {
      "question": "Điều kiện nào xét chẵn đúng cả với số âm?",
      "choices": [
        "x % 2 == 0",
        "x / 2 == 0",
        "x > 0"
      ],
      "answer": 0,
      "reason": "Số âm chẵn vẫn có số dư chia 2 bằng 0."
    }
  ],
  "tests": [
    {
      "input": "6\n3 8 2 7 9 4",
      "even": [
        8,
        2,
        4
      ],
      "odd": [
        3,
        7,
        9
      ]
    },
    {
      "input": "1\n0",
      "even": [
        0
      ],
      "odd": []
    },
    {
      "input": "4\n1 3 5 7",
      "even": [],
      "odd": [
        1,
        3,
        5,
        7
      ]
    },
    {
      "input": "4\n2 4 6 8",
      "even": [
        2,
        4,
        6,
        8
      ],
      "odd": []
    },
    {
      "input": "5\n-2 -3 0 -3 8",
      "even": [
        -2,
        0,
        8
      ],
      "odd": [
        -3,
        -3
      ]
    },
    {
      "input": "5\n2 2 3 3 2",
      "even": [
        2,
        2,
        2
      ],
      "odd": [
        3,
        3
      ]
    }
  ]
};
