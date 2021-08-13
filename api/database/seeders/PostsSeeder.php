<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $posts = [
            [
                "caption" => "Welcome to Just Yours!",
                "creator_id" => "6115ff4e36e77486ff6a0d22",
                "created_at" => now()->format('Y-m-d h:i:s'),
                "media" => "https://justyours.s3.amazonaws.com/just-logo.png",
                "updated_at" => now()->format('Y-m-d h:i:s'),
                "is_main" => true
            ],
            [
                "caption" => 'I’ve been a part of #MauxTeam as a "Latina light" Diana and I’ve loved her 🌹✨ dietary advice, workouts, dancing and other activities!',
                "creator_id" => "6115ff4e36e77486ff6a0d23",
                "created_at" => now()->format('Y-m-d h:i:s'),
                "media" => "https://justyours.s3.amazonaws.com/woman.png",
                "updated_at" => now()->format('Y-m-d h:i:s')
            ],
            [
                "caption" => 'Say “Hola Hola” to Latina lifestyle and fitness coach @dianamaux, who’s just joined us! 🏋️‍♀️ 🍏 Be a part of the #MauxTeam as your "Latina light" Diana shares everything from dietary advice, workouts, dancing and so much more! 🌹✨',
                "creator_id" => "6115ff4e36e77486ff6a0d24",
                "created_at" => now()->format('Y-m-d h:i:s'),
                "media" => "https://justyours.s3.amazonaws.com/post1.png",
                "updated_at" => now()->format('Y-m-d h:i:s'),
            ],
            [
                "caption" => "🤳Hiit with Paloma | 🌤Full Body Mobility with Paloma\n Paloma guides you through some full-body exercises to help increase your mobility!",
                "creator_id" => "6115ff4e36e77486ff6a0d25",
                "created_at" => now()->format('Y-m-d h:i:s'),
                "media" => "https://justyours.s3.amazonaws.com/woman.png",
                "updated_at" => now()->format('Y-m-d h:i:s'),
            ],
        ];

        Post::insert($posts);
    }
}
