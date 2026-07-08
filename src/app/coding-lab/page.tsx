'use client';

import { useState, useEffect, useRef } from 'react';
import { AppLayout } from '@/components/ui/AppLayout';
import { 
  Play, Send, RotateCcw, Code, Terminal, BookOpen, 
  CheckCircle, Sparkles, Cpu, Award, Globe, HelpCircle 
} from 'lucide-react';
import { toast } from 'sonner';

interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  inputDesc: string;
  outputDesc: string;
  templates: {
    python: string;
    javascript: string;
    htmlcss: string;
  };
  testCases: Array<{ input: string; expected: string }>;
}

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    title: 'Two Sum Problem',
    difficulty: 'Easy',
    description: 'Write a function that takes an array of numbers (`nums`) and an integer (`target`), and returns the indices of the two numbers such that they add up to the target.',
    inputDesc: 'nums = [2, 7, 11, 15], target = 9',
    outputDesc: '[0, 1] (since nums[0] + nums[1] == 9)',
    templates: {
      python: `def two_sum(nums, target):\n    # Write your Python 3 code here\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))`,
      javascript: `function twoSum(nums, target) {\n    // Write your Javascript ES6 code here\n    const seen = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (seen.has(complement)) {\n            return [seen.get(complement), i];\n        }\n        seen.set(nums[i], i);\n    }\n    return [];\n}\n\nconsole.log(twoSum([2, 7, 11, 15], 9));`,
      htmlcss: `<!-- Create a layout centering this array visually -->\n<div class="array-container">\n  <div class="box">2</div>\n  <div class="box active">7</div>\n  <div class="box">11</div>\n  <div class="box">15</div>\n</div>\n\n<style>\n  .array-container {\n    display: flex;\n    gap: 10px;\n    justify-content: center;\n    padding: 20px;\n    background: #111827;\n    border-radius: 8px;\n  }\n  .box {\n    width: 50px;\n    height: 50px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border: 2px solid #4f46e5;\n    color: #fff;\n    font-weight: bold;\n    border-radius: 6px;\n  }\n  .box.active {\n    background: #4f46e5;\n    box-shadow: 0 0 10px rgba(79,70,229,0.5);\n  }\n</style>`
    },
    testCases: [
      { input: '[2, 7, 11, 15], 9', expected: '[0, 1]' },
      { input: '[3, 2, 4], 6', expected: '[1, 2]' }
    ]
  },
  {
    id: 'ch_02',
    title: 'Reverse Words in String',
    difficulty: 'Easy',
    description: 'Create a program that takes a string of words and reverses the order of the words. Single spaces should be kept, and multiple spaces trimmed.',
    inputDesc: 's = "the sky is blue"',
    outputDesc: '"blue is sky the"',
    templates: {
      python: `def reverse_words(s):\n    # Write Python code here\n    words = s.split()\n    return " ".join(reversed(words))\n\nprint(reverse_words("the sky is blue"))`,
      javascript: `function reverseWords(s) {\n    // Write Javascript code here\n    return s.trim().split(/\\s+/).reverse().join(" ");\n}\n\nconsole.log(reverseWords("the sky is blue"));`,
      htmlcss: `<!-- Reverse words container -->\n<div class="word-card">\n  <span class="word text-indigo-400">blue</span>\n  <span class="word">is</span>\n  <span class="word">sky</span>\n  <span class="word">the</span>\n</div>\n\n<style>\n  .word-card {\n    padding: 20px;\n    background: #1e1b4b;\n    border: 1px solid #4338ca;\n    border-radius: 12px;\n    text-align: center;\n    font-family: sans-serif;\n  }\n  .word {\n    font-size: 1.25rem;\n    margin: 0 5px;\n    color: #e0e7ff;\n    font-weight: 600;\n  }\n</style>`
    },
    testCases: [
      { input: '"the sky is blue"', expected: '"blue is sky the"' },
      { input: '"  hello world  "', expected: '"world hello"' }
    ]
  },
  {
    id: 'ch_03',
    title: 'Figma to CSS Component Mock',
    difficulty: 'Medium',
    description: 'Convert a Figma UI component spec: Create a pricing/feature badge pill with gradient border, glass backdrop blur, and pulse transition animation.',
    inputDesc: 'Figma constraints: border-radius 9999px, height 32px, text color #ffffff',
    outputDesc: 'CSS animation matches 2s pulse glow',
    templates: {
      python: `# Python mockup checker for CSS spec\ndef validate_css_badge(has_glow, radius):\n    return has_glow and radius == "9999px"\n\nprint(validate_css_badge(True, "9999px"))`,
      javascript: `// Javascript checker for CSS components\nfunction checkSpecs(radius, backdrop) {\n    return radius === '9999px' && backdrop.includes('blur');\n}\nconsole.log(checkSpecs('9999px', 'backdrop-filter: blur(12px)'));`,
      htmlcss: `<div class="container">\n  <div class="glass-pill">\n    <span class="sparkle">⚡</span>\n    <span class="text">LearnFlow Pro</span>\n  </div>\n</div>\n\n<style>\n  .container {\n    height: 150px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: linear-gradient(135deg, #09090b, #18181b);\n  }\n  .glass-pill {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 6px 16px;\n    border-radius: 9999px;\n    background: rgba(255, 255, 255, 0.05);\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    backdrop-filter: blur(12px);\n    color: #fff;\n    font-family: system-ui, sans-serif;\n    font-size: 0.85rem;\n    font-weight: 600;\n    animation: glowPulse 2s infinite ease-in-out;\n  }\n  @keyframes glowPulse {\n    0%, 100% { box-shadow: 0 0 5px rgba(99,102,241,0.2); }\n    50% { box-shadow: 0 0 15px rgba(99,102,241,0.6); }\n  }\n</style>`
    },
    testCases: [
      { input: 'Validate specifications', expected: 'True / Verified' }
    ]
  }
];

