<?php

namespace Database\Seeders;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class DiscoveTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now('Asia/Ho_Chi_Minh')->toDateTimeString();
        DB::table('discoves')->insert([
            [
                'title' => 'suthatla',
                'type' => 'number',
                'link' => 'test',
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
            [
                'title' => 'Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media & h0n',
                'type' => 'music',
                'link' => 'test',
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
        ]);
    }
}
