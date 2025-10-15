export const bookContent = {
  title: "A Special Birthday Message",
  subtitle: "Celebrating you today and always",
  recipientName: "Aurene", // Update with actual name
  
  // IMPORTANT: Set your birthday date here
  // Format: YYYY-MM-DDTHH:mm:ss (24-hour format)
  // Example for December 25, 2024 at midnight: "2024-12-25T00:00:00"
  // Example for testing - set to a few minutes from now: "2024-01-01T12:30:00"
  //birthdayDate: new Date(Date.now() + 2 * 60 * 1000).toISOString(), // 2 minutes from now for testing
  
  // For actual use, uncomment and set your date:
   birthdayDate: "2024-10-17T00:00:00",
  
  pages: [
    {
      id: 1,
      type: "message",
      title: "A Special Message",
      content: `
        <p>Happy 26th birthday, 我的猫💗</p>
        <p>Can’t believe my favorite girl just leveled up again 😚 You’re growing, glowing, and somehow getting even prettier every year (how is that even fair?!).</p>
        <p>Thank you for always being you — the girl who makes my days lighter, my jokes funnier, and my heart fuller 🩵</p>
        <p>Semoga tahun ini bawa banyak hal baik buat kamu: more peace, more laughter, more adventures (bareng aku tentunya 😏), dan semoga semuanya selalu lancar di kerjaan kamu juga ya — target selalu achieved✨</p>
        <p>Love you always 💞</p>
      `
    },
    {
      id: 2,
      type: "gallery",
      title: "My Favorite View",
      images: [
        { id: 1, src: "images/1.jpg", caption: "" },
        { id: 2, src: "images/2.jpg", caption: "" },
        { id: 3, src: "images/3.jpg", caption: "" },
        { id: 4, src: "images/4.jpg", caption: "" },        
        { id: 6, src: "images/6.jpg", caption: "" },
        { id: 7, src: "images/7.jpg", caption: "" },
        { id: 5, src: "images/8.jpg", caption: "" },
        { id: 8, src: "images/9.jpg", caption: "" },
        { id: 9, src: "images/10.jpg", caption: "" },
      ]
    },
    {
      id: 3,
      type: "list",
      title: "Reasons I Love You",
      items: [
        "You are so pretty and not just pretty, your makeup is super good and getting better and better!",
        "You are so smart, I can discuss almost everything with you and you will listen even my \"bawang\" things",
        "You are such a good listener, your advice help me go through so many things 😚",
        "Your laugh, yeah your laugh 😂",
        "Can cook delicious food!",
        "Super fine sh*t",
        "Simply because you are you"
      ]
    },
    {
      id: 5,
      type: "coupons",
      title: "Birthday Coupons",
      coupons: [
        { id: 1, title: "Movie Night", description: "Your choice of movie and snacks", used: false },
        { id: 2, title: "Coffee Date", description: "On me, of course!", used: false },        
        { id: 4, title: "Spa Day", description: "Private massage by Dinpuru itself", used: false },
        { id: 5, title: "Shopping Day", description: "Let's go shopping!", used: false }
      ]
    }
  ]
};