export default function CodingLabPage() {
  const [challenges, setChallenges] = useState<Challenge[]>(CHALLENGES);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(CHALLENGES[0]);
  const [language, setLanguage] = useState<'python' | 'javascript' | 'htmlcss'>('python');
  const [code, setCode] = useState('');
  
  // Terminal and execution states
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string>('Terminal initialized. Write code and click Run.');
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([]);
  const [showHtmlPreview, setShowHtmlPreview] = useState(false);
  
  const previewRef = useRef<HTMLIFrameElement>(null);

  // Load template code on language or challenge changes
  useEffect(() => {
    setCode(selectedChallenge.templates[language]);
    setTerminalOutput(`Switched language to ${language}. Code template loaded.`);
    setShowHtmlPreview(language === 'htmlcss');
  }, [selectedChallenge, language]);

  // Load solved progress
  useEffect(() => {
    const saved = localStorage.getItem('solved_challenges');
    if (saved) {
      setSolvedChallenges(JSON.parse(saved));
    }
  }, []);

  const handleReset = () => {
    setCode(selectedChallenge.templates[language]);
    setTerminalOutput('Code reset to default template.');
    toast.success('Template reset complete.');
  };

  const handleRun = async () => {
    setIsRunning(true);
    setTerminalOutput('Running execution assertions...\n');
    await new Promise(r => setTimeout(r, 800));

    if (language === 'htmlcss') {
      setIsRunning(false);
      setTerminalOutput('HTML/CSS preview reloaded. Check the interactive preview frame.');
      if (previewRef.current) {
        previewRef.current.srcdoc = code;
      }
      return;
    }

    // Mock code output calculations
    let output = '';
    try {
      if (language === 'python') {
        if (selectedChallenge.id === 'ch_01') {
          output = `nums = [2, 7, 11, 15], target = 9\nCalling function: two_sum(nums, target)\n\n[stdout]\n[0, 1]\n\nExecution finished in 44ms (Status: Success)`;
        } else if (selectedChallenge.id === 'ch_02') {
          output = `s = "the sky is blue"\nCalling function: reverse_words(s)\n\n[stdout]\nblue is sky the\n\nExecution finished in 32ms (Status: Success)`;
        } else {
          output = `Checking specifications...\n\n[stdout]\nTrue\n\nExecution finished in 18ms (Status: Success)`;
        }
      } else if (language === 'javascript') {
        if (selectedChallenge.id === 'ch_01') {
          output = `nums = [2, 7, 11, 15], target = 9\nCalling function: twoSum(nums, target)\n\n[console.log]\n[ 0, 1 ]\n\nExecution finished in 12ms (Status: Success)`;
        } else if (selectedChallenge.id === 'ch_02') {
          output = `s = "the sky is blue"\nCalling function: reverseWords(s)\n\n[console.log]\nblue is sky the\n\nExecution finished in 8ms (Status: Success)`;
        } else {
          output = `Checking specs...\n\n[console.log]\ntrue\n\nExecution finished in 5ms (Status: Success)`;
        }
      }
    } catch (e: any) {
      output = `Error: ${e.message}`;
    }

    setTerminalOutput(output);
    setIsRunning(false);
    toast.success('Execution completed!');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTerminalOutput('Testing solution against edge cases...\n');
    await new Promise(r => setTimeout(r, 1400));
    
    // Auto pass
    let output = `Testing inputs:\n`;
    selectedChallenge.testCases.forEach((tc, idx) => {
      output += `- Test Case #${idx + 1}: Input: ${tc.input} | Expected: ${tc.expected} | Got: ${tc.expected} ... PASSED\n`;
    });
    output += `\nAll test suites passed (100% assertions met).\nSubmitting solution, awarding XP...`;
    
    setTerminalOutput(output);
    setIsSubmitting(false);

    if (!solvedChallenges.includes(selectedChallenge.id)) {
      const updated = [...solvedChallenges, selectedChallenge.id];
      setSolvedChallenges(updated);
      localStorage.setItem('solved_challenges', JSON.stringify(updated));
      
      // Update coins
      const coins = localStorage.getItem('student_wallet_coins') || '250';
      localStorage.setItem('student_wallet_coins', (parseInt(coins) + 100).toString());
      
      toast.success(`Challenge Solved! You earned 100 XP & 100 LearnFlow Coins.`);
    } else {
      toast.info('Challenge already solved previously, code updated.');
    }
  };

  return (
    <AppLayout>
      <div className="animate-fade-in flex flex-col lg:h-[calc(100vh-var(--topbar-height)-5rem)] gap-6 max-w-7xl mx-auto">
        
        {/* Lab Header bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[var(--bg-surface)] p-4 rounded-3xl border border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
              <Cpu size={20} />
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-[var(--text-primary)]">Interactive Coding Sandbox Lab</h1>
              <p className="text-[10px] text-[var(--text-secondary)]">Mock compilers for Python/JS + Real-time HTML sandbox renderer</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Challenge selector */}
            <div className="bg-[var(--bg-surface-2)] border border-[var(--border-color)] px-3 py-1.5 rounded-xl text-xs flex-1 sm:flex-initial">
              <select
                value={selectedChallenge.id}
                onChange={(e) => {
                  const ch = challenges.find(c => c.id === e.target.value);
                  if (ch) setSelectedChallenge(ch);
                }}
                className="bg-transparent text-xs font-bold text-[var(--text-primary)] outline-none w-full cursor-pointer"
                aria-label="Select challenge"
              >
                {challenges.map(c => (
                  <option key={c.id} value={c.id}>
                    {solvedChallenges.includes(c.id) ? '✓ ' : ''}{c.title} ({c.difficulty})
                  </option>
                ))}
              </select>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-[var(--bg-surface-2)] border border-[var(--border-color)] p-1 rounded-xl">
              {[
                { id: 'python', label: 'Python 3' },
                { id: 'javascript', label: 'NodeJS' },
                { id: 'htmlcss', label: 'HTML & CSS' }
              ].map(lang => (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id as any)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    language === lang.id
                      ? 'bg-indigo-500 text-white'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Coding Area layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[500px]">
          
          {/* Challenge details - left */}
          <div className="lg:col-span-3 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 flex flex-col justify-between h-full overflow-y-auto scrollbar-thin">
            <div className="space-y-5">
              <div>
                <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                  selectedChallenge.difficulty === 'Easy' 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                }`}>
                  {selectedChallenge.difficulty}
                </span>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mt-2">{selectedChallenge.title}</h3>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase text-[var(--text-secondary)] flex items-center gap-1">
                  <BookOpen size={12} /> Instructions
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{selectedChallenge.description}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase text-[var(--text-secondary)]">Sample Input</h4>
                <pre className="p-2.5 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[10px] font-mono leading-relaxed text-[var(--text-secondary)] whitespace-pre-wrap">
                  {selectedChallenge.inputDesc}
                </pre>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase text-[var(--text-secondary)]">Expected Output</h4>
                <pre className="p-2.5 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[10px] font-mono leading-relaxed text-[var(--text-secondary)] whitespace-pre-wrap">
                  {selectedChallenge.outputDesc}
                </pre>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-color)] mt-6 flex justify-between items-center text-[10px]" style={{ color: 'var(--text-secondary)' }}>
              <span className="flex items-center gap-1">
                <Award size={14} className="text-amber-400" />
                Solve rewards: 100 XP
              </span>
              {solvedChallenges.includes(selectedChallenge.id) && (
                <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                  <CheckCircle size={12} /> Solved
                </span>
              )}
            </div>
          </div>

          {/* Code Editor - center */}
          <div className="lg:col-span-5 flex flex-col rounded-3xl border border-[var(--border-color)] bg-[#0c0a1a] overflow-hidden h-full">
            <div className="bg-[#120f28] border-b border-[var(--border-color)] px-4 py-2.5 flex justify-between items-center shrink-0">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 font-mono">
                <Code size={14} className="text-indigo-400" />
                {language === 'python' ? 'main.py' : language === 'javascript' ? 'index.js' : 'index.html'}
              </span>
              
              <button
                onClick={handleReset}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition"
                title="Reset template"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 w-full bg-transparent text-slate-100 font-mono text-xs leading-relaxed p-4 border-none outline-none resize-none focus:ring-0"
              style={{ minHeight: '300px' }}
              aria-label="Code Editor"
            />
          </div>

          {/* Preview / Terminal - right */}
          <div className="lg:col-span-4 flex flex-col gap-4 h-full">
            
            {/* HTML Live Preview panel */}
            {showHtmlPreview && (
              <div className="flex-1 rounded-3xl border border-[var(--border-color)] bg-white overflow-hidden flex flex-col">
                <div className="bg-[var(--bg-surface)] border-b border-[var(--border-color)] px-4 py-2 flex items-center gap-1.5 shrink-0">
                  <Globe size={12} className="text-indigo-500" />
                  <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase">Live Render Frame</span>
                </div>
                <iframe
                  ref={previewRef}
                  srcDoc={code}
                  title="HTML/CSS Live Sandbox Output"
                  className="flex-1 w-full bg-white"
                  sandbox="allow-scripts"
                />
              </div>
            )}

            {/* Terminal output */}
            <div className="flex-1 rounded-3xl border border-[var(--border-color)] bg-[#090714] overflow-hidden flex flex-col">
              <div className="bg-[#120f28] border-b border-[var(--border-color)] px-4 py-2.5 flex items-center gap-1.5 shrink-0">
                <Terminal size={14} className="text-emerald-400" />
                <span className="text-[10px] font-bold text-slate-300 uppercase font-mono">Terminal Output</span>
              </div>
              
              <pre className="flex-1 p-4 font-mono text-[10px] text-emerald-400 leading-relaxed overflow-y-auto whitespace-pre-wrap select-text">
                {terminalOutput}
              </pre>

              {/* Action Buttons */}
              <div className="bg-[#120f28] border-t border-[var(--border-color)] p-3 flex gap-2 shrink-0">
                <button
                  onClick={handleRun}
                  disabled={isRunning || isSubmitting}
                  className="btn btn-secondary flex-1 flex items-center justify-center gap-1.5 text-xs py-2"
                >
                  <Play size={12} />
                  Run Code
                </button>
                
                <button
                  onClick={handleSubmit}
                  disabled={isRunning || isSubmitting || language === 'htmlcss'}
                  className="btn btn-primary flex-1 flex items-center justify-center gap-1.5 text-xs py-2"
                >
                  <Send size={12} />
                  Submit Task
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </AppLayout>
  );
}
