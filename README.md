<!-- Yang akan kita kerjakan -->
1. Sedia Static Directory
2. Implementasi End Point Chatbot(POST/api/chat)
    - Mulai bikin endpoint baru (POST/api/chat)
    - kita buat handle untuk menghandle request post dari POST/api/chat yang dari browser
    - Buat beberapa "satpam" (guard clouse)
        1.Handle Payload "conversation" dari "req.body" apakah conversationnya berupa array atau tidak
        2. handle setiap message yang ada pada payload "conversation", untuk cek apakah setiap messagenya sudah berupa 'object' dengan isinya '{role: user | model, message, string}'. Tandai invalid jika:
            -  ada elemen yang tidak sesuai(Tipe datanya lain dari 'object' atau nilainya null), tandai sebagai invalid
            -  setiap elemen tidak memiliki 2 property persis dan tidak memiliki role dan model pada objectnya
            -role tidak berupa user atau model atau message tidak bertipe data string atau berisi string kosong('**' atau '""')
    - Lakukan mapping agar bisa dikirim ke Google Gemini API dengan function/method 'generativeContent()'
    - Message yang diterima oleh Google Gemini API nanti akan dikirimkan kembali ke user dengan format '{succerss: boolean, message:string, data : string}'        