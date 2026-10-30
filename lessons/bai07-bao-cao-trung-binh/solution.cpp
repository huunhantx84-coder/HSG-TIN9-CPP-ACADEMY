#include <bits/stdc++.h>
using namespace std;

int main() {
    freopen("LUYEN07.INP", "r", stdin);
    freopen("LUYEN07.OUT", "w", stdout);

    int N;
    cin >> N;
    long long B[100001], A[100001];

    for (int i = 1; i <= N; i++) {
        cin >> B[i];
    }

    for (int i = 1; i <= N; i++) {
        if (i == 1)
            A[i] = B[i];
        else
            A[i] = i * B[i] - (i - 1) * B[i - 1];
    }

    for (int i = 1; i <= N; i++) {
        cout << A[i];
        if (i < N) cout << " ";
    }
    cout << '\n';
    return 0;
}