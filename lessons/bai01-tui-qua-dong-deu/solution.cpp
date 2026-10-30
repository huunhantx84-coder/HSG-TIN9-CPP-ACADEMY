#include <bits/stdc++.h>
using namespace std;

int main() {
    freopen("LUYEN01.INP", "r", stdin);
    freopen("LUYEN01.OUT", "w", stdout);

    long long A, B;
    cin >> A >> B;

    long long a = A, b = B;
    while (b != 0) {
        long long r = a % b;
        a = b;
        b = r;
    }
    long long k = a;
    cout << k << '\n';
    cout << A / k << " " << B / k << '\n';
    return 0;
}