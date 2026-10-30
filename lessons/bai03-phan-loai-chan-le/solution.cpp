#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, x;
    cin >> n;
    vector<int> chan, le;
    for (int i = 0; i < n; i++) {
        cin >> x;
        if (x % 2 == 0) {
            chan.push_back(x);
        } else {
            le.push_back(x);
        }
    }
    cout << "Chan (" << chan.size() << "): ";
    for (int i = 0; i < (int)chan.size(); i++) cout << chan[i] << " ";
    cout << "\nLe (" << le.size() << "): ";
    for (int i = 0; i < (int)le.size(); i++) cout << le[i] << " ";
    return 0;
}
