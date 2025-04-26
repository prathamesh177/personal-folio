import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'walvekarprathamesh734@gmail.com',
      subject: `New Contact From Portfolio: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

// LeetCode DSA contribution endpoint
app.post('/api/leetcode', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ errors: 'Username is required' });
  }
  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': `https://leetcode.com/${username}/`,
        'User-Agent': 'Mozilla/5.0',
      },
      body: JSON.stringify({
        query: `
          query getUserProfileCalendar($username: String!) {
            matchedUser(username: $username) {
              username
              submissionCalendar
            }
          }
        `,
        variables: { username }
      })
    });
    const data = await response.json();
    if (!data.data || !data.data.matchedUser) {
      return res.status(404).json({ errors: 'User not found' });
    }
    res.json({ data: data.data });
  } catch (error) {
    console.error('LeetCode API error:', error);
    res.status(500).json({ errors: 'Failed to fetch LeetCode data' });
  }
});

app.post('/api/github-contributions', async (req, res) => {
  const { username } = req.body;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!username || !GITHUB_TOKEN) {
    return res.status(400).json({ error: 'Username and GitHub token required' });
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
          query($login: String!) {
            user(login: $login) {
              contributionsCollection {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { login: username }
      })
    });
    const data = await response.json();
    if (!data.data || !data.data.user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ data: data.data.user.contributionsCollection.contributionCalendar });
  } catch (error) {
    console.error('GitHub API error:', error);
    res.status(500).json({ error: 'Failed to fetch GitHub data' });
  }
});

app.post('/api/dsa-contributions', async (req, res) => {
  const { leetcodeUsername, gfgUsername, code360Username } = req.body;
  let allContributions = {};

  // LeetCode
  try {
    const leetRes = await fetch('http://localhost:3001/api/leetcode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: leetcodeUsername })
    });
    const leetData = await leetRes.json();
    if (leetData.data && leetData.data.matchedUser) {
      const calendar = JSON.parse(leetData.data.matchedUser.submissionCalendar);
      for (const [timestamp, count] of Object.entries(calendar)) {
        const date = new Date(parseInt(timestamp) * 1000).toISOString().slice(0, 10);
        allContributions[date] = (allContributions[date] || 0) + count;
      }
    }
  } catch (e) {}

  // GeeksforGeeks (mocked)
  // Replace this with real scraping/API logic if available
  const gfgMock = [
    // Example: { date: '2024-05-01', count: 2 },
    // ...
  ];
  gfgMock.forEach(({ date, count }) => {
    allContributions[date] = (allContributions[date] || 0) + count;
  });

  // Code360 (mocked)
  // Replace this with real scraping/API logic if available
  const code360Mock = [
    // Example: { date: '2024-05-02', count: 1 },
    // ...
  ];
  code360Mock.forEach(({ date, count }) => {
    allContributions[date] = (allContributions[date] || 0) + count;
  });

  // Convert to array for heatmap
  const combined = Object.entries(allContributions).map(([date, count]) => ({
    date,
    count
  }));

  res.json({ data: combined });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
