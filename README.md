# AniMood-Final-Project
Mood-based anime recommendation app


# AniMood 

AniMood is a mood-based anime recommendation app that uses the Jikan API and Supabase. Users can get anime suggestions based on how they’re feeling, explore trending titles, take a mood quiz, search specific shows, and save favorites to their watchlist.

---

## 🌐 Target Browsers

AniMood works on:

- ✅ Chrome (Desktop & Android)
- ✅ Firefox
- ✅ Safari (Desktop & iOS)
- ✅ Microsoft Edge

The app is responsive and works well on both desktop (recommended)and mobile. (BEST RESULTS ARE ON DESKTOP)


## 📎 Developer Manual

[Jump to Developer Manual](#-developer-manual)

---

## 📘 Developer Manual

 For developers maintaining or extending AniMood. You should know HTML, CSS, JS, and REST APIs._

---

### Installation & Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/AniMood.git
cd AniMood
```

#### 2. Set Up Supabase

- Go to [https://supabase.com](https://supabase.com) and sign in  
- Create a new project  
- Go to **Table Editor** and create a new table called `watchlist` with the following columns:

| Column   | TypeNotes       |
|----------|--------|----------------------------------|
| id       | bigint | Primary key (auto increment)     |
| title    | text   | Required                         |
| image    | text   | Required                         |
| synopsis | text   | Optional                         |
| score    | text   | Optional                         |

#### 3. Enable RLS & Create Policy

- Go to your `watchlist` table settings → **RLS**  
- Enable Row Level Security  
- Add a policy:

```sql
CREATE POLICY "Allow all" ON watchlist
FOR ALL USING (true);
```



---

#### 4. Add Supabase Credentials

Create a new file called `supabase.js` in your project directory:

```js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export const supabase = createClient(
  'https://YOUR_PROJECT_ID.supabase.co',
  'YOUR_ANON_KEY'
);
```

Replace `'https://YOUR_PROJECT_ID.supabase.co'` and `'YOUR_ANON_KEY'` with your actual Supabase credentials from your project settings.

---

### How to Run the App

- Open `index.html` in a browser  
- Or deploy your project using [https://vercel.com](https://vercel.com)  


---

### 🧪 How to Test

- Try the mood selector on the home page  
- Take the quiz and view recommendations  
- Use the search bar to find anime by title  
- Click **Save** to add shows to your watchlist  
- Go to the **Watchlist** page to view saved anime  
- Try removing entries and toggling descriptions  

---

### 🔌 API Documentation

#### Jikan API (MyAnimeList)

| Endpoint                      | Purpose                    |
|-------------------------------|----------------------------|
| `/v4/top/anime`               | Fetch trending anime       |
| `/v4/random/anime`            | Get random anime           |
| `/v4/anime?q=title`           | Search anime by title      |
| `/v4/anime?genres=ID`         | Filter anime by genre      |

#### Supabase Endpoints

| Action            | Method | Description                          |
|-------------------|--------|--------------------------------------|
| Add to Watchlist  | POST   | Save anime data to Supabase table    |
| Retrieve Watchlist| GET    | Load watchlist items                 |
| Remove Anime      | DELETE | Delete anime entry from Supabase     |

---

###  Known Bugs

- Users can currently save the same anime multiple times  
- There is no user authentication (watchlist is global)  
- Long titles or descriptions can overflow on smaller screens  

---

### Roadmap & Future Improvements

- Add Supabase Auth for private user-specific watchlists  
- Improve responsive layout for mobile users  
- Add trailers using YouTube API  
- Add filters for genres, episodes, or length  
- Rebuild the app using React or Vue  

---

© 2025 maisietran 
