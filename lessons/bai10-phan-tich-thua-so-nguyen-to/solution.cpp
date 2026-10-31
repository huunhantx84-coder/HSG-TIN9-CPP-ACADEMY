#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long n;
    cin >> n;
    int dem = 0;
    for (long long i = 2; i * i <= n; i++) {
        while (n % i == 0) {
            if (dem > 0) cout << " * ";
            cout << i;
            dem++;
            n /= i;
        }
    }
    if (n > 1) {
        if (dem > 0) cout << " * ";
        cout << n;
    }
    return 0;
}
