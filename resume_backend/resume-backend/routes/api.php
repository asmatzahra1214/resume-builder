<?php
use Illuminate\Http\Request; 
use App\Http\Controllers\UserController;
use App\Http\Controllers\ResumeController;
use Illuminate\Support\Facades\Route;


// Add this test route at the TOP
Route::get('/test-minimal', function() {
    return response()->json(['message' => 'API is working!'])
        ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Accept');
});

Route::post('/test-minimal', function(Request $request) {
    return response()->json([
        'message' => 'POST working!',
        'data' => $request->all()
    ])
    ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
    ->header('Access-Control-Allow-Methods', 'POST, OPTIONS')
    ->header('Access-Control-Allow-Headers', 'Content-Type, Accept');
});

// Handle OPTIONS preflight
Route::options('/test-minimal', function() {
    return response()->json([], 200)
        ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Accept')
        ->header('Access-Control-Max-Age', '86400');
});




Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/generate-resume', [ResumeController::class, 'generate']);
Route::get('/test-gemini-direct', [ResumeController::class, 'testGeminiDirect']);

// Route::post('/generate-resume/debug', [ResumeController::class, 'debug']);
// Protected routes (if using auth middleware)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/user', [UserController::class, 'currentUser']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::get('/users', [UserController::class, 'index']);
});