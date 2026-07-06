# 🎓 Academic GPA & CGPA Hub (10.0 Scale)

A modern, responsive web application for calculating **Semester GPA (SGPA)**, **Running CGPA**, and simulating your **Graduation CGPA** on a **10-point grading scale**. The application also saves your progress locally, allowing you to continue where you left off. :contentReference[oaicite:0]{index=0}

## ✨ Features

- 📚 Add or remove unlimited courses
- 🎯 Calculate Semester GPA (SGPA)
- 📈 Calculate Running CGPA using previous semester data
- 🔮 Graduation CGPA "What-If" Simulator
- 💾 Automatic saving using Local Storage
- 🎨 Color-coded grade selection
- ⚠️ Input validation for invalid values
- 📱 Responsive design for desktop and mobile
- ⚡ Smooth UI animations for updated results

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript

## 📂 Project Structure

```
.
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/academic-gpa-hub.git
```

2. Navigate into the project folder:

```bash
cd academic-gpa-hub
```

3. Open `index.html` in your preferred web browser.

No installation or build process is required.

## 📊 Grade Scale

| Grade | Grade Point |
|--------|------------:|
| S | 10.0 |
| A | 9.0 |
| B | 8.0 |
| C | 7.0 |
| D | 6.0 |
| E | 5.0 |
| F | 0.0 |

The application uses this standard 10-point grading system for all GPA and CGPA calculations. :contentReference[oaicite:1]{index=1}

## 💡 How to Use

### 1. Enter Previous Academic Details
- Total earned credits
- Current CGPA

### 2. Add Current Semester Courses
For each course:
- (Optional) Course name
- Credit value
- Grade obtained

Click **Add Course** to insert additional subjects.

### 3. View Results

The application automatically calculates:

- Semester GPA (SGPA)
- Running CGPA
- Total Credits Earned

### 4. Graduation Simulator

Enter:

- Remaining credits
- Expected average SGPA for future semesters

The application predicts your final graduation CGPA.

## 💾 Data Persistence

Your data is automatically saved in your browser using **Local Storage**. When you revisit the application, your previous information is restored automatically. :contentReference[oaicite:2]{index=2}

## 🎨 User Interface Highlights

- Responsive two-column layout
- Sticky results panel
- Animated metric updates
- Color-coded grade indicators
- Validation highlighting for incorrect inputs
- Clean and modern design :contentReference[oaicite:3]{index=3}

## 📱 Browser Support

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari
- Brave
- Opera

## 🔮 Future Improvements

- GPA history tracking
- Export results as PDF
- Dark mode
- Percentage conversion
- Multiple grading scale support (4.0, 5.0, 7.0, 10.0)
- Semester-wise analytics and charts

## 📄 License

This project is open source and available under the **MIT License**.

---

### Author

Developed as an academic utility to help students easily monitor and project their academic performance.
