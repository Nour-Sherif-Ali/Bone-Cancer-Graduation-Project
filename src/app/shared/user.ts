export interface User {
        uid: string;
        displayName?: string; // علامة ? تعني أن الحقل اختياري
        email: string;
        // أي حقول أخرى
      
}

// user.model.ts
// export interface User {
//         username: string;
//         email: string;
//         phoneNumber: string;
//         age: number;
//       }