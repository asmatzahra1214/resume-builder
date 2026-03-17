<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ResumeController extends Controller
{
    public function generate(Request $request)
    {
        // Add CORS headers
        if ($request->getMethod() === 'OPTIONS') {
            return response()->json([], 200)
                ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
                ->header('Access-Control-Allow-Methods', 'POST, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Accept');
        }
        
        Log::info('Resume generation started', ['data' => $request->all()]);
        
        $payload = $request->input('data', []);

        // Validate required fields
        if (empty($payload['fullName']) || empty($payload['email'])) {
            return response()->json(['error' => 'fullName and email are required'], 422)
                ->header('Access-Control-Allow-Origin', 'http://localhost:3000');
        }

        // Validate email
        if (!filter_var($payload['email'], FILTER_VALIDATE_EMAIL)) {
            return response()->json(['error' => 'Invalid email format'], 422)
                ->header('Access-Control-Allow-Origin', 'http://localhost:3000');
        }

        try {
            // Check API key
            $apiKey = env('GEMINI_API_KEY');
            if (empty($apiKey)) {
                return response()->json(['error' => 'API key not configured'], 500)
                    ->header('Access-Control-Allow-Origin', 'http://localhost:3000');
            }

            // Build prompt
            $prompt = $this->buildPrompt($payload);
            
            // Call Gemini API
            $generatedText = $this->callGeminiDirect($prompt, $apiKey);
            
            // Clean response
            $generatedText = $this->cleanGeneratedText($generatedText, $payload);
            
            // Build HTML resume from form data (this ensures ALL data is shown)
            $htmlResume = $this->buildResumeHTML($payload);
            
            return response()->json([
                'success' => true,
                'resume' => $generatedText,        // AI enhanced text
                'html_resume' => $htmlResume,      // Complete formatted resume with ALL data
                'provider' => 'gemini'
            ])->header('Access-Control-Allow-Origin', 'http://localhost:3000');
            
        } catch (\Exception $e) {
            Log::error('Generation failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'error' => 'Generation failed',
                'details' => $e->getMessage()
            ], 500)->header('Access-Control-Allow-Origin', 'http://localhost:3000');
        }
    }

    /**
     * Build complete resume HTML directly from form data
     */
    private function buildResumeHTML(array $data): string
    {
        $name = strtoupper($data['fullName'] ?? 'YOUR NAME');
        $email = $data['email'] ?? '';
        $phone = $data['phone'] ?? '';
        $title = $data['title'] ?? 'Professional';
        $targetRole = $data['targetRole'] ?? 'Professional Position';
        
        // Build address
        $addressParts = [];
        if (!empty($data['street'])) $addressParts[] = $data['street'];
        if (!empty($data['city'])) $addressParts[] = $data['city'];
        if (!empty($data['province'])) $addressParts[] = $data['province'];
        if (!empty($data['postalCode'])) $addressParts[] = $data['postalCode'];
        if (!empty($data['country'])) $addressParts[] = $data['country'];
        $address = !empty($addressParts) ? implode(', ', $addressParts) : '';
        
        // Format skills as array
        $skills = [];
        if (!empty($data['skills'])) {
            $skills = array_map('trim', explode(',', $data['skills']));
        }
        
        $html = '<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>' . htmlspecialchars($name) . ' - Resume</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: "Segoe UI", Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
                    line-height: 1.6;
                    color: #2d3748;
                    background: #f7fafc;
                    padding: 30px;
                }
                .resume-container {
                    max-width: 1000px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    overflow: hidden;
                }
                .header {
                    background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
                    color: white;
                    padding: 40px;
                    text-align: center;
                }
                .header h1 {
                    font-size: 3em;
                    font-weight: 700;
                    margin-bottom: 10px;
                    letter-spacing: 1px;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
                }
                .header h2 {
                    font-size: 1.5em;
                    font-weight: 400;
                    opacity: 0.95;
                    margin-bottom: 20px;
                }
                .contact-bar {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 30px;
                    margin-top: 20px;
                    font-size: 1.1em;
                }
                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .main-content {
                    padding: 40px;
                    background: white;
                }
                .grid-2 {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    gap: 30px;
                }
                .sidebar {
                    border-right: 2px solid #e2e8f0;
                    padding-right: 30px;
                }
                .main-area {
                    padding-left: 10px;
                }
                .section {
                    margin-bottom: 30px;
                }
                .section-title {
                    font-size: 1.3em;
                    font-weight: 700;
                    color: #0f766e;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 20px;
                    border-bottom: 3px solid #0f766e;
                    padding-bottom: 8px;
                    display: inline-block;
                }
                .skill-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 10px;
                }
                .skill-tag {
                    background: #e6fffa;
                    color: #0f766e;
                    padding: 6px 16px;
                    border-radius: 30px;
                    font-size: 0.9em;
                    font-weight: 500;
                    border: 1px solid #14b8a6;
                    transition: all 0.3s;
                }
                .skill-tag:hover {
                    background: #0f766e;
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(15,118,110,0.3);
                }
                .bullet-list {
                    list-style: none;
                    padding-left: 0;
                }
                .bullet-list li {
                    position: relative;
                    padding-left: 20px;
                    margin-bottom: 8px;
                    color: #4a5568;
                }
                .bullet-list li:before {
                    content: "→";
                    color: #0f766e;
                    position: absolute;
                    left: 0;
                    font-weight: bold;
                }
                .links-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    justify-content: center;
                }
                .link-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 20px;
                    background: #f7fafc;
                    border-radius: 8px;
                    color: #0f766e;
                    text-decoration: none;
                    transition: all 0.3s;
                    border: 1px solid #e2e8f0;
                }
                .link-item:hover {
                    background: #0f766e;
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(15,118,110,0.3);
                }
                .summary-box {
                    background: #f7fafc;
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 25px;
                    border-left: 4px solid #0f766e;
                    font-style: italic;
                    color: #2d3748;
                }
            </style>
        </head>
        <body>
            <div class="resume-container">';
        
        // HEADER
        $html .= '
                <div class="header">
                    <h1>' . htmlspecialchars($name) . '</h1>
                    <h2>' . htmlspecialchars($title) . '</h2>
                    <div class="contact-bar">';
        
        if (!empty($email)) {
            $html .= '<div class="contact-item">📧 ' . htmlspecialchars($email) . '</div>';
        }
        if (!empty($phone)) {
            $html .= '<div class="contact-item">📱 ' . htmlspecialchars($phone) . '</div>';
        }
        if (!empty($address)) {
            $html .= '<div class="contact-item">📍 ' . htmlspecialchars($address) . '</div>';
        }
        
        $html .= '
                    </div>
                </div>';
        
        // MAIN CONTENT
        $html .= '
                <div class="main-content">
                    <div class="grid-2">
                        <!-- Sidebar -->
                        <div class="sidebar">';
        
        // TARGET ROLE
        if (!empty($targetRole)) {
            $html .= '
                            <div class="section">
                                <h3 class="section-title">Target Role</h3>
                                <div class="info-value" style="font-size: 1.2em; font-weight: 600; color: #0f766e;">
                                    ' . htmlspecialchars($targetRole) . '
                                </div>
                            </div>';
        }
        
        // SKILLS
        if (!empty($skills)) {
            $html .= '
                            <div class="section">
                                <h3 class="section-title">Skills</h3>
                                <div class="skill-tags">';
            foreach ($skills as $skill) {
                $html .= '<span class="skill-tag">' . htmlspecialchars($skill) . '</span>';
            }
            $html .= '
                                </div>
                            </div>';
        }
        
        // EDUCATION
        if (!empty($data['qualification'])) {
            $html .= '
                            <div class="section">
                                <h3 class="section-title">Education</h3>
                                <div class="education-item">
                                    <div class="item-title">' . nl2br(htmlspecialchars($data['qualification'])) . '</div>
                                </div>
                            </div>';
        }
        
        // LINKS
        $hasLinks = !empty($data['linkedin']) || !empty($data['github']) || !empty($data['portfolio']);
        if ($hasLinks) {
            $html .= '
                            <div class="section">
                                <h3 class="section-title">Links</h3>
                                <div class="links-grid" style="flex-direction: column; gap: 10px;">';
            
            if (!empty($data['linkedin'])) {
                $html .= '<a href="' . htmlspecialchars($data['linkedin']) . '" target="_blank" class="link-item" style="justify-content: flex-start;">🔗 LinkedIn</a>';
            }
            if (!empty($data['github'])) {
                $html .= '<a href="' . htmlspecialchars($data['github']) . '" target="_blank" class="link-item" style="justify-content: flex-start;">💻 GitHub</a>';
            }
            if (!empty($data['portfolio'])) {
                $html .= '<a href="' . htmlspecialchars($data['portfolio']) . '" target="_blank" class="link-item" style="justify-content: flex-start;">🌐 Portfolio</a>';
            }
            
            $html .= '
                                </div>
                            </div>';
        }
        
        $html .= '
                        </div>
                        
                        <!-- Main Area -->
                        <div class="main-area">';
        
        // PROFESSIONAL SUMMARY
        if (!empty($data['summary'])) {
            $html .= '
                            <div class="section">
                                <h3 class="section-title">Professional Summary</h3>
                                <div class="summary-box">
                                    ' . nl2br(htmlspecialchars($data['summary'])) . '
                                </div>
                            </div>';
        }
        
        // WORK EXPERIENCE
        if (!empty($data['experience'])) {
            $html .= '
                            <div class="section">
                                <h3 class="section-title">Work Experience</h3>
                                <div class="experience-item">
                                    <div class="bullet-list">';
            
            $expLines = explode("\n", $data['experience']);
            foreach ($expLines as $line) {
                $line = trim($line);
                if (!empty($line)) {
                    $html .= '<li>' . htmlspecialchars($line) . '</li>';
                }
            }
            
            $html .= '
                                    </div>
                                </div>
                            </div>';
        }
        
        // PROJECTS
        if (!empty($data['projects'])) {
            $html .= '
                            <div class="section">
                                <h3 class="section-title">Projects</h3>
                                <div class="project-item">
                                    <div class="bullet-list">';
            
            $projLines = explode("\n", $data['projects']);
            foreach ($projLines as $line) {
                $line = trim($line);
                if (!empty($line)) {
                    $html .= '<li>' . htmlspecialchars($line) . '</li>';
                }
            }
            
            $html .= '
                                    </div>
                                </div>
                            </div>';
        }
        
        // REFERENCES
        if (!empty($data['references'])) {
            $html .= '
                            <div class="section">
                                <h3 class="section-title">References</h3>
                                <div class="info-value">
                                    ' . nl2br(htmlspecialchars($data['references'])) . '
                                </div>
                            </div>';
        }
        
        $html .= '
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>';
        
        return $html;
    }

    /**
     * Use the same working method from testGeminiDirect
     */
    private function callGeminiDirect(string $prompt, string $apiKey): string
    {
        $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . $apiKey;
        
        $data = [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.7,
                'maxOutputTokens' => 2048,
                'topP' => 0.9,
                'topK' => 40
            ]
        ];
        
        $options = [
            'http' => [
                'header' => "Content-Type: application/json\r\n",
                'method' => 'POST',
                'content' => json_encode($data),
                'ignore_errors' => true,
                'timeout' => 60
            ],
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false
            ]
        ];
        
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        
        if ($result === false) {
            $error = error_get_last();
            throw new \Exception('API call failed: ' . ($error['message'] ?? 'Unknown error'));
        }
        
        $response = json_decode($result, true);
        
        // Extract text from response
        if (isset($response['candidates'][0]['content']['parts'][0]['text'])) {
            return $response['candidates'][0]['content']['parts'][0]['text'];
        }
        
        if (isset($response['error'])) {
            throw new \Exception('Gemini API error: ' . ($response['error']['message'] ?? 'Unknown error'));
        }
        
        throw new \Exception('Unexpected API response format');
    }

    /**
     * Call Gemini API
     */
    private function callGeminiAPI(string $prompt, string $apiKey): string
    {
        $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

        try {
            $response = Http::withOptions([
                'verify' => false,
                'timeout' => 120,
                'curl' => [CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4]
            ])->withHeaders([
                'Content-Type' => 'application/json',
            ])->post($url . '?key=' . $apiKey, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.7,
                    'maxOutputTokens' => 2048,
                    'topP' => 0.9,
                    'topK' => 40
                ]
            ]);

            if ($response->failed()) {
                Log::error('HTTP client failed', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                throw new \Exception('API request failed: ' . $response->body());
            }

            return $this->parseGeminiResponse($response->json());

        } catch (\Exception $e) {
            Log::error('HTTP client exception', ['message' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Parse Gemini API response
     */
    private function parseGeminiResponse(array $response): string
    {
        // Check for error response
        if (isset($response['error'])) {
            $errorMsg = $response['error']['message'] ?? 'Unknown Gemini API error';
            Log::error('Gemini API error', ['error' => $response['error']]);
            throw new \Exception('Gemini API error: ' . $errorMsg);
        }
        
        // Check if content was blocked by safety settings
        if (isset($response['promptFeedback']['blockReason'])) {
            $blockReason = $response['promptFeedback']['blockReason'];
            Log::warning('Prompt blocked by safety settings', ['reason' => $blockReason]);
            throw new \Exception('Your request was blocked by content safety filters. Please revise your input.');
        }
        
        // Extract text from successful response
        if (isset($response['candidates'][0]['content']['parts'][0]['text'])) {
            return $response['candidates'][0]['content']['parts'][0]['text'];
        }
        
        // Check for other finish reasons
        if (isset($response['candidates'][0]['finishReason'])) {
            $finishReason = $response['candidates'][0]['finishReason'];
            
            if ($finishReason === 'SAFETY') {
                throw new \Exception('Content was blocked due to safety concerns. Please adjust your input.');
            } elseif ($finishReason === 'RECITATION') {
                throw new \Exception('Content was blocked due to recitation concerns. Please use original content.');
            } elseif ($finishReason === 'MAX_TOKENS') {
                throw new \Exception('The generated content was too long. Please simplify your request.');
            }
        }
        
        Log::error('Unexpected Gemini response format', ['response' => $response]);
        throw new \Exception('Unexpected response format from AI service');
    }

    private function buildPrompt(array $p): string
    {
        $parts = ["Create a professional ATS-friendly resume using the following details. Format it beautifully with clear sections:"];
        $parts[] = "\n=== PERSONAL INFORMATION ===";
        $parts[] = "Full Name: " . ($p['fullName'] ?? 'N/A');
        $parts[] = "Email: " . ($p['email'] ?? 'N/A');
        $parts[] = "Phone: " . ($p['phone'] ?? 'N/A');
        $parts[] = "Professional Title: " . ($p['title'] ?? 'N/A');
        
        if (!empty($p['street']) || !empty($p['city'])) {
            $parts[] = "Address: " . trim(implode(', ', [
                $p['street'] ?? '',
                $p['city'] ?? '',
                $p['province'] ?? '',
                $p['postalCode'] ?? '',
                $p['country'] ?? ''
            ]), ', ');
        }
        
        $parts[] = "\n=== PROFESSIONAL SUMMARY ===";
        $parts[] = $p['summary'] ?? 'Generate a compelling professional summary based on the experience and target role';
        
        $parts[] = "\n=== WORK EXPERIENCE ===";
        $parts[] = $p['experience'] ?? 'No experience provided - generate entry-level appropriate content';
        
        if (!empty($p['projects'])) {
            $parts[] = "\n=== PROJECTS ===";
            $parts[] = $p['projects'];
        }
        
        $parts[] = "\n=== SKILLS ===";
        $parts[] = $p['skills'] ?? 'List technical and soft skills relevant to the target role';
        
        if (!empty($p['qualification'])) {
            $parts[] = "\n=== EDUCATION ===";
            $parts[] = $p['qualification'];
        }
        
        if (!empty($p['linkedin']) || !empty($p['github']) || !empty($p['portfolio'])) {
            $parts[] = "\n=== LINKS & PORTFOLIO ===";
            if (!empty($p['linkedin'])) $parts[] = "LinkedIn: " . $p['linkedin'];
            if (!empty($p['github'])) $parts[] = "GitHub: " . $p['github'];
            if (!empty($p['portfolio'])) $parts[] = "Portfolio: " . $p['portfolio'];
        }
        
        $parts[] = "\n=== FORMATTING INSTRUCTIONS ===";
        $parts[] = "• Use clear section headers (e.g., 'PROFESSIONAL EXPERIENCE', 'EDUCATION')";
        $parts[] = "• Use bullet points (•) for listing responsibilities and achievements";
        $parts[] = "• Include quantifiable achievements where possible (%, $, numbers)";
        $parts[] = "• Make it ATS-friendly with relevant keywords for: " . ($p['targetRole'] ?? 'Software Developer');
        $parts[] = "• Keep the overall tone professional and concise";
        $parts[] = "• Maximum length: 2 pages";
        
        return implode("\n", $parts);
    }
    
    private function cleanGeneratedText(string $text, array $originalData): string
    {
        // Remove any HTML tags if present
        $text = strip_tags($text);
        
        // Ensure the name is properly formatted at the beginning
        if (!empty($originalData['fullName'])) {
            $name = strtoupper(trim($originalData['fullName']));
            $text = preg_replace('/^' . preg_quote($originalData['fullName'], '/') . '/i', $name, $text);
        }
        
        // Clean up excessive whitespace (more than 2 newlines)
        $text = preg_replace('/\n\s*\n\s*\n/', "\n\n", $text);
        
        // Ensure consistent line endings
        $text = str_replace("\r\n", "\n", $text);
        
        return trim($text);
    }
    
    /**
     * Test endpoint to check if Gemini API is working
     */
    public function test(Request $request)
    {
        try {
            $apiKey = env('GEMINI_API_KEY');
            
            $client = new \GuzzleHttp\Client([
                'verify' => false,
                'timeout' => 10
            ]);
            
            $testResponse = null;
            $testError = null;
            
            if (!empty($apiKey)) {
                try {
                    $testUrl = 'https://generativelanguage.googleapis.com/v1beta/models?key=' . $apiKey;
                    $response = $client->get($testUrl);
                    $testResponse = json_decode($response->getBody(), true);
                } catch (\Exception $e) {
                    $testError = $e->getMessage();
                }
            }
            
            return response()->json([
                'status' => 'ok',
                'api_key_set' => !empty($apiKey),
                'api_key_length' => $apiKey ? strlen($apiKey) : 0,
                'api_key_preview' => $apiKey ? substr($apiKey, 0, 8) . '...' : null,
                'environment' => config('app.env'),
                'debug' => config('app.debug'),
                'php_os' => PHP_OS,
                'ssl_verify' => !(app()->environment('local') && strtoupper(substr(PHP_OS, 0, 3)) === 'WIN'),
                'gemini_test' => $testResponse ? 'success' : ($testError ? 'failed' : 'not_tested'),
                'gemini_error' => $testError,
                'time' => now()->toDateTimeString()
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'trace' => config('app.debug') ? $e->getTraceAsString() : null
            ], 500);
        }
    }

    /**
     * Direct test endpoint for Gemini API
     */
    public function testGeminiDirect(Request $request)
    {
        try {
            $apiKey = env('GEMINI_API_KEY');
            
            if (empty($apiKey)) {
                return response()->json(['error' => 'API key missing'], 500);
            }
            
            $testPrompt = "Say hello in one word";
            
            Log::info('Testing Gemini API directly');
            
            $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . $apiKey;
            
            $data = [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $testPrompt]
                        ]
                    ]
                ]
            ];
            
            $options = [
                'http' => [
                    'header' => "Content-Type: application/json\r\n",
                    'method' => 'POST',
                    'content' => json_encode($data),
                    'ignore_errors' => true
                ],
                'ssl' => [
                    'verify_peer' => false,
                    'verify_peer_name' => false
                ]
            ];
            
            $context = stream_context_create($options);
            $result = file_get_contents($url, false, $context);
            
            if ($result === false) {
                $error = error_get_last();
                return response()->json([
                    'error' => 'file_get_contents failed',
                    'details' => $error
                ], 500);
            }
            
            $response = json_decode($result, true);
            
            return response()->json([
                'success' => true,
                'method' => 'file_get_contents',
                'url_used' => str_replace($apiKey, 'HIDDEN_KEY', $url),
                'response' => $response,
                'parsed_text' => $response['candidates'][0]['content']['parts'][0]['text'] ?? 'No text found'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }

    /**
     * Format resume as beautiful HTML (keeping for backward compatibility)
     */
    private function formatResumeAsHTML(string $text, array $data): string
    {
        // This is kept for backward compatibility
        // But we're now using buildResumeHTML which is more comprehensive
        return $this->buildResumeHTML($data);
    }
}