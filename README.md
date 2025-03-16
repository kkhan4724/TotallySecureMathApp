# **Security Assessment Report: Totally Secure Math App**

## **1. Introduction**

This report presents a security assessment of the Totally Secure Math App, identifying vulnerabilities and implementing security measures to enhance its safety. The main focus is on addressing insecure data storage, improper authentication, code injection, insufficient input validation, and insecure coding practices.

Security best practices have been implemented to mitigate potential attacks, ensuring the app maintains high data integrity and user protection.

---

## **2. Identified Vulnerabilities and Fixes**

### **2.1 Insecure Data Storage**

- **Issue**: Notes were stored in plaintext using `AsyncStorage`, making them vulnerable to unauthorized access.
- **Fix**: Replaced `AsyncStorage` with `EncryptedStorage` to securely encrypt and store user data.
- **Why?** Encrypted storage ensures that sensitive information remains protected even if an attacker gains access to the device.

---

### **2.2 Improper Authentication**

- **Issue**: The app stored **hardcoded credentials** in the code, making it easy for an attacker to extract login details.
- **Fix**: Implemented **SHA-256 hashing using `crypto-js`** to store and verify passwords securely.
- **Why?** This prevents plaintext password storage and ensures secure authentication without requiring native dependencies.

---

### **2.3 Code Injection**

- **Issue**: The `Note.tsx` component used `eval(props.text)`, which could allow **arbitrary JavaScript execution**.
- **Fix**: Removed `eval()` and replaced it with a **sanitized math expression evaluator** that only allows numbers and mathematical operators.
- **Why?** Prevents attackers from injecting and executing malicious scripts.

---

### **2.4 Insufficient Input Validation**

- **Issue**: The app did not validate user inputs, allowing injection attacks and potentially malicious entries.
- **Fix**: Applied **regular expressions to sanitize user input** and restricted entry to safe characters only.
- **Why?** Prevents code injection attacks and ensures users input valid data.

---

### **2.5 Insecure Coding Practices**

- **Issue**: Lack of error handling in critical areas such as authentication and storage.
- **Fix**: Wrapped storage and authentication logic inside **try-catch blocks** to prevent crashes and data corruption.
- **Why?** Proper error handling improves app stability and security.

---

## **3. Implemented Security Measures**

| **Vulnerability**                 | **Fix Implemented**                                             |
| --------------------------------- | --------------------------------------------------------------- |
| **Insecure Data Storage**         | Used `EncryptedStorage` instead of `AsyncStorage`               |
| **Improper Authentication**       | Replaced hardcoded passwords with SHA-256 hashing (`crypto-js`) |
| **Code Injection**                | Removed `eval()` and replaced it with a safe math evaluator     |
| **Insufficient Input Validation** | Sanitized user inputs using regex filtering                     |
| **Insecure Coding Practices**     | Added proper error handling to prevent crashes                  |

---

## **4. Importance of These Security Measures**

The implemented security measures significantly improve the app’s safety by:

- **Protecting sensitive data** through encrypted storage.
- **Ensuring password security** with SHA-256 hashing.
- **Preventing code injection attacks** by restricting input values.
- **Improving user experience** through proper error handling.

These enhancements not only **protect user data** but also **ensure the long-term security and stability of the application**.

---

## **5. Reflection and Lessons Learned**

Through this security assessment, the following key takeaways emerged:

- **Avoid storing credentials in plaintext**—always use hashing.
- **Never use `eval()` or similar functions**—they pose serious security risks.
- **Validate all user inputs** before processing them.
- **Encrypt sensitive data** before storing it.
- **Error handling is essential** to prevent crashes and unexpected failures.

Applying these best practices will be crucial for developing **secure and reliable applications** in the future.

---

## **6. References**

[1] Android Developers, “Security Tips.” Available: https://developer.android.com/privacy-and-security/security-tips. [Accessed: Mar. 16, 2025].

[2] Snyk, “5 Ways to Prevent Code Injection in JavaScript and Node.js.” Available: https://snyk.io/blog/5-ways-to-prevent-code-injection-in-javascript-and-node-js. [Accessed: Mar. 16, 2025].

[3] NowSecure, “13 Mobile App Security Best Practices.” Available: https://www.nowsecure.com/blog/2023/02/24/13-mobile-app-security-best-practices. [Accessed: Mar. 16, 2025].

[4] Reflectiz, “The Essential Guide to Preventing JavaScript Injection.” Available: https://www.reflectiz.com/blog/essential-guide-to-preventing-javascript-injection. [Accessed: Mar. 16, 2025].

[5] Medium, “Security Tips and Best Practices to Develop Secure Mobile Applications.” Available: https://medium.com/@PedalsUp/security-tips-and-best-practices-to-develop-secure-mobile-applications-b2576c38d026. [Accessed: Mar. 16, 2025].

---

## **7. Conclusion**

The Totally Secure Math App initially had **serious security vulnerabilities** that could lead to data breaches, authentication bypasses, and code execution attacks. By implementing **secure storage, authentication, input validation, and error handling**, the app is now **far more secure and resistant to common exploits**.

Security should always be a **top priority** in mobile applications, and these measures will help maintain **a safer and more trustworthy app environment** for users.
