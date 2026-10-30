#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    int a[100005];

    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    sort(a, a + n);

    int dem = 1;
    for (int i = 1; i < n; i++) {
        if (a[i] != a[i - 1]) {
            dem++;
        }
    }

    cout << dem;
    return 0;
}
