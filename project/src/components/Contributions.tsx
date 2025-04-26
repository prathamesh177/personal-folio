import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './Contributions.css';
import axios from 'axios';
import { subYears, format } from 'date-fns';

interface ContributionDay {
  date: string;
  count: number;
}

interface CommitInfo {
  message: string;
  repo: string;
  date: string;
  url: string;
}

interface LeetCodeDay {
  date: string;
  count: number;
}

const Contributions: React.FC = () => {
  const [githubData, setGithubData] = useState<ContributionDay[]>([]);
  const [githubCommits, setGithubCommits] = useState<CommitInfo[]>([]);
  const [leetcodeData, setLeetcodeData] = useState<LeetCodeDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const startDate = subYears(new Date(), 1);
  const endDate = new Date();

  // Replace with your GitHub username
  const GITHUB_USERNAME = 'prathamesh177';
  const LEETCODE_USERNAME = 'walvekarprathamesh734';

  useEffect(() => {
    // Fetch GitHub heatmap data from backend (GraphQL, full year)
    const fetchGitHubHeatmap = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/github-contributions', {
          username: GITHUB_USERNAME
        });
        const calendar = response.data.data;
        // Flatten weeks to days and map to heatmap format
        const contributions = calendar.weeks.flatMap((week: { contributionDays: { date: string; contributionCount: number }[] }) =>
          week.contributionDays.map((day: { date: string; contributionCount: number }) => ({
            date: day.date,
            count: day.contributionCount,
          }))
        );
        setGithubData(contributions);
      } catch (err) {
        setError('Failed to fetch GitHub contributions');
      }
    };

    // Fetch recent commits (REST API, last 300 events)
    const fetchGitHubCommits = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${GITHUB_USERNAME}/events`
        );
        const commits = response.data
          .filter((event: any) => event.type === 'PushEvent')
          .flatMap((event: any) =>
            event.payload.commits.map((commit: any) => ({
              message: commit.message,
              repo: event.repo.name,
              date: format(new Date(event.created_at), 'yyyy-MM-dd HH:mm'),
              url: commit.url.replace('api.', '').replace('repos/', '').replace('commits', 'commit'),
            }))
          );
        setGithubCommits(commits.slice(0, 10));
      } catch (err) {
        // Do not set error here, as heatmap is primary
      }
    };

    // Fetch combined DSA contributions from all platforms
    const fetchCombinedDSA = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/dsa-contributions', {
          leetcodeUsername: LEETCODE_USERNAME, // or LEETCODE_USERNAME if different
          gfgUsername: 'walvekarpra9del',
          code360Username: 'Prathamesh Shivanand Walvekar',
        });
        setLeetcodeData(response.data.data);
      } catch (err) {
        // Optionally handle error
      }
    };

    Promise.all([
      fetchGitHubHeatmap(),
      fetchGitHubCommits(),
      fetchCombinedDSA()
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading contributions...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">GitHub Contributions</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={githubData}
            classForValue={(value) => {
              if (!value) return 'color-empty';
              return `color-github-${Math.min(4, Math.ceil(value.count / 2))}`;
            }}
            titleForValue={(value) => {
              if (!value) return 'No contributions';
              return `${value.count} contributions on ${value.date}`;
            }}
          />
        </div>
        {/* Commit List */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Recent GitHub Commits</h3>
          <ul className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700 max-h-60 overflow-y-auto" style={{ maxHeight: '240px' }}>
            {githubCommits.length === 0 && (
              <li className="py-2 text-gray-500">No recent commits found.</li>
            )}
            {githubCommits.map((commit, idx) => (
              <li key={idx} className="py-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <span className="font-medium text-blue-600 dark:text-blue-400">{commit.repo}</span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="text-gray-800 dark:text-gray-200">{commit.message}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1 md:mt-0">
                    {commit.date}
                    {commit.url && (
                      <a href={commit.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">View</a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* LeetCode Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">DSA Submissions</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow max-h-60 overflow-y-auto" style={{ maxHeight: '240px' }}>
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={Array.isArray(leetcodeData) ? leetcodeData : []}
            classForValue={(value) => {
              if (!value) return 'color-empty';
              return `color-leetcode-${Math.min(4, value.count)}`;
            }}
            titleForValue={(value) => {
              if (!value) return 'No submissions';
              return `${value.count} submission${value.count !== 1 ? 's' : ''} on ${value.date}`;
            }}
          />
        </div>
        {/* LeetCode Submission List */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Recent DSA Submissions (LeetCode)</h3>
          <ul className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700 max-h-60 overflow-y-auto" style={{ maxHeight: '240px' }}>
            {leetcodeData.length === 0 && (
              <li className="py-2 text-gray-500">No recent submissions found.</li>
            )}
            {leetcodeData
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((submission, idx) => (
                <li key={idx} className="py-2 flex justify-between items-center">
                  <span className="text-gray-800 dark:text-gray-200">{submission.date}</span>
                  <span className="font-medium text-yellow-600 dark:text-yellow-400">{submission.count} submission{submission.count !== 1 ? 's' : ''}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contributions; 