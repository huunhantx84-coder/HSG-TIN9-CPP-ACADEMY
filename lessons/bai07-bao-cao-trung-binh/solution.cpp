#include <bits/stdc++.h>
using namespace std;

int main() {
    freopen("LUYEN07.INP", "r", stdin);
    freopen("LUYEN07.OUT", "w", stdout);

    int N;
    cin >> N;
    long long B;
    long long tongTruoc = 0;
    for (int i = 1; i <= N; i++) {
        cin >> B;
        long long tongHienTai = B * i;
        long long doanhThu = tongHienTai - tongTruoc;
        cout << doanhThu;
        if (i < N) cout << " ";
        tongTruoc = tongHienTai;
    }
    cout << '\n';
    return 0;
}