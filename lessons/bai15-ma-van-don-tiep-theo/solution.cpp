#include <bits/stdc++.h>
using namespace std;

bool hopLe(long long n) {
    bool daCo[10] = {false};
    while (n > 0) {
        int cs = n % 10;
        if (daCo[cs]) {
            return false;
        }
        daCo[cs] = true;
        n /= 10;
    }
    return true;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    freopen("LUYEN15.INP", "r", stdin);
    freopen("LUYEN15.OUT", "w", stdout);
    long long X;
    if (cin >> X) {
        long long Y = X + 1;
        while (!hopLe(Y)) {
            Y++;
        }
        cout << Y;
    }
    return 0;
}
