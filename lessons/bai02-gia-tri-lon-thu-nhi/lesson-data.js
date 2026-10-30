window.LESSON02={title:"Tìm phần tử lớn thứ nhì khác biệt",sample:[7,2,7,5,3],source:["#include <bits/stdc++.h>","using namespace std;","","int main() {","    ios::sync_with_stdio(false);","    cin.tie(nullptr);","    int n;","    cin >> n;","    long long a[100005];","    for (int i = 0; i < n; i++) cin >> a[i];","    sort(a, a + n);","    long long maxValue = a[n - 1];","    for (int i = n - 2; i >= 0; i--) {","        if (a[i] < maxValue) {","            cout << a[i];","            return 0;","        }","    }","    cout << \"NOT FOUND\";","    return 0;","}"]};
window.LESSON02.explanations=[
"Đưa thư viện C++ vào chương trình để sử dụng các lệnh nhập xuất và sắp xếp.",
"Cho phép dùng cin, cout, sort mà không cần viết std:: phía trước.",
"Dòng trống để ngăn cách các phần của chương trình.",
"Đây là hàm main, nơi chương trình bắt đầu chạy.",
"Thiết lập cách nhập xuất nhanh hơn khi xử lí nhiều dữ liệu.",
"Giúp việc nhập dữ liệu bằng cin hoạt động nhanh hơn.",
"Khai báo biến n để lưu số lượng phần tử của dãy.",
"Đọc số lượng phần tử n từ dữ liệu vào.",
"Tạo mảng a có đủ chỗ chứa tối đa 100.000 số; dùng long long để lưu số nguyên lớn.",
"Duyệt từ vị trí 0 đến n - 1, lần lượt nhập từng phần tử vào mảng a.",
"Sắp xếp toàn bộ mảng a theo thứ tự tăng dần, từ nhỏ đến lớn.",
"Vì mảng đã tăng dần, phần tử cuối a[n - 1] là giá trị lớn nhất; lưu vào maxValue.",
"Bắt đầu từ phần tử ngay trước vị trí cuối, đi ngược về đầu mảng để tìm giá trị nhỏ hơn lớn nhất.",
"Nếu a[i] nhỏ hơn maxValue thì đó chính là giá trị lớn thứ nhì khác biệt cần tìm.",
"In ra giá trị a[i] vừa tìm được.",
"Kết thúc chương trình ngay vì đã tìm thấy đáp án; không cần duyệt tiếp.",
"Đóng khối lệnh if (điều kiện nhỏ hơn giá trị lớn nhất).",
"Đóng vòng lặp duyệt ngược mảng.",
"Nếu duyệt hết mà không tìm được số nhỏ hơn maxValue, mọi phần tử đều bằng nhau; in NOT FOUND.",
"Kết thúc hàm main với trạng thái thành công.",
"Đóng hàm main."
];
