<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;

class SuggestionController extends Controller
{
    public function index()
    {
        $suggestions = User::where('role_id', 2)
            ->where(
                fn ($q) =>
                $q->whereNotNull('price')->orWhere('price', 0)
            )
            ->take(50)
            ->get()
            ->toArray();
        shuffle($suggestions);

        return response()->json(['success' => true, 'suggestions' => $suggestions]);
    }
}
